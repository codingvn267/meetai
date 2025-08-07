"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"
import { DashboardCommand } from "./dashboard_command"
import { useEffect, useState } from "react"

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen}/>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 py-2 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick = {toggleSidebar}
        >
          {(state === "collapsed" || isMobile) ?<PanelLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" /> :
            <PanelLeftCloseIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
          className="flex items-center justify-between w-56 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <div className="flex items-center gap-2">
            <SearchIcon className="w-4 h-4" />
            <span className="text-sm">Search</span>
          </div>
          
          <kbd className="flex items-center gap-0.5 rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] font-mono text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
            <span className="text-xs">&#8984;</span>
            <span className="text-[10px]">K</span>
          </kbd>
        </Button>
      </nav>
    </>
  )
}
