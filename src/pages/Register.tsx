import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { Sparkles } from "lucide-react";
import { submitAlumniRegistrationToGoogleForm } from "@/lib/submitGoogleForm";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  batch: z.string().regex(/^(19|20)\d{2}$/, "Enter a valid year"),
  email: z.string().trim().email("Invalid email").max(255),
  city: z.string().trim().min(2, "Enter your current city").max(80),
  linkedin: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

const Register = () => {
  const { toast } = useToast();
  const [volunteer, setVolunteer] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((er) => { errs[er.path[0] as string] = er.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitAlumniRegistrationToGoogleForm(parsed.data, volunteer);
      toast({
        title: "Welcome home, Pragathian! 🌟",
        description: "Your registration has been received. We'll be in touch soon.",
      });
      (e.target as HTMLFormElement).reset();
      setVolunteer(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not reach the server. Try again or contact us.";
      toast({
        variant: "destructive",
        title: "Registration not sent",
        description: message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const field = "w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  return (
    <PageLayout
      title="Alumni Registration — Pragathi High School Peddapalli"
      description="Register as an alumnus of Pragathi High School Centenary Colony, Peddapalli. Reconnect, attend reunions, mentor students."
    >
      <PageHero
        eyebrow="Become a Member"
        title="Register Today"
        description="Fill in your details to join the Pragathi alumni network. We respect your privacy — your information is used only for alumni communication."
      />

      <section className="pb-24">
        <div className="container-narrow">
          <form
            onSubmit={onSubmit}
            className="bg-card border border-border/60 rounded-2xl p-8 md:p-12 shadow-elegant animate-fade-in-up"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">Full Name *</label>
                <input name="name" className={field} placeholder="Your full name" />
                {errors.name && <p className="text-destructive text-xs mt-2">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">Batch (Year) *</label>
                <input name="batch" className={field} placeholder="e.g. 2009" />
                {errors.batch && <p className="text-destructive text-xs mt-2">{errors.batch}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">Email *</label>
                <input name="email" type="email" className={field} placeholder="you@example.com" />
                {errors.email && <p className="text-destructive text-xs mt-2">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">Current City *</label>
                <input name="city" className={field} placeholder="Hyderabad, Bangalore, ..." />
                {errors.city && <p className="text-destructive text-xs mt-2">{errors.city}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">LinkedIn / Profile (optional)</label>
                <input name="linkedin" className={field} placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">A note for the community (optional)</label>
                <textarea name="message" rows={4} className={field} placeholder="Share a memory or what you're up to..." />
              </div>
            </div>

            <label className="flex items-start gap-3 mt-6 cursor-pointer group">
              <input
                type="checkbox"
                checked={volunteer}
                onChange={(e) => setVolunteer(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                I'd like to volunteer — mentor students, speak at events, or help organize reunions.
              </span>
            </label>

            <div className="gold-divider my-8" />

            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              By registering you consent to receive alumni communications. We collect minimal data and never share it. Compliant with India's IT Act 2000 and DPDP Act.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-10 py-4 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold hover:shadow-glow transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
            >
              <Sparkles size={18} /> {submitting ? "Submitting…" : "Submit Registration"}
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
};

export default Register;
