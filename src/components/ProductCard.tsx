import { Link } from "@tanstack/react-router";
import { type Product, formatPrice } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group block reveal"
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      <div className="hover-zoom relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.bestseller && (
          <span className="absolute top-4 left-4 eyebrow !text-ivory bg-foreground/80 px-3 py-1.5">
            Bestseller
          </span>
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl">{product.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            {product.shape} · {product.carat.toFixed(2)}ct · {product.color}/{product.clarity}
          </p>
        </div>
        <p className="font-serif text-lg whitespace-nowrap">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
