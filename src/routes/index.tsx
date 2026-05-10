import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-diamond.jpg";
import labImg from "@/assets/lab-grown.jpg";
import natImg from "@/assets/polished.jpg";
import craftImg from "@/assets/craft.jpg";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DAS Diamonds — Crafted Brilliance. Timeless Luxury." },
      { name: "description", content: "A modern diamond house. Discover certified lab grown and natural polished diamonds, designed for the modern collector." },
      { property: "og:title", content: "DAS Diamonds" },
      { property: "og:description", content: "Crafted Brilliance. Timeless Luxury." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = bestsellers();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="A flawless brilliant cut diamond"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-transparent to-ivory" />
        <div className="relative mx-auto max-w-7xl w-full px-6 pb-24 md:pb-32">
          <p className="eyebrow reveal">Est. 2014 · A Diamond Maison</p>
          <h1 className="mt-6 font-serif text-[12vw] md:text-[7.5rem] leading-[0.95] tracking-tight reveal reveal-delay-1">
            Crafted <em className="italic gold-text">Brilliance.</em><br />
            Timeless Luxury.
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-4 reveal reveal-delay-2">
            <Link
              to="/shop"
              className="px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.32em] hover:bg-foreground/85 transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border border-foreground/70 text-xs uppercase tracking-[0.32em] hover:bg-foreground hover:text-background transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS SPLIT */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {[
            { to: "/lab-grown", img: labImg, eyebrow: "01 — The Future", title: "Lab Grown", body: "Atomically identical. Ethically engineered. Exceptional value." },
            { to: "/polished", img: natImg, eyebrow: "02 — The Heritage", title: "Natural Polished", body: "Rare, ethically mined and certified. A billion years in the making." },
          ].map((c, i) => (
            <Link key={c.to} to={c.to} className="group block reveal" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="hover-zoom relative aspect-[4/5] overflow-hidden bg-secondary">
                <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8 md:p-10 text-ivory">
                  <p className="eyebrow !text-ivory/80">{c.eyebrow}</p>
                  <h3 className="mt-3 font-serif text-5xl md:text-6xl">{c.title}</h3>
                  <p className="mt-4 max-w-sm text-sm text-ivory/85 leading-relaxed">{c.body}</p>
                  <span className="mt-6 inline-block luxury-link text-xs uppercase tracking-[0.32em]">Discover →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow">The Selection</p>
            <h2 className="mt-3 font-serif text-5xl md:text-6xl">Bestsellers</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-block luxury-link text-xs uppercase tracking-[0.32em]">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/50 mt-28">
        <div className="mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-2 gap-14 items-center">
          <div className="hover-zoom relative aspect-[5/6] overflow-hidden">
            <img src={craftImg} alt="Master jeweler inspection" loading="lazy" className="absolute inset-0 size-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">The Maison</p>
            <h2 className="mt-3 font-serif text-5xl md:text-6xl leading-[1]">A diamond,<br />considered.</h2>
            <p className="mt-6 text-foreground/80 leading-relaxed max-w-md">
              Every stone in our vault is hand-selected by a master gemologist, certified by GIA or IGI,
              and accompanied by a full chain of provenance. Quietly extraordinary.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              {[
                ["10+", "Years"],
                ["8,400", "Diamonds set"],
                ["32", "Countries"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-serif text-4xl">{n}</dt>
                  <dd className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CERTIFICATION STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow text-center">Certified & Insured</p>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
          {["GIA", "IGI", "GCAL", "HRD", "AGS"].map((c) => (
            <span key={c} className="font-serif text-3xl text-foreground/60 hover:text-foreground transition-colors">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-24 text-center">
        <div className="hairline mx-auto w-24 mb-10" />
        <p className="font-serif italic text-3xl md:text-4xl leading-snug">
          “The Aurora is, without exaggeration, the most exquisite diamond I have ever worn.
          DAS does not sell stones — they curate moments.”
        </p>
        <p className="eyebrow mt-8">Amelia R. · London</p>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
          <h2 className="font-serif text-5xl md:text-6xl gold-text">Private viewings.</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}
            className="flex w-full border-b border-ivory/30"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 bg-transparent py-4 outline-none placeholder:text-ivory/50"
            />
            <button className="px-6 text-xs uppercase tracking-[0.32em] hover:gold-text transition">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
