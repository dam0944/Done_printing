import { useCallback, useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { useLang } from "@/contexts/LangContext";
import MainLayout from "@/layouts/MainLayout";

/* ════════════════════════════════════════
   TYPES
════════════════════════════════════════ */
interface WorkItem {
  img:          string;
  gallery:      string[];
  title:        string;
  tag:          string;
  desc:         string;
  tall:         boolean;
  client:       string;
  category:     string;
  year:         string;
  deliverables: string[];
  challenge:    string;
  solution:     string;
  link:         string;
}

interface StatItem {
  value:  string;
  suffix: string;
  label:  string;
  arrow:  "↗" | "→";
}

interface PopupLabels {
  challenge:    string;
  solution:     string;
  view:         string;
  client:       string;
  category:     string;
  year:         string;
  deliverables: string;
}

/* ════════════════════════════════════════
   TICKER
════════════════════════════════════════ */
type TickerVariant = "primary" | "secondary";

interface TickerProps {
  label:    string;
  variant?: TickerVariant;
}

const Ticker: FC<TickerProps> = ({ label, variant = "primary" }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: gsap.core.Tween | undefined;

    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const wrap = wrapRef.current;
      if (!wrap) return;

      const track = wrap.querySelector<HTMLElement>(".tk-track");
      if (track && !wrap.dataset.cloned) {
        wrap.appendChild(track.cloneNode(true));
        wrap.dataset.cloned = "1";
      }

      anim = gsap.to(wrap.querySelectorAll(".tk-track"), {
        x:        "-100%",
        duration: variant === "secondary" ? 22 : 18,
        ease:     "none",
        repeat:   -1,
      });
    };

    init();
    return () => { anim?.kill(); };
  }, [variant]);

  const items = Array(12).fill(label) as string[];

  if (variant === "secondary") {
    return (
      <div className="ticker2-wrap">
        <div className="ticker2-inner" ref={wrapRef}>
          <div className="tk-track ticker2-track">
            {items.map((text, i) => (
              <span className="ticker2-item" key={i}>
                <span className="t2-dot" />{text}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-wrap">
      <div className="ticker-inner" ref={wrapRef}>
        <div className="tk-track ticker-track">
          {items.map((text, i) => (
            <span className="ticker-item" key={i}>{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   WORK POPUP
════════════════════════════════════════ */
interface WorkPopupProps {
  work:    WorkItem;
  onClose: () => void;
  labels:  PopupLabels;
}

const WorkPopup: FC<WorkPopupProps> = ({ work, onClose, labels }) => {
  const [activeImg, setActiveImg] = useState<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  /* lock scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* open animation */
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    overlay.animate([{ opacity: 0 }, { opacity: 1 }],
      { duration: 240, fill: "forwards", easing: "ease" });
    panel.animate(
      [
        { opacity: 0, transform: "translateY(48px) scale(0.96)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 400, fill: "forwards", easing: "cubic-bezier(0.22,1,0.36,1)", delay: 60 }
    );
  }, []);

  const handleClose = useCallback((): void => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) { onClose(); return; }

    panel.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(28px) scale(0.96)" },
      ],
      { duration: 260, fill: "forwards", easing: "ease-in" }
    );
    overlay.animate([{ opacity: 1 }, { opacity: 0 }],
      { duration: 300, fill: "forwards", easing: "ease-in", delay: 40 });
    setTimeout(onClose, 320);
  }, [onClose]);

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const META_ITEMS: Array<{ key: string; value: ReactNode }> = [
    { key: labels.client,       value: work.client   },
    { key: labels.category,     value: work.category },
    { key: labels.year,         value: work.year     },
    {
      key:   labels.deliverables,
      value: (
        <div className="wp-deliverables">
          {work.deliverables.map((d) => (
            <span className="wp-deliverable" key={d}>{d}</span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      className="wp-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div className="wp-panel" ref={panelRef}>
        <button className="wp-close" onClick={handleClose} aria-label="Close">✕</button>

        {/* Hero image */}
        <div className="wp-hero">
          <img src={work.gallery[activeImg]} alt={work.title} />
          <span className="wp-hero-badge">{work.tag}</span>
        </div>

        {/* Thumbnails */}
        {work.gallery.length > 1 && (
          <div className="wp-thumbs" role="tablist" aria-label="Gallery thumbnails">
            {work.gallery.map((src, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeImg}
                className={`wp-thumb${i === activeImg ? " active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={src} alt={`${work.title} – view ${i + 1}`} />
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="wp-body">
          <div className="wp-main">
            <h2 className="wp-title">{work.title}</h2>
            <p className="wp-desc">{work.desc}</p>

            <p className="wp-section-label">{labels.challenge}</p>
            <p className="wp-text">{work.challenge}</p>

            <p className="wp-section-label">{labels.solution}</p>
            <p className="wp-text">{work.solution}</p>

            <a href={work.link} className="wp-link">
              {labels.view} <span className="wp-link-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <aside className="wp-meta">
            {META_ITEMS.map(({ key, value }) => (
              <div className="wp-meta-item" key={key}>
                <p className="wp-meta-key">{key}</p>
                {typeof value === "string"
                  ? <p className="wp-meta-val">{value}</p>
                  : value}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   IMAGE ERROR HANDLER
════════════════════════════════════════ */
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  const img = e.currentTarget;
  img.style.display = "none";
  if (img.parentElement) img.parentElement.style.background = "linear-gradient(135deg,#13103a,#1a1660)";
};

/* ════════════════════════════════════════
   PROJECT PAGE
════════════════════════════════════════ */
export default function Project() {
  const { t } = useLang();

  /* ── Work data ── */
  const WORKS: WorkItem[] = [
    {
      img:          "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80",
      gallery:      [
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
      ],
      title:        t("project.work.1.title"),
      tag:          t("project.work.1.tag"),
      desc:         t("project.work.1.desc"),
      tall:         true,
      client:       "Luminos Studio",
      category:     t("project.work.1.tag"),
      year:         "2024",
      deliverables: [t("deliverable.brand_campaign"), t("deliverable.editorial_design"), t("deliverable.social_media_kit")],
      challenge:    t("project.work.1.challenge"),
      solution:     t("project.work.1.solution"),
      link:         "#",
    },
    {
      img:          "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=80",
      gallery:      [
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
      ],
      title:        t("project.work.2.title"),
      tag:          t("project.work.2.tag"),
      desc:         t("project.work.2.desc"),
      tall:         false,
      client:       "Veltro Finance",
      category:     "Brand Identity",
      year:         "2023",
      deliverables: [t("deliverable.logo_system"), t("deliverable.brand_guidelines"), t("deliverable.stationery_pack")],
      challenge:    t("project.work.2.challenge"),
      solution:     t("project.work.2.solution"),
      link:         "#",
    },
    {
      img:          "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=700&q=80",
      gallery:      [
        "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1200&q=80",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
      ],
      title:        t("project.work.3.title"),
      tag:          t("project.work.3.tag"),
      desc:         t("project.work.3.desc"),
      tall:         false,
      client:       "Aura Wellness Co.",
      category:     "Brand Identity",
      year:         "2023",
      deliverables: [t("deliverable.logo_identity"), t("deliverable.packaging_design"), t("deliverable.brand_voice_guide"), t("deliverable.website_design")],
      challenge:    t("project.work.3.challenge"),
      solution:     t("project.work.3.solution"),
      link:         "#",
    },
    {
      img:          "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80",
      gallery:      [
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      ],
      title:        t("project.work.4.title"),
      tag:          t("project.work.4.tag"),
      desc:         t("project.work.4.desc"),
      tall:         false,
      client:       "FieldOps Systems",
      category:     "UI/UX Design",
      year:         "2024",
      deliverables: [t("deliverable.dashboard_ui"), t("deliverable.design_system"), t("deliverable.prototype_handoff")],
      challenge:    t("project.work.4.challenge"),
      solution:     t("project.work.4.solution"),
      link:         "#",
    },
    {
      img:          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80",
      gallery:      [
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
        "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1200&q=80",
      ],
      title:        t("project.work.5.title"),
      tag:          t("project.work.5.tag"),
      desc:         t("project.work.5.desc"),
      tall:         false,
      client:       "Nexlabs Inc.",
      category:     "Web Design",
      year:         "2023",
      deliverables: [t("deliverable.full_website"), t("deliverable.responsive_build"), t("deliverable.cms_integration")],
      challenge:    t("project.work.5.challenge"),
      solution:     t("project.work.5.solution"),
      link:         "#",
    },
    {
      img:          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",
      gallery:      [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
      ],
      title:        t("project.work.6.title"),
      tag:          t("project.work.6.tag"),
      desc:         t("project.work.6.desc"),
      tall:         false,
      client:       "CreateConf 2024",
      category:     "Graphic Design",
      year:         "2024",
      deliverables: [t("deliverable.event_identity"), t("deliverable.print_collateral"), t("deliverable.motion_graphics"), t("deliverable.signage_system")],
      challenge:    t("project.work.6.challenge"),
      solution:     t("project.work.6.solution"),
      link:         "#",
    },
  ];

  /* ── Stats data ── */
  const STATS: StatItem[] = [
    { value: "4218", suffix: "+", label: t("project.stat.1.label"), arrow: "↗" },
    { value: "812",  suffix: "K+", label: t("project.stat.2.label"), arrow: "→" },
    { value: "293",  suffix: "+", label: t("project.stat.3.label"), arrow: "→" },
    { value: "456",  suffix: "M+", label: t("project.stat.4.label"), arrow: "→" },
    { value: "184",  suffix: "+", label: t("project.stat.5.label"), arrow: "→" },
  ];

  /* ── Popup labels ── */
  const popupLabels: PopupLabels = {
    challenge:    t("project.popup.challenge"),
    solution:     t("project.popup.solution"),
    view:         t("project.popup.view"),
    client:       t("project.popup.client"),
    category:     t("project.popup.category"),
    year:         t("project.popup.year"),
    deliverables: t("project.popup.deliverables"),
  };

  /* ── Refs ── */
  const heroRef  = useRef<HTMLElement>(null);
  const workRef  = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const ctaRef   = useRef<HTMLElement>(null);
  const ctxRef   = useRef<{ revert: () => void } | null>(null);

  const [activeWork, setActiveWork] = useState<WorkItem | null>(null);

  /* ── GSAP animations ── */
  useEffect(() => {
    const initGSAP = async (): Promise<void> => {
      const gsap              = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!heroRef.current || !workRef.current || !statsRef.current || !ctaRef.current) return;

      ctxRef.current = gsap.context(() => {
        /* Hero */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(heroRef.current!.querySelector(".about-breadcrumb"),
            { y: 20, opacity: 0, duration: 0.6 })
          .from(heroRef.current!.querySelectorAll(".hero-line span"),
            { y: 90, opacity: 0, duration: 1, stagger: 0.12, clearProps: "all" }, "-=0.2")
          .from(heroRef.current!.querySelector(".about-desc"),
            { y: 24, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.4");

        /* Work cards */
        const wRef = workRef.current!;
        gsap.from(wRef.querySelectorAll(".s3-title span"), {
          scrollTrigger: { trigger: wRef, start: "top 78%", toggleActions: "play none none reverse" },
          y: 50, opacity: 0, duration: 0.75, stagger: 0.1, ease: "power3.out", clearProps: "all",
        });
        gsap.from(wRef.querySelector(".s3-more-btn"), {
          scrollTrigger: { trigger: wRef, start: "top 78%", toggleActions: "play none none reverse" },
          scale: 0.88, opacity: 0, duration: 0.6, delay: 0.25, ease: "back.out(1.5)", clearProps: "all",
        });
        wRef.querySelectorAll<HTMLElement>(".work-card").forEach((card, idx) => {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
            x: idx % 2 === 0 ? -30 : 30, y: 40, opacity: 0,
            duration: 0.75, delay: idx * 0.07, ease: "power3.out", clearProps: "all",
          });
        });

        /* Stats */
        const sRef = statsRef.current!;
        gsap.from(sRef.querySelectorAll(".stat-row"), {
          scrollTrigger: { trigger: sRef, start: "top 80%", toggleActions: "play none none reverse" },
          x: -60, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out", clearProps: "all",
        });
        sRef.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
          const raw = el.dataset["raw"];
          if (!raw) return;
          gsap.fromTo(el, { innerText: 0 }, {
            scrollTrigger: { trigger: sRef, start: "top 80%", toggleActions: "play none none reverse" },
            innerText: Number(raw), duration: 1.8, delay: 0.3,
            ease: "power2.out", snap: { innerText: 1 },
            onUpdate() { el.innerText = Math.round(Number(el.innerText)).toLocaleString(); },
          });
        });

        /* CTA */
        gsap.from(ctaRef.current!.querySelector(".cta-box"), {
          scrollTrigger: { trigger: ctaRef.current!, start: "top 82%", toggleActions: "play none none reverse" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all",
        });
      });
    };

    initGSAP();
    return () => ctxRef.current?.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body, html { background: #0e0c2e; overflow-x: hidden; }

        :root {
          --f-body:    'Barlow', sans-serif;
          --f-display: 'Barlow Condensed', sans-serif;
          --tt:        uppercase;
          --ls-wide:   2.5px;
          --ls-med:    2px;
          --ls-tight:  1.5px;
          --lh-body:   1.8;
          --purple:    #7c3aed;
          --purple-h:  #6d28d9;
        }
        :root[data-lang="km"] {
          --f-body:    'Noto Sans Khmer', sans-serif;
          --f-display: 'Noto Sans Khmer', sans-serif;
          --tt:        none;
          --ls-wide:   0px; --ls-med: 0px; --ls-tight: 0px;
          --lh-body:   2;
        }

        .page-wrap { font-family: var(--f-body); background: #0e0c2e; color: #fff; overflow-x: hidden; }

        /* ════ HERO ════ */
        .about-hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; position: relative;
          background: radial-gradient(ellipse 90% 70% at 50% 40%, #1a1660 0%, #0e0c2e 68%);
          text-align: center; padding: 120px 60px 80px; overflow: hidden;
        }
        .about-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none;
        }
        .about-hero-inner { position: relative; z-index: 1; max-width: 1280px; width: 100%; margin: 0 auto; }
        .about-breadcrumb {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--f-display);
          font-size: 11px; font-weight: 600;
          text-transform: var(--tt); letter-spacing: var(--ls-wide);
          color: rgba(255,255,255,0.35); margin-bottom: 32px;
        }
        .about-breadcrumb .sep     { color: var(--purple); }
        .about-breadcrumb .current { color: rgba(255,255,255,0.65); }
        .about-hero-title {
          font-family: var(--f-display);
          font-weight: 900; text-transform: var(--tt); line-height: 0.88; margin-bottom: 36px;
        }
        .hero-line {
          display: flex; align-items: center; justify-content: center;
          gap: 24px; flex-wrap: wrap; overflow: hidden;
        }
        .hero-line span.solid {
          font-size: clamp(80px,12vw,170px); color: #fff;
          letter-spacing: -3px; line-height: 0.88; display: inline-block;
        }
        .hero-line span.outline {
          font-size: clamp(80px,12vw,170px); color: transparent;
          -webkit-text-stroke: 2.5px rgba(255,255,255,0.38);
          letter-spacing: -3px; line-height: 0.88; display: inline-block;
        }
        .about-desc {
          font-size: 16px; line-height: var(--lh-body);
          color: rgba(255,255,255,0.55); max-width: 560px; margin: 0 auto;
        }
        .hero-deco {
          position: absolute; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
        }
        .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
        .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

        /* ════ TICKER ════ */
        .ticker-wrap {
          width: 100%; overflow: hidden; background: var(--purple);
          padding: 13px 0; transform: rotate(-1.2deg) scaleX(1.04);
          margin: 10px 0; position: relative; z-index: 10;
        }
        .ticker-inner, .ticker2-inner { display: flex; width: max-content; }
        .ticker-track, .ticker2-track { display: flex; white-space: nowrap; }
        .ticker-item {
          font-family: var(--f-display); font-weight: 700; font-size: 12px;
          text-transform: var(--tt); letter-spacing: var(--ls-wide); color: #fff;
          padding: 0 32px; display: flex; align-items: center; gap: 14px;
        }
        .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }
        .ticker2-wrap {
          width: 100%; overflow: hidden;
          border-top: 1px solid rgba(124,58,237,0.2);
          border-bottom: 1px solid rgba(124,58,237,0.2); padding: 14px 0;
        }
        .ticker2-item {
          font-family: var(--f-display); font-weight: 700; font-size: 12px;
          text-transform: var(--tt); letter-spacing: var(--ls-med);
          color: rgba(255,255,255,0.4);
          padding: 0 28px; display: flex; align-items: center; gap: 10px;
        }
        .t2-dot { width: 5px; height: 5px; background: var(--purple); border-radius: 50%; flex-shrink: 0; }

        /* ════ WORK SECTION ════ */
        .section3-bg { background: #0a0828; }
        .section3 { padding: 100px 60px 80px; max-width: 1280px; margin: 0 auto; }
        .s3-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 60px; gap: 20px;
        }
        .s3-title { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.92; }
        .s3-title .t-solid   { font-size: clamp(42px,5vw,72px); color: #fff; display: block; }
        .s3-title .t-outline { font-size: clamp(42px,5vw,72px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); display: block; }
        .s3-more-btn {
          font-family: var(--f-display); font-weight: 700; font-size: 11px;
          text-transform: var(--tt); letter-spacing: var(--ls-med);
          color: #fff; background: var(--purple);
          padding: 12px 24px; border-radius: 5px; text-decoration: none;
          white-space: nowrap; flex-shrink: 0; margin-bottom: 6px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .s3-more-btn:hover { background: var(--purple-h); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(124,58,237,0.4); }

        /* ════ WORK GRID ════ */
        .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .work-card {
          position: relative; border-radius: 12px; overflow: hidden;
          cursor: pointer; background: #13103a; will-change: transform;
        }
        .work-card.tall { grid-row: span 2; }
        .work-card-img {
          width: 100%; height: 100%; min-height: 240px;
          object-fit: cover; display: block;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .work-card.tall .work-card-img { position: absolute; inset: 0; min-height: 100%; }
        .work-card:hover .work-card-img { transform: scale(1.06); }
        .work-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,8,40,0.95) 0%, rgba(10,8,40,0.3) 50%, transparent 100%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 22px; gap: 8px; transition: background 0.4s ease;
        }
        .work-card:hover .work-card-overlay {
          background: linear-gradient(to top, rgba(10,8,40,1) 0%, rgba(10,8,40,0.45) 55%, transparent 100%);
        }
        .wc-hint {
          font-family: var(--f-display); font-weight: 700; font-size: 10px;
          text-transform: var(--tt); letter-spacing: var(--ls-med);
          color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 6px;
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .wc-hint::before { content: ''; width: 16px; height: 1px; background: rgba(255,255,255,0.3); }
        .work-card:hover .wc-hint { opacity: 1; transform: translateY(0); }
        .wc-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .wc-title {
          font-family: var(--f-display); font-weight: 700; font-size: 17px;
          text-transform: var(--tt); letter-spacing: var(--ls-tight); color: #fff;
        }
        .wc-tag {
          font-family: var(--f-display); font-weight: 600; font-size: 10px;
          text-transform: var(--tt); letter-spacing: var(--ls-tight);
          color: #fff; background: var(--purple);
          padding: 4px 10px; border-radius: 3px; white-space: nowrap;
          flex-shrink: 0; transition: background 0.2s;
        }
        .work-card:hover .wc-tag { background: var(--purple-h); }
        .wc-desc { font-size: 12px; line-height: var(--lh-body); color: rgba(255,255,255,0.5); max-width: 90%; }

        /* ════ CTA ════ */
        .section4 { background: #0e0c2e; padding: 80px 60px 100px; }
        .cta-box {
          max-width: 1280px; margin: 0 auto;
          background: linear-gradient(135deg,#13103a 0%,#1a1660 60%,#0e0c2e 100%);
          border: 1px solid rgba(124,58,237,0.2); border-radius: 16px;
          padding: 80px 60px; text-align: center; position: relative; overflow: hidden;
        }
        .cta-box::before {
          content: ''; position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 500px;
          background: radial-gradient(circle,rgba(124,58,237,0.16) 0%,transparent 70%);
          pointer-events: none;
        }
        .cta-heading {
          font-family: var(--f-display); font-weight: 900;
          text-transform: var(--tt); line-height: 0.92;
          margin-bottom: 32px; position: relative;
        }
        .cta-heading .ch-solid   { font-size: clamp(48px,6vw,90px); color: #fff; display: block; }
        .cta-heading .ch-outline { font-size: clamp(48px,6vw,90px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block; }
        .cta-btn {
          font-family: var(--f-display); font-weight: 700; font-size: 12px;
          text-transform: var(--tt); letter-spacing: var(--ls-med);
          color: #fff; background: var(--purple);
          padding: 15px 40px; border-radius: 6px; text-decoration: none; display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s; position: relative;
        }
        .cta-btn:hover { transform: translateY(-3px); background: var(--purple-h); box-shadow: 0 10px 30px rgba(124,58,237,0.5); }

        /* ════ STATS ════ */
        .stats-section { background: #0e0c2e; padding: 0 60px 80px; }
        .stats-inner { max-width: 1280px; margin: 0 auto; }
        .stat-row {
          display: grid; grid-template-columns: 280px 1fr auto;
          align-items: center; padding: 38px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          gap: 24px; cursor: pointer; transition: padding-left 0.3s ease;
        }
        .stat-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .stat-row:hover { padding-left: 12px; }
        .stat-value {
          font-family: var(--f-display); font-weight: 900;
          font-size: clamp(42px,5vw,68px); color: #fff;
          letter-spacing: -1px; line-height: 1;
          display: flex; align-items: baseline; gap: 5px;
        }
        .stat-plus  { font-size: clamp(24px,3vw,38px); color: var(--purple); font-weight: 700; }
        .stat-label { font-family: var(--f-body); font-weight: 600; font-size: clamp(18px,2vw,26px); color: rgba(255,255,255,0.7); transition: color 0.3s; }
        .stat-row:hover .stat-label { color: rgba(255,255,255,0.95); }
        .stat-arrow {
          width: 38px; height: 38px; border: 1px solid rgba(255,255,255,0.18); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; color: rgba(255,255,255,0.45); flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .stat-row:first-child .stat-arrow { border-color: rgba(124,58,237,0.6); color: var(--purple); }
        .stat-row:hover .stat-arrow { background: var(--purple); border-color: var(--purple); color: #fff; transform: rotate(-45deg) scale(1.1); }

        /* ════ WORK POPUP ════ */
        .wp-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(6,4,24,0.9);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center; padding: 24px;
        }
        .wp-panel {
          background: #13103a; border: 1px solid rgba(124,58,237,0.3); border-radius: 20px;
          width: 100%; max-width: 980px; max-height: 90vh; overflow-y: auto;
          position: relative;
          box-shadow: 0 48px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.08);
          scrollbar-width: thin; scrollbar-color: rgba(124,58,237,0.35) transparent;
        }
        .wp-panel::-webkit-scrollbar       { width: 4px; }
        .wp-panel::-webkit-scrollbar-track { background: transparent; }
        .wp-panel::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.35); border-radius: 2px; }
        .wp-close {
          position: absolute; top: 18px; right: 18px; z-index: 10;
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.65); font-size: 16px;
          transition: background 0.2s, color 0.2s, transform 0.3s, border-color 0.2s;
        }
        .wp-close:hover { background: var(--purple); border-color: var(--purple); color: #fff; transform: rotate(90deg); }
        .wp-hero {
          width: 100%; aspect-ratio: 16/7; overflow: hidden;
          border-radius: 18px 18px 0 0; position: relative; background: #0a0828;
        }
        .wp-hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .wp-hero-badge {
          position: absolute; bottom: 18px; left: 24px;
          font-family: var(--f-display); font-weight: 700; font-size: 10px;
          text-transform: var(--tt); letter-spacing: var(--ls-med);
          color: #fff; background: var(--purple); padding: 6px 16px; border-radius: 20px;
        }
        .wp-thumbs {
          display: flex; gap: 10px; padding: 16px 24px 0;
          overflow-x: auto; scrollbar-width: none;
        }
        .wp-thumbs::-webkit-scrollbar { display: none; }
        .wp-thumb {
          width: 76px; height: 52px; border-radius: 8px; overflow: hidden;
          flex-shrink: 0; cursor: pointer; border: 2px solid transparent; opacity: 0.45;
          transition: border-color 0.2s, opacity 0.2s, transform 0.2s;
          padding: 0; background: none;
        }
        .wp-thumb:hover { opacity: 0.75; transform: scale(1.05); }
        .wp-thumb.active { border-color: var(--purple); opacity: 1; }
        .wp-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .wp-body { display: grid; grid-template-columns: 1fr 210px; gap: 40px; padding: 28px 28px 36px; }
        .wp-main { min-width: 0; }
        .wp-title {
          font-family: var(--f-display); font-weight: 900;
          font-size: clamp(30px,4vw,50px); text-transform: var(--tt);
          color: #fff; letter-spacing: -1px; line-height: 0.95; margin-bottom: 14px;
        }
        .wp-desc {
          font-size: 15px; line-height: var(--lh-body); color: rgba(255,255,255,0.52);
          margin-bottom: 28px; padding-bottom: 28px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .wp-section-label {
          font-family: var(--f-display); font-weight: 700; font-size: 10px;
          text-transform: var(--tt); letter-spacing: var(--ls-wide);
          color: var(--purple); margin-bottom: 10px;
        }
        .wp-text { font-size: 14px; line-height: var(--lh-body); color: rgba(255,255,255,0.5); margin-bottom: 28px; }
        .wp-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--f-display); font-weight: 700; font-size: 11px;
          text-transform: var(--tt); letter-spacing: var(--ls-med);
          color: #fff; background: var(--purple);
          padding: 13px 28px; border-radius: 6px; text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s; margin-top: 4px;
        }
        .wp-link:hover { background: var(--purple-h); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.4); }
        .wp-link-arrow { transition: transform 0.25s; display: inline-block; }
        .wp-link:hover .wp-link-arrow { transform: translateX(5px); }
        .wp-meta { display: flex; flex-direction: column; }
        .wp-meta-item { padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .wp-meta-item:first-child { border-top: 1px solid rgba(255,255,255,0.07); }
        .wp-meta-key {
          font-family: var(--f-display); font-weight: 700; font-size: 9px;
          text-transform: var(--tt); letter-spacing: var(--ls-wide);
          color: rgba(255,255,255,0.28); margin-bottom: 5px;
        }
        .wp-meta-val { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.85); }
        .wp-deliverables { display: flex; flex-direction: column; gap: 7px; margin-top: 4px; }
        .wp-deliverable { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.65); }
        .wp-deliverable::before { content: ''; width: 5px; height: 5px; background: var(--purple); border-radius: 50%; flex-shrink: 0; }

        /* ════ RESPONSIVE ════ */
        @media (max-width: 900px) {
          .about-hero { padding: 100px 24px 60px; }
          .hero-line span.solid,
          .hero-line span.outline { font-size: clamp(52px,14vw,90px); letter-spacing: -1px; }
          .section3 { padding: 60px 24px; }
          .s3-header { flex-direction: column; align-items: flex-start; }
          .work-grid { grid-template-columns: 1fr; }
          .work-card.tall { grid-row: span 1; }
          .work-card.tall .work-card-img { position: static; min-height: 280px; }
          .section4 { padding: 60px 24px 80px; }
          .cta-box { padding: 50px 24px; }
          .stats-section { padding: 0 24px 60px; }
          .stat-row { grid-template-columns: 1fr auto; padding: 26px 0; }
          .stat-label { display: none; }
          .wp-overlay { padding: 0; align-items: flex-end; }
          .wp-panel { max-height: 92vh; border-radius: 20px 20px 0 0; border-bottom: none; }
          .wp-hero { aspect-ratio: 16/9; border-radius: 20px 20px 0 0; }
          .wp-body { grid-template-columns: 1fr; gap: 24px; padding: 20px 20px 32px; }
          .wp-meta { display: grid; grid-template-columns: 1fr 1fr; }
          .wp-thumbs { padding: 12px 20px 0; }
        }
        @media (max-width: 480px) {
          .work-card-img { min-height: 200px; }
          .wp-meta { grid-template-columns: 1fr; }
          .wp-body { padding: 16px 16px 28px; }
          .wp-title { font-size: 26px; }
        }
      `}</style>

      <div className="page-wrap">

        {/* ════ HERO ════ */}
        <section className="about-hero" ref={heroRef}>
          <div className="hero-deco tl" aria-hidden="true" />
          <div className="hero-deco br" aria-hidden="true" />
          <div className="about-hero-inner">
            <div className="about-breadcrumb">
              <span>{t("nav.home")}</span>
              <span className="sep" aria-hidden="true">/</span>
              <span className="current">{t("project.breadcrumb")}</span>
            </div>
            <div className="about-hero-title">
              <div className="hero-line">
                <span className="solid">{t("project.hero.title1")}</span>
                <span className="outline">{t("project.hero.title2")}</span>
              </div>
            </div>
            <p className="about-desc">{t("project.hero.desc")}</p>
          </div>
        </section>

        <Ticker label={t("project.ticker")} />

        {/* ════ WORK GRID ════ */}
        <div className="section3-bg">
          <section className="section3" ref={workRef}>
            <div className="s3-header">
              <div className="s3-title">
                <span className="t-solid">{t("project.work.heading1")}</span>
                <span className="t-outline">{t("project.work.heading2")}</span>
              </div>
              <a href="/project" className="s3-more-btn">{t("project.work.more")}</a>
            </div>

            <div className="work-grid">
              {WORKS.map((work) => (
                <div
                  key={work.title}
                  className={`work-card${work.tall ? " tall" : ""}`}
                  onClick={() => setActiveWork(work)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${work.title}`}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveWork(work); }}
                >
                  <img
                    src={work.img}
                    alt={work.title}
                    className="work-card-img"
                    onError={handleImgError}
                  />
                  <div className="work-card-overlay">
                    <span className="wc-hint" aria-hidden="true">{t("project.work.hint")}</span>
                    <div className="wc-row">
                      <span className="wc-title">{work.title}</span>
                      <span className="wc-tag">{work.tag}</span>
                    </div>
                    <p className="wc-desc">{work.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ════ CTA ════ */}
        <section className="section4" ref={ctaRef}>
          <div className="cta-box">
            <div className="cta-heading">
              <span className="ch-solid">{t("project.cta.heading1")}</span>
              <span className="ch-outline">{t("project.cta.heading2")}</span>
            </div>
            <a href="/contact" className="cta-btn">{t("project.cta.btn")}</a>
          </div>
        </section>

        <Ticker label={t("project.ticker")} />

        {/* ════ STATS ════ */}
        <section className="stats-section" ref={statsRef}>
          <div className="stats-inner">
            {STATS.map(({ value, suffix, label, arrow }) => (
              <div className="stat-row" key={label}>
                <div className="stat-value">
                  <span className="stat-num" data-raw={value.replace(/[^0-9]/g, "")}>{value}</span>
                  <span className="stat-plus">{suffix}</span>
                </div>
                <span className="stat-label">{label}</span>
                <div className="stat-arrow" aria-hidden="true">{arrow}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ════ POPUP ════ */}
        {activeWork && (
          <WorkPopup
            work={activeWork}
            onClose={() => setActiveWork(null)}
            labels={popupLabels}
          />
        )}

      </div>
    </>
  );
}

Project.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;