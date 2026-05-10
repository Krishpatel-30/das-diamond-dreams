import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin Login — DAS Diamonds" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You're signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      nav({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <p className="eyebrow">Maison Access</p>
      <h1 className="mt-3 font-serif text-5xl">{mode === "signin" ? "Sign in" : "Create account"}</h1>
      <form onSubmit={submit} className="mt-10 space-y-6">
        <div>
          <label className="eyebrow block mb-2">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Password</label>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground" />
        </div>
        <button disabled={loading} className="w-full px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.32em] hover:bg-foreground/85 transition disabled:opacity-50">
          {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        {mode === "signin" ? "Need an account?" : "Have an account?"}{" "}
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="luxury-link">
          {mode === "signin" ? "Create one" : "Sign in"}
        </button>
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        <Link to="/" className="luxury-link">← Back to site</Link>
      </p>
    </section>
  );
}
