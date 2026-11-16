import React, { useEffect, useRef, useState } from 'react';

interface TypedTextProps {
  text: string;
  className?: string;
  /** Milliseconds per tick */
  speed?: number;
  /** Delay before starting once visible (ms) */
  delay?: number;
  /** Start immediately on mount without waiting for IntersectionObserver */
  immediate?: boolean;
  /** Single line mode keeps whitespace-nowrap inside grid stack */
  singleLine?: boolean;
  /** Show blinking typing cursor while typing */
  showCursor?: boolean;
}

export const TypedText: React.FC<TypedTextProps> = ({
  text,
  className = '',
  speed,
  delay = 0,
  immediate = false,
  singleLine = false,
  showCursor = true,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const completedTextRef = useRef<string | null>(null);
  const [hasTriggered, setHasTriggered] = useState<boolean>(immediate);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  // Adaptive speed so long paragraphs complete smoothly in ~0.8-1.3s without feeling sluggish
  const length = text.length;
  const computedSpeed =
    speed ?? (length > 140 ? 12 : length > 60 ? 15 : length > 24 ? 18 : 22);
  const charsPerTick = length > 160 ? 3 : length > 75 ? 2 : 1;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        setHasTriggered(true);
        setVisibleCount(text.length);
        setIsDone(true);
        completedTextRef.current = text;
        return;
      }
    }

    // If text prop changed (e.g. tab switch), reset so the new text types in smoothly
    if (completedTextRef.current !== null && completedTextRef.current !== text) {
      completedTextRef.current = null;
      setVisibleCount(0);
      setIsDone(false);
    }

    if (immediate) {
      setHasTriggered(true);
      return;
    }

    const node = containerRef.current;
    if (!node || hasTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasTriggered(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -16px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text, immediate, hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;
    if (completedTextRef.current === text) {
      setVisibleCount(text.length);
      setIsDone(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let current = 0;

    setVisibleCount(0);
    setIsDone(false);

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        current = Math.min(text.length, current + charsPerTick);
        setVisibleCount(current);
        if (current >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setIsDone(true);
          completedTextRef.current = text;
        }
      }, computedSpeed);
    }, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [hasTriggered, text, computedSpeed, charsPerTick, delay]);

  const displaySlice = isDone ? text : text.slice(0, visibleCount);
  const whitespaceClass = singleLine ? 'whitespace-nowrap' : '';

  return (
    <span
      ref={containerRef}
      className={`inline-grid align-baseline ${whitespaceClass} ${className}`}
    >
      {/* Invisible full text reserves exact layout space to prevent any shift */}
      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1 invisible pointer-events-none select-none ${whitespaceClass}`}
      >
        {text}
      </span>
      {/* Typed animated text */}
      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1 ${whitespaceClass}`}
      >
        {displaySlice}
        {hasTriggered && !isDone && showCursor && (
          <span className="typing-cursor" />
        )}
      </span>
      {/* Screen-reader accessible immediate full text */}
      <span className="sr-only">{text}</span>
    </span>
  );
};
