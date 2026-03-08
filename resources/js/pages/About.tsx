import { useEffect, useRef, useState, memo } from "react";
import type { FC, ReactElement } from "react";
import { useLang } from "@/contexts/LangContext";
import MainLayout from "@/layouts/MainLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TickerProps {
  label: string;
}

interface InfoCard {
  label: string;
  arrow: "↗" | "→";
  desc: string;
}

interface TeamMember {
  name: string;
  role: string;
  email: string;
  bg: string;
}

interface Award {
  country: string;
  name: string;
  years: string;
}

interface Skill {
  name: string;
  pct: number;
}

interface WhyCard {
  num: string;
  title: string;
  desc: string;
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Cartier Bresson", role: "CEO / Founder",   email: "cartier@creatv.com", bg: "#4fc3f7" },
  { name: "Viola Spencer",   role: "Project Manager", email: "viola@creatv.com",   bg: "#f48fb1" },
  { name: "Carmen Hayes",    role: "Motion Designer", email: "carmen@creatv.com",  bg: "#e0e0e0" },
  { name: "Monica Barker",   role: "Digital Manager", email: "monica@creatv.com",  bg: "#90caf9" },
];

const SKILL_PCTS = [97, 90, 87, 83, 75] as const;
const AWARD_COUNT = 4;
const FAQ_COUNT   = 8;
const WHY_NUMS    = ["01.", "02.", "03.", "04.", "05.", "06."] as const;

const TEAM_PHOTO_SRC =
  "https://templatekit.jegtheme.com/creatv/wp-content/uploads/sites/419/2023/10/handsome-guy-in-casual-clothes-standing-with-arms-HWSQN2E-800x960.jpg";

const ST_BASE = { toggleActions: "play none none reverse" } as const;

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

