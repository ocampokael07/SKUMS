export interface SKUOption {
  id: string;
  label: string;
  value: string;
  categoryId?: string;
  makeId?: string;
  modelId?: string;
}

export interface SKUState {
  sku?: SKUOption;
  make?: SKUOption;
  model?: SKUOption;
  item?: SKUOption;
  additionalItem?: SKUOption[];
}
