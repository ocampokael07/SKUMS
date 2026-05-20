import SKUBuilder from "@/components/sku/SKUBuilder";

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="rounded-3xl bg-slate-900/95 p-6 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.95)] ring-1 ring-slate-700/50 backdrop-blur-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                SKU Management System
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Professional SKU creation with an intuitive workflow
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-right">
              Select make, model, item, and optional components to generate
              consistent SKU codes and product titles quickly.
            </p>
          </div>
        </header>

        <main className="rounded-[2rem] bg-slate-900/95 p-6 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.95)] ring-1 ring-slate-800/60">
          <SKUBuilder />
        </main>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
