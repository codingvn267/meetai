import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentFilters } from "@/modules/agents/hooks/use-agent-filters";

export const AgentSearchFilter = () => {
  const [filters, setFilters] = useAgentFilters();

  return (
    <div className="relative w-full max-w-sm">
      <Input
        placeholder="Filter by name"
        className="h-10 w-full pl-9 pr-3 rounded-lg border border-gray-200 bg-white
                  text-gray-900 dark:text-gray-900 placeholder:text-gray-500
                  focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none
                  shadow-sm transition"
        value={filters.search ?? ""}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
      />
    </div>

  )
}