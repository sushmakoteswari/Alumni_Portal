import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { publicGalleryUrls } from "@/data/publicGallery";

const items = publicGalleryUrls.map((src, i) => ({
  src,
  alt: `Pragathi alumni memory — photo ${i + 1}`,
  span: i % 4 === 0 ? "row-span-2" : "",
}));

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
