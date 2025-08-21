import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { AgentsView } from "@/modules/agents/ui/view/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/view/components/agents_list-header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Page() {
  const qc = getQueryClient();

  const session = await auth.api.getSession({
    headers: await headers(), // <- you forgot to import this in the screenshot
  });
  if (!session) {
    redirect("/sign-in"); // <- also needs import
  }

  // IMPORTANT: await this so it resolves or throws before dehydrate
  await qc.ensureQueryData(trpc.agents.getMany.queryOptions());
  // (prefetchQuery + await also works)

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(qc)}>
        <AgentsView />
      </HydrationBoundary>
    </>
  );
}


