const SECRET = "szonik🎀";

function normalize(value: string) {
  return value.normalize("NFC").replace(/\uFE0F/g, "");
}

export function isExactPassword(value: string) {
  return normalize(value) === normalize(SECRET);
}
