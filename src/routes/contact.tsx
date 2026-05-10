import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Appointments — DAS Diamonds" },
      { name: "description", content: "Book a private viewing or inquire about a bespoke diamond. Our gemologists respond within 24 hours." },
      { property: "og:title", content: "Contact — DAS Diamonds" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-16">
      <div>
        <p className="eyebrow reveal">In Touch</p>
        <h1 className="mt-3 font-serif text-6xl md:text-7xl reveal reveal-delay-1">
          Book a <em className="italic gold-text">private viewing.</em>
        </h1>
        <p className="mt-6 text-foreground/75 leading-relaxed max-w-md">
          Our gemologists are available by appointment in Surat, Mumbai, Antwerp and New York —
          or via private virtual consultation.
        </p>

        <dl className="mt-12 space-y-6 text-sm">
          <div>
            <dt className="eyebrow">Atelier</dt>
            <dd className="mt-2">Diamond Bourse, Surat 395002, India</dd>
          </div>
          <div>
            <dt className="eyebrow">Email</dt>
            <dd className="mt-2"><a href="mailto:concierge@dasdiamonds.com" className="luxury-link">concierge@dasdiamonds.com</a></dd>
          </div>
          <div>
            <dt className="eyebrow">Telephone</dt>
            <dd className="mt-2"><a href="tel:+911234567890" className="luxury-link">+91 12345 67890</a></dd>
          </div>
          <div>
            <dt className="eyebrow">Hours</dt>
            <dd className="mt-2">Mon–Sat · 10:00 — 19:00 IST</dd>
          </div>
        </dl>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="bg-card border border-border p-8 md:p-12 space-y-6"
      >
        {sent ? (
          <div className="py-16 text-center">
            <p className="eyebrow">Received</p>
            <h2 className="mt-3 font-serif text-4xl">Thank you.</h2>
            <p className="mt-4 text-foreground/75">A gemologist will respond within 24 hours.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field label="Phone" name="phone" type="tel" />
            <div>
              <label className="eyebrow block mb-2">Interest</label>
              <select className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition">
                <option>Lab Grown Diamond</option>
                <option>Natural Polished Diamond</option>
                <option>Bespoke Design</option>
                <option>Private Consultation</option>
              </select>
            </div>
            <div>
              <label className="eyebrow block mb-2">Message</label>
              <textarea rows={5} className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition resize-none" />
            </div>
            <button className="w-full mt-4 px-8 py-4 bg-foreground text-background text-xs uppercase tracking-[0.32em] hover:bg-foreground/85 transition">
              Request Appointment
            </button>
          </>
        )}
      </form>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-2" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-foreground transition"
      />
    </div>
  );
}
