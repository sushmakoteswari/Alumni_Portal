import { useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { alumni } from "@/data/alumni";
import { Search, MapPin } from "lucide-react";

const Directory = () => {
  const [q, setQ] = useState("");
  const [batch, setBatch] = useState("all");

  const batches = useMemo(() => Array.from(new Set(alumni.map((a) => a.batch))).sort(), []);
  const results = useMemo(() => {
    return alumni.filter((a) => {
      const matchQ = !q || (a.name + a.role + a.city).toLowerCase().includes(q.toLowerCase());
      const matchB = batch === "all" || a.batch === Number(batch);
      return matchQ && matchB;
    });
  }, [q, batch]);

  return (
    <PageLayout
      title="Alumni Directory — Pragathi High School Peddapalli"
      description="Search the Pragathi High School alumni directory by name, batch, or city. Reconnect with classmates from Centenary Colony, Peddapalli, Telangana."
    >
      <PageHero
        eyebrow="Find Classmates"
        title="Alumni Directory"
        description="Search by name, role, or city. Filter by batch to find your classmates from Pragathi High School."
      />

      <section className="pb-24">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, role, city..."
                className="w-full bg-input border border-border rounded-full pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="bg-input border border-border rounded-full px-5 py-3 focus:outline-none focus:border-primary transition-colors"
            >
              <option value="all">All Batches</option>
              {batches.map((b) => <option key={b} value={b}>Batch {b}</option>)}
            </select>
          </div>

          <p className="text-center text-sm text-muted-foreground mb-8">
            Showing <span className="text-primary">{results.length}</span> of {alumni.length} alumni
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((a, i) => (
              <div
                key={a.id}
                className="group p-6 rounded-2xl border border-border/60 bg-card hover-lift animate-fade-in-up"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center font-display text-xl text-primary-foreground shrink-0 shadow-gold">
                    {a.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl text-foreground truncate">{a.name}</h3>
                    <div className="text-xs uppercase tracking-[0.15em] text-primary mt-0.5">Batch {a.batch}</div>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <p className="line-clamp-1">{a.role}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={12} className="text-primary" /> {a.city}</p>
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No alumni found. Try a different search.</p>
          )}

          <p className="text-center text-xs text-muted-foreground mt-10 italic">
            Email addresses are visible only to verified, registered members.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Directory;
