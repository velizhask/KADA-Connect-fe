import { useState, useEffect, useCallback } from "react";
import { companyServices } from "@/services/companyServices";
import { useDebounce } from "@/hooks/useDebounce";

interface Company {
  id: number;
  companyName: string;
  companySummary: string;
  industry: string;
  website?: string;
  logo?: string;
  techRoles?: string;
  preferredSkillsets?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactInfoVisible?: boolean;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useCompanies = (limit = 9) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit,
    total: 0,
    totalPages: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedTechRole, setSelectedTechRole] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simple in-memory cache
  const [cache, setCache] = useState<Record<string, Company[]>>({});

  const fetchCompanies = useCallback(
    async (page: number) => {
      const cacheKey = JSON.stringify({
        page,
        selectedIndustry,
        selectedTechRole,
        debouncedSearch,
      });

      try {
        // Return cached result if available
        if (cache[cacheKey]) {
          setCompanies(cache[cacheKey]);
          setLoading(false);
          return;
        }

        setLoading(true);
        const filters = {
          page,
          limit,
          ...(selectedIndustry !== "all" && { industry: selectedIndustry }),
          ...(selectedTechRole !== "all" && { techRole: selectedTechRole }),
        };

        const res =
          debouncedSearch.trim().length > 0
            ? await companyServices.searchCompanies(debouncedSearch, filters)
            : await companyServices.getCompanies(filters);

        const fetchedData = res.data?.data || [];
        const fetchedPagination = res.data?.pagination || {};

        setCache((prev) => ({ ...prev, [cacheKey]: fetchedData }));
        setCompanies(fetchedData);

        setPagination((prev) => ({
          ...prev,
          page: fetchedPagination.page ?? 1,
          total: fetchedPagination.total ?? fetchedData.length,
          totalPages:
            fetchedPagination.totalPages ??
            Math.ceil(
              (fetchedPagination.total ?? fetchedData.length) / prev.limit
            ),
        }));
        setError(null);
      } catch (err) {
        console.error("Fetch companies error:", err);
        setError("Oops! Something went wrong while loading the page.");
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, selectedIndustry, selectedTechRole, cache, limit]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Fetch data when dependencies change
  useEffect(() => {
    fetchCompanies(pagination.page);
  }, [debouncedSearch, selectedIndustry, selectedTechRole, pagination.page]);

  // Reset pagination & cache when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setCache({});
  }, [searchTerm, selectedIndustry, selectedTechRole]);

  return {
    companies,
    pagination,
    loading,
    error,
    searchTerm,
    selectedIndustry,
    selectedTechRole,
    setSearchTerm,
    setSelectedIndustry,
    setSelectedTechRole,
    handlePageChange,
  };
};
