import { isNightHours } from "@/lib/magfai/together";
import { readMuted, writeMuted } from "@/lib/magfai/storage";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let muted = false;
let musicOn = false;
let musicTimer = 0;
let typeTimer = 0;
let cryTimer = 0;
let heartTimer = 0;
let lastPet = 0;
let noise: AudioBuffer | null = null;

function now() {
  return ctx?.currentTime ?? 0;
}

function boot() {
  if (ctx) {
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  }
  const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  ctx = new AudioCtx();
  master = ctx.createGain();
  musicGain = ctx.createGain();
  sfxGain = ctx.createGain();
  master.connect(ctx.destination);
  musicGain.connect(master);
  sfxGain.connect(master);
  muted = readMuted();
  applyMute();
  applyMusicLevel();
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  noise = buffer;
  return ctx;
}

function applyMute() {
  if (!master) return;
  master.gain.setTargetAtTime(muted ? 0 : 1, now(), 0.04);
}

function applyMusicLevel() {
  if (!musicGain) return;
  const night = isNightHours() || quietEvening();
  musicGain.gain.setTargetAtTime(night ? 0.045 : 0.09, now(), 0.2);
}

function quietEvening() {
  try {
    const hour = Number(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw",
        hour: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date()).find((part) => part.type === "hour")?.value ?? 12,
    );
    return hour >= 22;
  } catch {
    return false;
  }
}

function tone(
  freq: number,
  when: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  dest: GainNode,
  slide = freq,
) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, when);
  if (slide !== freq) osc.frequency.exponentialRampToValueAtTime(Math.max(1, slide), when + dur);
  amp.gain.setValueAtTime(0.0001, when);
  amp.gain.exponentialRampToValueAtTime(gain, when + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(amp);
  amp.connect(dest);
  osc.start(when);
  osc.stop(when + dur + 0.02);
}

function burstNoise(when: number, dur: number, gain: number, hp: number, lp: number, dest: GainNode) {
  if (!ctx || !noise) return;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = (hp + lp) / 2;
  filter.Q.value = 0.7;
  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.0001, when);
  amp.gain.exponentialRampToValueAtTime(gain, when + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  src.connect(filter);
  filter.connect(amp);
  amp.connect(dest);
  src.start(when);
  src.stop(when + dur + 0.02);
}

function scheduleMusic(from: number) {
  if (!ctx || !musicGain) return;
  const dest = musicGain;
  const bar = 1.85;
  const roots = [130.81, 110, 87.31, 98];
  const thirds = [164.81, 130.81, 110, 123.47];
  const fifths = [196, 164.81, 130.81, 146.83];
  const melody = [261.63, 329.63, 392, 329.63, 293.66, 261.63, 220, 196, 261.63, 246.94, 261.63, 196];
  roots.forEach((freq, i) => {
    const t = from + i * bar;
    tone(freq, t, bar * 1.05, "sine", 0.07, dest, freq * 0.99);
    tone(thirds[i]!, t + 0.05, bar, "sine", 0.045, dest);
    tone(fifths[i]!, t + 0.08, bar * 0.95, "triangle", 0.03, dest);
  });
  melody.forEach((freq, i) => {
    const t = from + i * (bar / 3);
    tone(freq, t, 0.55, "sine", 0.055, dest, freq * 1.01);
  });
}

function pumpMusic() {
  if (!ctx || !musicOn) return;
  scheduleMusic(now() + 0.05);
  musicTimer = window.setTimeout(pumpMusic, 7200);
}

export function unlockAudio() {
  const audio = boot();
  if (!audio) return;
  if (!musicOn) {
    musicOn = true;
    pumpMusic();
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  writeMuted(next);
  boot();
  applyMute();
}

export function playPaper() {
  if (!boot() || !sfxGain) return;
  const t = now();
  burstNoise(t, 0.18, 0.22, 800, 2400, sfxGain);
  burstNoise(t + 0.07, 0.14, 0.12, 400, 1600, sfxGain);
}

export function playError() {
  if (!boot() || !sfxGain) return;
  const t = now();
  tone(420, t, 0.12, "square", 0.08, sfxGain, 380);
  tone(180, t + 0.13, 0.22, "square", 0.1, sfxGain, 140);
}

export function playPet() {
  if (!boot() || !sfxGain) return;
  const stamp = performance.now();
  if (stamp - lastPet < 160) return;
  lastPet = stamp;
  burstNoise(now(), 0.16, 0.1, 180, 640, sfxGain);
}

export function playWin() {
  if (!boot() || !sfxGain) return;
  const dest = sfxGain;
  const t = now();
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => tone(freq, t + i * 0.12, 0.28, "triangle", 0.09, dest));
  tone(1318.5, t + 0.5, 0.45, "sine", 0.06, dest);
}

export function startTypewriter() {
  stopTypewriter();
  if (!boot() || !sfxGain) return;
  const click = () => {
    if (!sfxGain) return;
    tone(880 + Math.random() * 120, now(), 0.035, "square", 0.045, sfxGain);
    burstNoise(now(), 0.03, 0.05, 2000, 5000, sfxGain);
  };
  click();
  typeTimer = window.setInterval(click, 85);
}

export function stopTypewriter() {
  if (typeTimer) window.clearInterval(typeTimer);
  typeTimer = 0;
}

export function startCry() {
  stopCry();
  if (!boot() || !sfxGain) return;
  const sob = () => {
    if (!sfxGain) return;
    const t = now();
    tone(620, t, 0.45, "sine", 0.07, sfxGain, 340);
    tone(480, t + 0.12, 0.38, "triangle", 0.05, sfxGain, 260);
    burstNoise(t, 0.4, 0.04, 900, 1800, sfxGain);
  };
  sob();
  cryTimer = window.setInterval(sob, 1100);
}

export function stopCry() {
  if (cryTimer) window.clearInterval(cryTimer);
  cryTimer = 0;
}

export function startHeartbeat() {
  stopHeartbeat();
  if (!boot() || !sfxGain) return;
  const beat = () => {
    if (!sfxGain) return;
    const t = now();
    tone(70, t, 0.12, "sine", 0.18, sfxGain, 50);
    tone(62, t + 0.18, 0.16, "sine", 0.14, sfxGain, 48);
  };
  beat();
  heartTimer = window.setInterval(beat, 820);
}

export function stopHeartbeat() {
  if (heartTimer) window.clearInterval(heartTimer);
  heartTimer = 0;
}
