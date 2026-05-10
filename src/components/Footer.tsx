import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-14 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl">DAS</span>
            <span className="eyebrow">Diamonds</span>
          </div>
          <p className="mt-5 font-serif text-2xl leading-snug text-foreground/85">
            Crafted Brilliance.<br />Timeless Luxury.
          </p>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
            A modern diamond house pairing world-class lab grown stones with rare,
            ethically sourced natural diamonds.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-5">Maison</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="luxury-link text-foreground/80">About</Link></li>
            <li><Link to="/education" className="luxury-link text-foreground/80">Diamond Education</Link></li>
            <li><Link to="/contact" className="luxury-link text-foreground/80">Appointments</Link></li>
            <li><Link to="/contact" className="luxury-link text-foreground/80">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Collections</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/shop" className="luxury-link text-foreground/80">All Diamonds</Link></li>
            <li><Link to="/lab-grown" className="luxury-link text-foreground/80">Lab Grown</Link></li>
            <li><Link to="/polished" className="luxury-link text-foreground/80">Natural Polished</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DAS Diamonds. All rights reserved.</p>
          <p className="tracking-widest uppercase">Surat · Mumbai · Antwerp · New York</p>
        </div>
      </div>
    </footer>
  );
}
