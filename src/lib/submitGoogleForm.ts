/**
 * POSTs to one Google Apps Script web app. Uses fetch + `no-cors`.
 * The script routes on `form`: `register` vs `contact`.
 */

function appsScriptUrl(): string {
  const url = (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined)?.trim();
  if (!url) {
    throw new Error(
      "Missing VITE_GOOGLE_APPS_SCRIPT_URL in .env — add your /exec URL and restart `npm run dev`."
    );
  }
  return url;
}

function postToAppsScript(fields: Record<string, string>, logLabel: string): Promise<void> {
  const url = appsScriptUrl();

  if (import.meta.env.DEV) {
    console.info(`[${logLabel}] POST (no-cors) →`, url);
  }

  const body = new URLSearchParams(fields);

  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    body,
  }).then(() => {
    /* Opaque response */
  });
}

export function submitAlumniRegistrationToGoogleForm(
  data: {
    name: string;
    batch: string;
    email: string;
    city: string;
    linkedin?: string;
    message?: string;
  },
  volunteer: boolean
): Promise<void> {
  return postToAppsScript(
    {
      form: "register",
      name: data.name,
      batch: data.batch,
      email: data.email,
      city: data.city,
      linkedin: (data.linkedin ?? "").toString(),
      message: (data.message ?? "").toString(),
      volunteer: volunteer ? "Yes" : "No",
    },
    "register"
  );
}

export function submitContactMessageToGoogleSheet(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  return postToAppsScript(
    {
      form: "contact",
      name: data.name,
      email: data.email,
      message: data.message,
    },
    "contact"
  );
}
