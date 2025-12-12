import { useState } from "react";
import { Button } from "@/components/ui/button";

interface InlineSelectProps {
  value: string | null;
  options: string[];
  onSave: (newValue: string) => Promise<void> | void;
  placeholder?: string;
}

export default function InlineSelect({
  value,
  options,
  onSave,
  placeholder = "Select",
}: InlineSelectProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");

  const handleSave = async () => {
    await onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value ?? "");
    setEditing(false);
  };

  if (!editing) {
    return (
      <div
        className="cursor-pointer text-right hover:bg-gray-100 rounded px-2 py-1"
        onClick={() => setEditing(true)}
      >
        {value ? (
          <span className="text-gray-900">{value}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {/* SELECT */}
      <select
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {/* INLINE BUTTONS */}
      <Button size="sm" onClick={handleSave}>
        Save
      </Button>
      <Button size="sm" variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}
