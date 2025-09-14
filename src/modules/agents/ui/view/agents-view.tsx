"use client";
import ErrorState from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilters } from "../../hooks/use-agent-filters";
import { DataPagination } from "./components/data-pagination";
import { useRouter } from "next/navigation";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentFilters();           // filters: { page, search }
  const trpc = useTRPC();

  // destructure to avoid accidental extra deps and to satisfy the linter
  const { page, search } = filters;

  // Build stable query options (TanStack v5)
  const opts = useMemo(
    () => trpc.agents.getMany.queryOptions({ page, search }),
    [trpc, page, search]
  );

  const { data, isFetching } = useQuery({
    ...opts,
    // v5: keep the previous data while refetching
    placeholderData: (prev) => prev,
    staleTime: 5_000,
    refetchOnWindowFocus: false,
  });

  const items = data?.items ?? [];

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable 
        data={items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)} />
      <DataPagination
        page={filters.page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(page) => setFilters({ page })}
      />
      {data && data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="🤖 Spin up your Agent! Your agent will hop into meetings, follow your lead, and chat with participants — like your own sidekick on the call."
        />
      )}

      {isFetching && data && (
        <div className="text-sm text-muted-foreground">Refreshing...</div>
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState title="Loading Agents" description="This may take a few seconds" />
  )
}

export const AgentsViewError = () => {
  return (
    <ErrorState title="Error Loading Agents" description="Something went wrong" />
  )
}
