import type { SKUState } from "../types/sku";

export const generateSKU = (state: SKUState) => {
  const additionalValue = Array.isArray(state.additionalItem)
    ? state.additionalItem.map((item) => item.value).join("")
    : "";

  return [
    state.sku?.value || "",
    state.make?.value || "",
    state.model?.value || "",
    state.item?.value || "",
    additionalValue,
  ].join("");
};
