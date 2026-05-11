import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, Phone, Trash2, Check, ArrowLeft, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/inquiries")({
  head: () => ({ meta: [{ title: "Inquiries — DAS Diamonds Admin" }] }),
  component: Inquiries,
});

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string;
  product_id: string | null;
  status: string;
  created_at: string;
};

function Inquiries() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "new" | "read">("all");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setUserId(s?.user?.id ?? null));
    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user?.id ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId === null) { setIsAdmin(null); return; }
    supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [userId]);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["inquiries"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Inquiry[];
    },
  });

  // Realtime updates so new inquiries appear instantly
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase.channel("inquiries-feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "inquiries" }, () => {
        qc.invalidateQueries({ queryKey: ["inquiries"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin, qc]);

  if (userId === null) {
    return (
      <section className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-serif text-3xl">Sign in required</h1>
        <Link to="/login" className="mt-6 inline-block px-6 py-3 bg-foreground text-background text-xs uppercase tracking-[0.32em]">Sign in</Link>
      </section>
    );
  }
  if (isAdmin === null) return <div className="py-24 text-center text-muted-foreground">Loading…</div>;
  if (!isAdmin) return <div className="py-24 text-center"><h1 className="font-serif text-3xl">Not authorized</h1></div>;

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) toast.error(error.message); else qc.invalidateQueries({ queryKey: ["inquiries"] });
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["inquiries"] }); }
  };

  const visible = items.filter((i) => filter === "all" ? true : i.status === filter);
  const newCount = items.filter((i) => i.status === "new").length;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Link to="/admin" className="inline-flex items-center gap-2 luxury-link eyebrow mb-6"><ArrowLeft size={14} /> Back to inventory</Link>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow">Maison · Customer</p>
          <h1 className="mt-2 font-serif text-5xl flex items-center gap-3">
            <Inbox size={32} /> Inquiries
            {newCount > 0 && <span className="text-xs uppercase tracking-widest bg-foreground text-background px-2 py-1">{newCount} new</span>}
          </h1>
        </div>
        <div className="flex gap-2">
          {(["all", "new", "read"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.28em] border ${filter === f ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading…</p> : visible.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">No inquiries here.</p>
      ) : (
        <ul className="space-y-4">
          {visible.map((i) => (
            <li key={i.id} className={`border border-border p-6 ${i.status === "new" ? "bg-secondary/30" : ""}`}>
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-serif text-xl">{i.name}</h2>
                    {i.status === "new" && <span className="text-[10px] uppercase tracking-widest bg-foreground text-background px-2 py-0.5">New</span>}
                    {i.interest && <span className="text-xs uppercase tracking-widest text-muted-foreground">· {i.interest}</span>}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <a href={`mailto:${i.email}`} className="luxury-link inline-flex items-center gap-1"><Mail size={12} />{i.email}</a>
                    {i.phone && <a href={`tel:${i.phone}`} className="luxury-link inline-flex items-center gap-1"><Phone size={12} />{i.phone}</a>}
                    <span>{new Date(i.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {i.status === "new" ? (
                    <button onClick={() => setStatus(i.id, "read")} className="p-2 hover:bg-secondary" title="Mark as read"><Check size={16} /></button>
                  ) : (
                    <button onClick={() => setStatus(i.id, "new")} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-border hover:border-foreground">Mark new</button>
                  )}
                  <button onClick={() => remove(i.id)} className="p-2 hover:bg-secondary text-destructive" title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed whitespace-pre-wrap text-foreground/85">{i.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
