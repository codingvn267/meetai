import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { AgentsView } from "@/modules/agents/ui/view/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/view/components/agents_list-header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  // parse URL params on the server
  const filters = await loadSearchParams(searchParams);
  // { page: number, search: string }

  // auth guard
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  // prefetch
  const queryClient = getQueryClient();

  // like the YouTuber: fire-and-forget prefetch
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AgentsView />
      </HydrationBoundary>
    </>
  );
};

export default Page;
