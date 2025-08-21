"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewAgentDialog } from "./new_agent_dialog";
import { useState } from "react";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <NewAgentDialog open = {isDialogOpen} onOpenChange={setIsDialogOpen}/>
        <div className="py-4 px-4 md:px-8 flex items-center justify-between">
        <h5 className="text-lg font-semibold text-gray-900 tracking-tight">
          My Agents
        </h5>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant="default"
          className="gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Agent
        </Button>
      </div>
    </>
  );
};
