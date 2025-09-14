"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "./components/agent-id-view-header";
import { GenerateAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "./components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({agentId}: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [UpdateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId }))

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}))
        router.push("/agents")
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  )

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meetings`,
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeAgent.mutateAsync({ id: agentId });
  }

  return (
    <>
      <RemoveConfirmation/>
      <UpdateAgentDialog
        open = {UpdateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />

        <div className="rounded-2xl border border-zinc-200 bg-white/95 p-6 md:p-8 shadow-sm ring-1 ring-black/5">
          {/* Profile row */}
          <div className="mt-0 flex flex-col gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <GenerateAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="avatar-md rounded-full ring-1 ring-gray-200 dark:ring-zinc-800"
              />
              <div className="min-w-0">
                <h2 className="truncate text-lg  text-gray-500 font-semibold">{data.name}</h2>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  ID: {data.id}
                </p>
              </div>
            </div>

            <div className="mt-2">
              <Badge 
                variant="outline"
                className="flex items-center gap-x-1.5 px-2 py-1 rounded-full 
                        text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200
                        dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800"
              >
                <VideoIcon className="icon-size" />
                {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"}
              </Badge>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Instructions
              </h3>
              <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                {data.instructions || "No instructions provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState 
      title="Loading Agent" 
      description="This may take a few seconds" 
    />
  )
}

export const AgentsIdViewError = () => {
  return (
    <ErrorState 
      title="Error Loading Agent" 
      description="Something went wrong" 
    />
  )
}
