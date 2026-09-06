"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { navItems } from "@/data/personal";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const themeToggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let next = "";
      navItems.forEach(item => {
        const section = document.getElementById(item.href.slice(1));
        if (section && section.getBoundingClientRect().top <= 160) next = item.href;
      });
      setActive(next);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key !== "Tab") return;
      const links = Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
      const first = themeToggle.current;
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 900) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  function followAnchor(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!open) return;
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      history.pushState(null, "", href);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  }

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a className="wordmark" href="#hero" onClick={event => followAnchor(event, "#hero")}>Clayde Arnaiz</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(item => <a key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined}>{item.label}</a>)}
        </nav>
        <div className="nav-actions">
        <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight aria-hidden="true" size={16} /></a>
        <button ref={themeToggle} className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>{theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}</button>
        <button ref={toggle} className="menu-toggle" type="button" onClick={() => setOpen(value => !value)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}</button>
        </div>
      </div>
      {open && <div ref={menu} className="mobile-nav" id="mobile-navigation"><nav aria-label="Mobile navigation">{navItems.map(item => <a key={item.href} href={item.href} onClick={event => followAnchor(event, item.href)}>{item.label}</a>)}<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Résumé ↗</a></nav></div>}
    </header>
  );
}
