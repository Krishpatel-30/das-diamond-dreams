import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProducts, formatPrice, type Product, type DiamondType } from "@/lib/products";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut, Upload } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — DAS Diamonds" }] }),
  component: Admin,
});

const empty: Product = {
  id: "", name: "", type: "lab-grown", shape: "Round", carat: 1, color: "D",
  clarity: "VS1", cut: "Excellent", certification: "IGI", origin: "",
  price: 0, image: "", gallery: [], description: "", bestseller: false,
};

function Admin() {
  const nav = useNavigate();
  const qc = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { data: products = [], isLoading } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user?.id ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId === null) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [userId]);

  if (userId === null) {
    return (
      <section className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="eyebrow">Restricted</p>
        <h1 className="mt-3 font-serif text-4xl">Admin access required</h1>
        <Link to="/login" className="mt-8 inline-block px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.32em]">Sign in</Link>
      </section>
    );
  }

  if (isAdmin === null) return <div className="py-24 text-center text-muted-foreground">Loading…</div>;

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="eyebrow">Pending</p>
        <h1 className="mt-3 font-serif text-4xl">Not yet authorized</h1>
        <p className="mt-6 text-sm text-muted-foreground">
          Your account ID:<br />
          <code className="block mt-2 p-3 bg-secondary text-foreground break-all">{userId}</code>
        </p>
        <p className="mt-6 text-sm text-foreground/75">
          Send this ID to the site owner to be granted admin access.
        </p>
        <button onClick={() => supabase.auth.signOut()} className="mt-8 luxury-link eyebrow">Sign out</button>
      </section>
    );
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this diamond from inventory?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Removed"); qc.invalidateQueries({ queryKey: ["products"] }); }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="eyebrow">Maison · Inventory</p>
          <h1 className="mt-2 font-serif text-5xl">Admin</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setEditing({ ...empty, id: `diamond-${Date.now()}` })}
            className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-xs uppercase tracking-[0.28em]">
            <Plus size={14} /> Add Diamond
          </button>
          <button onClick={async () => { await supabase.auth.signOut(); nav({ to: "/" }); }}
            className="inline-flex items-center gap-2 px-5 py-3 border border-border text-xs uppercase tracking-[0.28em]">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Carat</th>
                <th className="text-right p-4">Price</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3"><img src={p.image} alt="" className="size-14 object-cover" /></td>
                  <td className="p-4">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.shape} · {p.color}/{p.clarity}{p.bestseller && " · ★"}</div>
                  </td>
                  <td className="p-4 text-xs uppercase tracking-widest">{p.type === "lab-grown" ? "Lab" : "Natural"}</td>
                  <td className="p-4">{p.carat.toFixed(2)}</td>
                  <td className="p-4 text-right font-serif">{formatPrice(p.price)}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => setEditing(p)} className="p-2 hover:bg-secondary"><Pencil size={16} /></button>
                      <button onClick={() => remove(p.id)} className="p-2 hover:bg-secondary text-destructive"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && <ProductDialog product={editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); qc.invalidateQueries({ queryKey: ["products"] }); }} />}
    </section>
  );
}

function ProductDialog({ product, onClose, onSaved }: { product: Product; onClose: () => void; onSaved: () => void }) {
  const [p, setP] = useState<Product>(product);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const isNew = !product.image && !product.name;

  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((s) => ({ ...s, [k]: v }));

  const upload = async (file: File, target: "image" | "gallery") => {
    setUploading(true);
    try {
      const path = `${p.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      if (target === "image") set("image", data.publicUrl);
      else set("gallery", [...p.gallery, data.publicUrl]);
      toast.success("Image uploaded");
    } catch (e: any) { toast.error(e.message); }
    finally { setUploading(false); }
  };

  const save = async () => {
    if (!p.id || !p.name || !p.image) { toast.error("ID, name and main image are required"); return; }
    setSaving(true);
    const payload = { ...p, gallery: p.gallery as any };
    const { error } = await supabase.from("products").upsert(payload as any);
    setSaving(false);
    if (error) toast.error(error.message); else { toast.success("Saved"); onSaved(); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-background border border-border max-w-3xl w-full my-8" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="font-serif text-2xl">{isNew ? "New Diamond" : `Edit · ${product.name}`}</h2>
          <button onClick={onClose} className="text-muted-foreground">✕</button>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto">
          <Field label="ID" value={p.id} onChange={(v) => set("id", v)} />
          <Field label="Name" value={p.name} onChange={(v) => set("name", v)} />
          <div>
            <label className="eyebrow block mb-2">Type</label>
            <select value={p.type} onChange={(e) => set("type", e.target.value as DiamondType)}
              className="w-full bg-transparent border-b border-border py-2">
              <option value="lab-grown">Lab Grown</option>
              <option value="natural">Natural</option>
            </select>
          </div>
          <Field label="Shape" value={p.shape} onChange={(v) => set("shape", v)} />
          <Field label="Carat" type="number" step="0.01" value={String(p.carat)} onChange={(v) => set("carat", Number(v))} />
          <Field label="Price (USD)" type="number" value={String(p.price)} onChange={(v) => set("price", Number(v))} />
          <Field label="Color" value={p.color} onChange={(v) => set("color", v)} />
          <Field label="Clarity" value={p.clarity} onChange={(v) => set("clarity", v)} />
          <Field label="Cut" value={p.cut} onChange={(v) => set("cut", v)} />
          <Field label="Certification" value={p.certification} onChange={(v) => set("certification", v)} />
          <Field label="Origin" value={p.origin} onChange={(v) => set("origin", v)} />
          <label className="flex items-center gap-2 self-end pb-2">
            <input type="checkbox" checked={!!p.bestseller} onChange={(e) => set("bestseller", e.target.checked)} />
            <span className="eyebrow">Bestseller</span>
          </label>
          <div className="md:col-span-2">
            <label className="eyebrow block mb-2">Description</label>
            <textarea rows={3} value={p.description} onChange={(e) => set("description", e.target.value)}
              className="w-full bg-transparent border border-border p-3 outline-none focus:border-foreground" />
          </div>

          <div className="md:col-span-2">
            <label className="eyebrow block mb-2">Main image</label>
            <div className="flex gap-3 items-center">
              {p.image && <img src={p.image} alt="" className="size-20 object-cover border border-border" />}
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-border cursor-pointer hover:border-foreground">
                <Upload size={14} /> {uploading ? "Uploading..." : "Upload"}
                <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "image")} />
              </label>
              <input value={p.image} onChange={(e) => set("image", e.target.value)} placeholder="or paste URL"
                className="flex-1 bg-transparent border-b border-border py-2 text-sm" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="eyebrow block mb-2">Gallery ({p.gallery.length})</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {p.gallery.map((g, i) => (
                <div key={i} className="relative">
                  <img src={g} alt="" className="size-16 object-cover border border-border" />
                  <button onClick={() => set("gallery", p.gallery.filter((_, j) => j !== i))}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full size-5 text-xs">×</button>
                </div>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 px-4 py-2 border border-border cursor-pointer hover:border-foreground">
              <Upload size={14} /> Add gallery image
              <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "gallery")} />
            </label>
          </div>
        </div>
        <div className="p-6 border-t border-border flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 border border-border text-xs uppercase tracking-widest">Cancel</button>
          <button onClick={save} disabled={saving} className="px-6 py-3 bg-foreground text-background text-xs uppercase tracking-widest disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", step }: { label: string; value: string; onChange: (v: string) => void; type?: string; step?: string }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input type={type} step={step} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground" />
    </div>
  );
}
