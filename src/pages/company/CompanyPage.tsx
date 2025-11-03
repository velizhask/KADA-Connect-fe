import React, { useEffect, useState, useMemo, useCallback } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Filter,
  Building2,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { lookupServices } from "@/services/lookupServices";
import { companyServices } from "@/services/companyServices";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
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

const CompanyPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [techRoles, setTechRoles] = useState<string[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedTechRole, setSelectedTechRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const industryOptions = useMemo(() => [...industries].sort(), [industries]);
  const techRoleOptions = useMemo(() => [...techRoles].sort(), [techRoles]);

  const [cache, setCache] = useState<Record<string, Company[]>>({});

  // Fetch Lookup Data
  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const [indRes, roleRes] = await Promise.all([
          lookupServices.getIndustries(),
          lookupServices.getTechRoles(),
        ]);
        setIndustries(indRes.data?.data || []);
        setTechRoles(roleRes.data?.data || []);
      } catch (err) {
        console.error("Lookup fetch error:", err);
      }
    };
    fetchLookups();
  }, []);

useEffect(() => {
  fetchCompanies(pagination.page);
}, [debouncedSearch, selectedIndustry, selectedTechRole, pagination.page]);

  const fetchCompanies = async (page: number) => {
    const cacheKey = JSON.stringify({
      page,
      selectedIndustry,
      selectedTechRole,
      debouncedSearch,
    });

    try {
      if (cache[cacheKey]) {
        setCompanies(cache[cacheKey]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const filters = {
        page,
        limit: pagination.limit,
        ...(selectedIndustry !== "all" && { industry: selectedIndustry }),
        ...(selectedTechRole !== "all" && { techRole: selectedTechRole }),
      };

      const res =
        debouncedSearch.trim().length > 0
          ? await companyServices.searchCompanies(debouncedSearch, filters)
          : await companyServices.getCompanies(filters);

      const fetchedData = res.data?.data || [];
      const fetchedPagination = res.data?.pagination || {};

      // Cache the result
      setCache((prev) => ({ ...prev, [cacheKey]: fetchedData }));

      setCompanies(fetchedData);
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
      console.error("Fetch companies error:", err);
      setError("Oops! Something went wrong while loading the page.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        setPagination((prev) => ({ ...prev, page: newPage }));
      }
    },
    [pagination.totalPages]
  );

  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    setCache({});
  }, [searchTerm, selectedIndustry, selectedTechRole]);

  const getPageNumbers = () => {
    const current = pagination.page;
    const total = pagination.totalPages;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    return Array.from({ length: total }, (_, i) => i + 1).filter((pageNum) => {
      if (isMobile) {
        return pageNum === 1 || pageNum === total || pageNum === current;
      }
      return (
        pageNum === 1 ||
        pageNum === total ||
        (pageNum >= current - 1 && pageNum <= current + 1)
      );
    });
  };
   useEffect(() => {
    document.title = "KADA Connect | Browse Companies";
  }, []);

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-medium">
            Visiting Companies
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Explore companies participating in the Industry Visit event.
          </p>
        </div>

        {/* Filter Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 shadow-sm border border-gray-100 rounded-2xl">
          <div className="mb-4 sm:mb-6 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
              <Filter className="h-4 w-4 text-primary-600" />
              <span>Filter Companies</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm h-8 sm:h-9 cursor-pointer"
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("all");
                setSelectedTechRole("all");
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              Clear Filters
            </Button>
          </div>

          {/* Inputs */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FilterInput
              label="Search"
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Type company name or keyword..."
            />
            <FilterSelect
              label="Industry"
              value={selectedIndustry}
              onChange={setSelectedIndustry}
              items={industryOptions}
            />
            <FilterSelect
              label="Tech Role Interest"
              value={selectedTechRole}
              onChange={setSelectedTechRole}
              items={techRoleOptions}
            />
          </div>
        </Card>

        {/* Results */}
        <div className="flex-1 transition-all duration-300">
          {!loading && !error && companies.length > 0 && (
            <>
              <div className="mb-4 text-xs sm:text-sm text-muted-foreground px-1">
                <span className="hidden sm:inline">
                  Showing {(pagination.page - 1) * pagination.limit + 1}–
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} companies — Page {pagination.page} of{" "}
                  {pagination.totalPages}
                </span>
                <span className="sm:hidden">
                  Page {pagination.page} of {pagination.totalPages} (
                  {pagination.total} total)
                </span>
              </div>

              <div
                className={`transition-opacity duration-500 ${
                  loading ? "opacity-40" : "opacity-100"
                } grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
              >
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>

              {/* Pagination */}
              <div className="w-full mt-6 sm:mt-8 px-2 sm:px-0">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    disabled={pagination.page <= 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    className="flex items-center justify-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-4 cursor-pointer text-xs sm:text-sm"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline sm:inline">Prev</span>
                  </Button>

                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    {getPageNumbers().map((pageNum, index, array) => {
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && pageNum - prevPage > 1;
                      return (
                        <div key={pageNum} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="text-gray-400 text-xs sm:text-sm">
                              •••
                            </span>
                          )}
                          <button
                            onClick={() => handlePageChange(pageNum)}
                            className={`cursor-pointer w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                              pagination.page === pageNum
                                ? "bg-primary text-white shadow-sm cursor-pointer"
                                : "bg-white border border-gray-200 cursor-pointer text-gray-700 hover:border-primary-300 hover:bg-primary-50 active:scale-95"
                            }`}
                          >
                            {pageNum}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    className="flex items-center justify-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-4 cursor-pointer text-xs sm:text-sm"
                  >
                    <span className="hidden xs:inline sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {!loading && !error && companies.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">
              No companies match your filters.
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center gap-4 my-8">
              <LoadingSpinner text="Loading companies..." />
              <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="h-60 sm:h-72 bg-gray-100 animate-pulse rounded-xl"
                  />
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="py-24 text-center text-red-500">{error}</div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// Reusable Filter Components (Same as TraineePage)
export const FilterInput = React.memo(
  ({ label, value, onChange, placeholder }: any) => (
    <div>
      <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
      />
    </div>
  )
);

export const FilterSelect = React.memo(
  ({ label, value, onChange, items }: any) => (
    <div>
      <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder={`All ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {label}</SelectItem>
          {items.map((item: string, i: number) => (
            <SelectItem key={i} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
);

const CompanyCard = React.memo(({ company }: { company: Company }) => {
  const [isError, setIsError] = useState(false);

  const handleWebsiteClick = useCallback((url?: string) => {
    if (!url || !url.trim() || url === "-" || url.toLowerCase() === "n/a") {
      toast.warning("This company doesn't have a valid website link.");
      return;
    }
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) finalUrl = `https://${finalUrl}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <Card className="group flex flex-col justify-between border-0 hover:shadow-lg transition-all duration-300 rounded-xl bg-white shadow-sm h-full">
      <div className="p-4 sm:p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left sm:gap-4 gap-3 mb-3 sm:mb-4">
          {company.logo && !isError ? (
            <img
              src={company.logo}
              alt={company.companyName}
              onError={() => setIsError(true)}
              loading="lazy"
              className="w-24 h-24 sm:w-16 sm:h-16 rounded-xl object-cover bg-gray-100 transition-all duration-500 ease-out group-hover:scale-105 opacity-0"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            />
          ) : (
            <div className="w-20 h-20 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-50 rounded-xl">
              <Building2 className="w-10 h-10 text-gray-300" />
            </div>
          )}

          <div className="flex-1 mt-3 sm:mt-0">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {company.companyName}
            </h3>
            {company.industry && (
              <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-1.5">
                {company.industry
                  .split(",")
                  .map((ind) => ind.trim())
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((ind) => (
                    <Badge
                      key={ind}
                      variant="outline"
                      className="text-xs border-primary-200 text-primary-700 bg-primary-50"
                    >
                      {ind}
                    </Badge>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {company.companySummary && (
          <div className="mb-3 sm:mb-4 pb-3 border-b border-gray-100">
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              {company.companySummary}
            </p>
          </div>
        )}

        {/* Tech Roles */}
        {company.techRoles && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-500 mb-1.5">
              Interested Tech Roles
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {company.techRoles
                .split(",")
                .map((r) => r.trim())
                .filter(Boolean)
                .slice(0, 4)
                .map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {company.preferredSkillsets && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-500 mb-1.5">
              Preferred Skills
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {company.preferredSkillsets
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
                .slice(0, 5)
                .map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs border-gray-200 text-gray-600 bg-gray-50"
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        {company.contactInfoVisible && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-sm text-gray-700 mb-5">
            <p className="text-xs font-medium text-gray-500">
              Contact Information
            </p>

            {company.contactPerson && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-800">
                  {company.contactPerson}
                </span>
              </div>
            )}

            {company.contactEmail && (
              <p
                className="flex items-center gap-2 text-primary hover:underline cursor-pointer break-all"
                onClick={() =>
                  window.open(`mailto:${company.contactEmail}`, "_blank")
                }
              >
                <Mail className="w-4 h-4 text-primary" />
                {company.contactEmail}
              </p>
            )}

            {company.contactPhone && (
              <p
                className="flex items-center gap-2 text-primary hover:underline cursor-pointer"
                onClick={() => {
                  let phone = company.contactPhone?.trim() ?? "";
                  if (!phone) return;
                  phone = phone.replace(/[^0-9+]/g, "");
                  if (!phone.startsWith("+")) {
                    if (phone.startsWith("0")) phone = "+62" + phone.slice(1);
                    else if (phone.startsWith("62")) phone = "+" + phone;
                    else phone = "+62" + phone;
                  }
                  const waNumber = phone.replace("+", "");
                  window.open(
                    `https://wa.me/${waNumber}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <Phone className="w-4 h-4 text-primary" />
                {company.contactPhone}
              </p>
            )}
          </div>
        )}

        {/* Footer Button */}
        <Button
          variant="default"
          onClick={() => handleWebsiteClick(company.website)}
          className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white h-9 text-xs sm:text-sm font-medium cursor-pointer"
        >
          Visit Website
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
});

export default CompanyPage;
