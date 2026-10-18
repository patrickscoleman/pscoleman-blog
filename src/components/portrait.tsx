'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  portraitPhase,
  portraitRenderTime,
  PORTRAIT_DURATION,
} from '@/lib/portrait-field';
import type { createPortraitRenderer } from '@/lib/portrait-renderer';

type Mode = 'waiting' | 'playing' | 'paused' | 'done' | 'still';
const DURATION = PORTRAIT_DURATION;
const DELAY = 2000;
const SPEED = 1.25;
const ease = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

export function Portrait() {
  const root = useRef<HTMLDivElement>(null);
  const photograph = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const toggle = useRef<() => void>(() => {});
  const [mode, setMode] = useState<Mode | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const frame = root.current;
    const image = photograph.current;
    const surface = canvas.current;
    const context = surface?.getContext('2d');
    if (!frame || !image || !surface || !context) return;
    const container = frame;
    const photo = image;
    const layer = surface;
    const ctx = context;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduce = preference.matches;
    setReduced(reduce);
    let active = !reduce;
    let loaded = false;
    let disposed = false;
    let inView = false;
    let renderer: ReturnType<typeof createPortraitRenderer> | undefined;
    let worker: Worker | undefined;
    let workerTimer: ReturnType<typeof setTimeout> | undefined;
    let pending: { id: number; key: number; epoch: number } | undefined;
    let sequence = 0;
    let epoch = 0;
    let renderedKey: number | undefined;
    let fallingBack = false;
    let loading = false;
    let elapsed = -DELAY;
    let previous = 0;
    let request = 0;
    let stillVector = false;
    let aimAngle = Math.PI;
    const bio = container.closest('main')?.querySelector('.bio p');
    function measureAim() {
      if (!bio) return;
      const source = layer.getBoundingClientRect();
      const target = bio.getBoundingClientRect();
      aimAngle = Math.atan2(
        target.top +
          Math.min(24, target.height / 2) -
          (source.top + source.height / 2),
        target.left +
          Math.min(180, target.width / 2) -
          (source.left + source.width / 2),
      );
      container.dataset.aimAngle = aimAngle.toFixed(3);
      renderedKey = undefined;
    }

    function restorePhoto() {
      photo.style.setProperty('--photo-opacity', '1');
      layer.style.opacity = '0';
    }
    function draw(ms: number, fixed = false) {
      const phase = fixed ? { opacity: 1, level: 1 } : portraitPhase(ms, 6);
      const key = portraitRenderTime(ms, fixed);
      if (key !== renderedKey) {
        if (worker && !pending) {
          pending = { id: ++sequence, key, epoch };
          worker.postMessage({
            id: sequence,
            ms: key < 0 ? 0 : key,
            fixed,
            aimAngle,
          });
        } else if (renderer) {
          renderer(key < 0 ? 0 : key, fixed, aimAngle);
          renderedKey = key;
        }
      }
      const opacity = ease(phase.opacity);
      layer.style.opacity = String(opacity);
      photo.style.setProperty('--photo-opacity', String(1 - opacity));
      const size = String(64 / 2 ** Math.min(6, Math.floor(phase.level)));
      if (container.dataset.scale !== size) container.dataset.scale = size;
    }
    function ready() {
      if (disposed) return;
      loaded = true;
      loading = false;
      setMode(active ? 'waiting' : 'done');
      sync();
    }
    async function fallback() {
      if (disposed || fallingBack) return;
      fallingBack = true;
      clearTimeout(workerTimer);
      worker?.terminate();
      worker = undefined;
      pending = undefined;
      renderedKey = undefined;
      try {
        const [module, data] = await Promise.all([
          import('@/lib/portrait-renderer'),
          import('@/generated/portrait-vectors.json'),
        ]);
        if (disposed) return;
        renderer = module.createPortraitRenderer(ctx, data.default);
        container.dataset.renderer = 'fallback';
        if (loaded) {
          if (reduce && stillVector) draw(0, true);
          else if (active && elapsed >= 0) draw(elapsed);
          sync();
        } else ready();
      } catch {
        active = false;
        restorePhoto();
        setMode('done');
      }
    }
    function stopFrame() {
      epoch++;
      cancelAnimationFrame(request);
      request = 0;
      previous = 0;
    }
    function sync() {
      stopFrame();
      if (active && loaded && inView && !document.hidden && !reduce) {
        request = requestAnimationFrame(tick);
      }
    }
    function tick(now: number) {
      request = 0;
      if (disposed || !active || !inView || document.hidden || reduce) return;
      const before = elapsed;
      if (previous)
        elapsed += Math.min(now - previous, 80) * (elapsed < 0 ? 1 : SPEED);
      previous = now;
      if (before < 0 && elapsed >= 0) {
        setMode('playing');
      }
      if (elapsed >= DURATION) {
        active = false;
        restorePhoto();
        setMode('done');
        return;
      }
      if (elapsed >= 0) draw(elapsed);
      request = requestAnimationFrame(tick);
    }
    function load() {
      if (
        loaded ||
        loading ||
        disposed ||
        !inView ||
        !photo.complete ||
        !photo.naturalWidth
      )
        return;
      loading = true;
      measureAim();
      if (
        typeof Worker === 'undefined' ||
        typeof OffscreenCanvas === 'undefined'
      ) {
        void fallback();
        return;
      }
      try {
        worker = new Worker(
          new URL('../lib/portrait-worker.ts', import.meta.url),
          { type: 'module' },
        );
        workerTimer = setTimeout(() => void fallback(), 5000);
        worker.onerror = () => void fallback();
        worker.onmessage = ({
          data,
        }: MessageEvent<{
          type: string;
          id?: number;
          bitmap?: ImageBitmap;
        }>) => {
          if (data.type === 'ready') {
            clearTimeout(workerTimer);
            container.dataset.renderer = 'worker';
            ready();
          } else if (data.type === 'error') {
            void fallback();
          } else if (data.bitmap) {
            const job = pending;
            pending = undefined;
            // Late frames cannot undo pause, reduced motion, tab hiding or reset.
            if (!disposed && job && job.id === data.id && job.epoch === epoch) {
              ctx.clearRect(0, 0, 640, 640);
              ctx.drawImage(data.bitmap, 0, 0);
              renderedKey = job.key;
            }
            data.bitmap.close();
            if (!disposed && reduce && stillVector && renderedKey !== -1)
              draw(0, true);
          }
        };
      } catch {
        void fallback();
      }
    }
    toggle.current = () => {
      if (!loaded) return;
      if (reduce) {
        epoch++;
        stillVector = !stillVector;
        if (stillVector) draw(0, true);
        else restorePhoto();
        setMode(stillVector ? 'still' : 'done');
        return;
      }
      if (active) {
        active = false;
        setMode('paused');
      } else {
        if (elapsed >= DURATION || elapsed < 0) elapsed = 0;
        active = true;
        setMode('playing');
      }
      sync();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.6;
        if (inView) void load();
        sync();
      },
      { threshold: [0, 0.6] },
    );
    const motionChanged = () => {
      reduce = preference.matches;
      setReduced(reduce);
      active = false;
      elapsed = DURATION;
      stillVector = false;
      restorePhoto();
      if (loaded) setMode('done');
      sync();
    };
    const sizeObserver = new ResizeObserver(measureAim);
    sizeObserver.observe(frame);
    if (bio) sizeObserver.observe(bio);
    observer.observe(frame);
    image.addEventListener('load', load);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', motionChanged);
    return () => {
      disposed = true;
      clearTimeout(workerTimer);
      worker?.terminate();
      stopFrame();
      observer.disconnect();
      sizeObserver.disconnect();
      image.removeEventListener('load', load);
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', motionChanged);
      restorePhoto();
    };
  }, []);

  const playing = mode === 'waiting' || mode === 'playing';
  const label = reduced
    ? mode === 'still'
      ? 'Show illustrated portrait'
      : 'Show vector portrait'
    : playing
      ? 'Pause portrait animation'
      : 'Play portrait animation';
  return (
    <div ref={root} className="portrait-frame" data-mode={mode ?? 'photo'}>
      <div className="portrait-art">
        <Image
          ref={photograph}
          src="/images/patrick-layered.webp"
          alt="Illustrated portrait of Patrick Coleman"
          width={768}
          height={768}
          sizes="(max-width: 359px) 115px, (max-width: 639px) 39vw, (max-width: 900px) 249px, 345px"
          preload
          className="portrait"
        />
        <canvas
          ref={canvas}
          width={640}
          height={640}
          className="portrait-vectors"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
      {mode && (
        <button
          type="button"
          className="portrait-control"
          aria-label={label}
          title={label}
          onClick={() => toggle.current()}
        >
          <span aria-hidden="true">
            [{' '}
            <span className="portrait-control-label">
              {reduced
                ? mode === 'still'
                  ? 'image'
                  : 'vector'
                : playing
                  ? 'pause'
                  : 'play'}
            </span>{' '}
            ]
          </span>
        </button>
      )}
    </div>
  );
}
