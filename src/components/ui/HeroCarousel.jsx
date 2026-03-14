import React, { useState, useEffect, useRef } from 'react';

export default function HeroCarousel({ heroMessages, heroCTALabel, heroCarouselIntervalMs, scrollTargetId, ui }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || paused || heroMessages.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroMessages.length);
    }, heroCarouselIntervalMs || 4000);
    return () => clearInterval(intervalRef.current);
  }, [paused, reducedMotion, heroMessages.length, heroCarouselIntervalMs]);

  function handleCTAClick(e) {
    e.preventDefault();
    const target = document.getElementById(scrollTargetId || 'services');
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }

  const msg = heroMessages[current] || heroMessages[0];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="text-center text-white"
    >
      <div
        key={current}
        className={reducedMotion ? '' : 'animate-fade-in'}
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {msg.headline}
        </h1>
        <p className="text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          {msg.subtext}
        </p>
      </div>
      <a
        href={`#${scrollTargetId || 'services'}`}
        onClick={handleCTAClick}
        className="inline-flex items-center px-8 py-4 bg-orange-accent text-white font-semibold rounded-lg hover:bg-orange-light transition-colors min-h-[44px] no-underline text-lg"
      >
        {heroCTALabel}
      </a>
      {heroMessages.length > 1 && (
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Hero message indicators">
          {heroMessages.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Message ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                i === current ? 'bg-orange-accent' : 'bg-white/50 hover:bg-white/80'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${i === current ? 'bg-orange-accent' : 'bg-current'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
