"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/modules/agents/hooks/use-confirm";
import { MeetingIdViewHeader } from "@/modules/meetings/ui/components/meeting-id-view-header";
import { UpdateMeetingDialog } from "@/modules/meetings/ui/components/update_meeting_dialog";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  meetingId: string;
};

export const MeetingIdView = ({meetingId}: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const[UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        //TODO: Invalidate free tier usage
        router.push("/meetings")
      },
    }),
  );

  const handleRemoveMeeting = async() => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId});
  };

  return (
    <>
      <RemoveConfirmation/>
      <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 flex flex-col gap-y-4 md:gap-y-6 px-4 md:px-8 pb-6 md:pb-8 mx-auto w-full max-w-[860px] text-[oklch(0.38_0.03_147)] dark:text-white">
        <MeetingIdViewHeader
          meetingId = {meetingId}
          meetingName = {data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {JSON.stringify(data, null, 2 )}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title = "Error Loading Meeting"
      description="Please try again later"
    />
  )
}

