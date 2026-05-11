import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type DiamondType = "lab-grown" | "natural";

export type Product = {
  id: string;
  name: string;
  type: DiamondType;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  certification: string;
  origin: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  bestseller?: boolean;
  stock: number;
  discountPrice?: number | null;
  featured: boolean;
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const mapRow = (r: any): Product => ({
  id: r.id,
  name: r.name,
  type: r.type as DiamondType,
  shape: r.shape,
  carat: Number(r.carat),
  color: r.color,
  clarity: r.clarity,
  cut: r.cut,
  certification: r.certification,
  origin: r.origin,
  price: Number(r.price),
  image: r.image,
  gallery: Array.isArray(r.gallery) ? r.gallery as string[] : [],
  description: r.description ?? "",
  bestseller: !!r.bestseller,
  stock: typeof r.stock === "number" ? r.stock : Number(r.stock ?? 1),
  discountPrice: r.discount_price != null ? Number(r.discount_price) : null,
  featured: !!r.featured,
});

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: fetchProducts });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data ? mapRow(data) : null;
    },
  });
}
