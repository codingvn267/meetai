"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/modules/agents/hooks/use-confirm";
import { ActiveState } from "@/modules/meetings/ui/components/active_state";
import { CancelledState } from "@/modules/meetings/ui/components/cancelled_state";
import { MeetingIdViewHeader } from "@/modules/meetings/ui/components/meeting-id-view-header";
import { ProcessingState } from "@/modules/meetings/ui/components/processing_state";
import { UpcomingState } from "@/modules/meetings/ui/components/upcoming_state";
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

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation/>
      <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId = {meetingId}
          meetingName = {data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isActive && <ActiveState
          meetingId = {meetingId}
          />
        }
        {isCancelled && <CancelledState/>}
        {isProcessing && <ProcessingState/>}
        {isCompleted && <div>Completed</div>}
        {isUpcoming && <UpcomingState
          meetingId = {meetingId}
          onCancelMeeting={() => {}}
          isCancelling = {false}
        />}
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

