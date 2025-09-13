import {
  CircleXIcon, 
  CircleCheckIcon, 
  ClockArrowUpIcon, 
  VideoIcon,
  LoaderIcon,
} from "lucide-react";

import { CommandSelect } from "@/components/command-select";

import { MeetingStatus } from "../../types";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { Children } from "react";

const options = [
  {
    id: MeetingStatus.upcoming,
    value: MeetingStatus.upcoming,
    children: (
      <div className= "cursor-pointer flex items-center gap-2 text-sm text-[oklch(0.38_0.03_147)] dark:text-white [&>svg]:size-4">
        <ClockArrowUpIcon className="text-zinc-500 dark:text-zinc-400" />
        <span className="capitalize">{MeetingStatus.upcoming}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.completed,
    value: MeetingStatus.completed,
    children: (
      <div className="cursor-pointer flex items-center gap-2 text-sm text-[oklch(0.38_0.03_147)] dark:text-white [&>svg]:size-4">
        <CircleCheckIcon className="text-zinc-500 dark:text-zinc-400" />
        <span className="capitalize">{MeetingStatus.completed}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.active,
    value: MeetingStatus.active,
    children: (
      <div className="cursor-pointer flex items-center gap-2 text-sm text-[oklch(0.38_0.03_147)] dark:text-white [&>svg]:size-4">
        <VideoIcon className="text-zinc-500 dark:text-zinc-400" />
        <span className="capitalize">{MeetingStatus.active}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.processing,
    value: MeetingStatus.processing,
    children: (
      <div className="cursor-pointer flex items-center gap-2 text-sm text-[oklch(0.38_0.03_147)] dark:text-white [&>svg]:size-4">
        <LoaderIcon className="text-zinc-500 dark:text-zinc-400" />
        <span className="capitalize">{MeetingStatus.processing}</span>
      </div>
    ),
  },
  {
    id: MeetingStatus.cancelled,
    value: MeetingStatus.cancelled,
    children: (
      <div className="cursor-pointer flex items-center gap-2 text-sm text-[oklch(0.38_0.03_147)] dark:text-white [&>svg]:size-4">
        <CircleXIcon className="text-zinc-500 dark:text-zinc-400" />
        <span className="capitalize">{MeetingStatus.cancelled}</span>
      </div>
    ),
  },
]
  
export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options = {options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value = {filters.status ?? ""}
    />
  )  
}

