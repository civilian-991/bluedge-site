"use client";

import { useEffect, useRef, useCallback } from "react";
import { getAudioContext, isGlobalMuted, onMuteChange } from "./useRetroSound";

type SectionId =
  | "hero"
  | "matrix"
  | "retrotv"
  | "polaroid"
  | "grendizer"
  | "about"
  | "newspaper"
  | "telegram";

const MASTER_VOLUME = 0.15;
const CROSSFADE_TIME = 1.5;

interface AmbientGenerator {
  gainNode: GainNode;
  stop: () => void;
}

// --- Procedural audio generators ---

function createSpacePad(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  // Low sine chord C2 + G2
  const oscs: OscillatorNode[] = [];
  [65.41, 98.0].forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    // Slow LFO on volume
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.3;
    lfo.connect(lfoGain);

    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.5;
    lfoGain.connect(oscGain.gain);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 200;
    filter.Q.value = 1;

    osc.connect(filter).connect(oscGain).connect(gain);
    osc.start();
    lfo.start();
    oscs.push(osc, lfo);
  });

  return { gainNode: gain, stop: () => oscs.forEach((o) => { try { o.stop(); } catch {} }) };
}

function createDigitalRain(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  // Filtered noise with high-freq clicks
  const bufSize = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.98 ? 1 : 0.02);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 6000;
  filter.Q.value = 2;

  const convolver = ctx.createConvolver();
  // Simple reverb impulse
  const reverbBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
  const reverbData = reverbBuf.getChannelData(0);
  for (let i = 0; i < reverbData.length; i++) {
    reverbData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
  }
  convolver.buffer = reverbBuf;

  src.connect(filter).connect(convolver).connect(gain);
  src.start();

  return { gainNode: gain, stop: () => { try { src.stop(); } catch {} } };
}

function createCRTHum(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  // 60Hz buzz
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 60;
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.3;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 300;

  osc.connect(filter).connect(oscGain).connect(gain);
  osc.start();

  // Static hiss
  const bufSize = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.15;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const hissFilter = ctx.createBiquadFilter();
  hissFilter.type = "bandpass";
  hissFilter.frequency.value = 4000;
  hissFilter.Q.value = 0.5;
  const hissGain = ctx.createGain();
  hissGain.gain.value = 0.4;
  src.connect(hissFilter).connect(hissGain).connect(gain);
  src.start();

  return { gainNode: gain, stop: () => { try { osc.stop(); src.stop(); } catch {} } };
}

function createVinylCrackle(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  const bufSize = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    // Filtered noise with random pops
    data[i] = (Math.random() * 2 - 1) * 0.05;
    if (Math.random() > 0.9995) data[i] = (Math.random() > 0.5 ? 1 : -1) * 0.6;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2000;
  filter.Q.value = 0.3;

  src.connect(filter).connect(gain);
  src.start();

  return { gainNode: gain, stop: () => { try { src.stop(); } catch {} } };
}

function createMechaIdle(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  // Low engine rumble
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 35;
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.4;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 120;
  osc.connect(filter).connect(oscGain).connect(gain);
  osc.start();

  // Servo whir (periodic)
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.3;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 20;
  lfo.connect(lfoGain);
  const servoOsc = ctx.createOscillator();
  servoOsc.type = "sine";
  servoOsc.frequency.value = 400;
  lfoGain.connect(servoOsc.frequency);
  const servoGain = ctx.createGain();
  servoGain.gain.value = 0.08;
  servoOsc.connect(servoGain).connect(gain);
  servoOsc.start();
  lfo.start();

  return { gainNode: gain, stop: () => { try { osc.stop(); servoOsc.stop(); lfo.stop(); } catch {} } };
}

function createPenOnPaper(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  const bufSize = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.95 ? 0.3 : 0.02);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3000;
  filter.Q.value = 1.5;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -30;
  compressor.ratio.value = 4;

  src.connect(filter).connect(compressor).connect(gain);
  src.start();

  return { gainNode: gain, stop: () => { try { src.stop(); } catch {} } };
}

function createPrintingPress(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  // Rhythmic low thud
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 50;
  const lfo = ctx.createOscillator();
  lfo.type = "square";
  lfo.frequency.value = 1.2; // beats per second
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.5;
  lfo.connect(lfoGain);
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.3;
  lfoGain.connect(oscGain.gain);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 150;
  osc.connect(filter).connect(oscGain).connect(gain);
  osc.start();
  lfo.start();

  // Paper whoosh noise
  const bufSize = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.08;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 1500;
  noiseFilter.Q.value = 0.5;
  src.connect(noiseFilter).connect(gain);
  src.start();

  return { gainNode: gain, stop: () => { try { osc.stop(); lfo.stop(); src.stop(); } catch {} } };
}

function createTelegraphOffice(ctx: AudioContext, dest: AudioNode): AmbientGenerator {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(dest);

  // Room tone
  const bufSize = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.02;
    // Distant clicks
    if (Math.random() > 0.999) data[i] += (Math.random() > 0.5 ? 1 : -1) * 0.2;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2000;

  src.connect(filter).connect(gain);
  src.start();

  return { gainNode: gain, stop: () => { try { src.stop(); } catch {} } };
}

const generators: Record<SectionId, (ctx: AudioContext, dest: AudioNode) => AmbientGenerator> = {
  hero: createSpacePad,
  matrix: createDigitalRain,
  retrotv: createCRTHum,
  polaroid: createVinylCrackle,
  grendizer: createMechaIdle,
  about: createPenOnPaper,
  newspaper: createPrintingPress,
  telegram: createTelegraphOffice,
};

export function useAmbientAudio() {
  const activeRef = useRef<SectionId | null>(null);
  const instancesRef = useRef<Map<SectionId, AmbientGenerator>>(new Map());
  const masterGainRef = useRef<GainNode | null>(null);
  const initializedRef = useRef(false);

  const initialize = useCallback(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    try {
      const ctx = getAudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.value = isGlobalMuted() ? 0 : MASTER_VOLUME;
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Create all generators upfront (they start silent)
      (Object.keys(generators) as SectionId[]).forEach((id) => {
        const gen = generators[id](ctx, masterGain);
        instancesRef.current.set(id, gen);
      });
    } catch {
      // AudioContext might not be available
    }
  }, []);

  const crossfadeTo = useCallback((sectionId: SectionId | null) => {
    if (sectionId === activeRef.current) return;

    if (!initializedRef.current) {
      initialize();
    }

    const ctx = (() => { try { return getAudioContext(); } catch { return null; } })();
    if (!ctx) return;

    // Fade out current
    if (activeRef.current) {
      const current = instancesRef.current.get(activeRef.current);
      if (current) {
        current.gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + CROSSFADE_TIME);
      }
    }

    // Fade in new
    if (sectionId) {
      const next = instancesRef.current.get(sectionId);
      if (next) {
        next.gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + CROSSFADE_TIME);
      }
    }

    activeRef.current = sectionId;
  }, [initialize]);

  // Listen for mute changes
  useEffect(() => {
    const cleanup = onMuteChange((muted) => {
      if (masterGainRef.current) {
        try {
          const ctx = getAudioContext();
          masterGainRef.current.gain.linearRampToValueAtTime(
            muted ? 0 : MASTER_VOLUME,
            ctx.currentTime + 0.3
          );
        } catch {}
      }
    });
    return cleanup;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      instancesRef.current.forEach((gen) => gen.stop());
      instancesRef.current.clear();
    };
  }, []);

  return { crossfadeTo, initialize };
}
