import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { getStatusBadgeClass } from "@/utils/trainees/statusBadgeHelper";

interface Trainee {
  id: number;
  fullName: string;
  status: string;
  university: string;
  major: string;
  preferredIndustry?: string;
  techStack?: string;
  profilePhoto?: string;
}

interface TraineeCardProps {
  trainee: Trainee;
  onClick: () => void;
}

export const TraineeCard: React.FC<TraineeCardProps> = React.memo(
  ({ trainee, onClick }) => {
    const [isError, setIsError] = useState(false);
    const photoUrl = trainee.profilePhoto?.trim();

    useEffect(() => {
      setIsError(false);
    }, [trainee.id, trainee.profilePhoto]);

    return (
      <Card className="group flex flex-col justify-between border-0 hover:shadow-lg transition-all duration-300 rounded-xl bg-white shadow-sm h-full">
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4 gap-3 mb-4">
            <div className="relative w-24 h-24 aspect-square sm:w-16 sm:h-16 bg-gray-50 flex items-center justify-center rounded-2xl overflow-hidden">
              {photoUrl && !isError ? (
                <img
                  src={photoUrl}
                  alt={trainee.fullName}
                  onError={() => setIsError(true)}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
              ) : (
                <UserCircle className="w-10 h-10 text-gray-300" />
              )}
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-2 sm:mt-0">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {trainee.fullName}
              </h3>
              <Badge
                variant="outline"
                className={`text-xs ${getStatusBadgeClass(trainee.status)}`}
              >
                {trainee.status}
              </Badge>
            </div>
          </div>

          {/* Education Info */}
          <div className="mb-4 pb-3 border-b border-gray-100 text-left">
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
              {trainee.university}
            </p>
            <p className="text-xs text-gray-500 mt-1">{trainee.major}</p>
          </div>

          {/* Industry */}
          {trainee.preferredIndustry && (
            <div className="mb-3 text-left">
              <p className="text-xs font-medium text-gray-500 mb-1.5">
                Industry
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {trainee.preferredIndustry
                  .split(/\s*,\s*/)
                  .filter(Boolean)
                  .slice(0, 3)
                  .map((ind) => (
                    <Badge
                      key={ind}
                      variant="outline"
                      className="text-xs border-gray-200 text-gray-600 bg-gray-50"
                    >
                      {ind}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
          {trainee.techStack && (
            <div className="mb-3 text-left">
              <p className="text-xs font-medium text-gray-500 mb-1.5">
                Tech Skills
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {trainee.techStack
                  .split(/[,|]/)
                  .map((tech) => tech.trim())
                  .filter(Boolean)
                  .slice(0, 4) // limit ke 4 item
                  .map((tech, index) => {
                    const showShortened =
                      trainee.fullName?.toLowerCase() ===
                      "anggit fasyamtama".toLowerCase();

                    const shortenedTech = showShortened
                      ? tech.split(" ").slice(0, 2).join(" ")
                      : tech;
                    return (
                      <Badge
                        key={`${tech}-${index}`}
                        variant="secondary"
                        className="text-xs px-2 my-1 py-1 leading-snug rounded-2xl"
                        title={tech}
                      >
                        {shortenedTech}
                      </Badge>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="p-4 sm:p-5 pt-0 text-left">
          <Button
            variant="default"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-xs sm:text-sm font-medium cursor-pointer"
            onClick={onClick}
          >
            View Full Profile
          </Button>
        </div>
      </Card>
    );
  }
);
