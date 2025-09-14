import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VideoIcon } from "lucide-react"; 

interface Props {
  meetingId: string;
}

export const ActiveState = ({
  meetingId,
} : Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8
                    rounded-2xl border border-zinc-200 bg-white/95 p-6 md:p-8
                    shadow-sm ring-1 ring-black/5
                    text-[oklch(0.38_0.03_147)] dark:text-white
                    dark:bg-zinc-900/70 dark:border-zinc-700 dark:ring-white/10">
      <EmptyState
        image="/upcoming.svg"
        title="Live meeting"
        description="We're capturing notes, decisions, and action items in real time—watch updates roll in."
      />

      <div className="w-full flex flex-col-reverse items-center gap-3 lg:flex-row lg:justify-center">
        <Button
          asChild
          className="h-9 px-3 gap-2 font-medium text-white
                    bg-gradient-to-r from-emerald-500 to-emerald-600
                    hover:from-emerald-600 hover:to-emerald-700
                    shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Link href={`/call/${meetingId}`} prefetch={false}>
            <VideoIcon className="icon-size" />
            <span>Join meeting</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
