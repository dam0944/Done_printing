import { useEffect, useRef } from "react";
import MainLayout from "@/layouts/MainLayout";

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "4,218", suffix: "+", label: "Project Success",    arrow: "↗" },
  { value: "812K",  suffix: "+", label: "Satisfied Clients",  arrow: "→" },
  { value: "293",   suffix: "+", label: "Agency Cooperation", arrow: "→" },
  { value: "456M",  suffix: "+", label: "Kind Of Services",   arrow: "→" },
  { value: "184",   suffix: "+", label: "Winning Awards",     arrow: "→" },
];

const WORKS = [
  { img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80", title: "Art Design",        tag: "View Project", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", tall: true  },
  { img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=80", title: "Logo Design",       tag: "View Now",     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",           tall: false },
  { img: "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=700&q=80", title: "Brand Design",      tag: "Branding",     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", tall: false },
  { img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80", title: "Industrial Design", tag: "Industrial",   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",           tall: false },
  { img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80", title: "Website Design",    tag: "Web Dev",      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.", tall: false },
  { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80", title: "Graphic Design",    tag: "Graphics",     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",           tall: false },
];

// ─── Ticker (self-contained ref + GSAP) ──────────────────────────────────────
function Ticker({ label, variant = "primary" }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    let anim;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const track = wrap.querySelector(".tk-track");
      if (track && !wrap.dataset.cloned) {
        wrap.appendChild(track.cloneNode(true));
        wrap.dataset.cloned = "1";
      }
      anim = gsap.to(wrap.querySelectorAll(".tk-track"), {
        x: "-100%", duration: variant === "secondary" ? 22 : 18,
        ease: "none", repeat: -1,
      });
    };
    init();
    return () => anim?.kill();
  }, [variant]);

  if (variant === "secondary") {
    return (
      <div className="ticker2-wrap">
        <div className="ticker2-inner" ref={wrapRef}>
          <div className="tk-track ticker2-track">
            {Array(12).fill(label).map((t, i) => (
              <span className="ticker2-item" key={i}>
                <span className="t2-dot" />{t}
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
          {Array(12).fill(label).map((t, i) => (
            <span className="ticker-item" key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Project() {
  const heroRef  = useRef(null);
  const workRef  = useRef(null);
  const statsRef = useRef(null);
  const ctaRef   = useRef(null);
  const ctxRef   = useRef(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctxRef.current = gsap.context(() => {

        // ── Hero: breadcrumb + lines + desc cascade ──
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(heroRef.current.querySelector(".about-breadcrumb"),
            { y: 20, opacity: 0, duration: 0.6 })
          .from(heroRef.current.querySelectorAll(".hero-line span"),
            { y: 90, opacity: 0, duration: 1, stagger: 0.12, clearProps: "all" }, "-=0.2")
          .from(heroRef.current.querySelector(".about-desc"),
            { y: 24, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.4");

        // ── Work section header + cards ──
        if (workRef.current) {
          gsap.from(workRef.current.querySelectorAll(".s3-title span"),
            {
              scrollTrigger: { trigger: workRef.current, start: "top 78%", toggleActions: "play none none reverse" },
              y: 50, opacity: 0, duration: 0.75, stagger: 0.1,
              ease: "power3.out", clearProps: "all",
            }
          );
          gsap.from(workRef.current.querySelector(".s3-more-btn"),
            {
              scrollTrigger: { trigger: workRef.current, start: "top 78%", toggleActions: "play none none reverse" },
              scale: 0.88, opacity: 0, duration: 0.6, delay: 0.25,
              ease: "back.out(1.5)", clearProps: "all",
            }
          );
          // Cards: alternate y/x entrance for visual interest
          workRef.current.querySelectorAll(".work-card").forEach((card, idx) => {
            const fromX = idx % 2 === 0 ? -30 : 30;
            gsap.from(card, {
              scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
              x: fromX, y: 40, opacity: 0, duration: 0.75,
              delay: idx * 0.07, ease: "power3.out", clearProps: "all",
            });
          });
        }

        // ── Stats rows: staggered slide-in ──
        if (statsRef.current) {
          gsap.from(statsRef.current.querySelectorAll(".stat-row"), {
            scrollTrigger: { trigger: statsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
            x: -60, opacity: 0, duration: 0.65, stagger: 0.1,
            ease: "power3.out", clearProps: "all",
          });
          // Animate stat values counting up
          statsRef.current.querySelectorAll(".stat-num").forEach((el) => {
            const raw   = el.dataset.raw;          // e.g. "4218", "812", "293"
            const isInt = !isNaN(Number(raw));
            if (!isInt) return;
            gsap.fromTo(el,
              { innerText: 0 },
              {
                scrollTrigger: { trigger: statsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
                innerText: Number(raw),
                duration: 1.8, delay: 0.3, ease: "power2.out", snap: { innerText: 1 },
                onUpdate() { el.innerText = Math.round(Number(el.innerText)).toLocaleString(); },
              }
            );
          });
        }

        // ── CTA ──
        if (ctaRef.current) {
          gsap.from(ctaRef.current.querySelector(".cta-box"), {
            scrollTrigger: { trigger: ctaRef.current, start: "top 82%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all",
          });
        }

      }, heroRef);
    };

    initGSAP();
    return () => ctxRef.current?.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { background: #0e0c2e; }

        .page-wrap {
          font-family: 'Barlow', sans-serif;
          background: #0e0c2e;
          color: #fff;
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .about-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background: radial-gradient(ellipse 90% 70% at 50% 40%, #1a1660 0%, #0e0c2e 68%);
          text-align: center;
          padding: 120px 60px 80px;
          overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .about-hero-inner {
          position: relative; z-index: 1;
          max-width: 1280px; width: 100%; margin: 0 auto;
        }
        .about-breadcrumb {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 3px;
          color: rgba(255,255,255,0.35); margin-bottom: 32px;
        }
        .about-breadcrumb .sep { color: #7c3aed; }
        .about-breadcrumb .current { color: rgba(255,255,255,0.65); }
        .about-hero-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          line-height: 0.88; margin-bottom: 36px;
        }
        .hero-line {
          display: flex; align-items: center;
          justify-content: center; gap: 24px; flex-wrap: wrap;
          overflow: hidden;
        }
        .hero-line span.solid {
          font-size: clamp(80px, 12vw, 170px);
          color: #fff; letter-spacing: -3px; line-height: 0.88;
          display: inline-block;
        }
        .hero-line span.outline {
          font-size: clamp(80px, 12vw, 170px);
          color: transparent;
          -webkit-text-stroke: 2.5px rgba(255,255,255,0.38);
          letter-spacing: -3px; line-height: 0.88;
          display: inline-block;
        }
        .about-desc {
          font-size: 16px; line-height: 1.75;
          color: rgba(255,255,255,0.55);
          max-width: 560px; margin: 0 auto;
        }
        .hero-deco {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
        .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

        /* ─── PRIMARY TICKER ─── */
        .ticker-wrap {
          width: 100%; overflow: hidden;
          background: #7c3aed;
          padding: 13px 0;
          transform: rotate(-1.2deg) scaleX(1.04);
          margin: 10px 0;
          position: relative; z-index: 10;
        }
        .ticker-inner,
        .ticker2-inner { display: flex; width: max-content; }
        .ticker-track,
        .ticker2-track { display: flex; white-space: nowrap; }
        .ticker-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 3px;
          color: #fff; padding: 0 32px;
          display: flex; align-items: center; gap: 14px;
        }
        .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

        /* ─── SECONDARY TICKER ─── */
        .ticker2-wrap {
          width: 100%; overflow: hidden;
          border-top: 1px solid rgba(124,58,237,0.2);
          border-bottom: 1px solid rgba(124,58,237,0.2);
          padding: 14px 0;
        }
        .ticker2-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: rgba(255,255,255,0.4);
          padding: 0 28px; display: flex; align-items: center; gap: 10px;
        }
        .t2-dot {
          width: 5px; height: 5px;
          background: #7c3aed; border-radius: 50%; flex-shrink: 0;
        }

        /* ─── OUR WORK ─── */
        .section3 {
          padding: 100px 60px 80px;
          max-width: 1280px; margin: 0 auto;
        }
        .section3-bg { background: #0a0828; }
        .s3-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 60px; gap: 20px;
        }
        .s3-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase; line-height: 0.92;
        }
        .s3-title .t-solid { font-size: clamp(42px, 5vw, 72px); color: #fff; display: block; }
        .s3-title .t-outline {
          font-size: clamp(42px, 5vw, 72px); color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.28); display: block;
        }
        .s3-more-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 11px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: #fff; background: #7c3aed;
          padding: 12px 24px; border-radius: 5px;
          text-decoration: none; white-space: nowrap;
          flex-shrink: 0; margin-bottom: 6px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .s3-more-btn:hover {
          background: #6d28d9;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124,58,237,0.4);
        }

        /* ─── WORK GRID ─── */
        .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .work-card {
          position: relative; border-radius: 12px;
          overflow: hidden; cursor: pointer; background: #13103a;
          will-change: transform;
        }
        .work-card.tall { grid-row: span 2; }
        .work-card-img {
          width: 100%; height: 100%; min-height: 240px;
          object-fit: cover; display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .work-card.tall .work-card-img { min-height: 100%; }
        .work-card:hover .work-card-img { transform: scale(1.06); }
        .work-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,8,40,0.95) 0%, rgba(10,8,40,0.3) 50%, transparent 100%);
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 22px; gap: 8px;
          transition: background 0.4s ease;
        }
        .work-card:hover .work-card-overlay {
          background: linear-gradient(to top, rgba(10,8,40,1) 0%, rgba(10,8,40,0.4) 55%, transparent 100%);
        }
        .wc-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .wc-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 17px;
          text-transform: uppercase; letter-spacing: 0.5px; color: #fff;
        }
        .wc-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; font-size: 10px;
          text-transform: uppercase; letter-spacing: 1.5px;
          color: #fff; background: #7c3aed;
          padding: 4px 10px; border-radius: 3px; white-space: nowrap;
          transition: background 0.2s;
        }
        .work-card:hover .wc-tag { background: #6d28d9; }
        .wc-desc { font-size: 12px; line-height: 1.55; color: rgba(255,255,255,0.5); max-width: 90%; }

        /* ─── CTA ─── */
        .section4 { background: #0e0c2e; padding: 80px 60px 100px; }
        .cta-box {
          max-width: 1280px; margin: 0 auto;
          background: linear-gradient(135deg, #13103a 0%, #1a1660 60%, #0e0c2e 100%);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 16px; padding: 80px 60px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute; top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          line-height: 0.92; margin-bottom: 32px; position: relative;
        }
        .cta-heading .ch-solid { font-size: clamp(48px, 6vw, 90px); color: #fff; display: block; }
        .cta-heading .ch-outline {
          font-size: clamp(48px, 6vw, 90px); color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block;
        }
        .cta-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: #fff; background: #7c3aed;
          padding: 15px 40px; border-radius: 6px;
          text-decoration: none; display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          position: relative;
        }
        .cta-btn:hover {
          transform: translateY(-3px);
          background: #6d28d9;
          box-shadow: 0 10px 30px rgba(124,58,237,0.5);
        }

        /* ─── STATS ─── */
        .stats-section { background: #0e0c2e; padding: 0 60px 80px; }
        .stats-inner { max-width: 1280px; margin: 0 auto; }
        .stat-row {
          display: grid;
          grid-template-columns: 280px 1fr auto;
          align-items: center;
          padding: 38px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          gap: 24px; cursor: pointer;
          transition: padding-left 0.3s ease;
        }
        .stat-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .stat-row:hover { padding-left: 12px; }
        .stat-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: clamp(42px, 5vw, 68px);
          color: #fff; letter-spacing: -1px; line-height: 1;
          display: flex; align-items: baseline; gap: 5px;
        }
        .stat-plus {
          font-size: clamp(24px, 3vw, 38px);
          color: #7c3aed; font-weight: 700; line-height: 1;
        }
        .stat-label {
          font-family: 'Barlow', sans-serif;
          font-weight: 600; font-size: clamp(18px, 2vw, 26px);
          color: rgba(255,255,255,0.7); letter-spacing: 0.2px;
          transition: color 0.3s;
        }
        .stat-row:hover .stat-label { color: rgba(255,255,255,0.95); }
        .stat-arrow {
          width: 38px; height: 38px;
          border: 1px solid rgba(255,255,255,0.18); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; color: rgba(255,255,255,0.45); flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat-row:first-child .stat-arrow { border-color: rgba(124,58,237,0.6); color: #7c3aed; }
        .stat-row:hover .stat-arrow {
          background: #7c3aed; border-color: #7c3aed; color: #fff; transform: rotate(-45deg) scale(1.1);
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .about-hero { padding: 100px 24px 60px; }
          .hero-line span.solid,
          .hero-line span.outline { font-size: clamp(52px, 14vw, 90px); letter-spacing: -1px; }
          .section3 { padding: 60px 24px; }
          .s3-header { flex-direction: column; align-items: flex-start; }
          .work-grid { grid-template-columns: 1fr; }
          .work-card.tall { grid-row: span 1; }
          .section4 { padding: 60px 24px 80px; }
          .cta-box { padding: 50px 24px; }
          .stats-section { padding: 0 24px 60px; }
          .stat-row { grid-template-columns: 1fr auto; padding: 26px 0; }
          .stat-label { display: none; }
        }
        @media (max-width: 480px) {
          .work-card-img { min-height: 200px; }
        }
      `}</style>

      <div className="page-wrap">

        {/* ══ HERO ══ */}
        <section className="about-hero" ref={heroRef}>
          <div className="hero-deco tl" />
          <div className="hero-deco br" />
          <div className="about-hero-inner">
            <div className="about-breadcrumb">
              <span>Home</span>
              <span className="sep">/</span>
              <span className="current">Project</span>
            </div>
            <div className="about-hero-title">
              <div className="hero-line">
                <span className="solid">Awesome</span>
                <span className="outline">Project</span>
              </div>
            </div>
            <p className="about-desc">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium totam rem veritatis quasi architecto.
            </p>
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <Ticker label="Latest Works" />

        {/* ══ OUR WORK ══ */}
        <div className="section3-bg">
          <section className="section3" ref={workRef}>
            <div className="s3-header">
              <div className="s3-title">
                <span className="t-solid">Let's Check</span>
                <span className="t-outline">Our Work</span>
              </div>
              <a href="/project" className="s3-more-btn">More Works</a>
            </div>

            <div className="work-grid">
              {WORKS.map(({ img, title, tag, desc, tall }) => (
                <div className={`work-card${tall ? " tall" : ""}`} key={title}>
                  <img
                    src={img} alt={title} className="work-card-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background = "linear-gradient(135deg,#13103a,#1a1660)";
                    }}
                  />
                  <div className="work-card-overlay">
                    <div className="wc-row">
                      <span className="wc-title">{title}</span>
                      <span className="wc-tag">{tag}</span>
                    </div>
                    <p className="wc-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ══ CTA ══ */}
        <section className="section4" ref={ctaRef}>
          <div className="cta-box">
            <div className="cta-heading">
              <span className="ch-solid">Have a Project?</span>
              <span className="ch-outline">Let's Talk.</span>
            </div>
            <a href="/contact" className="cta-btn">Get Started</a>
          </div>
        </section>

        {/* ══ SECONDARY TICKER ══ */}
        <Ticker label="Funfact" variant="secondary" />

        {/* ══ STATS ══ */}
        <section className="stats-section" ref={statsRef}>
          <div className="stats-inner">
            {STATS.map(({ value, suffix, label, arrow }) => {
              // Strip non-numeric chars for count-up (e.g. "4,218" → 4218, "812K" → null)
              const raw = value.replace(/[^0-9]/g, "");
              const canCount = raw && !value.match(/[A-Za-z]/);
              return (
                <div className="stat-row" key={label}>
                  <div className="stat-value">
                    <span
                      className="stat-num"
                      data-raw={canCount ? raw : ""}
                    >
                      {value}
                    </span>
                    <span className="stat-plus">{suffix}</span>
                  </div>
                  <span className="stat-label">{label}</span>
                  <div className={`stat-arrow${arrow === "↗" ? " diag" : ""}`}>
                    {arrow === "↗" ? "↗" : "→"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

Project.layout = (page) => <MainLayout>{page}</MainLayout>;
