import { useCallback, useMemo } from "react";

export const usePagination = (
  page: number,
  totalPages: number,
  onPageChange: (page: number) => void
) => {
  const getPageNumbers = useCallback(() => {
    const pages: (number | "...")[] = [];

    pages.push(1); // Always show first page

    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }, [page, totalPages]);

  // Wrap with useMemo so components don't re-render unnecessarily
  const pages = useMemo(() => getPageNumbers(), [getPageNumbers]);

  const goToPrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const goToNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return {
    pages,
    goToPrev,
    goToNext,
    canPrev: page > 1,
    canNext: page < totalPages,
  };
};
