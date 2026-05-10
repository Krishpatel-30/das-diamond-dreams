import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/lab-grown", label: "Lab Grown" },
  { to: "/polished", label: "Natural" },
  { to: "/education", label: "Education" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-border/60 py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-wide">DAS</span>
          <span className="eyebrow !text-foreground/70">Diamonds</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9 text-[13px] tracking-wider uppercase">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="luxury-link text-foreground/80 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <Link to="/contact" className="eyebrow !text-foreground/80 hover:!text-foreground transition-colors">
            Book Consultation
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-border/60 mt-3">
          <nav className="px-6 py-6 flex flex-col gap-5 text-sm tracking-wider uppercase">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-foreground/80">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
