import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Diamond — DAS Diamonds" }] };
    return {
      meta: [
        { title: `${p.name} — ${p.carat}ct ${p.shape} — DAS Diamonds` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — DAS Diamonds` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-5xl">Diamond not found</h1>
      <Link to="/shop" className="mt-8 inline-block luxury-link eyebrow">Back to collection</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-serif text-5xl">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const gallery = product.gallery.length ? product.gallery : [product.image];
  const related = products.filter((p) => p.id !== product.id && p.type === product.type).slice(0, 3);

  const wa = `https://wa.me/911234567890?text=${encodeURIComponent(
    `Hello DAS Diamonds, I'd like more information about ${product.name} (${product.id}).`,
  )}`;

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <nav className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
          <Link to="/shop" className="luxury-link">Shop</Link> · <span>{product.shape}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="aspect-square overflow-hidden bg-secondary">
              <img src={gallery[active]} alt={product.name} className="size-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-square overflow-hidden border ${active === i ? "border-foreground" : "border-transparent"}`}
                  >
                    <img src={g} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:pt-6">
            <p className="eyebrow">{product.type === "lab-grown" ? "Lab Grown" : "Natural"} · {product.shape}</p>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl">{product.name}</h1>
            <p className="mt-6 text-foreground/75 leading-relaxed">{product.description}</p>

            <p className="mt-8 font-serif text-4xl">{formatPrice(product.price)}</p>

            <dl className="mt-10 grid grid-cols-2 gap-y-5 gap-x-8 text-sm border-t border-border pt-8">
              {[
                ["Carat", `${product.carat.toFixed(2)}ct`],
                ["Shape", product.shape],
                ["Color", product.color],
                ["Clarity", product.clarity],
                ["Cut", product.cut],
                ["Certification", product.certification],
                ["Origin", product.origin],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border/60 pb-3">
                  <dt className="uppercase tracking-widest text-xs text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <button className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.32em] hover:bg-foreground/85 transition">
                <ShoppingBag size={16} /> Add to Bag
              </button>
              <button className="size-[52px] grid place-items-center border border-border hover:border-foreground transition" aria-label="Wishlist">
                <Heart size={18} />
              </button>
            </div>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center px-8 py-4 border border-foreground/30 text-xs uppercase tracking-[0.32em] hover:bg-foreground hover:text-background transition"
            >
              Inquire on WhatsApp
            </a>

            <p className="mt-8 text-xs text-muted-foreground leading-relaxed">
              Complimentary insured worldwide shipping · 30-day returns · Lifetime trade-in
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="font-serif text-4xl mb-10">You may also love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  );
}
