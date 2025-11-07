import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const { pages, goToPrev, goToNext, canPrev, canNext } = usePagination(
    page,
    totalPages,
    onPageChange
  );

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
      <Button
        variant="outline"
        disabled={!canPrev}
        onClick={goToPrev}
        className="flex items-center justify-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm cursor-pointer"
      >
        <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Prev
      </Button>

      <div className="flex items-center justify-center gap-1 sm:gap-2">
        {pages.map((p, index) =>
          p === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="text-gray-400 px-2 text-sm select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => onPageChange(Number(p))}
              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg text-xs sm:text-sm font-medium transition cursor-pointer ${
                page === p
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <Button
        variant="outline"
        disabled={!canNext}
        onClick={goToNext}
        className="flex items-center justify-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm cursor-pointer"
      >
        Next <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </Button>
    </div>
  );
};
