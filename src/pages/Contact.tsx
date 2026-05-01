import { useState } from "react";
import { z } from "zod";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { useToast } from "@/hooks/use-toast";
import { submitContactMessageToGoogleSheet } from "@/lib/submitGoogleForm";
import { MapPin, Mail, Phone, Facebook, Instagram, Linkedin, Send } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const field = "w-full bg-input border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const r = schema.safeParse(data);
    if (!r.success) {
      const m: Record<string, string> = {};
      r.error.errors.forEach((er) => { m[er.path[0] as string] = er.message; });
      setErrs(m);
      return;
    }
    setErrs({});
    setSubmitting(true);
    try {
      await submitContactMessageToGoogleSheet(r.data);
      toast({ title: "Message received 💌", description: "We'll get back to you within 48 hours." });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send. Try again or email us.";
      toast({
        variant: "destructive",
        title: "Message not sent",
        description: message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Contact Us — Pragathi High School Alumni Peddapalli"
      description="Get in touch with the Pragathi High School Alumni Association. Centenary Colony, Peddapalli, Telangana."
    >
      <PageHero eyebrow="Get in Touch" title="Contact Us"
        description="Whether to update your details, propose an event, or simply say hello — we'd love to hear from you." />

      <section className="pb-24">
        <div className="container-wide grid lg:grid-cols-2 gap-10">
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="font-display text-3xl mb-2">Reach Out</h2>
              <p className="text-muted-foreground">The fastest way is through email. We answer everything.</p>
            </div>
            <div className="space-y-5">
              {[
                { Icon: MapPin, label: "Address", val: "Centenary Colony, Peddapalli, Telangana 505172, India" },
                { Icon: Mail, label: "Email", val: "alumni@pragathischool.in" },
                { Icon: Phone, label: "Phone", val: "+91 98XXX XXXXX" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 p-5 rounded-xl border border-border/60 bg-card hover-lift">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <c.Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{c.label}</div>
                    <div className="text-foreground">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Follow the journey</div>
              <div className="flex gap-3">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Social"
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:border-primary hover:bg-primary/10 hover:text-primary transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden border border-border/60">
              <iframe
                title="Pragathi High School Map"
                src="https://www.google.com/maps?q=Peddapalli,Telangana&output=embed"
                className="w-full h-full grayscale"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-elegant animate-fade-in-up h-fit" style={{ animationDelay: "0.15s" }}>
            <h2 className="font-display text-3xl mb-6">Send a Message</h2>
            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">Name</label>
                <input name="name" className={field} />
                {errs.name && <p className="text-destructive text-xs mt-2">{errs.name}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">Email</label>
                <input name="email" type="email" className={field} />
                {errs.email && <p className="text-destructive text-xs mt-2">{errs.email}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block">Message</label>
                <textarea name="message" rows={6} className={field} />
                {errs.message && <p className="text-destructive text-xs mt-2">{errs.message}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3.5 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold hover:shadow-glow transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
              >
                <Send size={16} /> {submitting ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
