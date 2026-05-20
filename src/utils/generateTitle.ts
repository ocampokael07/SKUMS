import type { SKUState } from "@/types/sku";

export const generateTitle = (state: SKUState) => {
  const additionalLabel = Array.isArray(state.additionalItem)
    ? state.additionalItem.map((item) => item.label).join(" + ")
    : "";

  return [
    state.make?.label,
    state.model?.label,
    state.item?.label,
    additionalLabel,
  ]
    .filter(Boolean)
    .join(" ");
};
