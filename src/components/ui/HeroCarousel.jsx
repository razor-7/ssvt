import React, { useState, useEffect, useRef, useCallback } from 'react';

const FADE_MS = 320;
const INTERVAL_DEFAULT = 5000;

export default function HeroCarousel({ heroMessages, heroCTALabel, heroCarouselIntervalMs, scrollTargetId, ui }) {
  const [current, setCurrent]     = useState(0);
  const [visible, setVisible]     = useState(true);
  const [paused, setPaused]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const currentRef   = useRef(0);
  const pendingRef   = useRef(null);
  const rafRef       = useRef(null);
  const startRef     = useRef(null);
  const intervalMs   = heroCarouselIntervalMs || INTERVAL_DEFAULT;

  const tickProgress = useCallback((ts) => {
    if (!startRef.current) startRef.current = ts;
    const elapsed = ts - startRef.current;
    setProgress(Math.min((elapsed / intervalMs) * 100, 100));
    if (elapsed < intervalMs) rafRef.current = requestAnimationFrame(tickProgress);
  }, [intervalMs]);

  const startProgress = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    startRef.current = null;
    if (!reducedMotion) rafRef.current = requestAnimationFrame(tickProgress);
  }, [reducedMotion, tickProgress]);

  const goTo = useCallback((next) => {
    clearTimeout(pendingRef.current);
    if (reducedMotion) {
      currentRef.current = next;
      setCurrent(next);
      return;
    }
    setVisible(false);
    pendingRef.current = setTimeout(() => {
      currentRef.current = next;
      setCurrent(next);
      setVisible(true);
      startProgress();
    }, FADE_MS);
  }, [reducedMotion, startProgress]);

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

  useEffect(() => () => {
    clearTimeout(pendingRef.current);
    cancelAnimationFrame(rafRef.current);
  }, []);

  function handleCTAClick(e) {
    e.preventDefault();
    const target = document.getElementById(scrollTargetId || 'services');
    if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  const msg = heroMessages[current] || heroMessages[0];

  const contentStyle = reducedMotion ? {} : {
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-8px)',
    transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1), transform ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
  };
  const subtextStyle = reducedMotion ? {} : {
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(8px)',
    transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1) ${visible ? 60 : 0}ms, transform ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1) ${visible ? 60 : 0}ms`,
  };

  const r    = 10;
  const circ = 2 * Math.PI * r;

  return (
    <div
      onMouseEnter={() => { setPaused(true);  cancelAnimationFrame(rafRef.current); }}
      onMouseLeave={() => { setPaused(false); startProgress(); }}
      className="text-center text-white"
    >
      <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={contentStyle}>
        {msg.headline}
      </h1>
      <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto" style={subtextStyle}>
        {msg.subtext}
      </p>
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
            const dashOffset = isActive ? circ * (1 - progress / 100) : circ;
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
                      cx="12" cy="12" r={r}
                      fill="none"
                      stroke="rgba(240,123,43,0.9)"
                      strokeWidth="2"
                      strokeDasharray={circ}
                      strokeDashoffset={reducedMotion ? 0 : dashOffset}
                      strokeLinecap="round"
                      style={{ transition: reducedMotion ? 'none' : 'stroke-dashoffset 0.1s linear' }}
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
