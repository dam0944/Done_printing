import { useEffect, useRef, useState, memo } from "react";
import type { FC, ReactElement } from "react";
import { useLang } from "@/contexts/LangContext";
import MainLayout from "@/layouts/MainLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
  tier: string;
  amount: string;
  features: string[];
}

interface Review {
  name: string;
  role: string;
  avatar: string;
  stars: number;
  quote: string;
}

interface WhyCard {
  num: string;
  title: string;
  desc: string;
}

interface TickerProps {
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PLAN_AMOUNTS = ["$49.99", "$59.99", "$79.99"] as const;
const PLAN_TIERS   = ["silver", "platinum", "gold"] as const;

const REVIEW_DATA: Omit<Review, "quote">[] = [
  { name: "Callie John",  role: "CEO, VScret",             avatar: "https://randomuser.me/api/portraits/women/44.jpg", stars: 5 },
  { name: "Marcus Lee",   role: "Founder, Designly",       avatar: "https://randomuser.me/api/portraits/men/32.jpg",   stars: 5 },
  { name: "Sara Patel",   role: "Head of Product, Nexlabs", avatar: "https://randomuser.me/api/portraits/women/68.jpg", stars: 5 },
];

const WHY_NUMS = ["01.", "02.", "03.", "04.", "05.", "06."] as const;

// ─── Ticker ───────────────────────────────────────────────────────────────────

const Ticker: FC<TickerProps> = memo(({ label }) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: gsap.core.Tween | undefined;

    const init = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const wrap = wrapRef.current;
      if (!wrap) return;

      const track = wrap.querySelector<HTMLElement>(".ticker-track");
      if (track && !wrap.dataset.cloned) {
        wrap.appendChild(track.cloneNode(true));
        wrap.dataset.cloned = "1";
      }

      anim = gsap.to(wrap.querySelectorAll(".ticker-track"), {
        x: "-100%", duration: 18, ease: "none", repeat: -1,
      });
    };

