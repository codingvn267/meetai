import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  const last = Math.max(totalPages ?? 0, 0);
  const canPrev = page > 1;
  const canNext = last === 0 ? false : page < last;

  const goPrev = () => canPrev && onPageChange(page - 1);
  const goNext = () => canNext && onPageChange(page + 1);

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      {/* Page label */}
      <div className="flex-1 text-sm text-gray-900 dark:text-gray-100">
        Page {Math.max(page, 1)} of {last || 1}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Previous page"
          className="inline-flex items-center gap-1.5 text-gray-900 dark:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <span className="select-none rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm">
          {page}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goNext}
          disabled={!canNext}
          aria-label="Next page"
          className="inline-flex items-center gap-1.5 text-gray-900 dark:text-gray-100"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
