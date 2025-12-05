import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useTrainees } from "@/hooks/useTrainees";
import { useLookupFilters } from "@/hooks/useLookupFilters";
import { TraineeCard } from "@/components/trainees/TraineeCard";
import { TraineeDetailsDialog } from "@/components/trainees/TraineeDetailsDialog";
import { FilterInput } from "@/components/common/filters/FilterInput";
import { FilterSelect } from "@/components/common/filters/FilterSelect";
import { Pagination } from "@/components/common/pagination/Pagination";

const TraineePage: React.FC = () => {
  const {
    trainees,
    pagination,
    filters,
    loading,
    error,
    updateFilter,
    resetFilters,
    handlePageChange,
  } = useTrainees(9);

  const { preferredIndustries, skills, universities, majors } = useLookupFilters();

  const [selectedTrainee, setSelectedTrainee] = useState<any | null>(null);

  useEffect(() => {
    document.title = "KADA Connect | Meet the Trainees";
  }, []);

  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-medium">
            KADA Trainees
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Discover talented professionals from the Korea-ASEAN Digital Academy
            program.
          </p>
        </div>

        {/* Filter Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="mb-4 sm:mb-6 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
              <Filter className="h-4 w-4 text-primary-600" />
              <span>Filter Trainees</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm h-8 sm:h-9 cursor-pointer"
              onClick={resetFilters}
            >
              Clear Filters
            </Button>
          </div>

          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FilterInput
              label="Search"
              value={filters.searchTerm}
              onChange={(val) => updateFilter("searchTerm", val)}
              placeholder="Type name or keyword..."
            />
            <FilterSelect
              label="Status"
              value={filters.status}
              onChange={(val) => updateFilter("status", val)}
              items={["Current Trainee", "Alumni"]}
            />
            <FilterSelect
              label="University"
              value={filters.university}
              onChange={(val) => updateFilter("university", val)}
              items={universities}
            />
            <FilterSelect
              label="Major"
              value={filters.major}
              onChange={(val) => updateFilter("major", val)}
              items={majors}
            />
            <FilterSelect
              label="Preferred Industry"
              value={filters.industry}
              onChange={(val) => updateFilter("industry", val)}
              items={preferredIndustries}
            />
            <FilterSelect
              label="Tech Skills"
              value={filters.skill}
              onChange={(val) => updateFilter("skill", val)}
              items={skills}
            />
          </div>
        </Card>

        {/* Results Section */}
        <div className="flex-1 transition-all duration-300">
          {!loading && !error && trainees.length > 0 && (
            <>
              <div className="mb-4 text-xs sm:text-sm text-muted-foreground px-1">
                <span className="hidden sm:inline">
                  Showing {(pagination.page - 1) * pagination.limit + 1}–
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} trainees — Page {pagination.page} of{" "}
                  {pagination.totalPages}
                </span>
              </div>

              <div
                className={`grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
              >
                {trainees.map((t) => (
                  <TraineeCard
                    key={t.id}
                    trainee={t}
                    onClick={() => setSelectedTrainee(t)}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="w-full mt-6 sm:mt-8 px-2 sm:px-0">
                <div className="w-full mt-6 sm:mt-8 px-2 sm:px-0">
                  <Pagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </>
          )}

          {!loading && !error && trainees.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">
              No trainees match your filters.
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center gap-4 my-8">
              <LoadingSpinner text="Loading trainee..." />
            </div>
          )}

          {error && (
            <div className="py-24 text-center text-red-500">{error}</div>
          )}
        </div>

        {/* Dialog */}
        <TraineeDetailsDialog
          trainee={selectedTrainee}
          onClose={() => setSelectedTrainee(null)}
        />
      </div>
    </MainLayout>
  );
};

export default TraineePage;
