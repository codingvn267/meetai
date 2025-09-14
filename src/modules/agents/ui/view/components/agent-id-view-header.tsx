import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage, // ← use page for current crumb
} from "@/components/ui/breadcrumb";
import {
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}

export const AgentIdViewHeader = ({
  agentId,
  agentName,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <Breadcrumb className="text-sm">
        <BreadcrumbList className="flex items-center gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="font-semibold text-[15px] sm:text-base text-gray-700 hover:text-gray-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors"
            >
              <Link href="/agents">My Agents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator aria-hidden="true">
            <ChevronRightIcon className="icon-size text-gray-400" />
          </BreadcrumbSeparator>

          <BreadcrumbItem className="max-w-[55vw]">
            <BreadcrumbPage className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
              {agentName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="More actions"
            className="h-9 w-9 rounded-md text-gray-900 dark:text-gray-100
                       hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <MoreVerticalIcon className="icon-size" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="min-w-44 p-1"
        >
          <DropdownMenuItem
            onClick={onEdit}
            className="gap-2 text-gray-900 dark:text-gray-100"
          >
            <PencilIcon className="icon-size text-gray-500" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onRemove}
            className="gap-2 text-red-600 focus:text-red-700 hover:text-red-700"
          >
            <TrashIcon className="icon-size" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
