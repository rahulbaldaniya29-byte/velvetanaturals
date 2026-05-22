'use client';
import { useEffect, useRef } from 'react';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0), my = useRef(0), rx = useRef(0), ry = useRef(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mx.current = e.clientX; my.current = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (cursorRef.current) { cursorRef.current.style.left = mx.current + 'px'; cursorRef.current.style.top = my.current + 'px'; }
      if (ringRef.current) { ringRef.current.style.left = rx.current + 'px'; ringRef.current.style.top = ry.current + 'px'; }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const grow = () => { if (cursorRef.current) { cursorRef.current.style.width = '20px'; cursorRef.current.style.height = '20px'; cursorRef.current.style.background = '#b8965a'; } if (ringRef.current) { ringRef.current.style.borderColor = '#b8965a'; ringRef.current.style.opacity = '0.6'; } };
    const shrink = () => { if (cursorRef.current) { cursorRef.current.style.width = '10px'; cursorRef.current.style.height = '10px'; cursorRef.current.style.background = '#3d6b4f'; } if (ringRef.current) { ringRef.current.style.borderColor = '#3d6b4f'; ringRef.current.style.opacity = '1'; } };

    document.querySelectorAll('a, button, [role="button"], .cursor-pointer').forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} className="fixed w-2.5 h-2.5 rounded-full bg-green pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] duration-200 hidden md:block" />
      <div id="cursor-ring" ref={ringRef} className="fixed w-9 h-9 border border-green rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-[120ms] hidden md:block" />
    </>
  );
}