import type { Alumnus } from "@/data/alumni";
import { getGoogleAppsScriptWebAppUrl } from "@/lib/submitGoogleForm";

/**
 * Loads alumni rows from the registration sheet via Web App GET `?action=list`.
 * Canonical Apps Script lives in repo: `scripts/google-apps-script-webapp.gs`.
 */

function normalizeHeaderKey(key: string): string {
  return key.trim().toLowerCase().replace(/\s+/g, "_");
}

function indexRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[normalizeHeaderKey(k)] = v;
  }
  return out;
}

function pickString(idx: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const v = idx[key];
    if (v == null) continue;
    if (typeof v === "number" && Number.isFinite(v)) return String(Math.trunc(v));
    const s = String(v).trim();
    if (s !== "") return s;
  }
  return "";
}

function initialsFromName(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  const a = parts[0][0];
  const b = parts[parts.length - 1][0];
  return `${a}${b}`.toUpperCase();
}

function rowToAlumnus(row: Record<string, unknown>, id: number): Alumnus | null {
  const idx = indexRow(row);
  const name = pickString(idx, "name", "full_name");
  if (!name) return null;

  const batchRaw = pickString(
    idx,
    "batch",
    "year",
    "batch_year",
    "graduation_year",
    "batch_(year)",
  );
  const batchNum = Number.parseInt(batchRaw, 10);
  if (!Number.isFinite(batchNum) || batchNum < 1950 || batchNum > 2100) return null;

  const city = pickString(idx, "city", "current_city");
  const linkedin = pickString(idx, "linkedin");
  const message = pickString(idx, "message");

  const role =
    pickString(idx, "role", "profession", "job", "title") ||
    (message ? message.slice(0, 120) + (message.length > 120 ? "…" : "") : "");

  const out: Alumnus = {
    id,
    name,
    batch: batchNum,
    role: role || "Alumni",
    city: city || "—",
    initials: initialsFromName(name),
  };
  if (linkedin) out.linkedin = linkedin;
  return out;
}

function parseAppsScriptDirectoryJson(raw: string): unknown {
  const text = raw.replace(/^\uFEFF/, "").trimStart();
  return JSON.parse(text);
}

/** Plain-text fallback from Apps Script when `action=list` was not recognised (often: old deployment). */
function looksLikeLegacyDirectoryHelp(text: string): boolean {
  return /Pragathi web forms:|POST with form=register/i.test(text) && text.length < 500;
}

export async function fetchAlumniDirectoryFromSheet(): Promise<Alumnus[]> {
  const base = getGoogleAppsScriptWebAppUrl();
  const urlAction = new URL(base);
  urlAction.searchParams.set("action", "list");
  const urlList = new URL(base);
  urlList.searchParams.set("list", "1");

  let lastText = "";
  let lastResponse: Response | undefined;

  for (const href of [urlAction.toString(), urlList.toString()]) {
    let res: Response;
    try {
      res = await fetch(href, { method: "GET", mode: "cors", cache: "no-store" });
    } catch {
      continue;
    }
    lastResponse = res;
    const text = await res.text();
    lastText = text;
    if (!res.ok) continue;

    let data: unknown;
    try {
      data = parseAppsScriptDirectoryJson(text);
    } catch {
      continue;
    }
    if (!data || typeof data !== "object") continue;

    const body = data as { ok?: unknown; rows?: unknown; error?: unknown };
    if (body.ok === false) {
      const msg = typeof body.error === "string" ? body.error : "Apps Script returned ok:false";
      throw new Error(msg);
    }
    if (body.ok === true && Array.isArray(body.rows)) {
      return materializeRows(body.rows);
    }
  }

  if (lastResponse && !lastResponse.ok) {
    throw new Error(`Directory request failed (${lastResponse.status})`);
  }

  if (!lastText) {
    throw new Error("Empty response — check VITE_GOOGLE_APPS_SCRIPT_URL and network.");
  }

  try {
    const data = parseAppsScriptDirectoryJson(lastText);
    const body = data as { ok?: unknown; rows?: unknown; error?: unknown };
    if (body && typeof body === "object") {
      if (body.ok === false) {
        throw new Error(typeof body.error === "string" ? body.error : "Apps Script returned ok:false");
      }
      if (body.ok === true && Array.isArray(body.rows)) return materializeRows(body.rows);
    }
  } catch {
    /* fall through to messages below */
  }

  const looksLikeHtml = /^\s*</.test(lastText);
  if (looksLikeHtml) {
    throw new Error(
      "Got HTML instead of JSON — redeploy the Web App (scripts/google-apps-script-webapp.gs); access must be Anyone.",
    );
  }
  if (looksLikeLegacyDirectoryHelp(lastText)) {
    throw new Error(
      "Got the Web App help text instead of JSON — redeploy (Deploy → Manage deployments → New version). Then test YOUR_URL/exec?action=list in the browser.",
    );
  }

  throw new Error(
    "Could not parse directory JSON — redeploy scripts/google-apps-script-webapp.gs so doGet returns JSON for ?action=list or ?list=1.",
  );
}

function materializeRows(rows: unknown[]): Alumnus[] {
  const alumni: Alumnus[] = [];
  let nextId = 1;
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const a = rowToAlumnus(row as Record<string, unknown>, nextId);
    if (a) {
      alumni.push(a);
      nextId += 1;
    }
  }

  return alumni;
}
