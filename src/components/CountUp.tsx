import { useEffect, useRef, useState } from 'react';

interface ParsedValue {
  prefix: string;
  num: number;
  suffix: string;
  decimals: number;
}

function parseStatValue(value: string): ParsedValue {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: value, decimals: 0 };
  const numStr = match[2];
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { prefix: match[1], num: parseFloat(numStr), suffix: match[3], decimals };
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface CountUpProps {
  value: string;
  className?: string;
}

export default function CountUp({ value, className }: CountUpProps) {
  const { prefix, num, suffix, decimals } = parseStatValue(value);
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const duration = 1500;

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCurrent(easeOut(progress) * num);
            if (progress < 1) requestAnimationFrame(tick);
            else setCurrent(num);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <span ref={ref} className={className}>
      {prefix}{current.toFixed(decimals)}{suffix}
    </span>
  );
}
