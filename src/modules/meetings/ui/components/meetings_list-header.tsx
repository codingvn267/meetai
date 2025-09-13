"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialog } from "./new_meeting_dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent_id_filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page:1,
    })
  }
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className = "py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="py-4 px-4 md:px-8 flex items-center justify-between">
          <h5 className="text-lg font-semibold text-gray-900 tracking-tight">
            My Meetings
          </h5>
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="default"
            className="gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className = "flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter/>
            <AgentIdFilter/>
            {isAnyFilterModified && (
              <Button variant = "outline" onClick={onClearFilters} className="h-9 px-2 font-normal gap-2
              text-[oklch(0.38_0.03_147)] dark:text-white
              hover:bg-accent hover:text-accent-foreground
              dark:hover:bg-accent dark:hover:text-accent-foreground
              [&>svg]:size-4">
                <XCircleIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </>
  );
};
