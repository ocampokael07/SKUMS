import { create } from "zustand";

import type { SKUOption } from "@/types/sku";

interface StoreState {
  sku?: SKUOption;
  make?: SKUOption;
  model?: SKUOption;
  item?: SKUOption;
  additionalItem: SKUOption[];

  setSku: (value: SKUOption) => void;
  setMake: (value: SKUOption) => void;
  setModel: (value: SKUOption) => void;
  setItem: (value: SKUOption) => void;
  setAdditionalItem: (value: SKUOption[]) => void;

  reset: () => void;
}

export const useSkuStore = create<StoreState>((set) => ({
  sku: undefined,
  make: undefined,
  model: undefined,
  item: undefined,
  additionalItem: [],

  setSku: (value) =>
    set({
      sku: value,
      make: undefined,
      model: undefined,
      item: undefined,
      additionalItem: [],
    }),

  setMake: (value) =>
    set({
      make: value,
      model: undefined,
    }),

  setModel: (value) =>
    set({
      model: value,
    }),

  setItem: (value) =>
    set({
      item: value,
    }),

  setAdditionalItem: (value) =>
    set({
      additionalItem: value,
    }),

  reset: () =>
    set({
      sku: undefined,
      make: undefined,
      model: undefined,
      item: undefined,
      additionalItem: [],
    }),
}));
