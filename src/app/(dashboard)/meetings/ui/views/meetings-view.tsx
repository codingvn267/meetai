"use client";

import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { columns } from "@/modules/meetings/ui/components/columns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  const items = data?.items ?? [];

  return (
    <div className = "flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={items} columns={columns}/>
      {items.length === 0 && (
            <EmptyState
              title="Create your first meeting"
              description="📅 Schedule your meeting! Pick a time, add attendees, and we’ll handle invites, links, and reminders — like a calendar sidekick that never forgets."
      />
      )}
    </div>
  )
}

export const MeetingsViewLoading = () => {
  return (
    <LoadingState title="Loading Meetings" description="This may take a few seconds" />
  )
}

export const MeetingsViewError = () => {
  return (
    <ErrorState title="Error Loading Meetings" description="Something went wrong" />
  )
}

