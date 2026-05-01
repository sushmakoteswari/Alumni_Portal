import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const events = [
  {
    id: 1, title: "Annual Alumni Reunion 2026", date: "March 1, 2026", time: "4:00 PM onwards",
    location: "Pragathi High School Campus, Centenary Colony", attendees: 320, featured: true,
    desc: "An evening of memories — campus tour, talent showcase, dinner under the stars, and the lighting of the heritage lamp by our seniormost batch.",
  },
  {
    id: 2, title: "Tech Careers Webinar", date: "February 15, 2026", time: "7:00 PM IST",
    location: "Online (Zoom)", attendees: 85,
    desc: "Alumni from Microsoft, Infosys & startups share what's next in technology and how to break in.",
  },
  {
    id: 3, title: "Hyderabad City Meetup", date: "January 25, 2026", time: "6:30 PM",
    location: "Hyderabad", attendees: 42,
    desc: "Casual evening for alumni based in and around Hyderabad. Food, laughter, and old stories.",
  },
  {
    id: 4, title: "Online Alumni Job Fair", date: "April 20–22, 2026", time: "All day",
    location: "Virtual", attendees: 0,
    desc: "Three days of curated job listings, resume reviews, and 1:1 mentoring with senior alumni.",
  },
];

const Events = () => {
  const { toast } = useToast();
  const rsvp = (title: string) =>
    toast({ title: "RSVP confirmed 🎉", description: `We'll see you at "${title}"` });

  return (
    <PageLayout
      title="Alumni Events & Reunion 2026 — Pragathi High School Peddapalli"
      description="Upcoming alumni events, reunions, and webinars for Pragathi High School Centenary Colony, Peddapalli. RSVP and reconnect."
    >
      <PageHero eyebrow="Save the Date" title="Events & Reunions"
        description="From the grand annual reunion at the campus to intimate city meetups and online sessions — there's always a way to come back together." />

      <section className="pb-24">
        <div className="container-wide space-y-8">
          {events.map((e, i) => (
            <article
              key={e.id}
              className={`relative rounded-2xl border bg-card overflow-hidden hover-lift animate-fade-in-up ${
                e.featured ? "border-primary/50 shadow-gold" : "border-border/60"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {e.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-[0.2em]">
                  Featured
                </div>
              )}
              <div className="p-8 md:p-10 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2">
                    <Calendar size={14} /> {e.date}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl mb-4">{e.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{e.desc}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {e.time}</span>
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> {e.location}</span>
                    {e.attendees > 0 && (
                      <span className="flex items-center gap-2"><Users size={14} className="text-primary" /> {e.attendees} going</span>
                    )}
                  </div>
                </div>
                <div className="flex md:flex-col md:items-end justify-between gap-4">
                  <button
                    onClick={() => rsvp(e.title)}
                    className="px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground font-medium shadow-gold hover:shadow-glow transition-all whitespace-nowrap"
                  >
                    RSVP Now
                  </button>
                  <button className="text-sm gold-link">Add to calendar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Events;
