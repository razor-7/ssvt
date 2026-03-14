import React, { useState, useEffect, useRef } from 'react';

export default function StatCounter({ stat }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setDisplayed(stat.numericValue);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const start = 0;
          const end = stat.numericValue;
          const duration = 1500;
          const startTime = performance.now();

          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayed(Math.round(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.numericValue]);

  return (
    <div ref={ref} className="text-center p-6">
      <p className="text-4xl lg:text-5xl font-bold text-navy mb-2">
        {stat.value.replace(/[\d,]+/, displayed.toLocaleString())}
      </p>
      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
    </div>
  );
}
