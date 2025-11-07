import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectProps {
  label: string;
  value: string;
  items: string[];
  onChange: (value: string) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = React.memo(
  ({ label, value, items, onChange }) => (
    <div>
      <label className="mb-2 block text-xs sm:text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`All ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All {label}</SelectItem>
          {items.map((item, i) => (
            <SelectItem key={i} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
);
