import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

const posts = [
  { id: 1, img: g2, tag: "Alumnus of the Month", title: "Suman Gupta (2009) leads a tech startup in Hyderabad",
    excerpt: "From a classroom in Centenary Colony to building India's next-generation logistics platform — Suman's journey is one of grit, faith, and the friends who refused to let her stop.",
    date: "Jan 12, 2026", read: "5 min" },
  { id: 2, img: g4, tag: "Campus Update", title: "New library inaugurated by 1985 batch",
    excerpt: "After three years of quiet fundraising, the senior-most batch has gifted Pragathi a fully renovated library with 4,000+ books, study booths, and a dedicated reading garden.",
    date: "Jan 20, 2026", read: "3 min" },
  { id: 3, img: g3, tag: "Scholarship", title: "₹2,00,000 raised for underprivileged students",
    excerpt: "The 2026 Pragathi Scholarship Fund will support 18 students through their 9th & 10th standards — books, uniforms, and a small monthly stipend.",
    date: "Dec 30, 2025", read: "4 min" },
  { id: 4, img: g1, tag: "Memoir", title: "The bell, the corridor, and the rain",
    excerpt: "A teacher writes about thirty monsoons spent watching children become adults under the same neem tree.",
    date: "Dec 15, 2025", read: "6 min" },
];

const News = () => (
  <PageLayout
    title="News & Stories — Pragathi High School Alumni"
    description="Read alumni stories, school news, and community updates from Pragathi High School Centenary Colony, Peddapalli, Telangana."
  >
    <PageHero eyebrow="The Pragathi Voice" title="News & Stories"
      description="Inspiring journeys, campus updates, and quiet little moments from our community." />

    <section className="pb-24">
      <div className="container-wide space-y-12">
        {posts.map((p, i) => (
          <article
            key={p.id}
            className={`grid md:grid-cols-5 gap-8 items-center animate-fade-in-up ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="md:col-span-2">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 group">
                <img src={p.img} alt={p.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{p.tag}</div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">{p.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">{p.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{p.date}</span> <span className="w-1 h-1 rounded-full bg-primary" /> <span>{p.read} read</span>
              </div>
              <button className="mt-5 gold-link text-sm">Read full story →</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default News;
