import { JSX, useState } from "react";

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";

export const useConfirm = (
  title: string,
  description: string,  
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div
          className="mt-4 flex items-center justify-end gap-2 pt-3
                    border-t border-gray-200 dark:border-zinc-800"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="rounded-lg px-4 py-2
              border border-black/10 bg-white/90 text-[oklch(0.38_0.14_147)]
              hover:bg-black/5
              dark:border-white/10 dark:bg-zinc-900/80 dark:text-white/80 dark:hover:bg-white/10
              transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleConfirm}
            className="rounded-lg px-5 py-2
              bg-gradient-to-r from-green-400 via-emerald-500 to-green-800
              text-white font-medium
              shadow-sm
              transition-all duration-150
              hover:from-green-300 hover:via-emerald-400 hover:to-green-700
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-0
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </Button>
        </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm]
};