import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { AgentsView } from "@/modules/agents/ui/view/agents-view";

export default async function Page() {
  const qc = getQueryClient();

  // IMPORTANT: await this so it resolves or throws before dehydrate
  await qc.ensureQueryData(trpc.agents.getMany.queryOptions());
  // (prefetchQuery + await also works)

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <AgentsView />
    </HydrationBoundary>
  );
}


