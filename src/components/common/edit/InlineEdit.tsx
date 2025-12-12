import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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

  const startEdit = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleSave = async () => {
    await onSave(draft.trim());
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(String(value ?? ""));
    setEditing(false);
  };

  // 🔥 Auto-save with ENTER, cancel with ESC (only for single line input)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSave();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    }
  };

  if (!editing) {
    return (
      <div
        className="cursor-pointer hover:bg-gray-100 p-1 rounded transition"
        onClick={startEdit}
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

      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
