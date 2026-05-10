import { createFileRoute, Link } from "@tanstack/react-router";
import natImg from "@/assets/polished.jpg";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/lib/products";

export const Route = createFileRoute("/polished")({
  head: () => ({
    meta: [
      { title: "Natural Polished Diamonds — DAS Diamonds" },
      { name: "description", content: "Rare natural diamonds, ethically sourced and master-cut. GIA certified with full provenance." },
      { property: "og:title", content: "Natural Polished Diamonds — DAS Diamonds" },
      { property: "og:image", content: natImg },
    ],
  }),
  component: Polished,
});

function Polished() {
  const { data: all = [] } = useProducts();
  const items = all.filter((p) => p.type === "natural");
  return (
    <>
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={natImg} alt="Natural polished diamonds" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl w-full px-6 pb-16">
          <p className="eyebrow reveal">Collection 02</p>
          <h1 className="mt-3 font-serif text-6xl md:text-8xl reveal reveal-delay-1">
            Natural <em className="italic gold-text">Polished</em>
          </h1>
          <p className="mt-6 max-w-xl text-foreground/80 reveal reveal-delay-2">
            A billion years in the making. Each stone is responsibly sourced, GIA-certified
            and master-cut by hand.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-12 text-sm">
        {[
          ["Ethically sourced.", "Kimberley Process compliant. Transparent provenance from mine to maison."],
          ["Master cut.", "Hand-faceted by third-generation cutters in Antwerp and Surat."],
          ["GIA certified.", "Independent grading from the world's most trusted gemological authority."],
        ].map(([t, b]) => (
          <div key={t}>
            <h3 className="font-serif text-2xl">{t}</h3>
            <p className="mt-3 text-foreground/75 leading-relaxed">{b}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-4xl">The Collection</h2>
          <Link to="/shop" className="luxury-link text-xs uppercase tracking-[0.32em]">View all →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </>
  );
}
