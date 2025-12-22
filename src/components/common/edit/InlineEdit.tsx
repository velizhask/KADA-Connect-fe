import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

interface InlineEditProps {
  value: string | number | null;
  onSave: (newValue: string) => Promise<void> | void;
  placeholder?: string;
  multiline?: boolean;
}

export default function InlineEdit({
  value,
  onSave,
  placeholder = "",
  multiline = false,
}: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value ?? ""));
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [saving, setSaving] = useState(false);
  const startEdit = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(draft.trim());
      setEditing(false);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(String(value ?? ""));
    setEditing(false);
  };

  const initialValue = String(value ?? "").trim();
  const isDirty = draft.trim() !== initialValue;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }

    if (multiline && e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  if (!editing) {
    return (
      <div
        onClick={startEdit}
        className="
          flex items-center justify-between
          cursor-pointer rounded-md p-1
          hover:bg-gray-100 transition
        "
      >
        {/* VALUE */}
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>

        {/* PENCIL ICON (ALWAYS VISIBLE) */}
        <Pencil className="w-4 h-4 text-gray-400 ml-2 shrink-0" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {multiline ? (
        <Textarea
          ref={inputRef as any}
          className="w-full"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Input
          ref={inputRef as any}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>

        <Button
          size="sm"
          onClick={handleSave}
          disabled={saving || !isDirty}
          className="bg-primary text-white hover:bg-primary/90"
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
