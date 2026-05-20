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
      value?: SKUOption;
      onChange: (value: SKUOption) => void;
    }
  | {
      multiple: true;
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
            {Array.isArray(value)
              ? value.length > 0
                ? value.map((item) => item.label).join(", ")
                : `Select ${label}`
              : value
                ? value.label
                : `Select ${label}`}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />

            <CommandList>
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
