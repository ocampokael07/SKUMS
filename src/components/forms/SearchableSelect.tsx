import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { SKUOption } from "@/types/sku";

type SearchableSelectProps = {
  label: string;
  options: SKUOption[];
} & (
  | {
      multiple?: false;
      clearable?: boolean;
      value?: SKUOption;
      onChange: (value: SKUOption) => void;
    }
  | {
      multiple: true;
      clearable?: boolean;
      value?: SKUOption[];
      onChange: (value: SKUOption[]) => void;
    }
);

export default function SearchableSelect({
  label,
  options,
  value,
  onChange,
  multiple = false,
  clearable = false,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between border-slate-700 bg-slate-900/90 text-slate-100 hover:border-slate-500 hover:bg-slate-900/80 hover:text-slate-100 focus-visible:ring-slate-500/40"
          >
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {Array.isArray(value)
                ? value.length > 0
                  ? value.map((item) => item.label).join(", ")
                  : `Select ${label}`
                : value
                  ? value.label
                  : `Select ${label}`}
            </span>

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <div className="p-2">
              <div className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                  <CommandInput
                    className="w-full"
                    placeholder={`Search ${label}...`}
                  />
                </div>

                {clearable && Array.isArray(value) && value.length > 0 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-slate-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      (onChange as (v: SKUOption[]) => void)([]);
                    }}
                  >
                    Clear
                  </Button>
                ) : null}
              </div>
            </div>

            <CommandList className="max-h-60 overflow-auto">
              <CommandEmpty>No result found.</CommandEmpty>

              <CommandGroup>
                {options.map((option) => {
                  const selected = Array.isArray(value)
                    ? value.some((item) => item.id === option.id)
                    : value?.id === option.id;

                  return (
                    <CommandItem
                      key={option.id}
                      value={option.label}
                      onSelect={() => {
                        if (multiple) {
                          const currentValues = Array.isArray(value)
                            ? value
                            : [];
                          const updatedValues = currentValues.some(
                            (item) => item.id === option.id,
                          )
                            ? currentValues.filter(
                                (item) => item.id !== option.id,
                              )
                            : [...currentValues, option];

                          (onChange as (value: SKUOption[]) => void)(
                            updatedValues,
                          );
                        } else {
                          (onChange as (value: SKUOption) => void)(option);
                          setOpen(false);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected ? "opacity-100" : "opacity-0",
                        )}
                      />

                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
