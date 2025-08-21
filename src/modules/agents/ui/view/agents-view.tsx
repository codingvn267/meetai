"use client";
import ErrorState from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { EmptyState } from "@/components/empty-state";


export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 text-zinc-900 [&_th]:text-zinc-800 [&_td]:text-zinc-900">

      <DataTable data={data} columns={columns} />
      {data.length===0 && (
        <EmptyState
          title="Create your first agent"
          description="🤖 Spin up your Agent!
                        Your agent will hop into meetings, follow your lead, and chat with participants 
                        — like your own sidekick on the call."
        />
      )}
    </div>
  );
}

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents" description="This may take a few seconds"
    />
  )
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description ="Something went wrong"
    />
  )
}