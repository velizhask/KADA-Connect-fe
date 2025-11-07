import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { handleSafeLinkClick } from "@/utils/trainees/linkHelper";
import { ProfileImage } from "@/components/common/ProfileImage";
import { TechStackSection } from "@/components/trainees/TechStackSection";
import { getStatusBadgeClass } from "@/utils/trainees/statusBadgeHelper";

interface TraineeDetailsDialogProps {
  trainee: {
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
  } | null;
  onClose: () => void;
}

export const TraineeDetailsDialog: React.FC<TraineeDetailsDialogProps> = ({
  trainee,
  onClose,
}) => {
  if (!trainee) return null;

  return (
    <Dialog open={!!trainee} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] md:w-[700px] max-h-[85vh] overflow-y-auto rounded-2xl animate-in fade-in duration-300">
        {/* Header Section */}
        <DialogHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <ProfileImage
              imageUrl={trainee.profilePhoto || ""}
              alt={trainee.fullName || "Unknown Trainee"}
            />

            <div className="flex flex-col">
              <DialogTitle className="text-2xl font-medium">
                {trainee.fullName}
              </DialogTitle>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={`text-xs ${getStatusBadgeClass(trainee.status)}`}
                >
                  {trainee.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Body Content */}
        <div className="space-y-4 mt-1 text-left">
          {/* Introduction */}
          <div>
            <h4 className="font-medium mb-1">Introduction</h4>
            <p className="text-sm text-muted-foreground text-justify">
              {trainee.selfIntroduction || "No introduction available."}
            </p>
          </div>

          {/* University */}
          <div>
            <h4 className="font-medium mb-1">University</h4>
            <p className="text-sm text-muted-foreground">
              {trainee.university} — {trainee.major}
            </p>
          </div>

          {/* Preferred Industry */}
          <div>
            <h4 className="font-medium mb-1">Preferred Industry</h4>
            <div className="flex flex-wrap gap-2">
              {trainee.preferredIndustry ? (
                trainee.preferredIndustry
                  .split(/\s*,\s*/)
                  .filter(Boolean)
                  .map((ind) => (
                    <Badge key={ind} variant="outline">
                      {ind}
                    </Badge>
                  ))
              ) : (
                <Badge variant="outline">N/A</Badge>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <TechStackSection techStack={trainee.techStack} />

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="default"
              onClick={() =>
                handleSafeLinkClick(trainee.cvUpload ?? undefined, "CV")
              }
              className="cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4" /> View CV
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                handleSafeLinkClick(
                  trainee.portfolioLink ?? undefined,
                  "Portfolio"
                )
              }
              className="cursor-pointer"
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Portfolio
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                handleSafeLinkClick(trainee.linkedin ?? undefined, "LinkedIn")
              }
              className="cursor-pointer"
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
