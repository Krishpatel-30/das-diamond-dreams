import { Link } from "@tanstack/react-router";
import { type Product, formatPrice } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const onSale = product.discountPrice != null && product.discountPrice > 0 && product.discountPrice < product.price;
  const outOfStock = product.stock <= 0;
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
          className={`absolute inset-0 size-full object-cover ${outOfStock ? "opacity-60" : ""}`}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
          {product.featured && (
            <span className="eyebrow !text-ivory bg-foreground/85 px-3 py-1.5">Featured</span>
          )}
          {product.bestseller && (
            <span className="eyebrow !text-ivory bg-foreground/80 px-3 py-1.5">Bestseller</span>
          )}
          {onSale && !outOfStock && (
            <span className="eyebrow !text-ivory bg-rose-500/90 px-3 py-1.5">Sale</span>
          )}
        </div>
        {outOfStock && (
          <span className="absolute top-4 right-4 eyebrow !text-foreground bg-ivory/90 px-3 py-1.5">
            Sold
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
        <div className="text-right whitespace-nowrap">
          {onSale ? (
            <>
              <p className="font-serif text-lg text-rose-600">{formatPrice(product.discountPrice!)}</p>
              <p className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</p>
            </>
          ) : (
            <p className="font-serif text-lg">{formatPrice(product.price)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
