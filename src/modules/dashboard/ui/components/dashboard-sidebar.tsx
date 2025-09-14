// DashboardSidebar.tsx
"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" }
];

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/meetings" }
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-800 flex flex-col px-4 py-6 shadow-inner">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Image
            src="/logo.svg"
            height={40}
            width={40}
            alt="Connekt.AI Logo"
            className="drop-shadow-[0_0_6px_rgba(0,255,200,0.4)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-xl font-extrabold tracking-wide text-white font-[Orbitron]">
            Connekt.AI
          </span>
        </Link>
      </SidebarHeader>

      <div className="px-5 py-3">
        <Separator className="h-[1px] bg-white/30 backdrop-blur-sm rounded-full shadow-sm" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      // Base styles
                      "w-full px-3 py-2 rounded-md transition-all flex items-center gap-3 group",
                      // Hover styles (always apply)
                      "hover:bg-white/20 hover:text-white",
                      // Active styles
                      pathname === item.href && "bg-white/10 text-white font-semibold"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full group">
                      <item.icon className="icon-large text-white/80 group-hover:text-white transition-colors" />
                      <span className="text-sm font-semibold transition-all group-hover:tracking-wider">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
          <div className="px-5 py-3">
            <Separator className="h-[1px] bg-white/30 backdrop-blur-sm rounded-full shadow-sm" />
          </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      // Base styles
                      "w-full px-3 py-2 rounded-md transition-all flex items-center gap-3 group",
                      // Hover styles (always apply)
                      "hover:bg-white/20 hover:text-white",
                      // Active styles
                      pathname === item.href && "bg-white/10 text-white font-semibold"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full group">
                      <item.icon className="icon-large text-white/80 group-hover:text-white transition-colors" />
                      <span className="text-sm font-semibold transition-all group-hover:tracking-wider">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent> 
      <SidebarFooter className="text-white">
        <DashboardUserButton/>
      </SidebarFooter>
    </Sidebar>
  );
};
