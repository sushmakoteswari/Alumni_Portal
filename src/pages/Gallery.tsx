import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import hero from "@/assets/hero-campus.jpg";

const items = [
  { src: g1, alt: "Pragathi High School class group photo", span: "row-span-2" },
  { src: g2, alt: "Pragathi students celebrating graduation", span: "" },
  { src: hero, alt: "Pragathi campus at golden hour", span: "" },
  { src: g3, alt: "Alumni reunion candlelight dinner", span: "" },
  { src: g4, alt: "Pragathi school building at twilight", span: "row-span-2" },
  { src: g2, alt: "Annual day celebrations", span: "" },
  { src: g1, alt: "Class portrait from earlier batches", span: "" },
  { src: g3, alt: "Reunion gathering of friends", span: "" },
];

const Gallery = () => (
  <PageLayout
    title="Photo Gallery — Pragathi High School Alumni Memories"
    description="Photo gallery of Pragathi High School Centenary Colony, Peddapalli — campus, batches, reunions, and the moments we hold dear."
  >
    <PageHero eyebrow="Memories" title="Photo Gallery"
      description="Browse moments from school days and recent alumni gatherings — every frame, a story." />

    <section className="pb-24">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl border border-border/60 ${it.span} animate-scale-in`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <img src={it.src} alt={it.alt} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <p className="text-xs text-foreground/90">{it.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Gallery;