    init();
    return () => { anim?.kill(); };
  }, []);

  return (
    <div className="ticker-wrap">
      <div className="ticker-inner" ref={wrapRef}>
        <div className="ticker-track">
          {Array.from({ length: 10 }, (_, i) => (
            <span className="ticker-item" key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
});
Ticker.displayName = "Ticker";

// ─── Main component ───────────────────────────────────────────────────────────

export default function Pricing() {
  const { t } = useLang();

  // Plans, reviews, and why-cards depend on t() so are built inside the component.
  // useMemo is intentionally omitted — t() is stable and these are cheap to build.

  const PLANS: Plan[] = PLAN_TIERS.map((tier, i) => ({
    tier:   t(`pricing.plan.${tier}.tier`),
    amount: PLAN_AMOUNTS[i],
    features: Array.from({ length: 5 }, (_, n) => t(`pricing.plan.${tier}.f${n + 1}`)),
  }));

  const REVIEWS: Review[] = REVIEW_DATA.map((r, i) => ({
    ...r,
    quote: t(`pricing.reviews.${i + 1}.quote`),
  }));

  const WHY_CARDS: WhyCard[] = WHY_NUMS.map((num, i) => ({
    num,
    title: t(`about.why.${i + 1}.title`),
    desc:  t(`about.why.${i + 1}.desc`),
  }));

  // ── Refs ──────────────────────────────────────────────────────────────────

  const heroRef = useRef<HTMLElement>(null);
  const whyRef  = useRef<HTMLElement>(null);
  const ctxRef  = useRef<gsap.Context | null>(null);

  const [activeReview, setActiveReview] = useState(0);
  const review = REVIEWS[activeReview];

  // ── GSAP ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const initGSAP = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const hero = heroRef.current;
      if (!hero) return;

      ctxRef.current = gsap.context(() => {
        gsap.from(hero.querySelectorAll(".hero-line"), {
          y: 80, opacity: 0, duration: 1, stagger: 0.15,
          ease: "power3.out", clearProps: "all",
        });
        gsap.from(hero.querySelector(".about-desc"), {
          y: 30, opacity: 0, duration: 0.9, delay: 0.5,
          ease: "power3.out", clearProps: "all",
        });

        const why = whyRef.current;
        if (why) {
          const stBase = { toggleActions: "play none none reverse" as const };
          gsap.from(why.querySelector(".why-heading"), {
            scrollTrigger: { trigger: why, start: "top 78%", ...stBase },
            y: 40, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(why.querySelectorAll(".why-card"), {
            scrollTrigger: { trigger: why, start: "top 68%", ...stBase },
            y: 50, opacity: 0, duration: 0.7, stagger: 0.08,
            ease: "power3.out", clearProps: "all",
          });
        }
      });
    };

    initGSAP();
    return () => { ctxRef.current?.revert(); };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{STYLES}</style>

      <div className="page-wrap">

        {/* ══ HERO ══ */}
        <section className="about-hero" ref={heroRef}>
          <div className="hero-deco tl" />
          <div className="hero-deco br" />
          <div className="about-hero-inner">
            <div className="about-breadcrumb">
              <span>{t("nav.home")}</span>
              <span className="sep">/</span>
              <span className="current">{t("pricing.breadcrumb")}</span>
            </div>
            <div className="about-hero-title">
              <div className="hero-line">
                <span className="solid">{t("pricing.hero.title1")}</span>
                <span className="outline">{t("pricing.hero.title2")}</span>
              </div>
            </div>
            <p className="about-desc">{t("pricing.hero.desc")}</p>
          </div>
        </section>

        <Ticker label={t("pricing.ticker")} />

        {/* ══ PRICING ══ */}
        <div className="pricing-outer">
          <div className="pricing-header">
            <h2 className="pricing-title">
              <span className="pt-solid">{t("pricing.section.title1")} </span>
              <span className="pt-outline">{t("pricing.section.title2")}</span>
            </h2>
            <p className="pricing-subtitle">{t("pricing.section.subtitle")}</p>
          </div>
          <div className="pricing-grid">
            {PLANS.map(({ tier, amount, features }) => (
              <div className="price-card" key={tier}>
                <p className="pc-tier">{tier}</p>
                <div className="pc-price">
                  <span className="pc-amount">{amount}</span>
                  <span className="pc-period">{t("pricing.plan.period")}</span>
                </div>
                <div className="pc-divider" />
                <ul className="pc-features">
                  {features.map((f) => (
                    <li className="pc-feat" key={f}>
                      <span className="pc-feat-arrow">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="pc-btn">{t("pricing.plan.select")}</a>
              </div>
            ))}
          </div>
        </div>

        {/* ══ REVIEWS ══ */}
        <div className="reviews-outer">
          <div className="reviews-inner">
            <div className="rev-left">
              <div className="rev-heading">
                <span className="rh-solid">{t("pricing.reviews.heading1")}</span>
                <span className="rh-outline">{t("pricing.reviews.heading2")}</span>
              </div>
            </div>
            <div className="rev-right">
              <div className="rev-stars">
                {Array.from({ length: review.stars }, (_, i) => (
                  <span className="rev-star" key={i}>★</span>
                ))}
              </div>
              <div className="rev-author">
                <div className="rev-avatar">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <div>
                  <p className="rev-name">{review.name}</p>
                  <p className="rev-role">{review.role}</p>
                </div>
              </div>
              <p className="rev-quote">{review.quote}</p>
              <div className="rev-nav">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    className={`rev-dot${i === activeReview ? " on" : ""}`}
                    onClick={() => setActiveReview(i)}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Ticker label={t("pricing.ticker.why")} />

        {/* ══ WHY CHOOSE US ══ */}
        <section className="why-section" ref={whyRef}>
          <div className="why-inner">
            <div className="why-heading">
              <h2>
                <span className="wh-highlight">{t("about.why.heading.highlight")}</span>
                <span className="wh-solid">{t("about.why.heading.solid")}</span>
                <span className="wh-outline">{t("about.why.heading.outline")}</span>
              </h2>
              <p>{t("about.why.sub")}</p>
            </div>
            <div className="why-grid">
              {WHY_CARDS.map(({ num, title, desc }) => (
                <div className="why-card" key={num}>
                  <div className="why-card-num">{num}</div>
                  <div className="why-card-title">{title}</div>
                  <p className="why-card-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

Pricing.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

// ─── Styles ───────────────────────────────────────────────────────────────────

const STYLES = `
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
  }
  :root[data-lang="km"] {
    --f-body:    'Noto Sans Khmer', sans-serif;
    --f-display: 'Noto Sans Khmer', sans-serif;
    --tt:        none;
    --ls-wide:   0px;
    --ls-med:    0px;
    --ls-tight:  0px;
    --lh-body:   2;
  }

  .page-wrap { font-family: var(--f-body); background: #0e0c2e; color: #fff; overflow-x: hidden; }

  /* ─── HERO ─── */
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
  .about-hero-inner  { position: relative; z-index: 1; max-width: 1100px; width: 100%; margin: 0 auto; }
  .about-breadcrumb  {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--f-display); font-size: 11px; font-weight: 600;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: rgba(255,255,255,0.35); margin-bottom: 32px;
  }
  .about-breadcrumb span.sep     { color: #7c3aed; }
  .about-breadcrumb span.current { color: rgba(255,255,255,0.65); }
  .about-hero-title { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.88; margin-bottom: 36px; }
  .hero-line { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; }
  .hero-line span.solid   { font-size: clamp(80px, 12vw, 170px); color: #fff; letter-spacing: -3px; line-height: 0.88; }
  .hero-line span.outline { font-size: clamp(80px, 12vw, 170px); color: transparent; -webkit-text-stroke: 2.5px rgba(255,255,255,0.38); letter-spacing: -3px; line-height: 0.88; }
  .about-desc { font-size: 16px; line-height: var(--lh-body); color: rgba(255,255,255,0.55); max-width: 560px; margin: 0 auto; }
  .hero-deco { position: absolute; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%); }
  .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
  .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

  /* ─── TICKER ─── */
  .ticker-wrap  { width: 100%; overflow: hidden; background: #7c3aed; padding: 13px 0; transform: rotate(-1.2deg) scaleX(1.04); margin: 10px 0; position: relative; z-index: 10; }
  .ticker-inner { display: flex; width: max-content; }
  .ticker-track { display: flex; white-space: nowrap; }
  .ticker-item  {
    font-family: var(--f-display); font-weight: 700; font-size: 12px;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: #fff; padding: 0 32px; display: flex; align-items: center; gap: 14px;
  }
  .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

  /* ─── PRICING ─── */
  .pricing-outer  { background: #0e0c2e; padding: 100px 60px 80px; }
  .pricing-header { text-align: center; margin-bottom: 60px; }
  .pricing-title  {
    font-family: var(--f-display); font-weight: 900; text-transform: var(--tt);
    font-size: clamp(42px, 5.5vw, 76px); line-height: 0.95; letter-spacing: -1px; margin-bottom: 16px;
  }
  .pricing-title .pt-solid   { color: #fff; }
  .pricing-title .pt-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); }
  .pricing-subtitle { font-size: 14px; color: rgba(255,255,255,0.4); line-height: var(--lh-body); }
  .pricing-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .price-card {
    background: #13103a; border: 1px solid rgba(124,58,237,0.2); border-radius: 12px;
    padding: 36px 32px 0; display: flex; flex-direction: column;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden;
  }
  .price-card::before {
    content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
    width: 220px; height: 220px;
    background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
    pointer-events: none; transition: opacity 0.3s; opacity: 0;
  }
  .price-card:hover { border-color: rgba(124,58,237,0.5); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(124,58,237,0.18); }
  .price-card:hover::before { opacity: 1; }
  .pc-tier   { font-family: var(--f-display); font-weight: 700; font-size: 14px; text-transform: var(--tt); letter-spacing: var(--ls-med); color: rgba(255,255,255,0.5); margin-bottom: 14px; }
  .pc-price  { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
  .pc-amount { font-family: var(--f-display); font-weight: 900; font-size: clamp(38px, 4vw, 56px); color: #fff; letter-spacing: -1px; line-height: 1; }
  .pc-period { font-size: 13px; color: rgba(255,255,255,0.4); }
  .pc-divider { width: 100%; height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 24px; }
  .pc-features { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; flex-grow: 1; }
  .pc-feat { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.75); }
  .pc-feat-arrow {
    width: 22px; height: 22px; background: rgba(124,58,237,0.15); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: #a78bfa; flex-shrink: 0; transition: background 0.25s, color 0.25s;
  }
  .price-card:hover .pc-feat-arrow { background: rgba(124,58,237,0.3); color: #c4b5fd; }
  .pc-btn {
    font-family: var(--f-display); font-weight: 700; font-size: 11px;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: #fff; background: #7c3aed; border: none; padding: 16px; text-align: center;
    cursor: pointer; text-decoration: none; display: block;
    margin: 0 -32px; margin-top: auto; border-radius: 0 0 11px 11px; transition: background 0.2s;
  }
  .pc-btn:hover { background: #6d28d9; }

  /* ─── REVIEWS ─── */
  .reviews-outer { background: #0e0c2e; padding: 40px 60px 100px; }
  .reviews-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 380px 1fr; gap: 80px; align-items: start; }
  .rev-heading { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.92; }
  .rev-heading .rh-solid   { font-size: clamp(52px, 6vw, 88px); color: #fff; display: block; letter-spacing: -1px; }
  .rev-heading .rh-outline { font-size: clamp(52px, 6vw, 88px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block; letter-spacing: -1px; }
  .rev-stars { display: flex; gap: 4px; margin-bottom: 18px; }
  .rev-star  { color: #f59e0b; font-size: 18px; }
  .rev-author { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
  .rev-avatar { width: 52px; height: 52px; border-radius: 50%; border: 2px solid rgba(124,58,237,0.4); background: linear-gradient(135deg, #7c3aed, #1a1660); overflow: hidden; flex-shrink: 0; }
  .rev-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .rev-name  { font-family: var(--f-display); font-weight: 700; font-size: 18px; text-transform: var(--tt); color: #fff; line-height: 1.1; }
  .rev-role  { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }
  .rev-quote { font-size: 16px; line-height: var(--lh-body); color: rgba(255,255,255,0.65); max-width: 580px; margin-bottom: 36px; }
  .rev-nav   { display: flex; gap: 8px; align-items: center; }
  .rev-dot   { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.18); cursor: pointer; transition: background 0.25s, width 0.25s; border: none; padding: 0; }
  .rev-dot.on { background: #7c3aed; width: 24px; border-radius: 4px; }

  /* ─── WHY CHOOSE US ─── */
  .why-section { background: #080620; padding: 100px 60px; }
  .why-inner   { max-width: 1280px; margin: 0 auto; }
  .why-heading { text-align: center; margin-bottom: 60px; }
  .why-heading h2 {
    font-family: var(--f-display); font-weight: 900; text-transform: var(--tt);
    font-size: clamp(38px, 6vw, 80px); line-height: 1; letter-spacing: -1px;
    display: inline-flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center;
  }
  .why-heading h2 .wh-highlight { color: #fff; background: #1e3a8a; padding: 2px 14px 4px; border-radius: 4px; }
  .why-heading h2 .wh-solid   { color: #fff; }
  .why-heading h2 .wh-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.32); }
  .why-heading p  { font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 14px; line-height: var(--lh-body); }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .why-card { border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 36px 32px 40px; background: rgba(255,255,255,0.02); transition: border-color 0.3s, background 0.3s; cursor: default; }
  .why-card:hover { border-color: rgba(124,58,237,0.4); background: rgba(124,58,237,0.05); }
  .why-card-num   { font-family: var(--f-display); font-weight: 700; font-size: 40px; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.18); line-height: 1; margin-bottom: 22px; letter-spacing: -1px; }
  .why-card-title { font-family: var(--f-body); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 14px; }
  .why-card-desc  { font-size: 13.5px; line-height: var(--lh-body); color: rgba(255,255,255,0.42); }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 900px) {
    .about-hero { padding: 100px 24px 60px; }
    .hero-line span.solid, .hero-line span.outline { font-size: clamp(56px, 14vw, 90px); letter-spacing: -1px; }
    .pricing-outer { padding: 60px 24px; }
    .pricing-grid  { grid-template-columns: 1fr; max-width: 440px; }
    .reviews-outer { padding: 40px 24px 60px; }
    .reviews-inner { grid-template-columns: 1fr; gap: 40px; }
    .why-section   { padding: 60px 24px; }
    .why-grid      { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 540px) {
    .why-grid { grid-template-columns: 1fr; }
  }
`;