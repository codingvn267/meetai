import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from '@/trpc/client';
import { CommandSelect } from "@/components/command-select";
import { GenerateAvatar } from '@/components/generated-avatar';

import { useMeetingsFilters } from '../../hooks/use-meetings-filters';

export const AgentIdFilter = () => {
  const [ filters, setFilters ] = useMeetingsFilters(); 

  const trpc = useTRPC();

  const [agentSearch, setAgentSearch] = useState("");
  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    }),
  );

  return (
    <CommandSelect
      className='h-9'
      placeholder='Agent'
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-2 text-sm text-[oklch(0.38_0.03_147)] dark:text-white">
            <GenerateAvatar 
              seed={agent.name}
              variant="botttsNeutral"
              className="size-6 rounded-full bg-zinc-100 text-zinc-700 ring-2 ring-zinc-200 shadow-sm dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700" 
              />
              {agent.name}
          </div>
        )
      }))}
      onSelect={(value) => setFilters({ agentId: value })}
      onSearch = {setAgentSearch}
      value = {filters.agentId ?? ""}
    />
  )
}