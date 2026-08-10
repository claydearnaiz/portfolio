"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface OdometerCounterProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label?: string;
  className?: string;
}

export const OdometerCounter: React.FC<OdometerCounterProps> = ({
  value,
  suffix = "",
  prefix = "",
  label,
  className = "",
}) => {
  const odoRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const digits = String(value).split("");

  useGSAP(
    () => {
      if (shouldReduceMotion || !odoRef.current) return;

      ScrollTrigger.create({
        trigger: odoRef.current,
        start: "top 88%",
        once: true,
        onEnter: () => {
          if (!odoRef.current) return;
          const strips = odoRef.current.querySelectorAll<HTMLElement>(".odo-strip");
          strips.forEach((strip, i) => {
            const target = parseInt(digits[i]);
            if (isNaN(target)) return;
            const singleSpan = strip.children[0] as HTMLElement;
            if (!singleSpan) return;
            const h = singleSpan.offsetHeight || 28;
            strip.style.transform = `translateY(-${target * h}px)`;
            strip.style.transitionDelay = `${i * 0.1}s`;
          });
        },
      });
    },
    { scope: odoRef, dependencies: [value, shouldReduceMotion] }
  );

  return (
    <div className={`inline-flex flex-col items-center justify-center font-mono ${className}`}>
      <div ref={odoRef} className="flex items-center overflow-hidden h-[1.15em] text-[#00d4ff] font-bold">
        {prefix && <span className="mr-0.5">{prefix}</span>}

        {digits.map((digitChar, idx) => {
          const isNum = !isNaN(parseInt(digitChar));
          if (!isNum) {
            return <span key={idx}>{digitChar}</span>;
          }

          return (
            <div key={idx} className="relative h-[1.15em] overflow-hidden inline-block">
              <div className="flex flex-col transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) odo-strip">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <span key={n} className="h-[1.15em] leading-[1.15em] block text-center">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {suffix && <span className="ml-0.5">{suffix}</span>}
      </div>

      {label && (
        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-1">
          {label}
        </span>
      )}
    </div>
  );
};
