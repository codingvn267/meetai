"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentFilters } from "@/modules/agents/hooks/use-agent-filters";
import { AgentSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constant";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE
    })
  }
  return (
    <>
      <NewAgentDialog open = {isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className = "py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="py-4 px-4 md:px-8 flex items-center justify-between">
          <h5 className="text-lg font-semibold text-gray-900 tracking-tight">
            My Agents
          </h5>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="default"
            size="sm"
            className="gap-2"
          >
            <PlusIcon className="icon-size" />
            Add Agent
          </Button>
        </div>
        <ScrollArea>
          <div className = "flex items-center gap-x-2 p-1">
            <AgentSearchFilter />
            {isAnyFilterModified && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-gray-200
                          text-gray-900 dark:text-gray-100
                          hover:bg-gray-50 dark:hover:bg-gray-800/50
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60
                          shadow-sm transition"
              >
                <XCircleIcon className="icon-size" />
                <span>Clear</span>
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};
