function hostFrom(value: string) {
  return value
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0]
    .trim()
    .toLowerCase();
}

function isPublicHost(host: string) {
  if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return false;
  if (host.includes("localhost") || /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return false;
  if (host.includes("grok-sandbox")) return false;
  if (host.endsWith(".vercel.app")) return false;
  return true;
}

export function publicSiteUrl() {
  const published = hostFrom(String(import.meta.env.VITE_PUBLIC_HOSTNAME ?? ""));
  if (isPublicHost(published)) return `https://${published}`;
  if (typeof window === "undefined") return "";
  const live = hostFrom(window.location.hostname);
  if (isPublicHost(live)) return `${window.location.protocol}//${live}`;
  return "";
}