export default function About() {
  const { t } = useLang();

  // These depend on t() so are built inside the component.
  // useMemo is intentionally omitted — t() is stable and these are cheap to build.

  const INFO_CARDS: InfoCard[] = [
    { label: t("about.card.who.label"),     arrow: "↗", desc: t("about.card.who.desc") },
    { label: t("about.card.vision.label"),  arrow: "→", desc: t("about.card.vision.desc") },
    { label: t("about.card.mission.label"), arrow: "→", desc: t("about.card.mission.desc") },
  ];

  const AWARDS: Award[] = Array.from({ length: AWARD_COUNT }, (_, i) => ({
    country: t(`about.award.${i + 1}.country`),
    name:    t(`about.award.${i + 1}.name`),
    years:   t(`about.award.${i + 1}.years`),
  }));

  const SKILLS: Skill[] = SKILL_PCTS.map((pct, i) => ({
    name: t(`about.skill.${i + 1}`),
    pct,
  }));

  const WHY_CARDS: WhyCard[] = WHY_NUMS.map((num, i) => ({
    num,
    title: t(`about.why.${i + 1}.title`),
    desc:  t(`about.why.${i + 1}.desc`),
  }));

  const FAQ_ITEMS: FaqItem[] = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`about.faq.${i + 1}.q`),
    a: t(`about.faq.${i + 1}.a`),
  }));

  // ── Refs ──────────────────────────────────────────────────────────────────

  const heroRef     = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLElement>(null);
  const skillsRef   = useRef<HTMLElement>(null);
  const whyRef      = useRef<HTMLElement>(null);
  const faqRef      = useRef<HTMLElement>(null);
  const teamRef     = useRef<HTMLElement>(null);
  const ctxRef      = useRef<gsap.Context | null>(null);

  const [openFaq, setOpenFaq] = useState<number>(-1);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleFaqToggle = (i: number) =>
    setOpenFaq((prev) => (prev === i ? -1 : i));

  const handleTeamImgError = (bg: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.style.display = "none";
    if (img.parentElement) img.parentElement.style.background = bg;
  };

  // ── GSAP ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const initGSAP = async (): Promise<void> => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const hero = heroRef.current;
      if (!hero) return;

      ctxRef.current = gsap.context(() => {
        // Hero
        gsap.from(hero.querySelectorAll(".hero-line"), {
          y: 80, opacity: 0, duration: 1, stagger: 0.15,
          ease: "power3.out", clearProps: "all",
        });
        gsap.from(hero.querySelector(".about-desc"), {
          y: 30, opacity: 0, duration: 0.9, delay: 0.5,
          ease: "power3.out", clearProps: "all",
        });

        // Section 2
        const s2 = section2Ref.current;
        if (s2) {
          gsap.from(s2.querySelectorAll(".s2-heading .word"), {
            scrollTrigger: { trigger: s2, start: "top 75%", ...ST_BASE },
            y: 60, opacity: 0, duration: 0.8, stagger: 0.12,
            ease: "power3.out", clearProps: "all",
          });
          const videoBlock = s2.querySelector(".s2-video-block");
          if (videoBlock) {
            gsap.from(videoBlock, {
              scrollTrigger: { trigger: videoBlock, start: "top 85%", ...ST_BASE },
              x: -60, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
            });
          }
        }

        const img = imgRef.current;
        if (img) {
          gsap.from(img, {
            scrollTrigger: { trigger: img, start: "top 70%", ...ST_BASE },
            x: 80, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all",
          });
        }

        const cards = cardsRef.current;
        if (cards) {
          gsap.from(cards.querySelectorAll(".info-card"), {
            scrollTrigger: { trigger: cards, start: "top 80%", ...ST_BASE },
            y: 40, opacity: 0, duration: 0.7, stagger: 0.15,
            ease: "power3.out", clearProps: "all",
          });
        }

        // Team
        const team = teamRef.current;
        if (team) {
          gsap.from(team.querySelector(".team-heading"), {
            scrollTrigger: { trigger: team, start: "top 78%", ...ST_BASE },
            y: 50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(team.querySelectorAll(".team-card"), {
            scrollTrigger: { trigger: team, start: "top 68%", ...ST_BASE },
            y: 60, opacity: 0, duration: 0.7, stagger: 0.12,
            ease: "power3.out", clearProps: "all",
          });
        }

        // Skills
        const skills = skillsRef.current;
        if (skills) {
          gsap.from(skills.querySelector(".skills-title"), {
            scrollTrigger: { trigger: skills, start: "top 78%", ...ST_BASE },
            x: -50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(skills.querySelectorAll(".award-row"), {
            scrollTrigger: { trigger: skills, start: "top 72%", ...ST_BASE },
            x: -40, opacity: 0, duration: 0.6, stagger: 0.1,
            ease: "power3.out", clearProps: "all",
          });
          skills.querySelectorAll<HTMLElement>(".skill-fill").forEach((bar) => {
            gsap.fromTo(bar, { width: "0%" }, {
              scrollTrigger: { trigger: skills, start: "top 70%", ...ST_BASE },
              width: bar.dataset.width ?? "0%",
              duration: 1.2, ease: "power2.out", delay: 0.3,
            });
          });
        }

        // Why
        const why = whyRef.current;
        if (why) {
          gsap.from(why.querySelector(".why-heading"), {
            scrollTrigger: { trigger: why, start: "top 78%", ...ST_BASE },
            y: 40, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(why.querySelectorAll(".why-card"), {
            scrollTrigger: { trigger: why, start: "top 68%", ...ST_BASE },
            y: 50, opacity: 0, duration: 0.7, stagger: 0.08,
            ease: "power3.out", clearProps: "all",
          });
        }

        // FAQ
        const faq = faqRef.current;
        if (faq) {
          gsap.from(faq.querySelector(".faq-left"), {
            scrollTrigger: { trigger: faq, start: "top 78%", ...ST_BASE },
            x: -50, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
          });
          gsap.from(faq.querySelectorAll(".faq-item"), {
            scrollTrigger: { trigger: faq, start: "top 72%", ...ST_BASE },
            x: 40, opacity: 0, duration: 0.6, stagger: 0.08,
            ease: "power3.out", clearProps: "all",
          });
        }

        // CTA
        const cta = ctaRef.current;
        if (cta) {
          gsap.from(cta.querySelector(".cta-box"), {
            scrollTrigger: { trigger: cta, start: "top 80%", ...ST_BASE },
            y: 40, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
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
              <span className="current">{t("about.breadcrumb")}</span>
            </div>
            <div className="about-hero-title">
              <div className="hero-line">
                <span className="solid">{t("about.hero.title1")}</span>
                <span className="outline">{t("about.hero.title2")}</span>
              </div>
            </div>
            <p className="about-desc">{t("about.hero.desc")}</p>
          </div>
        </section>

        <Ticker label={t("about.ticker.story")} />

        {/* ══ SECTION 2 ══ */}
        <section className="section2" ref={section2Ref}>
          <div className="s2-left">
            <div className="s2-heading">
              <span className="word solid-word">{t("about.s2.heading1")}</span>
              <span className="word outline-word">{t("about.s2.heading2")}</span>
            </div>
            <div className="s2-video-block">
              <div className="play-btn">▶</div>
              <span className="play-label">{t("about.s2.video")}</span>
            </div>
            <p className="s2-body-text">{t("about.s2.body")}</p>
            <a href="/contact" className="learn-more">{t("about.s2.cta")}</a>
          </div>
          <div className="s2-right">
            <div className="s2-img-wrap" ref={imgRef}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Our team collaborating"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  if (img.parentElement) {
                    img.parentElement.style.background = "linear-gradient(135deg,#1a1660,#2d1b69)";
                  }
                }}
              />
            </div>
            <div className="info-cards" ref={cardsRef}>
              {INFO_CARDS.map(({ label, arrow, desc }) => (
                <div className="info-card" key={label}>
                  <span className="card-label">{label}</span>
                  <span className="card-desc">{desc}</span>
                  <div className={`card-arrow${arrow === "↗" ? " diagonal" : ""}`}>→</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ticker label={t("about.ticker.team")} />

        {/* ══ TEAM ══ */}
        <section className="team-section" ref={teamRef}>
          <div className="team-inner">
            <div className="team-heading">
              <h2>
                <span className="th-solid">{t("about.team.heading1")}</span>
                <span className="th-outline">{t("about.team.heading2")}</span>
              </h2>
              <p>{t("about.team.sub")}</p>
            </div>
            <div className="team-grid">
              {TEAM_MEMBERS.map(({ name, role, email, bg }) => (
                <div className="team-card" key={name}>
                  <div className="team-card-img">
                    <img
                      src={TEAM_PHOTO_SRC}
                      alt={name}
                      style={{ background: bg }}
                      onError={handleTeamImgError(bg)}
                    />
                    <div className="tc-overlay" />
                  </div>
                  <span className="team-card-name">{name}</span>
                  <span className="team-card-role">{role}</span>
                  <a href={`mailto:${email}`} className="team-card-email">{email}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS & AWARDS ══ */}
        <section className="skills-section" ref={skillsRef}>
          <div className="skills-inner">
            <div className="skills-title">
              <span className="st-solid">{t("about.skills.heading1")}</span>
              <span className="st-outline">{t("about.skills.heading2")}</span>
            </div>
            <div className="awards-list">
              {AWARDS.map(({ country, name, years }) => (
                <div className="award-row" key={name}>
                  <div>
                    <div className="award-country">{country}</div>
                    <div className="award-name">{name}</div>
                  </div>
                  <div className="award-year">{years}</div>
                </div>
              ))}
            </div>
            <div className="skill-bars">
              {SKILLS.map(({ name, pct }) => (
                <div className="skill-row" key={name}>
                  <div className="skill-top">
                    <span className="skill-name">{name}</span>
                    <span className="skill-pct">{pct}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" data-width={`${pct}%`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ticker label={t("about.ticker.why")} />

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

        <Ticker label={t("about.ticker.faq")} />

        {/* ══ FAQ ══ */}
        <section className="faq-section" ref={faqRef}>
          <div className="faq-inner">
            <div className="faq-left">
              <div className="faq-title">
                <span className="ft-solid">{t("about.faq.heading1")}</span>
                <span className="ft-outline">{t("about.faq.heading2")}</span>
              </div>
              <p className="faq-desc">{t("about.faq.desc")}</p>
              <a href="/contact" className="faq-contact-btn">{t("about.faq.btn")}</a>
            </div>
            <div className="faq-list">
              {FAQ_ITEMS.map(({ q, a }, i) => (
                <div
                  className={`faq-item${openFaq === i ? " open" : ""}`}
                  key={i}
                  onClick={() => handleFaqToggle(i)}
                >
                  <div className="faq-question">
                    <span className="faq-q-text">{q}</span>
                    <span className="faq-toggle">+</span>
                  </div>
                  <div className="faq-answer"><p>{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

About.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

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
  .about-hero-inner { position: relative; z-index: 1; max-width: 1100px; width: 100%; margin: 0 auto; }
  .about-breadcrumb {
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
  .hero-deco { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%); pointer-events: none; }
  .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
  .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

  /* ─── TICKER ─── */
  .ticker-wrap  { width: 100%; overflow: hidden; background: #7c3aed; padding: 13px 0; transform: rotate(-1.2deg) scaleX(1.04); margin: 10px 0; position: relative; z-index: 10; }
  .ticker-inner { display: flex; width: max-content; }
  .ticker-track { display: flex; white-space: nowrap; }
  .ticker-item  { font-family: var(--f-display); font-weight: 700; font-size: 12px; text-transform: var(--tt); letter-spacing: var(--ls-wide); color: #fff; padding: 0 32px; display: flex; align-items: center; gap: 14px; }
  .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

  /* ─── SECTION 2 ─── */
  .section2 { max-width: 1280px; margin: 0 auto; min-height: 100vh; padding: 100px 60px; background: #0e0c2e; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .s2-heading { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.95; margin-bottom: 50px; }
  .s2-heading .word { display: inline-block; overflow: hidden; }
  .s2-heading .solid-word   { font-size: clamp(50px, 6vw, 90px); color: #fff; display: block; }
  .s2-heading .outline-word { font-size: clamp(50px, 6vw, 90px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); display: block; }
  .s2-video-block { display: flex; align-items: center; gap: 14px; margin-bottom: 30px; cursor: pointer; }
  .play-btn { width: 46px; height: 46px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; transition: transform 0.3s, background 0.3s; }
  .s2-video-block:hover .play-btn { transform: scale(1.1); background: #6d28d9; }
  .play-label     { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; color: rgba(255,255,255,0.85); }
  .s2-body-text   { font-size: 16px; line-height: var(--lh-body); color: rgba(255,255,255,0.55); margin-bottom: 36px; max-width: 400px; }
  .learn-more {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--f-display); font-weight: 700; font-size: 16px;
    text-transform: var(--tt); letter-spacing: var(--ls-med);
    color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3);
    padding-bottom: 4px; transition: border-color 0.3s, color 0.3s;
  }
  .learn-more:hover { color: #a78bfa; border-color: #a78bfa; }
  .s2-img-wrap { width: 100%; border-radius: 12px; overflow: hidden; margin-bottom: 40px; aspect-ratio: 4/3; background: #1a1660; }
  .s2-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .info-cards { display: flex; flex-direction: column; }
  .info-card { display: grid; grid-template-columns: 140px 1fr 30px; align-items: center; padding: 50px 0; border-bottom: 1px solid rgba(255,255,255,0.1); gap: 20px; cursor: pointer; transition: opacity 0.3s; }
  .info-card:hover { opacity: 0.8; }
  .info-card:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
  .card-label { font-family: var(--f-display); font-weight: 700; font-size: 20px; text-transform: var(--tt); letter-spacing: 0.5px; color: #fff; }
  .card-desc  { font-size: 16px; line-height: 1.5; color: rgba(255,255,255,0.45); }
  .card-arrow { width: 28px; height: 28px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; color: rgba(255,255,255,0.5); flex-shrink: 0; transition: background 0.3s, color 0.3s; }
  .info-card:hover .card-arrow { background: #7c3aed; border-color: #7c3aed; color: #fff; }
  .card-arrow.diagonal { transform: rotate(-45deg); }

  /* ─── TEAM ─── */
  .team-section { background: #0a0828; padding: 100px 60px 80px; }
  .team-inner   { max-width: 1280px; margin: 0 auto; }
  .team-heading { text-align: center; margin-bottom: 16px; }
  .team-heading h2 { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); font-size: clamp(42px, 5vw, 68px); line-height: 1; display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
  .team-heading h2 .th-solid   { color: #fff; }
  .team-heading h2 .th-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.35); }
  .team-heading p { font-size: 14px; color: rgba(255,255,255,0.45); margin-top: 12px; }
  .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; margin-top: 56px; }
  .team-card { display: flex; flex-direction: column; cursor: pointer; }
  .team-card-img { width: 100%; aspect-ratio: 3/3.6; border-radius: 10px; overflow: hidden; margin-bottom: 18px; position: relative; }
  .team-card-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; transition: transform 0.5s ease; }
  .team-card:hover .team-card-img img { transform: scale(1.06); }
  .team-card-img .tc-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,8,40,0.5) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
  .team-card:hover .tc-overlay { opacity: 1; }
  .team-card-name  { font-family: var(--f-display); font-weight: 800; font-size: 17px; text-transform: var(--tt); letter-spacing: 0.5px; color: #fff; margin-bottom: 6px; }
  .team-card-role  { font-size: 16px; color: rgba(255,255,255,0.45); margin-bottom: 3px; }
  .team-card-email { font-size: 12px; color: rgba(124,58,237,0.8); text-decoration: none; transition: color 0.2s; }
  .team-card-email:hover { color: #a78bfa; }

  /* ─── SKILLS & AWARDS ─── */
  .skills-section { background: #0a0828; padding: 80px 60px 100px; border-top: 1px solid rgba(124,58,237,0.1); }
  .skills-inner   { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 280px 1fr 1fr; gap: 60px; align-items: start; }
  .skills-title   { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.88; }
  .skills-title .st-solid   { font-size: clamp(44px, 5vw, 70px); color: #fff; display: block; }
  .skills-title .st-outline { font-size: clamp(44px, 5vw, 70px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); display: block; }
  .awards-list { display: flex; flex-direction: column; }
  .award-row { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.08); display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: end; }
  .award-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
  .award-country { font-size: 11px; text-transform: var(--tt); letter-spacing: var(--ls-tight); color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .award-name    { font-family: var(--f-display); font-weight: 700; font-size: 16px; text-transform: var(--tt); letter-spacing: 0.3px; color: #fff; }
  .award-year    { font-size: 13px; color: rgba(255,255,255,0.35); white-space: nowrap; }
  .skill-bars { display: flex; flex-direction: column; padding-top: 4px; }
  .skill-row  { padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .skill-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
  .skill-top  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .skill-name { font-family: var(--f-display); font-weight: 600; font-size: 14px; text-transform: var(--tt); letter-spacing: 0.5px; color: rgba(255,255,255,0.8); }
  .skill-pct  { font-family: var(--f-display); font-weight: 700; font-size: 13px; color: #7c3aed; }
  .skill-track { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
  .skill-fill  { height: 100%; background: linear-gradient(90deg, #7c3aed, #a78bfa); border-radius: 2px; }

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
  .why-heading p  { font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 14px; }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .why-card { border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 36px 32px 40px; background: rgba(255,255,255,0.02); transition: border-color 0.3s, background 0.3s; cursor: default; }
  .why-card:hover { border-color: rgba(124,58,237,0.4); background: rgba(124,58,237,0.05); }
  .why-card-num   { font-family: var(--f-display); font-weight: 700; font-size: 40px; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.18); line-height: 1; margin-bottom: 22px; letter-spacing: -1px; }
  .why-card-title { font-family: var(--f-body); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 14px; }
  .why-card-desc  { font-size: 13.5px; line-height: 1.7; color: rgba(255,255,255,0.42); }

  /* ─── FAQ ─── */
  .faq-section { background: #080620; padding: 100px 60px; }
  .faq-inner   { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 380px 1fr; gap: 100px; align-items: start; }
  .faq-title   { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.88; margin-bottom: 28px; }
  .faq-title .ft-solid   { font-size: clamp(44px, 5.5vw, 78px); color: #fff; display: block; letter-spacing: -1px; }
  .faq-title .ft-outline { font-size: clamp(44px, 5.5vw, 78px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); display: block; letter-spacing: -1px; }
  .faq-desc { font-size: 14px; line-height: var(--lh-body); color: rgba(255,255,255,0.45); margin-bottom: 36px; max-width: 340px; }
  .faq-contact-btn { font-family: var(--f-display); font-weight: 700; font-size: 12px; text-transform: var(--tt); letter-spacing: var(--ls-wide); color: #fff; background: #7c3aed; padding: 14px 30px; border-radius: 4px; text-decoration: none; display: inline-block; transition: background 0.2s, transform 0.2s; }
  .faq-contact-btn:hover { background: #6d28d9; transform: translateY(-1px); }
  .faq-list { display: flex; flex-direction: column; }
  .faq-item { border-bottom: 1px solid rgba(255,255,255,0.1); }
  .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
  .faq-question { display: flex; align-items: center; justify-content: space-between; padding: 22px 0; cursor: pointer; gap: 20px; user-select: none; }
  .faq-q-text  { font-family: var(--f-body); font-weight: 700; font-size: 15px; color: #fff; flex: 1; }
  .faq-toggle  { width: 32px; height: 32px; border-radius: 50%; background: rgba(124,58,237,0.25); border: 1px solid rgba(124,58,237,0.4); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; color: #fff; transition: background 0.25s, transform 0.3s; line-height: 1; }
  .faq-item.open .faq-toggle { background: #7c3aed; border-color: #7c3aed; transform: rotate(45deg); }
  .faq-answer  { overflow: hidden; max-height: 0; transition: max-height 0.4s ease, padding 0.3s ease; padding: 0; }
  .faq-item.open .faq-answer { max-height: 300px; padding-bottom: 22px; }
  .faq-answer p { font-size: 14px; line-height: var(--lh-body); color: rgba(255,255,255,0.45); max-width: 580px; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 900px) {
    .about-hero { padding: 100px 24px 60px; }
    .hero-line span.solid, .hero-line span.outline { font-size: clamp(56px, 14vw, 90px); letter-spacing: -1px; }
    .section2       { grid-template-columns: 1fr; padding: 60px 24px; gap: 40px; }
    .team-section   { padding: 60px 24px; }
    .team-grid      { grid-template-columns: repeat(2, 1fr); }
    .skills-section { padding: 60px 24px; }
    .skills-inner   { grid-template-columns: 1fr; gap: 40px; }
    .why-section    { padding: 60px 24px; }
    .why-grid       { grid-template-columns: 1fr 1fr; }
    .faq-section    { padding: 60px 24px; }
    .faq-inner      { grid-template-columns: 1fr; gap: 40px; }
  }
  @media (max-width: 540px) {
    .team-grid { grid-template-columns: 1fr; }
    .why-grid  { grid-template-columns: 1fr; }
  }
`;