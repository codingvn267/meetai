import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";
import { CalendarIcon, SearchIcon, UserIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open:boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand =({ open, setOpen}: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search meetings, agents, or commands..."
        className="text-sm placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
      />

      <CommandList className="mt-2">
        <CommandEmpty className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          No results found.
        </CommandEmpty>

        <CommandGroup
          heading="Suggestions"
          className="text-gray-600 dark:text-gray-400 px-2 py-1 text-sm font-medium"
        >
          <CommandItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md">
            <SearchIcon className="icon-size" />
            Quick search
          </CommandItem>
          <CommandItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md">
            <CalendarIcon className="icon-size" />
            Upcoming meetings
          </CommandItem>
          <CommandItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md">
            <UserIcon className="icon-size" />
            Find an agent
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};