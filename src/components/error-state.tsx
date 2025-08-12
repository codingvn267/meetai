"use client";

import { AlertTriangleIcon } from "lucide-react";
import * as React from "react";

interface Props {
  title: string;
  description: string;
}

export function ErrorState({ title, description }: Props) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border/60 bg-transparent p-6 shadow-sm">
        <div className="relative">
          {/* soft glow */}
          <div className="absolute inset-0 rounded-full blur-md opacity-60 bg-destructive/20" />
          {/* outer static ring (same size as loader) */}
          <div className="h-12 w-12 rounded-full border-2 border-destructive/40" />
          {/* inner colored ring to match loader thickness */}
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-destructive" />
          {/* icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangleIcon className="h-6 w-6 text-destructive" />
          </div>
        </div>

        <h2 className="text-lg font-medium text-muted-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default ErrorState;

