"use client"

import { GenerateAvatar } from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, ClockFadingIcon, CornerDownRightIcon, LoaderIcon, } from "lucide-react"
import { MeetingGetMany } from "../../types"
import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
};

const statusIconMap = {
  upcoming: ClockArrowUpIcon, 
  active: LoaderIcon,
  completed: CircleCheckIcon, 
  processing: LoaderIcon, 
  cancelled: CircleXIcon
};

const statusColorMap = {
  upcoming: "text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-800", 
  active: "text-emerald-700 bg-emerald-100 border border-emerald-200 dark:text-emerald-300 dark:bg-emerald-900/40 dark:border-emerald-800", 
  completed: "text-white bg-emerald-600 border border-emerald-600 dark:bg-emerald-500 dark:border-emerald-500", 
  processing: "text-amber-700 bg-amber-100 border border-amber-200 dark:text-amber-300 dark:bg-amber-900/40 dark:border-amber-800", 
  cancelled: "text-rose-700 bg-rose-100 border border-rose-200 dark:text-rose-300 dark:bg-rose-900/40 dark:border-rose-800",
}

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
    <div className="flex flex-col gap-y-2 min-w-0">
      <span className = "font-semibold capitalize">{row.original.name}</span>
      {/* Instructions */}
      <div className="flex items-center gap-x-3 pl-1">
        <div className="flex items-center gap-x-1">
          <CornerDownRightIcon className="size-4 text-zinc-400 dark:text-zinc-500" />
          <span className="text-sm text-zinc-600 dark:text-zinc-300 truncate max-w-[260px]">
            {row.original.agent.name}
          </span>
        </div>
        <GenerateAvatar
          variant = "botttsNeutral"
          seed={row.original.agent.name}
          className="size-6 rounded-full bg-zinc-100 text-zinc-700 
                    ring-2 ring-zinc-200 shadow-sm
                    dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700"
        />
        <span className="text-[oklch(0.38_0.03_147)] dark:text-white text-sm">
          {row.original.startedAt? format(row.original.startedAt, "MMM d") : ""}
        </span>
      </div>
    </div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap];

      return (
        <Badge
          variant = "outline"
          className= {cn(
            "capitalize [&>svg]:size-4",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )

          }
        >
          <Icon 
            className={cn(
              row.original.status === "processing" && "animate-spin"
            )}
          />
          {row.original.status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "duration",
    cell: ({ row }) => (
      <Badge
        variant = "outline"
          className= "capitalize flex items-center gap-2 h-6 px-2 py-0.5 rounded-md bg-white/80 border border-zinc-200 text-[oklch(0.38_0.03_147)] shadow-sm dark:bg-zinc-900/60 dark:border-zinc-700 dark:text-white [&>svg]:size-4 [&>svg]:opacity-70"
      >
        <ClockFadingIcon className="shrink-0 text-emerald-600 dark:text-emerald-400"/>
        {row.original.duration ? formatDuration(row.original.duration) : "No duration"}

      </Badge>
    )
  }
]