"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SoundType =
  | "channelSwitch"
  | "pillHover"
  | "pillClick"
  | "rocketCountdown"
  | "rocketLaunch"
  | "arcadeCount"
  | "comicPop"
  | "newspaperUnfold"
  | "telegraphKey"
  | "scrollMilestone"
  | "hoverBlip"
  | "konamiVictory"
  | "collectFound";

let globalCtx: AudioContext | null = null;
let globalMuted =
  typeof window !== "undefined"
    ? localStorage.getItem("retro-sound-muted") === "true"
    : false;

const listeners = new Set<(m: boolean) => void>();

function getCtx(): AudioContext {
  if (!globalCtx) {
    globalCtx = new AudioContext();
  }
  if (globalCtx.state === "suspended") {
    globalCtx.resume();
  }
  return globalCtx;
}

// --- Sound factories ---

function playNoiseBurst(ctx: AudioContext, duration = 0.15) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3000;
  filter.Q.value = 0.7;
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + duration);
}

function playLowHum(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 60;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
  gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.4);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.6);
}

function playDramaticChord(ctx: AudioContext) {
  const freqs = [130.81, 164.81, 196.0, 261.63];
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = f;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2000;
    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.02);
    osc.stop(ctx.currentTime + 1.2);
  });
}

function playBeepSequence(ctx: AudioContext) {
  [440, 520, 660].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.3);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + i * 0.3 + 0.15
    );
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.3);
    osc.stop(ctx.currentTime + i * 0.3 + 0.2);
  });
}

function playRocketLaunch(ctx: AudioContext) {
  // Noise sweep
  const dur = 1.2;
  const bufferSize = ctx.sampleRate * dur;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + dur);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + dur);
  // Sine sweep up
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(80, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + dur);
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.1, ctx.currentTime);
  g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  osc.connect(g2).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + dur);
}

function playArcadeCount(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 8000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

function playComicPop(ctx: AudioContext) {
  const dur = 0.08;
  const bufferSize = ctx.sampleRate * dur;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 2000;
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + dur);
}

function playNewspaperUnfold(ctx: AudioContext) {
  const dur = 0.4;
  const bufferSize = ctx.sampleRate * dur;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(500, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(5000, ctx.currentTime + dur);
  filter.Q.value = 1;
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + dur);
}

function playTelegraphKey(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.value = 800;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.06);
}

function playScrollChime(ctx: AudioContext) {
  const freqs = [523.25, 659.25, 783.99];
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + i * 0.08 + 0.3
    );
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + i * 0.08);
    osc.stop(ctx.currentTime + i * 0.08 + 0.35);
  });
}

function playHoverBlip(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 1200;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.07);
}

function playKonamiVictory(ctx: AudioContext) {
  const notes = [523, 587, 659, 784, 880, 784, 880, 1047];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    const t = ctx.currentTime + i * 0.1;
    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  });
}

function playCollectFound(ctx: AudioContext) {
  const notes = [660, 880, 1100];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    const t = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  });
}

const soundMap: Record<SoundType, (ctx: AudioContext) => void> = {
  channelSwitch: (ctx) => playNoiseBurst(ctx, 0.15),
  pillHover: playLowHum,
  pillClick: playDramaticChord,
  rocketCountdown: playBeepSequence,
  rocketLaunch: playRocketLaunch,
  arcadeCount: playArcadeCount,
  comicPop: playComicPop,
  newspaperUnfold: playNewspaperUnfold,
  telegraphKey: playTelegraphKey,
  scrollMilestone: playScrollChime,
  hoverBlip: playHoverBlip,
  konamiVictory: playKonamiVictory,
  collectFound: playCollectFound,
};

export function getAudioContext(): AudioContext {
  return getCtx();
}

export function isGlobalMuted(): boolean {
  return globalMuted;
}

export function onMuteChange(handler: (m: boolean) => void): () => void {
  listeners.add(handler);
  return () => { listeners.delete(handler); };
}

export function useRetroSound() {
  const [muted, setMutedState] = useState(globalMuted);
  const initialized = useRef(false);

  useEffect(() => {
    const handler = (m: boolean) => setMutedState(m);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const setMuted = useCallback((m: boolean) => {
    globalMuted = m;
    localStorage.setItem("retro-sound-muted", String(m));
    listeners.forEach((fn) => fn(m));
  }, []);

  const toggleMute = useCallback(() => {
    setMuted(!globalMuted);
  }, [setMuted]);

  const playSound = useCallback((type: SoundType) => {
    if (globalMuted) return;
    // Respect reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    try {
      const ctx = getCtx();
      if (!initialized.current) {
        initialized.current = true;
      }
      const fn = soundMap[type];
      if (fn) fn(ctx);
    } catch {
      // AudioContext can fail in some environments
    }
  }, []);

  return { playSound, muted, toggleMute, setMuted };
}
