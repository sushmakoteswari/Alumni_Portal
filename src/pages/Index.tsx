import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Heart, Sparkles, Quote } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import heroImg from "@/assets/hero-campus.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

const Index = () => {
  return (
    <PageLayout
      title="Pragathi High School Alumni — Centenary Colony, Peddapalli, Telangana"
      description="Official alumni network of Pragathi High School, Centenary Colony, Peddapalli. Reconnect with classmates, attend reunions, and give back. Initiated by the 2009 batch."
    >
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background video with image fallback */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-students-walking-on-campus-7066/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-radial-gold opacity-40" />

        <div className="container-wide relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-sm text-xs tracking-[0.25em] uppercase text-primary mb-8 animate-fade-in">
              <Sparkles size={12} /> Initiated by 2009 Batch
            </div>

            <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[1.05] animate-fade-in-up">
              <span className="text-foreground">Where </span>
              <span className="text-gradient-gold italic">memories</span>
              <br />
              <span className="text-foreground">find their way </span>
              <span className="text-gradient-gold italic">home.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              The official alumni network of <span className="text-primary">Pragathi High School, Centenary Colony</span> — Peddapalli, Telangana. Built by classmates, for classmates.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Link
                to="/register"
                className="group px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold hover:shadow-glow transition-all duration-500 inline-flex items-center gap-2"
              >
                Join the Network
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/events"
                className="px-8 py-4 rounded-full border border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-500"
              >
                View Reunion 2026
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              {[
                { n: "1,200+", l: "Alumni Worldwide" },
                { n: "15", l: "Batches Connected" },
                { n: "₹12L+", l: "Raised for School" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl md:text-4xl text-gradient-gold">{s.n}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
          Scroll
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 md:py-32 relative">
        <div className="container-narrow text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-primary mb-5">
            <span className="w-8 h-px bg-primary/60" /> Our Story <span className="w-8 h-px bg-primary/60" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light leading-tight">
            A school is more than walls.<br />
            <span className="text-gradient-gold italic">It is the people.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            From dusty corridors of Centenary Colony to boardrooms in Bangalore, fields in Peddapalli to laboratories abroad — the children of Pragathi have travelled far. This network exists to bring us back together, to remember, to celebrate, and to lift the next generation toward the same light.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 bg-card/50 border-y border-border/40">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Reconnect", text: "Find old classmates across batches and continents through our growing alumni directory." },
              { icon: Calendar, title: "Reunite", text: "Annual gatherings, regional meetups, and intimate evenings under the Peddapalli sky." },
              { icon: Heart, title: "Give Back", text: "Mentor a student, fund a scholarship, or volunteer your time. Small acts, lasting legacy." },
            ].map((p, i) => (
              <div
                key={p.title}
                className="group p-8 rounded-2xl border border-border/60 bg-background/50 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-gradient-gold group-hover:border-transparent transition-all duration-500">
                  <p.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-2xl mb-3 text-foreground">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3">Moments</div>
              <h2 className="font-display text-4xl md:text-5xl">Frames of <span className="text-gradient-gold italic">forever</span></h2>
            </div>
            <Link to="/gallery" className="gold-link text-sm">View full gallery →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[g1, g2, g3].map((src, i) => (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60">
                <img
                  src={src}
                  alt="Pragathi alumni memory"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="container-narrow relative text-center">
          <Quote size={48} className="text-primary mx-auto mb-6 opacity-60" />
          <blockquote className="font-display text-2xl md:text-4xl font-light italic leading-relaxed text-foreground/90">
            "The bell still rings somewhere inside us. Every time it does, we remember who we were — and who we promised we would become."
          </blockquote>
          <div className="mt-8 text-sm uppercase tracking-[0.25em] text-primary">— Class of 2009</div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-narrow">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 p-12 md:p-16 text-center bg-gradient-to-br from-card to-background">
            <div className="absolute inset-0 bg-radial-gold opacity-50" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl mb-4">Come <span className="text-gradient-gold italic">home.</span></h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Register today and become part of the story we're still writing — one batch, one memory, one Pragathi at a time.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold hover:shadow-glow transition-all"
              >
                Register Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
