const UNLOCKED_KEY = "magfai-unlocked";
const FOUND_KEY = "magfai-found";
const DECK_KEY = "magfai-deck";
const HANDSHAKE_KEY = "magfai-handshake-won";
const NOTE_KEY = "magfai-her-note";
const VISITS_KEY = "magfai-visits";
const VISIT_SESSION_KEY = "magfai-visit-session";
const COUPON_KEY = "magfai-coupon";
const MUTED_KEY = "magfai-muted";

export function readUnlocked() {
  try {
    return window.localStorage.getItem(UNLOCKED_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeUnlocked() {
  window.localStorage.setItem(UNLOCKED_KEY, "1");
}

export function readFound(): string[] {
  try {
    const raw = window.localStorage.getItem(FOUND_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function writeFound(ids: string[]) {
  window.localStorage.setItem(FOUND_KEY, JSON.stringify(ids));
}

export function readDeck(): number[] | null {
  try {
    const raw = window.localStorage.getItem(DECK_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.some((n) => typeof n !== "number")) return null;
    return parsed as number[];
  } catch {
    return null;
  }
}

export function writeDeck(deck: number[]) {
  window.localStorage.setItem(DECK_KEY, JSON.stringify(deck));
}

export function readHandshakeWon() {
  try {
    return window.localStorage.getItem(HANDSHAKE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeHandshakeWon() {
  window.localStorage.setItem(HANDSHAKE_KEY, "1");
}

export function readHerNote() {
  try {
    return window.localStorage.getItem(NOTE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function writeHerNote(text: string) {
  window.localStorage.setItem(NOTE_KEY, text);
}

export function bumpVisits() {
  try {
    if (window.sessionStorage.getItem(VISIT_SESSION_KEY) === "1") {
      return readVisits();
    }
    window.sessionStorage.setItem(VISIT_SESSION_KEY, "1");
    const next = readVisits() + 1;
    window.localStorage.setItem(VISITS_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
}

export function readVisits() {
  try {
    const raw = window.localStorage.getItem(VISITS_KEY);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function readCouponOpen() {
  try {
    return window.localStorage.getItem(COUPON_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeCouponOpen() {
  window.localStorage.setItem(COUPON_KEY, "1");
}

export function readMuted() {
  try {
    return window.localStorage.getItem(MUTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeMuted(value: boolean) {
  window.localStorage.setItem(MUTED_KEY, value ? "1" : "0");
}

export function smsHref(body: string) {
  const encoded = encodeURIComponent(body);
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  return ios ? `sms:+48722068037&body=${encoded}` : `sms:+48722068037?body=${encoded}`;
}
