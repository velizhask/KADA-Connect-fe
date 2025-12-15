import { useCallback, useEffect, useState } from "react";
import { studentServices } from "@/services/studentServices";
import { useDebounce } from "./useDebounce";

export interface Filters {
  searchTerm: string;
  status: string[];
  universities: string[];
  majors: string[];
  industries: string[];
  skills: string[];
}

export const useTrainees = (limit = 10) => {
  const [trainees, setTrainees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ⬅️ totalPages DIKONTROL FE
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    totalPages: 1,
  });

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    status: [],
    universities: [],
    majors: [],
    industries: [],
    skills: [],
  });

  const debouncedSearch = useDebounce(filters.searchTerm, 500);

  const fetchTrainees = useCallback(async () => {
    setLoading(true);

    try {
      const params = {
        page: pagination.page,
        limit,
        status: filters.status,
        university: filters.universities,
        major: filters.majors,
        industry: filters.industries,
        skills: filters.skills,
      };

      const res =
        debouncedSearch.trim().length > 0
          ? await studentServices.searchStudents(debouncedSearch, params)
          : await studentServices.getStudents(params);

      const data = res.data?.data ?? [];
      const meta = res.data?.pagination ?? {};

      setTrainees(data);

      setPagination((prev) => {
        const currentPage = meta.page ?? prev.page;

        /**
         * 🔥 SHADCN-FRIENDLY PAGINATION
         * Selalu izinkan page berikutnya
         * (karena backend bisa page 2,3,4)
         */
        return {
          ...prev,
          page: currentPage,
          totalPages: Math.max(prev.totalPages, currentPage + 1),
        };
      });

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load trainees.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters, pagination.page, limit]);

  useEffect(() => {
    fetchTrainees();
  }, [fetchTrainees]);

  /* ================= FILTER & SEARCH ================= */

  const updateArrayFilter = (key: keyof Filters, values: string[]) => {
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
      status: [],
      universities: [],
      majors: [],
      industries: [],
      skills: [],
    });
    setPagination({ page: 1, limit, totalPages: 1 });
  };

  return {
    trainees,
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
