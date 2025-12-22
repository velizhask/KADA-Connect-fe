import { useCallback, useEffect, useState } from "react";
import { companyServices } from "@/services/companyServices";
import { useDebounce } from "@/hooks/useDebounce";

export interface CompanyFilters {
  searchTerm: string;
  industries: string[];
  techRoles: string[];
}

export const useCompanies = (limit = 5) => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    totalPages: 1,
  });

  const [filters, setFilters] = useState<CompanyFilters>({
    searchTerm: "",
    industries: [],
    techRoles: [],
  });

  const debouncedSearch = useDebounce(filters.searchTerm, 500);

const fetchCompanies = useCallback(async () => {
  setLoading(true);

  try {
    const params = {
      page: pagination.page,
      limit,
      industry: filters.industries,
      techRole: filters.techRoles,
    };

    const res =
      debouncedSearch.trim().length > 0
        ? await companyServices.searchCompanies(
            debouncedSearch,
            params
          )
        : await companyServices.getCompanies(params);

    const rawData = res.data?.data ?? [];
    const meta = res.data?.pagination ?? {};

    const data = rawData.slice(0, limit);

    setCompanies(data);

    setPagination((prev) => {
  const currentPage = meta.page ?? prev.page;
  const isLastPage = rawData.length < limit;

  return {
    ...prev,
    page: currentPage,
    totalPages: isLastPage
      ? currentPage
      : Math.max(prev.totalPages, currentPage + 1),
  };
});

    setError(null);
  } catch (err) {
    console.error(err);
    setError("Failed to load companies.");
  } finally {
    setLoading(false);
  }
}, [debouncedSearch, filters, pagination.page, limit]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);


  const updateArrayFilter = (
    key: "industries" | "techRoles",
    values: string[]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
    setPagination({ page: 1, limit, totalPages: 1 });
  };

  const setSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
    setPagination({ page: 1, limit, totalPages: 1 });
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      industries: [],
      techRoles: [],
    });
    setPagination({ page: 1, limit, totalPages: 1 });
  };

  return {
    companies,
    loading,
    error,
    pagination,
    filters,
    updateArrayFilter,
    resetFilters,
    setPage: (page: number) =>
      setPagination((prev) => ({ ...prev, page })),
    search: filters.searchTerm,
    setSearch,
  };
};
