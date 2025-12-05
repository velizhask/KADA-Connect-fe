import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  label?: string;
  value: string | number | null;
  fieldKey: string; // contoh: "fullName", "linkedin"
  type?: "text" | "textarea";
  onSave: (data: any) => Promise<void>;
}

export default function EditableField({
  label,
  value,
  fieldKey,
  onSave,
  type = "text",
}: Props) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value ?? "");

  const save = async () => {
    await onSave({ [fieldKey]: local });
    setEditing(false);
  };

  return (
    <div className="mb-4">
      {label && <label className="font-medium text-sm">{label}</label>}

      {!editing ? (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
          <span className="text-gray-700">{value || "-"}</span>

          <button
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => setEditing(true)}
          >
            <Pencil className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {type === "textarea" ? (
            <textarea
              className="w-full p-3 border rounded-lg"
              rows={4}
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          ) : (
            <input
              className="w-full p-3 border rounded-lg"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          )}

          <div className="flex gap-2">
            <Button size="sm" onClick={save}>
              <Check className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(false)}
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
