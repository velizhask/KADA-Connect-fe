import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  title: string;
  items: string[];
  values: string[];
  onChange: (values: string[]) => void;
  initialVisibleCount?: number;
}

export function FilterCheckboxGroup({
  title,
  items,
  values,
  onChange,
  initialVisibleCount = 6,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const safeItems = items.filter(
    (item): item is string =>
      typeof item === "string" && item.trim() !== ""
  );

  const visibleItems = expanded
    ? safeItems
    : safeItems.slice(0, initialVisibleCount);

  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue={title}>
      <AccordionItem value={title} className="border-none">
        <AccordionTrigger className="py-2 text-sm font-semibold">
          {title}
        </AccordionTrigger>

        <AccordionContent className="pt-2 space-y-3">
          <div
            className={`space-y-2 pr-1 transition-all ${
              expanded
                ? "max-h-48 overflow-y-auto scrollbar-thin"
                : ""
            }`}
          >
            {visibleItems.map((item, index) => (
              <label
                key={`${title}-${item}-${index}`}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={values.includes(item)}
                  onCheckedChange={() => toggleValue(item)}
                />
                <span className="leading-snug">{item}</span>
              </label>
            ))}
          </div>

          {safeItems.length > initialVisibleCount && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="h-3 w-3" />
                </>
              )}
            </button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
