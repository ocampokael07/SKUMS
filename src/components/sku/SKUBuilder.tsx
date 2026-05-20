import prefixes from "@/data/prefixes.json";
import makes from "@/data/makes.json";
import models from "@/data/models.json";
import items from "@/data/items.json";
import additionalItems from "@/data/additional-items.json";

import SearchableSelect from "@/components/forms/SearchableSelect";
import SKUPreview from "@/components/preview/SKUPreview";

import { useSkuStore } from "@/hooks/useSkuStore";

import { generateSKU } from "@/utils/generateSKU";
import { generateTitle } from "@/utils/generateTitle";
import { normalizeOptionLabels } from "@/utils/normalizeOptionLabels";

export default function SKUBuilder() {
  const {
    sku,
    make,
    model,
    item,
    additionalItem,

    setSku,
    setMake,
    setModel,
    setItem,
    setAdditionalItem,

    reset,
  } = useSkuStore();

  const filteredModels = models.filter(
    (modelItem) =>
      modelItem.makeId === make?.id &&
      (!sku || modelItem.categoryId === sku.categoryId),
  );

  const filteredMakes = sku
    ? makes.filter((makeOption) => makeOption.categoryId === sku.categoryId)
    : makes;

  const filteredItems = sku
    ? items.filter((itemOption) => itemOption.categoryId === sku.categoryId)
    : items;

  // Additional item options should also follow SKU category filtering.
  const filteredAdditionalItems = sku
    ? additionalItems.filter((option) => option.categoryId === sku.categoryId)
    : additionalItems;

  const normalizedPrefixes = normalizeOptionLabels(prefixes);
  const normalizedMakes = normalizeOptionLabels(filteredMakes);
  const normalizedModels = normalizeOptionLabels(filteredModels);
  const normalizedItems = normalizeOptionLabels(filteredItems);
  const normalizedAdditionalItems = normalizeOptionLabels(
    filteredAdditionalItems,
  );

  const skuCode = generateSKU({
    sku,
    make,
    model,
    item,
    additionalItem,
  });

  const title = generateTitle({
    make,
    model,
    item,
    additionalItem,
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-3xl bg-slate-900/95 p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.9)] ring-1 ring-slate-700/50 text-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-white">SKU Builder</h2>

          <p className="text-sm text-slate-400">Generate SKU dynamically</p>
        </div>

        <SearchableSelect
          label="SKU"
          options={normalizedPrefixes}
          value={sku}
          onChange={setSku}
        />

        <SearchableSelect
          label="Make"
          options={normalizedMakes}
          value={make}
          onChange={setMake}
        />

        <SearchableSelect
          label="Model"
          options={normalizedModels}
          value={model}
          onChange={setModel}
        />

        <SearchableSelect
          label="Item"
          options={normalizedItems}
          value={item}
          onChange={setItem}
        />

        <SearchableSelect
          label="Additional Item"
          options={normalizedAdditionalItems}
          value={additionalItem}
          onChange={setAdditionalItem}
          multiple
        />
      </div>

      <SKUPreview sku={skuCode} title={title} onReset={reset} />
    </div>
  );
}
