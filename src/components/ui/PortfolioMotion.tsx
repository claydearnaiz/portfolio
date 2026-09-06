"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_MOTION = "(min-width: 1000px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)";

/** Static HTML first. One scoped motion context, three reversible sticky scenes. */
export function PortfolioMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const preferenceButton = useRef<HTMLButtonElement>(null);
  const restorePosition = useRef<number | null>(null);
  const positionedInitialHash = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("user-reduced-motion", reduceMotion);
    return () => document.documentElement.classList.remove("user-reduced-motion");
  }, [reduceMotion]);

  useEffect(() => {
    if (!root.current) return;
    const element = root.current;
    const media = gsap.matchMedia();
    let disposed = false;
    let interacted = false;
    let refreshFrame = 0;
    let positionFrame = 0;
    const positionHash = () => {
      let id = "";
      try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      requestAnimationFrame(() => {
        if (!disposed && id) {
          document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
          if (id === "hero") history.replaceState(history.state, "", location.pathname + location.search);
        }
      });
    };
    window.addEventListener("hashchange", positionHash);
    const interactedWithPage = () => { interacted = true; };
    for (const event of ["wheel", "touchstart", "pointerdown", "keydown"]) {
      window.addEventListener(event, interactedWithPage, { passive: true, once: true });
    }

    if (!reduceMotion) media.add(DESKTOP_MOTION, () => {
      element.classList.add("motion-ready");
      const select = gsap.utils.selector(element);
      const hero = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: select(".identity-scene")[0], start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true,
      }});
      hero.to(select(".hero-name"), { scale: 2.4, xPercent: -10, yPercent: -8, duration: 0.75 }, 0.08)
        .to(select(".hero-art"), { scale: 1.05, y: -24, duration: 0.85 }, 0)
        .to(select(".hero-support"), { y: -60, xPercent: 130, opacity: 0, duration: 0.25 }, 0.08)
        .fromTo(select(".hero-plane"), { scaleX: 0.06, scaleY: 0.006 }, { scaleX: 1, scaleY: 1, duration: 0.62, ease: "power2.inOut" }, 0.3);

      gsap.from(select(".system-layers li"), { x: i => 24 + i * 12, stagger: 0.1, ease: "none", scrollTrigger: {
        trigger: select(".about-body")[0], start: "top 85%", end: "bottom 85%", scrub: true,
      }});
      gsap.from(select(".work-title"), { scale: 1.35, xPercent: 8, transformOrigin: "left center", ease: "none", scrollTrigger: {
        trigger: select(".work-intro")[0], start: "top bottom", end: "top 15%", scrub: true,
      }});

      const screens = select(".ayos-screen") as HTMLElement[];
      const cycle = 1.5;
      gsap.set(screens, { autoAlpha: 0 });
      gsap.set(screens[0], { autoAlpha: 1 });
      gsap.set(select(".ayos-screen .image-inspect"), { scale: 0.38, transformOrigin: "center center" });
      const ayos = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: select(".ayos-scene")[0], start: "top top", end: "bottom bottom", scrub: 0.35, invalidateOnRefresh: true,
      }});
      screens.forEach((screen, index) => {
        const time = index * cycle;
        // Each image gets a small-image pause, an expansion, and a full-size pause.
        // All changes live on this scrubbed timeline, including the handoffs.
        if (index > 0) ayos.to(screen, { autoAlpha: 1, duration: 0.15 }, time);
        ayos.to(screen.querySelector(".image-inspect"), { scale: 0.85, duration: 0.9, ease: "power1.inOut" }, time + 0.25);
        if (index < screens.length - 1) {
          ayos.to(screen, { autoAlpha: 0, duration: 0.15 }, time + cycle);
        }
      });
      ayos.to({}, { duration: 0.35 });
      const updateScreens = () => {
        const active = Math.min(screens.length - 1, Math.floor(ayos.time() / cycle));
        screens.forEach((screen, index) => screen.toggleAttribute("inert", index !== active));
      };
      ayos.eventCallback("onUpdate", updateScreens);
      updateScreens();

      const steps = select(".linis-step");
      const nodes = select("[data-system-node]");
      const linis = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: select(".linis-scene")[0], start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true,
      }});
      linis.fromTo(select(".linis-image-frame"), { scale: 0.82 }, { scale: 1, duration: 5.4 }, 0)
        .fromTo(select(".linis-track span"), { scaleX: 0 }, { scaleX: 1, duration: 5.8 }, 0);
      steps.forEach((step, index) => {
        const time = index;
        linis.fromTo(step, { y: index === 0 ? 0 : 16, opacity: index === 0 ? 1 : 0 }, { y: 0, opacity: 1, duration: 0.2 }, time)
          .fromTo(nodes[index], { "--node-emphasis": "0%" }, { "--node-emphasis": "100%", duration: 0.2 }, time);
        if (index < steps.length - 1) {
          linis.to(step, { y: -12, opacity: 0, duration: 0.2 }, time + 0.9)
            .to(nodes[index], { "--node-emphasis": "0%", duration: 0.18 }, time + 0.78);
        }
      });
      linis.to(nodes, { "--node-emphasis": "0%", duration: 0.2 }, 5.55);

      gsap.from(select(".attendance-flow li"), { y: i => i * 24, ease: "none", scrollTrigger: {
        trigger: select(".attendance-flow")[0], start: "top 90%", end: "bottom 85%", scrub: true,
      }});

      return () => {
        screens.forEach(screen => screen.removeAttribute("inert"));
        element.classList.remove("motion-ready");
      };
    }, element);

    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh(); });
    };
    element.addEventListener("load", refresh, true);
    document.fonts.ready.then(() => {
      if (disposed) return;
      ScrollTrigger.refresh();
      // A deep link may have been positioned before sticky scene heights existed.
      const shouldPositionHash = !positionedInitialHash.current;
      positionedInitialHash.current = true;
      if (shouldPositionHash && !interacted && location.hash) {
        let id = "";
        try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
        if (id === "hero") history.replaceState(history.state, "", location.pathname + location.search);
      }
    });
    if (restorePosition.current !== null) {
      const before = restorePosition.current;
      positionFrame = requestAnimationFrame(() => {
        const after = preferenceButton.current?.getBoundingClientRect().top;
        if (after !== undefined) window.scrollBy({ top: after - before, behavior: "instant" });
        restorePosition.current = null;
      });
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      cancelAnimationFrame(positionFrame);
      element.removeEventListener("load", refresh, true);
      window.removeEventListener("hashchange", positionHash);
      for (const event of ["wheel", "touchstart", "pointerdown", "keydown"]) window.removeEventListener(event, interactedWithPage);
      media.revert();
      element.classList.remove("motion-ready");
    };
  }, [reduceMotion]);

  return (
    <div ref={root} className="portfolio-story" data-reduced-motion={reduceMotion || undefined}>
      {children}
      <div className="motion-preference page-width">
        <button ref={preferenceButton} type="button" className="text-link" aria-pressed={reduceMotion} onClick={() => {
          restorePosition.current = preferenceButton.current?.getBoundingClientRect().top ?? null;
          setReduceMotion(value => !value);
        }}>{reduceMotion ? "Restore motion" : "Reduce motion"}</button>
      </div>
    </div>
  );
}

