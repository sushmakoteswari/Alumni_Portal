import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { Briefcase, Sparkles } from "lucide-react";

const Careers = () => (
  <PageLayout
    title="Alumni Job Board — Careers Posted by Pragathi Alumni"
    description="Job openings shared by Pragathi High School alumni. The alumni job board is coming soon."
  >
    <PageHero
      eyebrow="Alumni Job Board"
      title="Careers"
      description="Opportunities shared by Pragathians, for Pragathians. We’re building a place to post roles and apply in one trusted network."
    />

    <section className="pb-24">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card px-8 py-16 md:px-16 md:py-20 text-center shadow-elegant max-w-3xl mx-auto animate-fade-in-up">
          <div className="absolute inset-0 bg-radial-gold opacity-40 pointer-events-none" />
          <div className="relative flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/35 flex items-center justify-center">
              <Briefcase size={28} className="text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight">
              Posting &amp; applying — <span className="text-gradient-gold italic">coming soon</span>
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed text-sm md:text-base">
              Alumni job listings and one-click applications are on the way. Check back soon, or reach out through{" "}
              <Link to="/contact" className="gold-link text-foreground/90">
                Contact
              </Link>{" "}
              if you’d like to share an opportunity in the meantime.
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-background/50 text-xs uppercase tracking-[0.2em] text-primary">
              <Sparkles size={14} className="shrink-0" />
              In development
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Careers;
