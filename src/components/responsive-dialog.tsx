"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

interface ResponsiveDialogProps {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className="
            border-t border-white/15 bg-white/90 backdrop-blur-xl
            dark:bg-zinc-900/90 dark:border-white/10
            shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.35)]
          "
        >
          {/* Top gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-800" />

          <DrawerHeader className="relative px-5 pt-4 pb-2">
            <DrawerTitle className="text-[oklch(0.32_0.12_147)] dark:text-white text-lg font-semibold tracking-tight">
              {title}
            </DrawerTitle>
            <DrawerDescription className="text-[oklch(0.53_0.015_147)] dark:text-white/70 text-sm">
              {description}
            </DrawerDescription>

            <DrawerClose asChild>
              <button
                type="button"
                aria-label="Close"
                className="
                  absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full
                  text-[oklch(0.38_0.14_147)] hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60
                  transition
                "
              >
                <X className="icon-size" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          <div className="px-5">
            <div className="h-px w-full bg-black/5 dark:bg-white/10" />
          </div>

          <div className="px-5 py-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-lg rounded-2xl p-0 overflow-hidden
          border border-white/20 bg-white/90 backdrop-blur-xl
          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]
          focus-visible:outline-none
          dark:bg-zinc-900/90 dark:border-white/10
        "
      >
        {/* Top gradient bar */}
        <div className="h-2 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-800" />

        <DialogHeader className="relative px-5 pt-4 pb-2">
          <DialogTitle className="text-[oklch(0.32_0.12_147)] dark:text-white text-xl font-semibold tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[oklch(0.53_0.015_147)] dark:text-white/70 text-sm">
            {description}
          </DialogDescription>

          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="
                absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full
                text-[oklch(0.38_0.14_147)] hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/10
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60
                transition
              "
            >
              <X className="icon-size" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="px-5">
          <div className="h-px w-full bg-black/5 dark:bg-white/10" />
        </div>

        <div className="px-5 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
