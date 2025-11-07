import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const TechStackSection = ({ techStack }: { techStack?: string }) => {
  const [showAll, setShowAll] = useState(false);

  if (!techStack || typeof techStack !== "string") return null; // Early return if no valid data

  const allSkills = techStack
    .split(/[,|]/)   // Split by comma or pipe
    .map((s) => s.trim())
    .filter(Boolean);

  if (allSkills.length === 0) return null;

  const displayed = showAll ? allSkills : allSkills.slice(0, 5);

  return (
    <div>
      <h4 className="font-medium mb-1">Tech Stack</h4>
      <div className="flex flex-wrap gap-2 mb-2">
        {displayed.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>
      {allSkills.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-medium text-primary hover:underline cursor-pointer"
        >
          {showAll ? "Hide" : `Show all (${allSkills.length})`}
        </button>
      )}
    </div>
  );
};
