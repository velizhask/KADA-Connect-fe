import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCircle, ExternalLink } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getStatusBadgeClass } from "@/utils/trainees/statusBadgeHelper";
import { useNavigate } from "react-router-dom";

interface Trainee {
  id: string;
  fullName: string;
  status: string;

  // student fields
  employmentStatus?: string;
  batch?: string;

  // company fields
  university?: string;
  major?: string;
  preferredIndustry?: string;
  techStack?: string;
  cvUpload?: string;

  // shared
  profilePhoto?: string;
  portfolioLink?: string;
}

interface Props {
  trainee: Trainee;
}

export const TraineeCard: React.FC<Props> = ({ trainee }) => {
  const [isError, setIsError] = useState(false);
  const photoUrl = trainee.profilePhoto?.trim();
  const navigate = useNavigate();

  const role = useAuthStore((s) => s.role);
  const isStudent = role === "student";
  const canDownloadCV = role !== "student";

  useEffect(() => {
    setIsError(false);
  }, [trainee.id, trainee.profilePhoto]);

  const parseList = (value?: string, limit = 2) => {
    if (!value) return { show: [], more: 0 };

    const arr = value
      .split(/[,|]/)
      .map((v) => v.trim())
      .filter(Boolean);

    return {
      show: arr.slice(0, limit),
      more: Math.max(arr.length - limit, 0),
    };
  };

  const tech = parseList(trainee.techStack, 2);
  const industry = parseList(trainee.preferredIndustry, 2);

  return (
    <Card
      role={!isStudent ? "button" : undefined}
      tabIndex={!isStudent ? 0 : -1}
      onClick={() => {
        if (!isStudent) navigate(`/trainees/${trainee.id}`);
      }}
      onKeyDown={(e) => {
        if (!isStudent && e.key === "Enter") {
          navigate(`/trainees/${trainee.id}`);
        }
      }}
      className={`
        rounded-2xl border gap-2 border-gray-100 bg-white p-5 transition shadow-none
        ${
          !isStudent
            ? "cursor-pointer hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            : "cursor-default"
        }
      `}
    >
      {/* ================= TOP ================= */}
      <div className="flex items-start justify-between gap-6">
        {/* LEFT */}
        <div className="flex gap-4">
          <div className="h-20 w-20 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
            {photoUrl && !isError ? (
              <img
                src={photoUrl}
                alt={trainee.fullName}
                onError={() => setIsError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircle className="w-7 h-7 text-gray-300" />
            )}
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {trainee.fullName}
            </h3>

            {/* ===== BADGES (1 ROW) ===== */}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {/* STATUS */}
              <Badge
                variant="outline"
                className={`text-xs ${getStatusBadgeClass(trainee.status)}`}
              >
                {trainee.status}
              </Badge>

              <Badge variant="secondary" className="text-xs font-medium">
                {trainee.employmentStatus}
              </Badge>

              <Badge variant="outline" className="text-xs font-medium">
                {trainee.batch}
              </Badge>
            </div>

            {/* SUBTITLE */}
            {isStudent ? (
              <></>
            ) : (
              <p className="mt-1 text-sm text-gray-600">
                {trainee.university || "-"}
                {trainee.major && ` · ${trainee.major}`}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          {!isStudent && canDownloadCV && trainee.cvUpload && (
            <Button
              size="sm"
              className="h-8 px-4"
              onClick={(e) => e.stopPropagation()}
              asChild
            >
              <a
                href={trainee.cvUpload}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </Button>
          )}

          {trainee.portfolioLink && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-4 flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
              asChild
            >
              <a
                href={trainee.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* ================= BOTTOM (COMPANY ONLY) ================= */}
      {!isStudent && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tech.show.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Tech Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {tech.show.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="text-xs px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </Badge>
                ))}
                {tech.more > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    +{tech.more} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {industry.show.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                Preferred Industry
              </p>
              <div className="flex flex-wrap gap-2">
                {industry.show.map((i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-xs px-2 py-0.5 rounded-full"
                  >
                    {i}
                  </Badge>
                ))}
                {industry.more > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    +{industry.more} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default TraineeCard;
