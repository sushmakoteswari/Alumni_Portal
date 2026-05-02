import { useCallback, useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/sections/PageHero";
import { alumni as fallbackAlumni } from "@/data/alumni";
import type { Alumnus } from "@/data/alumni";
import { fetchAlumniDirectoryFromSheet } from "@/lib/fetchAlumniDirectory";
import { Search, MapPin, RefreshCw, Linkedin } from "lucide-react";

function linkedinHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "#";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

type LoadState = "loading" | "ready" | "error";

function sortAlumni(list: Alumnus[]): Alumnus[] {
  return [...list].sort((a, b) => b.batch - a.batch || a.name.localeCompare(b.name));
}

const Directory = () => {
  const [q, setQ] = useState("");
  const [batch, setBatch] = useState("all");
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [source, setSource] = useState<"sheet" | "fallback" | "none">("none");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasScriptUrl = Boolean((import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined)?.trim());

  const load = useCallback(async () => {
    if (!hasScriptUrl) {
      setAlumni(sortAlumni(fallbackAlumni));
      setSource("fallback");
      setLoadState("ready");
      setErrorMessage(null);
      return;
    }

    setLoadState("loading");
    setErrorMessage(null);
    try {
      const rows = await fetchAlumniDirectoryFromSheet();
      if (rows.length === 0) {
        setAlumni([]);
        setSource("sheet");
      } else {
        setAlumni(sortAlumni(rows));
        setSource("sheet");
      }
      setLoadState("ready");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setErrorMessage(msg);
      setAlumni(sortAlumni(fallbackAlumni));
      setSource("fallback");
      setLoadState("ready");
    }
  }, [hasScriptUrl]);

  useEffect(() => {
    void load();
  }, [load]);

  const batches = useMemo(() => Array.from(new Set(alumni.map((a) => a.batch))).sort(), [alumni]);
  const results = useMemo(() => {
    return alumni.filter((a) => {
      const matchQ =
        !q ||
        (a.name + a.role + a.city + (a.linkedin ?? "")).toLowerCase().includes(q.toLowerCase());
      const matchB = batch === "all" || a.batch === Number(batch);
      return matchQ && matchB;
    });
  }, [q, batch, alumni]);

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
          {!hasScriptUrl && (
            <p className="max-w-3xl mx-auto mb-6 rounded-xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm text-muted-foreground text-center">
              Add <code className="text-foreground">VITE_GOOGLE_APPS_SCRIPT_URL</code> to <code className="text-foreground">.env</code>{" "}
              to load registrations from Google Sheets. Showing sample listings until then.
            </p>
          )}

          {hasScriptUrl && source === "fallback" && errorMessage && (
            <div className="max-w-3xl mx-auto mb-6 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-4 text-sm text-muted-foreground">
              <p className="mb-2">
                Could not load the live directory ({errorMessage}). Showing sample listings. Ask your Apps Script deploy to expose{" "}
                <code className="text-foreground">GET ?action=list</code> returning{" "}
                <code className="text-foreground">{"{ ok: true, rows: [...] }"}</code> — see{" "}
                <code className="text-foreground">scripts/google-apps-script-webapp.gs</code>.
              </p>
              <button
                type="button"
                onClick={() => void load()}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, role, city..."
                disabled={loadState === "loading"}
                className="w-full bg-input border border-border rounded-full pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
              />
            </div>
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              disabled={loadState === "loading"}
              className="bg-input border border-border rounded-full px-5 py-3 focus:outline-none focus:border-primary transition-colors disabled:opacity-60"
            >
              <option value="all">All Batches</option>
              {batches.map((b) => (
                <option key={b} value={b}>
                  Batch {b}
                </option>
              ))}
            </select>
          </div>

          <p className="text-center text-sm text-muted-foreground mb-8">
            {loadState === "loading" ? (
              "Loading directory…"
            ) : (
              <>
                Showing <span className="text-primary">{results.length}</span> of {alumni.length} alumni
                {source === "sheet" && <span className="text-muted-foreground/80"> · from registrations</span>}
              </>
            )}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadState === "loading"
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border/40 bg-card/50 animate-pulse h-44" />
                ))
              : results.map((a, i) => (
                  <div
                    key={`${a.id}-${a.name}`}
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
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p className="line-clamp-2">{a.role}</p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="inline-flex items-center gap-1.5 min-w-0">
                          <MapPin size={12} className="text-primary shrink-0" />
                          <span className="truncate">{a.city}</span>
                        </span>
                        {a.linkedin?.trim() ? (
                          <a
                            href={linkedinHref(a.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            aria-label={`${a.name} on LinkedIn`}
                            className="inline-flex shrink-0 text-primary hover:opacity-90 transition-opacity"
                          >
                            <Linkedin size={16} strokeWidth={1.75} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {loadState !== "loading" && results.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              {alumni.length === 0
                ? hasScriptUrl && source === "sheet"
                  ? "Nothing to display yet"
                  : "Nothing to display yet."
                : "No alumni match your filters. Try a different search."}
            </p>
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
