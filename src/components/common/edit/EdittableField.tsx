import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  label?: string;
  value: string | number | null;
  fieldKey: string;
  type?: "text" | "textarea";
  onSave: (data: any) => Promise<void>;
}

export default function EditTableField({
  label,
  value,
  fieldKey,
  onSave,
  type = "text",
}: Props) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value ?? "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await onSave({ [fieldKey]: local });
      setEditing(false);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    setLocal(value ?? "");
    setEditing(false);
  };

  return (
    <div className="group">
      {label && (
        <label className="text-xs font-medium text-gray-600 mb-1 block">
          {label}
        </label>
      )}

      {!editing ? (
        <div className="flex items-center gap-2 hover:bg-gray-50 rounded px-2 py-1 -mx-2 transition-colors">
          <span className="text-sm text-gray-900 flex-1 min-w-0 break-words">
            {value || <span className="text-gray-400 italic">Empty</span>}
          </span>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded flex-shrink-0"
            onClick={() => setEditing(true)}
            type="button"
          >
            <Pencil className="h-3.5 w-3.5 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {type === "textarea" ? (
            <textarea
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              autoFocus
            />
          ) : (
            <input
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              autoFocus
            />
          )}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={save}
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Check className="h-3.5 w-3.5 mr-1" /> 
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={cancel}
              disabled={saving}
            >
              <X className="h-3.5 w-3.5 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}