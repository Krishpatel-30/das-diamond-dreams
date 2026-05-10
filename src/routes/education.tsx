import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Diamond Education — The 4Cs — DAS Diamonds" },
      { name: "description", content: "Learn the 4Cs — Cut, Color, Clarity and Carat — and how to read a diamond certificate." },
      { property: "og:title", content: "Diamond Education — DAS Diamonds" },
    ],
  }),
  component: Education,
});

const C = [
  { letter: "C", word: "Cut", body: "The most important of the 4Cs. A diamond's cut governs its brilliance, fire and scintillation. Look for Excellent or Ideal." },
  { letter: "C", word: "Color", body: "Graded D (colorless) through Z. D–F are colorless; G–J are near-colorless and offer exceptional value." },
  { letter: "C", word: "Clarity", body: "From Flawless (FL) to Included (I). VVS and VS grades show inclusions only under 10× magnification." },
  { letter: "C", word: "Carat", body: "A measure of weight, not size. One carat equals 0.2 grams. Larger stones are exponentially rarer." },
];

export const Route_ = Route; // keep TS happy if unused

function Education() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="eyebrow reveal">Diamond Education</p>
        <h1 className="mt-4 font-serif text-6xl md:text-8xl reveal reveal-delay-1">
          The <em className="italic gold-text">4Cs.</em>
        </h1>
        <p className="mt-8 text-foreground/80 leading-relaxed reveal reveal-delay-2">
          A diamond's quality is universally measured against four characteristics —
          established by the Gemological Institute of America in the 1950s and used by every reputable
          house since.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 grid md:grid-cols-2 gap-px bg-border">
        {C.map((c) => (
          <article key={c.word} className="bg-background p-10 md:p-14">
            <p className="font-serif text-7xl text-gold-soft">{c.letter}</p>
            <h2 className="mt-2 font-serif text-3xl">{c.word}</h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">{c.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="hairline mx-auto w-24 mb-10" />
        <h2 className="font-serif text-4xl">Certification</h2>
        <p className="mt-6 text-foreground/80 leading-relaxed">
          Every DAS diamond is independently graded by the world's most trusted laboratories —
          GIA, IGI, GCAL or HRD. Each stone arrives with its original certificate, an identification
          number laser-inscribed on the girdle, and our maison's seal of provenance.
        </p>
      </section>
    </>
  );
}
