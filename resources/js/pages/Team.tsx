import type { ReactElement, FC } from "react";
import { useEffect, useRef, useState, memo } from "react";
import { useLang } from "@/contexts/LangContext";
import MainLayout from "@/layouts/MainLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  email: string;
  bg: string;
}

interface TickerProps {
  label: string;
  className?: string;
  trackClass?: string;
  itemClass?: string;
}

interface ServiceItem {
  key: string;
  icon: ReactElement;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TEAM_MEMBERS: TeamMember[] = [
  { name: "Cartier Bresson", role: "CEO / Founder",   email: "cartier@creatv.com", bg: "#4fc3f7" },
  { name: "Viola Spencer",   role: "Project Manager", email: "viola@creatv.com",   bg: "#f48fb1" },
  { name: "Carmen Hayes",    role: "Motion Designer", email: "carmen@creatv.com",  bg: "#e0e0e0" },
  { name: "Monica Barker",   role: "Digital Manager", email: "monica@creatv.com",  bg: "#90caf9" },
];

const SKILLS: { key: string; pct: number }[] = [
  { key: "about.skill.1", pct: 97 },
  { key: "about.skill.2", pct: 90 },
  { key: "about.skill.3", pct: 87 },
  { key: "about.skill.4", pct: 83 },
  { key: "about.skill.5", pct: 75 },
];

const AWARD_KEYS = [1, 2, 3, 4] as const;

const WHY_ITEMS: { num: string; key: number }[] = [
  { num: "01.", key: 1 },
  { num: "02.", key: 2 },
  { num: "03.", key: 3 },
  { num: "04.", key: 4 },
  { num: "05.", key: 5 },
  { num: "06.", key: 6 },
];

const FAQ_KEYS = [1, 2, 3, 4, 5, 7, 8] as const;

const TEAM_PHOTO_SRC =
  "https://templatekit.jegtheme.com/creatv/wp-content/uploads/sites/419/2023/10/handsome-guy-in-casual-clothes-standing-with-arms-HWSQN2E-800x960.jpg";

// ─── SVG icons ────────────────────────────────────────────────────────────────

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SERVICES: ServiceItem[] = [
  {
    key: "home.srv.sketching",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    key: "home.srv.proto",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M10 10l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "home.srv.system",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: "home.srv.concept",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    key: "home.srv.brand",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
  },
  {
    key: "home.srv.mobile",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" />
        <path d="M9 6h6" />
      </svg>
    ),
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Ticker: FC<TickerProps> = memo(({
  label,
  className = "ticker-wrap",
  trackClass = "ticker-track",
  itemClass = "ticker-item",
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: gsap.core.Tween[] = [];

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const wrap = wrapRef.current;
      if (!wrap) return;

      const track = wrap.querySelector<HTMLElement>(`.${trackClass}`);
      if (track && !wrap.dataset.cloned) {
        wrap.appendChild(track.cloneNode(true));
        wrap.dataset.cloned = "1";
      }

      animation = gsap.to(wrap.querySelectorAll(`.${trackClass}`), {
        x: "-100%",
        duration: 18,
        ease: "none",
        repeat: -1,
      }) as unknown as gsap.core.Tween[];
    };

    init();
    return () => {
      (Array.isArray(animation) ? animation : [animation]).forEach((a) => a?.kill?.());
    };
  }, [trackClass]);

  return (
    <div className={className}>
      <div className="ticker-inner" ref={wrapRef}>
        <div className={trackClass}>
          {Array.from({ length: 10 }, (_, i) => (
            <span className={itemClass} key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
});
Ticker.displayName = "Ticker";

// ─── Team card ────────────────────────────────────────────────────────────────

const TeamCard: FC<TeamMember> = memo(({ name, role, email, bg }) => (
  <div className="team-card">
    <div className="team-card-img">
      <img
        src={TEAM_PHOTO_SRC}
        alt={name}
        style={{ background: bg }}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = "none";
          if (img.parentElement) img.parentElement.style.background = bg;
        }}
      />
      <div className="tc-overlay" />
    </div>
    <span className="team-card-name">{name}</span>
    <span className="team-card-role">{role}</span>
    <a href={`mailto:${email}`} className="team-card-email">{email}</a>
  </div>
));
TeamCard.displayName = "TeamCard";

// ─── Main component ───────────────────────────────────────────────────────────

export default function Team() {
  const { t } = useLang();

  const heroRef   = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const whyRef    = useRef<HTMLElement>(null);
  const faqRef    = useRef<HTMLElement>(null);
  const teamRef   = useRef<HTMLElement>(null);
  const ctxRef    = useRef<gsap.Context | null>(null);

  const [openFaq,   setOpenFaq]   = useState<number>(0);
  const [activeIdx, setActiveIdx] = useState<number>(1);

  // ── GSAP animations ──────────────────────────────────────────────────────

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctxRef.current = gsap.context(() => {
        const hero = heroRef.current;
        if (!hero) return;

        // Hero
        gsap.from(hero.querySelectorAll(".hero-line"), {
          y: 80, opacity: 0, duration: 1, stagger: 0.15,
          ease: "power3.out", clearProps: "all",
        });
        gsap.from(hero.querySelector(".about-desc"), {
          y: 30, opacity: 0, duration: 0.9, delay: 0.5,
          ease: "power3.out", clearProps: "all",
        });

        // Team
        const team = teamRef.current;
        if (team) {
          const stBase = { toggleActions: "play none none reverse" };
          gsap.from(team.querySelector(".team-heading"), {
            scrollTrigger: { trigger: team, start: "top 78%", ...stBase },
            y: 50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(team.querySelectorAll(".team-card"), {
            scrollTrigger: { trigger: team, start: "top 68%", ...stBase },
            y: 60, opacity: 0, duration: 0.7, stagger: 0.12,
            ease: "power3.out", clearProps: "all",
          });
        }

        // Skills
        const skills = skillsRef.current;
        if (skills) {
          const stBase = { toggleActions: "play none none reverse" };
          gsap.from(skills.querySelector(".skills-title"), {
            scrollTrigger: { trigger: skills, start: "top 78%", ...stBase },
            x: -50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(skills.querySelectorAll(".award-row"), {
            scrollTrigger: { trigger: skills, start: "top 72%", ...stBase },
            x: -40, opacity: 0, duration: 0.6, stagger: 0.1,
            ease: "power3.out", clearProps: "all",
          });
          skills.querySelectorAll<HTMLElement>(".skill-fill").forEach((bar) => {
            gsap.fromTo(bar, { width: "0%" }, {
              scrollTrigger: { trigger: skills, start: "top 70%", ...stBase },
              width: bar.dataset.width ?? "0%",
              duration: 1.2, ease: "power2.out", delay: 0.3,
            });
          });
        }

        // Why
        const why = whyRef.current;
        if (why) {
          const stBase = { toggleActions: "play none none reverse" };
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

        // FAQ
        const faq = faqRef.current;
        if (faq) {
          const stBase = { toggleActions: "play none none reverse" };
          gsap.from(faq.querySelector(".faq-left"), {
            scrollTrigger: { trigger: faq, start: "top 78%", ...stBase },
            x: -50, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
          });
          gsap.from(faq.querySelectorAll(".faq-item"), {
            scrollTrigger: { trigger: faq, start: "top 72%", ...stBase },
            x: 40, opacity: 0, duration: 0.6, stagger: 0.08,
            ease: "power3.out", clearProps: "all",
          });
        }
      }, heroRef);
    };

    initGSAP();
    return () => ctxRef.current?.revert();
  }, []);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleFaqToggle = (idx: number) =>
    setOpenFaq((prev) => (prev === idx ? -1 : idx));

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
              <span className="current">{t("team.breadcrumb")}</span>
            </div>
            <div className="about-hero-title">
              <div className="hero-line">
                <span className="solid">{t("team.hero.title1")}</span>
                <span className="outline">{t("team.hero.title2")}</span>
              </div>
            </div>
            <p className="about-desc">{t("team.hero.desc")}</p>
          </div>
        </section>

        <Ticker label={t("team.ticker.1")} />

        {/* ══ TEAM ══ */}
        <section className="team-section" ref={teamRef}>
          <div className="team-inner">
            <div className="team-heading">
              <h2>
                <span className="th-solid">{t("team.team.heading1")}</span>
                <span className="th-outline">{t("team.team.heading2")}</span>
              </h2>
              <p>{t("team.team.sub")}</p>
            </div>
            <div className="team-grid">
              {TEAM_MEMBERS.map((member) => (
                <TeamCard key={member.name} {...member} />
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
              {AWARD_KEYS.map((n) => (
                <div className="award-row" key={n}>
                  <div>
                    <div className="award-country">{t(`about.award.${n}.country`)}</div>
                    <div className="award-name">{t(`about.award.${n}.name`)}</div>
                  </div>
                  <div className="award-year">{t(`about.award.${n}.years`)}</div>
                </div>
              ))}
            </div>

            <div className="skill-bars">
              {SKILLS.map(({ key, pct }) => (
                <div className="skill-row" key={key}>
                  <div className="skill-top">
                    <span className="skill-name">{t(key)}</span>
                    <span className="skill-pct">{pct}%</span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ width: `${pct}%` }}
                      data-width={`${pct}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ticker label={t("team.ticker.2")} />

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
              {WHY_ITEMS.map(({ num, key }) => (
                <div className="why-card" key={key}>
                  <div className="why-card-num">{num}</div>
                  <div className="why-card-title">{t(`about.why.${key}.title`)}</div>
                  <p className="why-card-desc">{t(`about.why.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ticker label={t("team.ticker.3")} />

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
              {FAQ_KEYS.map((n, i) => (
                <div className={`faq-item${openFaq === i ? " open" : ""}`} key={n}>
                  <div className="faq-question" onClick={() => handleFaqToggle(i)}>
                    <span className="faq-q-text">{t(`about.faq.${n}.q`)}</span>
                    <span className="faq-toggle">+</span>
                  </div>
                  <div className="faq-answer">
                    <p>{t(`about.faq.${n}.a`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <div className="services-outer">
          <div className="services-inner">
            <div className="srv-left">
              <div className="srv-heading">
                <span className="sh-solid">{t("home.srv.heading1")}</span>
                <span className="sh-outline">{t("home.srv.heading2")}</span>
              </div>
              <p className="srv-desc">{t("home.srv.desc")}</p>
            </div>
            <div className="srv-right">
              {SERVICES.map(({ key, icon }, idx) => (
                <div
                  className={`srv-row${idx === activeIdx ? " active" : ""}`}
                  key={key}
                  onMouseEnter={() => setActiveIdx(idx)}
                >
                  <div className="srv-icon">{icon}</div>
                  <div className="srv-text">
                    <span className="srv-name">{t(`${key}.name`)}</span>
                    <p className="srv-body">{t(`${key}.desc`)}</p>
                  </div>
                  <div className="srv-arrow">→</div>
                </div>
              ))}
              <div className="srv-cta-card">
                <p className="srv-cta-text">{t("home.srv.cta.text")}</p>
                <a href="/contact" className="srv-cta-btn">{t("home.srv.cta.btn")}</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

Team.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

// ─── Styles ───────────────────────────────────────────────────────────────────
// Extracted to a constant to keep the component body clean.

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

  /* ─── PAGE ─── */
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
  .about-hero-title {
    font-family: var(--f-display); font-weight: 900;
    text-transform: var(--tt); line-height: 0.88; margin-bottom: 36px;
  }
  :root[data-lang="km"] .about-hero-title { line-height: 1.15; }
  .hero-line { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; }
  .hero-line span.solid  { font-size: clamp(80px, 12vw, 170px); color: #fff; letter-spacing: -3px; line-height: 0.88; }
  .hero-line span.outline {
    font-size: clamp(80px, 12vw, 170px); color: transparent;
    -webkit-text-stroke: 2.5px rgba(255,255,255,0.38); letter-spacing: -3px; line-height: 0.88;
    border: none; outline: none; box-shadow: none;
  }
  :root[data-lang="km"] .hero-line span.solid,
  :root[data-lang="km"] .hero-line span.outline { letter-spacing: 0; line-height: 1.2; }
  :root[data-lang="km"] .hero-line span.outline {
    -webkit-text-stroke: 0; color: rgba(255,255,255,0.38);
    background: none; border: none; outline: none; box-shadow: none; text-shadow: none;
  }
  .about-desc { font-family: var(--f-body); font-size: 16px; line-height: var(--lh-body); color: rgba(255,255,255,0.55); max-width: 560px; margin: 0 auto; }
  .hero-deco { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%); pointer-events: none; }
  .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
  .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

  /* ─── TICKER ─── */
  .ticker-wrap {
    width: 100%; overflow: hidden; background: #7c3aed; padding: 13px 0;
    transform: rotate(-1.2deg) scaleX(1.04); margin: 10px 0; position: relative; z-index: 10;
  }
  .ticker-inner { display: flex; width: max-content; }
  .ticker-track { display: flex; white-space: nowrap; }
  .ticker-item {
    font-family: var(--f-display); font-weight: 700; font-size: 12px;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: #fff; padding: 0 32px; display: flex; align-items: center; gap: 14px;
  }
  .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

  /* ─── TEAM ─── */
  .team-section { background: #0a0828; padding: 100px 60px 80px; }
  .team-inner   { max-width: 1280px; margin: 0 auto; }
  .team-heading { text-align: center; margin-bottom: 16px; }
  .team-heading h2 {
    font-family: var(--f-display); font-weight: 900; text-transform: var(--tt);
    font-size: clamp(42px, 5vw, 68px); line-height: 1;
    display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;
  }
  :root[data-lang="km"] .team-heading h2 { line-height: 1.3; }
  .team-heading h2 .th-solid   { color: #fff; }
  .team-heading h2 .th-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.35); }
  :root[data-lang="km"] .team-heading h2 .th-outline { -webkit-text-stroke: 0; color: rgba(255,255,255,0.35); }
  .team-heading p { font-family: var(--f-body); font-size: 14px; line-height: var(--lh-body); color: rgba(255,255,255,0.45); margin-top: 12px; }
  .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; margin-top: 56px; }
  .team-card { display: flex; flex-direction: column; cursor: pointer; }
  .team-card-img { width: 100%; aspect-ratio: 3/3.6; border-radius: 10px; overflow: hidden; margin-bottom: 18px; position: relative; }
  .team-card-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; transition: transform 0.5s ease; }
  .team-card:hover .team-card-img img { transform: scale(1.06); }
  .team-card-img .tc-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,8,40,0.5) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
  .team-card:hover .tc-overlay { opacity: 1; }
  .team-card-name { font-family: var(--f-display); font-weight: 800; font-size: 17px; text-transform: var(--tt); letter-spacing: var(--ls-tight); color: #fff; margin-bottom: 6px; }
  .team-card-role { font-family: var(--f-body); font-size: 14px; color: rgba(255,255,255,0.45); margin-bottom: 3px; }
  .team-card-email { font-size: 12px; color: rgba(124,58,237,0.8); text-decoration: none; transition: color 0.2s; }
  .team-card-email:hover { color: #a78bfa; }

  /* ─── SKILLS & AWARDS ─── */
  .skills-section { background: #0a0828; padding: 80px 60px 100px; border-top: 1px solid rgba(124,58,237,0.1); }
  .skills-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 280px 1fr 1fr; gap: 60px; align-items: start; }
  .skills-title { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.88; }
  :root[data-lang="km"] .skills-title { line-height: 1.3; }
  .skills-title .st-solid   { font-size: clamp(44px, 5vw, 70px); color: #fff; display: block; }
  .skills-title .st-outline { font-size: clamp(44px, 5vw, 70px); display: block; color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); }
  :root[data-lang="km"] .skills-title .st-outline { -webkit-text-stroke: 0; color: rgba(255,255,255,0.3); }
  .awards-list { display: flex; flex-direction: column; }
  .award-row { padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.08); display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: end; }
  .award-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
  .award-country { font-family: var(--f-display); font-size: 11px; text-transform: var(--tt); letter-spacing: var(--ls-tight); color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .award-name { font-family: var(--f-display); font-weight: 700; font-size: 16px; text-transform: var(--tt); color: #fff; }
  .award-year { font-family: var(--f-body); font-size: 13px; color: rgba(255,255,255,0.35); white-space: nowrap; }
  .skill-bars { display: flex; flex-direction: column; padding-top: 4px; }
  .skill-row  { padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .skill-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
  .skill-top  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .skill-name { font-family: var(--f-display); font-weight: 600; font-size: 14px; text-transform: var(--tt); letter-spacing: var(--ls-tight); color: rgba(255,255,255,0.8); }
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
  :root[data-lang="km"] .why-heading h2 { letter-spacing: 0; line-height: 1.3; }
  .why-heading h2 .wh-highlight { color: #fff; background: #1e3a8a; padding: 2px 14px 4px; border-radius: 4px; }
  .why-heading h2 .wh-solid     { color: #fff; }
  .why-heading h2 .wh-outline   { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.32); }
  :root[data-lang="km"] .why-heading h2 .wh-outline { -webkit-text-stroke: 0; color: rgba(255,255,255,0.32); }
  .why-heading p { font-family: var(--f-body); font-size: 14px; line-height: var(--lh-body); color: rgba(255,255,255,0.4); margin-top: 14px; }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .why-card { border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 36px 32px 40px; background: rgba(255,255,255,0.02); transition: border-color 0.3s, background 0.3s; cursor: default; }
  .why-card:hover { border-color: rgba(124,58,237,0.4); background: rgba(124,58,237,0.05); }
  .why-card-num   { font-family: var(--f-display); font-weight: 700; font-size: 40px; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.18); line-height: 1; margin-bottom: 22px; letter-spacing: -1px; }
  :root[data-lang="km"] .why-card-num { letter-spacing: 0; }
  .why-card-title { font-family: var(--f-body); font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 14px; }
  .why-card-desc  { font-family: var(--f-body); font-size: 13.5px; line-height: var(--lh-body); color: rgba(255,255,255,0.42); }

  /* ─── FAQ ─── */
  .faq-section { background: #080620; padding: 100px 60px; }
  .faq-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 380px 1fr; gap: 100px; align-items: start; }
  .faq-title { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.88; margin-bottom: 28px; }
  :root[data-lang="km"] .faq-title { line-height: 1.3; }
  .faq-title .ft-solid   { font-size: clamp(44px, 5.5vw, 78px); color: #fff; display: block; letter-spacing: -1px; }
  .faq-title .ft-outline { font-size: clamp(44px, 5.5vw, 78px); display: block; letter-spacing: -1px; color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); }
  :root[data-lang="km"] .faq-title .ft-solid,
  :root[data-lang="km"] .faq-title .ft-outline { letter-spacing: 0; }
  :root[data-lang="km"] .faq-title .ft-outline { -webkit-text-stroke: 0; color: rgba(255,255,255,0.3); }
  .faq-desc { font-family: var(--f-body); font-size: 14px; line-height: var(--lh-body); color: rgba(255,255,255,0.45); margin-bottom: 36px; max-width: 340px; }
  .faq-contact-btn { font-family: var(--f-display); font-weight: 700; font-size: 12px; text-transform: var(--tt); letter-spacing: var(--ls-wide); color: #fff; background: #7c3aed; padding: 14px 30px; border-radius: 4px; text-decoration: none; display: inline-block; transition: background 0.2s, transform 0.2s; }
  .faq-contact-btn:hover { background: #6d28d9; transform: translateY(-1px); }
  .faq-list  { display: flex; flex-direction: column; }
  .faq-item  { border-bottom: 1px solid rgba(255,255,255,0.1); }
  .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
  .faq-question { display: flex; align-items: center; justify-content: space-between; padding: 22px 0; cursor: pointer; gap: 20px; user-select: none; }
  .faq-q-text   { font-family: var(--f-body); font-weight: 700; font-size: 15px; line-height: var(--lh-body); color: #fff; flex: 1; }
  .faq-toggle   { width: 32px; height: 32px; border-radius: 50%; background: rgba(124,58,237,0.25); border: 1px solid rgba(124,58,237,0.4); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; color: #fff; transition: background 0.25s, transform 0.3s; line-height: 1; }
  .faq-item.open .faq-toggle { background: #7c3aed; border-color: #7c3aed; transform: rotate(45deg); }
  .faq-answer { overflow: hidden; max-height: 0; transition: max-height 0.4s ease, padding 0.3s ease; padding: 0; }
  .faq-item.open .faq-answer { max-height: 300px; padding-bottom: 22px; }
  .faq-answer p { font-family: var(--f-body); font-size: 14px; line-height: var(--lh-body); color: rgba(255,255,255,0.45); max-width: 580px; }

  /* ─── SERVICES ─── */
  .services-outer { background: #0c0a2e; padding: 0 60px 120px; }
  .services-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 380px 1fr; gap: 80px; align-items: start; }
  .srv-left { position: sticky; top: 120px; padding-top: 8px; }
  .srv-heading { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.9; margin-bottom: 28px; }
  :root[data-lang="km"] .srv-heading { line-height: 1.3; }
  .srv-heading .sh-solid   { font-size: clamp(48px, 5.5vw, 80px); color: #fff; display: block; letter-spacing: -1px; }
  .srv-heading .sh-outline { font-size: clamp(48px, 5.5vw, 80px); display: block; letter-spacing: -1px; color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); }
  :root[data-lang="km"] .srv-heading .sh-solid,
  :root[data-lang="km"] .srv-heading .sh-outline { letter-spacing: 0; }
  :root[data-lang="km"] .srv-heading .sh-outline { -webkit-text-stroke: 0; color: rgba(255,255,255,0.28); }
  .srv-desc { font-family: var(--f-body); font-size: 15px; line-height: var(--lh-body); color: rgba(255,255,255,0.45); max-width: 300px; }
  .srv-right { display: flex; flex-direction: column; }
  .srv-row { display: grid; grid-template-columns: 52px 1fr 32px; align-items: start; gap: 20px; padding: 28px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); cursor: pointer; border-radius: 10px; transition: background 0.3s ease, padding-left 0.3s ease; }
  .srv-row:first-of-type { border-top: 1px solid rgba(255,255,255,0.07); }
  .srv-row:hover  { background: rgba(124,58,237,0.08); padding-left: 28px; }
  .srv-row.active { background: rgba(124,58,237,0.12); border-color: rgba(124,58,237,0.2); padding-left: 28px; }
  .srv-row.active + .srv-row { border-top-color: rgba(124,58,237,0.2); }
  .srv-icon { width: 44px; height: 44px; background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.25); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; transition: background 0.3s, border-color 0.3s; }
  .srv-row:hover .srv-icon, .srv-row.active .srv-icon { background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.5); }
  .srv-icon svg { width: 22px; height: 22px; stroke: #a78bfa; fill: none; transition: stroke 0.3s; }
  .srv-row:hover .srv-icon svg, .srv-row.active .srv-icon svg { stroke: #c4b5fd; }
  .srv-text { display: flex; flex-direction: column; gap: 6px; }
  .srv-name { font-family: var(--f-display); font-weight: 700; font-size: 20px; text-transform: var(--tt); line-height: 1; color: rgba(255,255,255,0.75); transition: color 0.3s; }
  :root[data-lang="km"] .srv-name { line-height: 1.4; }
  .srv-row:hover .srv-name, .srv-row.active .srv-name { color: #fff; }
  .srv-body { font-family: var(--f-body); font-size: 13px; line-height: var(--lh-body); color: rgba(255,255,255,0.35); transition: color 0.3s; }
  .srv-row:hover .srv-body, .srv-row.active .srv-body { color: rgba(255,255,255,0.55); }
  .srv-arrow { width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.12); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; color: rgba(255,255,255,0.25); flex-shrink: 0; margin-top: 4px; transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
  .srv-row:hover .srv-arrow, .srv-row.active .srv-arrow { background: #7c3aed; border-color: #7c3aed; color: #fff; transform: rotate(-45deg) scale(1.1); }
  .srv-cta-card { background: #7c3aed; border-radius: 12px; padding: 44px 40px; margin-top: 28px; position: relative; overflow: hidden; }
  .srv-cta-card::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%); pointer-events: none; }
  .srv-cta-text { font-family: var(--f-body); font-weight: 500; font-size: 20px; line-height: var(--lh-body); color: rgba(255,255,255,0.9); max-width: 280px; margin-bottom: 28px; position: relative; }
  .srv-cta-btn { font-family: var(--f-display); font-weight: 700; font-size: 11px; text-transform: var(--tt); letter-spacing: var(--ls-wide); color: #fff; background: transparent; border: 1.5px solid rgba(255,255,255,0.55); padding: 11px 26px; border-radius: 5px; text-decoration: none; display: inline-block; transition: background 0.2s, border-color 0.2s; }
  .srv-cta-btn:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.85); }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 900px) {
    .about-hero { padding: 100px 24px 60px; }
    .hero-line span.solid, .hero-line span.outline { font-size: clamp(56px, 14vw, 90px); letter-spacing: -1px; }
    :root[data-lang="km"] .hero-line span.solid,
    :root[data-lang="km"] .hero-line span.outline { letter-spacing: 0; }
    .team-section   { padding: 60px 24px; }
    .team-grid      { grid-template-columns: repeat(2, 1fr); }
    .skills-section { padding: 60px 24px; }
    .skills-inner   { grid-template-columns: 1fr; gap: 40px; }
    .why-section    { padding: 60px 24px; }
    .why-grid       { grid-template-columns: 1fr 1fr; }
    .faq-section    { padding: 60px 24px; }
    .faq-inner      { grid-template-columns: 1fr; gap: 40px; }
    .services-outer { padding: 0 24px 80px; }
    .services-inner { grid-template-columns: 1fr; gap: 40px; }
    .srv-left       { position: static; }
  }
  @media (max-width: 540px) {
    .team-grid { grid-template-columns: 1fr; }
    .why-grid  { grid-template-columns: 1fr; }
  }
`;