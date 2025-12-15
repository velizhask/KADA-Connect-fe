import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

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

  /* ================= VIEW MODE ================= */
  if (!editing) {
    return (
      <div
        onClick={() => setEditing(true)}
        className="
          flex items-center justify-end gap-2
          cursor-pointer rounded-md px-2 py-1
          hover:bg-gray-100 transition
        "
      >
        {/* VALUE */}
        <span
          className={`${
            value ? "text-gray-900" : "text-gray-400"
          } text-right`}
        >
          {value || placeholder}
        </span>

        {/* PENCIL ICON (ALWAYS VISIBLE) */}
        <Pencil className="w-4 h-4 text-gray-400 shrink-0" />
      </div>
    );
  }

  /* ================= EDIT MODE ================= */
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

      {/* ACTION BUTTONS */}
      <Button size="sm" onClick={handleSave}>
        Save
      </Button>
      <Button size="sm" variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}
