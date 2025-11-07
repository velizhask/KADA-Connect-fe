import React, { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useCompanies } from "@/hooks/useCompany";
import { useLookupFilters } from "@/hooks/useLookupFilters";
import { CompanyCard } from "@/components/company/CompanyCard";
import { FilterInput } from "@/components/common/filters/FilterInput";
import { FilterSelect } from "@/components/common/filters/FilterSelect";
import { Pagination } from "@/components/common/pagination/Pagination";

const CompanyPage: React.FC = () => {
  const {
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
  } = useCompanies(9);

  const { industries, techRoles } = useLookupFilters();

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
              }}
            >
              Clear Filters
            </Button>
          </div>

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
              items={industries}
            />
            <FilterSelect
              label="Tech Role Interest"
              value={selectedTechRole}
              onChange={setSelectedTechRole}
              items={techRoles}
            />
          </div>
        </Card>

        {/* Results Section */}
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
              </div>

              <div
                className={`grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
              >
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>

              {/* Pagination */}
              <div className="w-full mt-6 sm:mt-8 px-2 sm:px-0">
                <Pagination
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
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

export default CompanyPage;
