import { createFileRoute, Link } from "@tanstack/react-router";
import labImg from "@/assets/lab-grown.jpg";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/lib/products";

export const Route = createFileRoute("/lab-grown")({
  head: () => ({
    meta: [
      { title: "Lab Grown Diamonds — DAS Diamonds" },
      { name: "description", content: "Atomically identical to mined diamonds. Ethically engineered, exceptional value, fully certified by IGI and GCAL." },
      { property: "og:title", content: "Lab Grown Diamonds — DAS Diamonds" },
      { property: "og:image", content: labImg },
    ],
  }),
  component: LabGrown,
});

function LabGrown() {
  const items = byType("lab-grown");
  return (
    <>
      <section className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={labImg} alt="Lab grown diamond crystal" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl w-full px-6 pb-16">
          <p className="eyebrow reveal">Collection 01</p>
          <h1 className="mt-3 font-serif text-6xl md:text-8xl reveal reveal-delay-1">
            Lab Grown <em className="italic gold-text">Diamonds</em>
          </h1>
          <p className="mt-6 max-w-xl text-foreground/80 reveal reveal-delay-2">
            Born in the laboratory. Identical in chemistry, brilliance and certification —
            with a smaller footprint and an exceptional price.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-12 text-sm">
        {[
          ["Same atoms.", "Chemically and optically identical to mined diamonds — graded on the same 4Cs scale."],
          ["Lighter footprint.", "Fewer resources, no mining disturbance, fully traceable origin."],
          ["Better value.", "Up to 60% more brilliance per dollar than comparable natural stones."],
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
