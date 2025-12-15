type FilterKey =
  | "status"
  | "universities"
  | "majors"
  | "industries"
  | "skills";

interface Props {
  filters: Record<FilterKey, string[]>;
  onRemove: (key: FilterKey, value: string) => void;
  onReset: () => void;
}

export const ActiveFilters = ({ filters, onRemove, onReset }: Props) => {
  const chips = (Object.keys(filters) as FilterKey[]).flatMap((key) =>
    filters[key].map((value) => ({ key, value }))
  );

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map(({ key, value }) => (
        <span
          key={`${key}-${value}`}
          className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
        >
          {value}
          <button
            onClick={() => onRemove(key, value)}
            className="hover:opacity-70"
          >
            ✕
          </button>
        </span>
      ))}

      <button
        onClick={onReset}
        className="ml-2 text-xs text-primary hover:underline"
      >
        Reset
      </button>
    </div>
  );
};
