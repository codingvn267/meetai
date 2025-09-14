import { EmptyState } from "@/components/empty-state";

export const CancelledState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8
                    rounded-2xl border border-zinc-200 bg-white/95 p-6 md:p-8
                    shadow-sm ring-1 ring-black/5
                    text-[oklch(0.38_0.03_147)] dark:text-white
                    dark:bg-zinc-900/70 dark:border-zinc-700 dark:ring-white/10">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled"
        description="This meeting was canceled, so no notes or summary were generated."
      />
    </div>
  );
};
