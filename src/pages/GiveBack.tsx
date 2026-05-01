import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { Heart, GraduationCap, BookOpen, Users, ArrowRight } from "lucide-react";

const causes = [
  { icon: GraduationCap, title: "Pragathi Scholarship Fund", raised: "₹2,12,000", goal: "₹5,00,000", pct: 42, desc: "Sponsor uniforms, books, and tuition for deserving 9th & 10th standard students." },
  { icon: BookOpen, title: "Library & Lab Modernization", raised: "₹1,80,000", goal: "₹4,00,000", pct: 45, desc: "Help us bring the campus library and science lab into the 21st century." },
  { icon: Users, title: "Mentorship Programme", raised: "—", goal: "Volunteers", pct: 0, desc: "Volunteer one hour a month to mentor a current student. Career talks, life advice, encouragement." },
];

const GiveBack = () => (
  <PageLayout
    title="Give Back — Donate or Volunteer at Pragathi High School"
    description="Support Pragathi High School Centenary Colony, Peddapalli. Donate to scholarships, fund campus projects, or volunteer as a mentor."
  >
    <PageHero eyebrow="Give Back" title="Pay It Forward"
      description="The school gave us everything. Here is where we begin to return the favour — one scholarship, one mentor, one library shelf at a time." />

    <section className="pb-24">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-6">
          {causes.map((c, i) => (
            <div
              key={c.title}
              className="p-8 rounded-2xl border border-border/60 bg-card hover-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center mb-6 shadow-gold">
                <c.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl mb-3">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{c.desc}</p>
              {c.pct > 0 && (
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-primary">{c.raised}</span>
                    <span className="text-muted-foreground">of {c.goal}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-gold" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              )}
              <button className="w-full px-5 py-3 rounded-full bg-gradient-gold text-primary-foreground text-sm font-medium shadow-gold hover:shadow-glow transition-all inline-flex items-center justify-center gap-2">
                {c.pct > 0 ? "Donate Now" : "Volunteer"} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 md:p-16 rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-background text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gold opacity-40" />
          <div className="relative">
            <Heart size={36} className="text-primary mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-4xl mb-3">Every contribution writes a new chapter.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether ₹500 or ₹50,000, an hour or an afternoon — your gift compounds across generations of Pragathi children.
            </p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default GiveBack;
