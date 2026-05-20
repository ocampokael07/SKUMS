import type { SKUOption } from "@/types/sku";

export function normalizeOptionLabels(options: SKUOption[]) {
  const groupedLabels = new Map<string, Set<string>>();

  options.forEach((option) => {
    const key = `${option.makeId ?? ""}||${option.categoryId ?? ""}||${option.label}`;
    const values = groupedLabels.get(key) ?? new Set<string>();
    values.add(option.value);
    groupedLabels.set(key, values);
  });

  return options.map((option) => {
    const key = `${option.makeId ?? ""}||${option.categoryId ?? ""}||${option.label}`;
    const values = groupedLabels.get(key);

    if (values && values.size > 1) {
      return {
        ...option,
        label: `${option.label} - (${option.value})`,
      };
    }

    return option;
  });
}
