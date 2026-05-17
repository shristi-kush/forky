import { useEffect, useMemo, useState } from "react";

export const RECIPES_PER_PAGE = 6;

export function usePagination(items, pageSize = RECIPES_PER_PAGE) {
  const [page, setPage] = useState(1);

  const totalItems = items?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize) || 1);

  useEffect(() => {
    setPage(1);
  }, [items, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedItems = useMemo(() => {
    if (!items?.length) return [];
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  const rangeStart = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);

  return {
    paginatedItems,
    page,
    totalPages,
    totalItems,
    pageSize,
    rangeStart,
    rangeEnd,
    goToPage,
    goNext: () => goToPage(page + 1),
    goPrev: () => goToPage(page - 1),
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
