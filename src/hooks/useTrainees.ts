import { useCallback, useEffect, useState } from "react";
import { studentServices } from "@/services/studentServices";
import { useDebounce } from "./useDebounce";

interface Trainee {
  id: number;
  fullName: string;
  status: string;
  university: string;
  major: string;
  preferredIndustry?: string;
  techStack?: string;
  selfIntroduction?: string;
  cvUpload?: string;
  portfolioLink?: string;
  profilePhoto?: string;
  linkedin?: string | null;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Filters {
  searchTerm: string;
  status: string;
  university: string;
  major: string;
  industry: string;
  skill: string;
}

export const useTrainees = (initialLimit = 9) => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 1,
  });

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    status: "all",
    university: "all",
    major: "all",
    industry: "all",
    skill: "all",
  });

  const [cache, setCache] = useState<Record<string, Trainee[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(filters.searchTerm, 500);

  const fetchTrainees = useCallback(
    async (page: number) => {
      const cacheKey = JSON.stringify({
        page,
        ...filters,
        debouncedSearch,
      });

      try {
        if (cache[cacheKey]) {
          setTrainees(cache[cacheKey]);
          setLoading(false);
          return;
        }

        setLoading(true);
        const queryFilters = {
          page,
          limit: pagination.limit,
          ...(filters.status !== "all" && { status: filters.status }),
          ...(filters.university !== "all" && {
            university: filters.university,
          }),
          ...(filters.major !== "all" && { major: filters.major }),
          ...(filters.industry !== "all" && { industry: filters.industry }),
          ...(filters.skill !== "all" && { skills: filters.skill }),
        };

        const res =
          debouncedSearch.trim().length > 0
            ? await studentServices.searchStudents(debouncedSearch, queryFilters)
            : await studentServices.getStudents(queryFilters);

        const fetchedData = res.data?.data || [];
        const fetchedPagination = res.data?.pagination || {};

        setCache((prev) => ({ ...prev, [cacheKey]: fetchedData }));
        setTrainees(fetchedData);

        setPagination((prev) => ({
          ...prev,
          page: fetchedPagination.page ?? 1,
          limit: fetchedPagination.limit ?? prev.limit,
          total: fetchedPagination.total ?? fetchedData.length,
          totalPages:
            fetchedPagination.totalPages ??
            Math.ceil(
              (fetchedPagination.total ?? fetchedData.length) /
                (fetchedPagination.limit ?? prev.limit)
            ),
        }));

        setError(null);
      } catch (err) {
        console.error("Fetch trainees error:", err);
        setError("Oops! Something went wrong while loading the data.");
      } finally {
        setLoading(false);
      }
    },
    [filters, pagination.limit, debouncedSearch, cache]
  );

  useEffect(() => {
    fetchTrainees(pagination.page);
  }, [filters, pagination.page, fetchTrainees]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
    setCache({});
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      status: "all",
      university: "all",
      major: "all",
      industry: "all",
      skill: "all",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
    setCache({});
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return {
    trainees,
    pagination,
    filters,
    loading,
    error,
    updateFilter,
    resetFilters,
    handlePageChange,
  };
};
