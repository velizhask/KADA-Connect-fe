import React from "react";
import { cn } from "@/lib/utils";

interface FilterSelectListProps {
  label: string;
  value: string;
  items: string[];
  onChange: (value: string) => void;
}

export const FilterSelectList: React.FC<FilterSelectListProps> = ({
  label,
  value,
  items,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-md border border-gray-300 bg-white px-3 py-2",
          "text-sm focus:outline-none focus:ring-2 focus:ring-primary",
          "cursor-pointer"
        )}
      >
        <option value="">All</option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
