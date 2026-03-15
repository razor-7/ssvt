import React, { useState, useEffect, useRef, useCallback } from 'react';

const FADE_MS = 400;
const INTERVAL_DEFAULT = 5000;

export default function HeroCarousel({ heroMessages, heroCTALabel, heroCarouselIntervalMs, scrollTargetId, ui }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const currentRef = useRef(0);
  const rafRef     = useRef(null);
  const startRef   = useRef(null);
  const ringRef    = useRef(null);
  const intervalMs = heroCarouselIntervalMs || INTERVAL_DEFAULT;

  const r    = 10;
  const circ = 2 * Math.PI * r;

  // Drive the progress ring via direct DOM — zero React re-renders per frame
  const tickProgress = useCallback((ts) => {
    if (!startRef.current) startRef.current = ts;
    const elapsed = ts - startRef.current;
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = circ * (1 - Math.min(elapsed / intervalMs, 1));
    }
    if (elapsed < intervalMs) rafRef.current = requestAnimationFrame(tickProgress);
  }, [intervalMs, circ]);

  const startProgress = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    if (ringRef.current) ringRef.current.style.strokeDashoffset = circ;
    if (!reducedMotion) rafRef.current = requestAnimationFrame(tickProgress);
  }, [reducedMotion, tickProgress, circ]);

  // No setTimeout, no visible state — just update current and let CSS handle the cross-fade
  const goTo = useCallback((next) => {
    currentRef.current = next;
    setCurrent(next);
    startProgress();
  }, [startProgress]);

  useEffect(() => {
    if (reducedMotion || paused || heroMessages.length <= 1) return;
    startProgress();
    const interval = setInterval(() => {
      const next = (currentRef.current + 1) % heroMessages.length;
      goTo(next);
    }, intervalMs);
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
    };
  }, [paused, reducedMotion, heroMessages.length, intervalMs, goTo, startProgress]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  function handleCTAClick(e) {
    e.preventDefault();
    const target = document.getElementById(scrollTargetId || 'services');
    if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <div
      onMouseEnter={() => { setPaused(true);  cancelAnimationFrame(rafRef.current); }}
      onMouseLeave={() => { setPaused(false); startProgress(); }}
      className="text-center text-white"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${current + 1} of ${heroMessages.length}: ${heroMessages[current].headline}`}
      </div>

      {/*
        CSS Grid stacking: all slides share the same grid cell.
        Container height = tallest slide — never changes, zero layout shift.
        Pure CSS opacity cross-fade, no content swap, no setTimeout timing risk.
      */}
      <div style={{ display: 'grid', gridTemplateAreas: '"slide"' }}>
        {heroMessages.map((msg, i) => (
          <div
            key={i}
            aria-hidden={i !== current ? 'true' : undefined}
            style={{
              gridArea: 'slide',
              opacity: i === current ? 1 : 0,
              transition: reducedMotion ? 'none' : `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
              pointerEvents: i === current ? 'auto' : 'none',
              willChange: 'opacity',
              transform: 'translateZ(0)',
            }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{msg.headline}</h1>
            <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{msg.subtext}</p>
          </div>
        ))}
      </div>

      <a
        href={`#${scrollTargetId || 'services'}`}
        onClick={handleCTAClick}
        className="inline-flex items-center px-8 py-4 bg-orange-accent text-white font-semibold rounded-lg hover:bg-orange-light transition-colors min-h-[44px] no-underline text-lg"
      >
        {heroCTALabel}
      </a>

      {heroMessages.length > 1 && (
        <div className="flex justify-center gap-3 mt-8" role="tablist" aria-label="Hero message indicators">
          {heroMessages.map((_, i) => {
            const isActive = i === current;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center min-h-[44px] min-w-[44px]"
              >
                <svg width="24" height="24" className="absolute" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="12" cy="12" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                  {isActive && (
                    <circle
                      ref={ringRef}
                      cx="12" cy="12" r={r}
                      fill="none"
                      stroke="rgba(240,123,43,0.9)"
                      strokeWidth="2"
                      strokeDasharray={circ}
                      strokeDashoffset={circ}
                      strokeLinecap="round"
                    />
                  )}
                </svg>
                <span
                  className="rounded-full"
                  style={{
                    width:      isActive ? 8 : 6,
                    height:     isActive ? 8 : 6,
                    background: isActive ? 'rgba(240,123,43,1)' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s ease',
                    boxShadow:  isActive ? '0 0 8px rgba(240,123,43,0.7)' : 'none',
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
