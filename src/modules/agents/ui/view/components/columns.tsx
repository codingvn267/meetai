"use client"

import { GenerateAvatar } from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { AgentGetOne } from "@/modules/agents/types"
import { ColumnDef } from "@tanstack/react-table"
import { CornerDownRightIcon, VideoIcon } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
    <div className="flex flex-col gap-y-2 min-w-0">
  {/* Avatar + Name */}
      <div className="flex items-center gap-x-3">
        <GenerateAvatar
          variant="botttsNeutral"
          seed={row.original.name}
          className="size-9 rounded-full bg-zinc-100 text-zinc-700 ring-2 ring-zinc-200
                    dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700 shadow-sm"
        />
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[220px]">
          {row.original.name}
        </span>
      </div>

      {/* Instructions */}
      <div className="flex items-center gap-x-3 pl-1">
        <CornerDownRightIcon className="size-4 text-zinc-400 dark:text-zinc-500" />
        <span className="text-sm text-zinc-600 dark:text-zinc-300 truncate max-w-[260px]">
          {row.original.instructions}
        </span>
      </div>
    </div>
    )
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-1.5 px-2 py-1 rounded-full 
                  text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200
                  dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800"
      >
        <VideoIcon className="size-3.5" />
        {row.original.meetingCount} {row.original.meetingCount === 1 ? "meeting" : "meetings"}
      </Badge>
    )
  }
]