import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useAgentFilters } from "@/modules/agents/hooks/use-agent-filters";

// Ensure the file exists at the specified path or correct the import path if necessary.
// Update the import path to the correct relative location

export const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentFilters();
  // Local input state to avoid updating the URL on every keystroke.
  const [local, setLocal] = useState(filters.search ?? "");

  useEffect(() => {
    // keep local in sync when filters change from elsewhere
    setLocal(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    const t = setTimeout(() => {
      // update URL/search params after user stops typing
      setFilters({ search: local, page: 1 });
    }, 300);
    return () => clearTimeout(t);
  }, [local, setFilters]);

  return (
    <div className="relative w-full max-w-sm">
      <Input
        placeholder="Filter by name"
        className="pl-9 pr-3 py-2 h-10 rounded-lg border border-input bg-background 
             text-gray-900 placeholder:text-muted-foreground
             focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none
             transition-colors"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />

  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 icon-size text-muted-foreground" />
    </div>
  )
}