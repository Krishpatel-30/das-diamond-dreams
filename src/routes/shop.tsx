import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, type DiamondType } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Diamonds — DAS Diamonds" },
      { name: "description", content: "Browse our complete collection of certified lab grown and natural polished diamonds." },
      { property: "og:title", content: "Shop — DAS Diamonds" },
    ],
  }),
  component: Shop,
});

const SHAPES = ["Round", "Oval", "Emerald", "Cushion", "Pear", "Marquise", "Radiant"];

function Shop() {
  const { data: products = [] } = useProducts();
  const [type, setType] = useState<DiamondType | "all">("all");
  const [shape, setShape] = useState<string | "all">("all");
  const [sort, setSort] = useState<"feat" | "asc" | "desc" | "carat">("feat");

  const filtered = useMemo(() => {
    let r = products.slice();
    if (type !== "all") r = r.filter((p) => p.type === type);
    if (shape !== "all") r = r.filter((p) => p.shape === shape);
    if (sort === "asc") r.sort((a, b) => a.price - b.price);
    if (sort === "desc") r.sort((a, b) => b.price - a.price);
    if (sort === "carat") r.sort((a, b) => b.carat - a.carat);
    return r;
  }, [type, shape, sort, products]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <header className="text-center max-w-3xl mx-auto reveal">
        <p className="eyebrow">The Vault</p>
        <h1 className="mt-3 font-serif text-6xl md:text-7xl">Diamond Collection</h1>
        <p className="mt-6 text-foreground/75 leading-relaxed">
          Each stone is hand-selected, fully certified, and accompanied by full provenance.
        </p>
      </header>

      <div className="mt-14 flex flex-col md:flex-row md:items-end gap-6 md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "lab-grown", "natural"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.28em] border transition-colors ${
                type === t ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
              }`}
            >
              {t === "all" ? "All" : t === "lab-grown" ? "Lab Grown" : "Natural"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="bg-transparent border border-border px-4 py-2 text-xs uppercase tracking-widest"
          >
            <option value="all">All Shapes</option>
            {SHAPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="bg-transparent border border-border px-4 py-2 text-xs uppercase tracking-widest"
          >
            <option value="feat">Featured</option>
            <option value="asc">Price ↑</option>
            <option value="desc">Price ↓</option>
            <option value="carat">Carat ↓</option>
          </select>
        </div>
      </div>

      <div className="hairline my-10" />

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">No diamonds match these filters.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </section>
  );
}
