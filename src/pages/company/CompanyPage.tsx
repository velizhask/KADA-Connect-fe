import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useCompanies } from "@/hooks/useCompany";
import { useLookupFilters } from "@/hooks/useLookupFilters";
import { FilterCheckboxGroup } from "@/components/common/filters/FilterCheckboxGroup";
import { ActiveFilters } from "@/components/common/filters/ActiveFilter";
import CompanyCard from "@/components/company/CompanyCard";
import { Pagination } from "@/components/common/pagination/Pagination";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { Filter, X } from "lucide-react";

function FilterContent({
  filters,
  updateArrayFilter,
  industries,
  techRoles,
}: any) {
  return (
    <div className="space-y-6 pb-6">
      <FilterCheckboxGroup
        title="Industry"
        items={industries}
        values={filters.industries}
        onChange={(v) => updateArrayFilter("industries", v)}
        initialVisibleCount={5}
      />

      <FilterCheckboxGroup
        title="Tech Role Interest"
        items={techRoles}
        values={filters.techRoles}
        onChange={(v) => updateArrayFilter("techRoles", v)}
        initialVisibleCount={6}
      />
    </div>
  );
}

const CompanyPage: React.FC = () => {
  const {
    companies,
    filters,
    loading,
    error,
    pagination,
    updateArrayFilter,
    resetFilters,
    setPage,
    search,
    setSearch,
  } = useCompanies(5);

  const { industries, techRoles } = useLookupFilters();

  const [showDesktopFilter, setShowDesktopFilter] = useState(true);

  useEffect(() => {
    document.title = "KADA Connect | Browse Companies";
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ================= HEADER ================= */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-1">Visiting Companies</h1>
          <p className="text-muted-foreground">
            Explore companies participating in the Industry Visit event.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div
          className={`grid gap-6 ${
            showDesktopFilter
              ? "grid-cols-1 xl:grid-cols-[280px_1fr]"
              : "grid-cols-1"
          }`}
        >
          {/* ================= DESKTOP FILTER  ================= */}
          {showDesktopFilter && (
            <Card className="p-4 h-fit hidden xl:block sticky top-24">
              <div className="flex items-center gap-2 text-sm font-medium mb-4">
                <Filter className="h-4 w-4" />
                Filters
              </div>

              <FilterContent
                filters={filters}
                updateArrayFilter={updateArrayFilter}
                industries={industries}
                techRoles={techRoles}
              />
            </Card>
          )}

          {/* ================= CONTENT ================= */}
          <div>
            {/* TOOLBAR */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              {/* Filter button - toggle sidebar di desktop, buka sheet di mobile */}
              <Button
                variant="outline"
                size="sm"
                className="gap-2 w-fit hidden xl:flex cursor-pointer"
                onClick={() => setShowDesktopFilter((v) => !v)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              {/* Filter button mobile - buka sheet */}
              <Sheet modal={false}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 sm:w-fit w-full xl:hidden cursor-pointer"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-[400px] sm:max-w-[400px] h-screen flex flex-col p-0"
                >
                  <SheetHeader className="sticky top-0 bg-background z-10 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center gap-2 text-base font-semibold">
                        <Filter className="h-5 w-5" />
                        Filters
                      </SheetTitle>

                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5" />
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetHeader>

                  {/* FILTER CONTENT */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <FilterContent
                      filters={filters}
                      updateArrayFilter={updateArrayFilter}
                      industries={industries}
                      techRoles={techRoles}
                    />
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="sticky bottom-0 bg-background border-t px-6 py-4 flex gap-3">
                    {/* RESET */}
                    <Button
                      variant="outline"
                      className="w-fit"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>

                    {/* APPLY */}
                    <SheetClose asChild>
                      <Button className="w-fit">Apply Filters</Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              {/* search */}
              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* ACTIVE FILTERS */}
            <ActiveFilters
              filters={{
                status: [], // belum dipakai
                universities: [], // belum dipakai
                majors: [], // belum dipakai
                industries: filters.industries,
                skills: filters.techRoles, // mapping techRoles → skills
              }}
              onRemove={(key, value) => {
                if (key === "industries") {
                  updateArrayFilter(
                    "industries",
                    filters.industries.filter((v: string) => v !== value)
                  );
                }

                if (key === "skills") {
                  updateArrayFilter(
                    "techRoles",
                    filters.techRoles.filter((v: string) => v !== value)
                  );
                }
              }}
              onReset={resetFilters}
            />

            {/* CONTENT STATES */}
            {loading && (
              <div className="flex justify-center my-16">
                <LoadingSpinner text="Loading companies..." />
              </div>
            )}

            {!loading && !error && companies.length > 0 && (
              <div className="grid gap-6 grid-cols-1">
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}

            {!loading && !error && companies.length === 0 && (
              <div className="py-24 text-center text-muted-foreground">
                No companies match your filters.
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-16">{error}</div>
            )}

            {/* PAGINATION */}
            <div className="mt-8">
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompanyPage;
