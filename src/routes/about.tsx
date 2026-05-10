import { createFileRoute } from "@tanstack/react-router";
import craftImg from "@/assets/craft.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DAS Diamonds" },
      { name: "description", content: "DAS Diamonds is a modern luxury diamond house pairing master craftsmanship with ethical sourcing." },
      { property: "og:title", content: "About DAS Diamonds" },
      { property: "og:image", content: craftImg },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="eyebrow reveal">The Maison</p>
        <h1 className="mt-4 font-serif text-6xl md:text-8xl reveal reveal-delay-1">
          A house of <em className="italic gold-text">diamonds.</em>
        </h1>
        <p className="mt-8 text-lg text-foreground/80 leading-relaxed reveal reveal-delay-2">
          Founded in Surat in 2014, DAS Diamonds was built on a single conviction:
          that a diamond is not a commodity, but a quiet statement of intent.
        </p>
      </section>

      <section className="relative aspect-[16/9] max-h-[640px] overflow-hidden">
        <img src={craftImg} alt="Master jeweler at work" className="absolute inset-0 size-full object-cover" />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16">
        <div>
          <p className="eyebrow">Provenance</p>
          <h2 className="mt-3 font-serif text-4xl">Every stone, a story.</h2>
        </div>
        <div className="space-y-6 text-foreground/80 leading-relaxed">
          <p>
            From Botswana to Antwerp, every diamond in our vault carries a documented history.
            We work only with mines and laboratories that meet our standard for ethical practice.
          </p>
          <p>
            Our master cutters in Surat and Antwerp have over 30 years of combined experience —
            shaping rough into brilliance with the patience of an art form.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          ["2014", "Founded"],
          ["32", "Countries served"],
          ["8,400+", "Diamonds set"],
          ["100%", "Certified"],
        ].map(([n, l]) => (
          <div key={l}>
            <p className="font-serif text-5xl">{n}</p>
            <p className="mt-3 eyebrow">{l}</p>
          </div>
        ))}
      </section>
    </>
  );
}
