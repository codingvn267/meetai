
"use client";

import { Loader2 } from "lucide-react";
import * as React from "react";

interface Props {
  title: string;
  description: string;
}

export function LoadingState({ title, description }: Props) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border/60 bg-transparent p-6 shadow-sm">
        <div className="relative">
          {/* soft glow */}
          <div className="absolute inset-0 rounded-full blur-md opacity-60 bg-primary/20 motion-safe:animate-pulse" />
          {/* spinning ring */}
          <div className="h-12 w-12 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary border-t-transparent motion-safe:animate-[spin_0.9s_linear_infinite]" />

          {/* icon on top with dual animation; use icon-size utility */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="icon-size animate-spin" />
          </div>
        </div>

        <h2 className="text-lg font-medium text-muted-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}