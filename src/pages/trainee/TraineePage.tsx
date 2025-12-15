import MainLayout from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useTrainees } from "@/hooks/useTrainees";
import { useLookupFilters } from "@/hooks/useLookupFilters";

import { FilterCheckboxGroup } from "@/components/common/filters/FilterCheckboxGroup";
import { ActiveFilters } from "@/components/common/filters/ActiveFilter";
import { TraineeCard } from "@/components/trainees/TraineeCard";
import { TraineeDetailsDialog } from "@/components/trainees/TraineeDetailsDialog";
import { Pagination } from "@/components/common/pagination/Pagination";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { Filter } from "lucide-react";
import { useState } from "react";

function FilterContent({
  filters,
  updateArrayFilter,
  skills,
  preferredIndustries,
  universities,
  majors,
}: any) {
  return (
    <div className="space-y-6">
      <FilterCheckboxGroup
        title="Status"
        items={["Current Trainee", "Alumni"]}
        values={filters.status}
        onChange={(v) => updateArrayFilter("status", v)}
      />

      <FilterCheckboxGroup
        title="University"
        items={universities}
        values={filters.universities}
        onChange={(v) => updateArrayFilter("universities", v)}
        initialVisibleCount={5}
      />

      <FilterCheckboxGroup
        title="Major"
        items={majors}
        values={filters.majors}
        onChange={(v) => updateArrayFilter("majors", v)}
        initialVisibleCount={5}
      />

      <FilterCheckboxGroup
        title="Tech Stack"
        items={skills}
        values={filters.skills}
        onChange={(v) => updateArrayFilter("skills", v)}
        initialVisibleCount={6}
      />

      <FilterCheckboxGroup
        title="Preferred Industry"
        items={preferredIndustries}
        values={filters.industries}
        onChange={(v) => updateArrayFilter("industries", v)}
        initialVisibleCount={4}
      />
    </div>
  );
}

export default function TraineePage() {
  const {
    trainees,
    filters,
    loading,
    error,
    pagination,
    updateArrayFilter,
    resetFilters,
    setPage,
    search,
    setSearch,
  } = useTrainees(10);

  const { skills, preferredIndustries, universities, majors } =
    useLookupFilters();

  const [selected, setSelected] = useState<any>(null);
  const [showDesktopFilter, setShowDesktopFilter] = useState(true);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-1">KADA Trainees</h1>
          <p className="text-muted-foreground">
            Discover talented professionals from the Korea-ASEAN Digital Academy
            program.
          </p>
        </div>

        {/* MOBILE FILTER */}
        <div className="flex justify-end mb-4 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px] sm:w-[360px]">
              <SheetHeader className="mb-4">
                <SheetTitle className="flex items-center gap-2 text-sm">
                  <Filter className="h-4 w-4" />
                  Filters
                </SheetTitle>
              </SheetHeader>

              <FilterContent
                filters={filters}
                updateArrayFilter={updateArrayFilter}
                skills={skills}
                preferredIndustries={preferredIndustries}
                universities={universities}
                majors={majors}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* GRID */}
        <div
          className={`grid gap-6 ${
            showDesktopFilter
              ? "grid-cols-1 lg:grid-cols-[260px_1fr]"
              : "grid-cols-1"
          }`}
        >
          {/* DESKTOP FILTER */}
          {showDesktopFilter && (
            <Card className="p-4 h-fit hidden lg:block">
              <div className="flex items-center gap-2 text-sm font-medium mb-4">
                <Filter className="h-4 w-4" />
                Filters
              </div>

              <FilterContent
                filters={filters}
                updateArrayFilter={updateArrayFilter}
                skills={skills}
                preferredIndustries={preferredIndustries}
                universities={universities}
                majors={majors}
              />
            </Card>
          )}

          {/* CONTENT */}
          <div>
            {/* TOOLBAR */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 mb-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hidden lg:flex p-4.5"
                onClick={() => setShowDesktopFilter((v) => !v)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <input
                type="text"
                placeholder="Search trainees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-[280px] rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <ActiveFilters
              filters={{
                status: filters.status,
                universities: filters.universities,
                majors: filters.majors,
                industries: filters.industries,
                skills: filters.skills,
              }}
              onRemove={(key, value) =>
                updateArrayFilter(
                  key,
                  filters[key].filter((v: string) => v !== value)
                )
              }
              onReset={resetFilters}
            />

            {loading && (
              <div className="flex justify-center my-16">
                <LoadingSpinner text="Loading trainees..." />
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-4">
                {trainees.map((t) => (
                  <TraineeCard key={t.id} trainee={t} />
                ))}
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 py-16">{error}</div>
            )}

            <div className="mt-8">
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>

        <TraineeDetailsDialog
          trainee={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </MainLayout>
  );
}
