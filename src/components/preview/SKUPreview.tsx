import { Copy, RefreshCcw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

interface Props {
  sku: string;
  title: string;
  onReset: () => void;
}

export default function SKUPreview({ sku, title, onReset }: Props) {
  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);

    toast.success(`${label} copied`);
  };

  return (
    <Card className="bg-slate-950/95 text-slate-100 ring-slate-700/40 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.9)]">
      <CardContent className="space-y-6 p-6">
        <div>
          <p className="text-sm text-slate-500">Name</p>

          <h2 className="mt-1 text-xl font-semibold">
            {title || "No name generated"}
          </h2>
        </div>

        <div>
          <p className="text-sm text-slate-500">SKU Code FINAL</p>

          <h1
            className="mt-1 text-3xl font-bold tracking-wide truncate block max-w-full"
            title={sku || undefined}
          >
            {sku || "N/A"}
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => copyText(sku, "SKU")} disabled={!sku}>
            <Copy className="mr-2 h-4 w-4" />
            Copy SKU
          </Button>

          <Button
            variant="secondary"
            onClick={() => copyText(title, "Title")}
            disabled={!title}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Title
          </Button>

          <Button variant="destructive" onClick={onReset}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
