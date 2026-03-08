import { useEffect, useRef, useState, memo } from "react";
import type { FC, ReactElement, ChangeEvent, FormEvent } from "react";
import { useLang } from "@/contexts/LangContext";
import MainLayout from "@/layouts/MainLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

type TickerVariant = "primary" | "secondary";

interface TickerProps {
  label: string;
  variant?: TickerVariant;
}

interface FaqItem {
  q: string;
  a: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FAQ_COUNT = 8;

const CONTACT_FORM_INITIAL: ContactForm = {
  name: "", email: "", subject: "", phone: "", message: "",
};

const CONTACT_INFO = [
  { key: "address", style: { whiteSpace: "pre-line" as const }, href: undefined },
  { key: "email",   style: undefined, href: "mailto:hello@creatv.agency" },
  { key: "phone",   style: undefined, href: "tel:+85512345678" },
  { key: "hours",   style: { whiteSpace: "pre-line" as const }, href: undefined },
] as const;

const FORM_FIELDS = [
  { name: "name",    type: "text",  required: true  },
  { name: "email",   type: "email", required: true  },
  { name: "subject", type: "text",  required: false },
  { name: "phone",   type: "tel",   required: false },
] as const;

const ST_BASE = { toggleActions: "play none none reverse" } as const;

// ─── Ticker ───────────────────────────────────────────────────────────────────

const Ticker: FC<TickerProps> = memo(({ label, variant = "primary" }) => {
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
        x: "-100%", duration: variant === "secondary" ? 22 : 18,
        ease: "none", repeat: -1,
      });
    };

    init();
    return () => { anim?.kill(); };
  }, [variant]);

  if (variant === "secondary") {
    return (
      <div className="ticker2-wrap">
        <div className="ticker2-inner" ref={wrapRef}>
          <div className="tk-track ticker2-track">
            {Array.from({ length: 12 }, (_, i) => (
              <span className="ticker2-item" key={i}>
                <span className="t2-dot" />{label}
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
          {Array.from({ length: 12 }, (_, i) => (
            <span className="ticker-item" key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
});
Ticker.displayName = "Ticker";

// ─── Main component ───────────────────────────────────────────────────────────

export default function Contact() {
  const { t } = useLang();

  const FAQ_ITEMS: FaqItem[] = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`contact.faq.${i + 1}.q`),
    a: t(`contact.faq.${i + 1}.a`),
  }));

  // ── Refs ──────────────────────────────────────────────────────────────────

  const heroRef  = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const ctaRef   = useRef<HTMLElement>(null);
  const faqRef   = useRef<HTMLElement>(null);
  const ctxRef   = useRef<gsap.Context | null>(null);

  // ── State ─────────────────────────────────────────────────────────────────

  const [openFaq, setOpenFaq] = useState(-1);
  const [form, setForm]       = useState<ContactForm>(CONTACT_FORM_INITIAL);
  const [sent, setSent]       = useState(false);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSent(true);
  };

  const handleFaqToggle = (i: number) =>
    setOpenFaq((prev) => (prev === i ? -1 : i));

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
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(hero.querySelector(".about-breadcrumb"),
            { y: 20, opacity: 0, duration: 0.6 })
          .from(hero.querySelectorAll(".hero-line span"),
            { y: 90, opacity: 0, duration: 1, stagger: 0.12, clearProps: "all" }, "-=0.2")
          .from(hero.querySelector(".about-desc"),
            { y: 24, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.4");

        // Stats
        const stats = statsRef.current;
        if (stats) {
          gsap.from(stats.querySelectorAll(".stat-row"), {
            scrollTrigger: { trigger: stats, start: "top 80%", ...ST_BASE },
            x: -60, opacity: 0, duration: 0.65, stagger: 0.1,
            ease: "power3.out", clearProps: "all",
          });
          stats.querySelectorAll<HTMLElement>(".stat-num").forEach((el) => {
            const raw = el.dataset.raw;
            if (!raw || isNaN(Number(raw))) return;
            gsap.fromTo(el,
              { innerText: 0 },
              {
                scrollTrigger: { trigger: stats, start: "top 80%", ...ST_BASE },
                innerText: Number(raw), duration: 1.8, delay: 0.3,
                ease: "power2.out", snap: { innerText: 1 },
                onUpdate() { el.innerText = Math.round(Number(el.innerText)).toLocaleString(); },
              }
            );
          });
        }

        // CTA
        const cta = ctaRef.current;
        if (cta) {
          gsap.from(cta.querySelector(".cta-box"), {
            scrollTrigger: { trigger: cta, start: "top 82%", ...ST_BASE },
            y: 50, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all",
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
              <span className="current">{t("contact.breadcrumb")}</span>
            </div>
            <div className="about-hero-title">
              <div className="hero-line">
                <span className="solid">{t("contact.hero.title1")}</span>
                <span className="outline">{t("contact.hero.title2")}</span>
              </div>
            </div>
            <p className="about-desc">{t("contact.hero.desc")}</p>
          </div>
        </section>

        <Ticker label={t("contact.ticker")} />

        {/* ══ CONTACT SECTION ══ */}
        <section className="contact-section">
          <div className="contact-inner">

            {/* ── LEFT: Info + Map ── */}
            <div className="contact-info">
              {CONTACT_INFO.map(({ key, style, href }) => (
                <div className="ci-item" key={key}>
                  <p className="ci-label">{t(`contact.info.${key}.label`)}</p>
                  <p className="ci-value" style={style}>
                    {href
                      ? <a href={href}>{t(`contact.info.${key}.value`)}</a>
                      : t(`contact.info.${key}.value`)
                    }
                  </p>
                </div>
              ))}
              <div className="ci-map">
                <iframe
                  title="Office Location — Phnom Penh"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125019.72623836744!2d104.78801093593751!3d11.562108000000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1700000000000"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="contact-form-panel">
              <h2 className="cf-heading">{t("contact.form.heading")}</h2>

              {sent ? (
                <div className="cf-success">
                  <div className="cf-success-icon">✦</div>
                  <p className="cf-success-text">{t("contact.form.success.title")}</p>
                  <p className="cf-success-sub">{t("contact.form.success.sub")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="cf-grid">
                    {FORM_FIELDS.map(({ name, type, required }) => (
                      <div className="cf-field" key={name}>
                        <label className="cf-label">{t(`contact.form.${name}.label`)}</label>
                        <input
                          className="cf-input"
                          name={name}
                          type={type}
                          placeholder={t(`contact.form.${name}.placeholder`)}
                          value={form[name]}
                          onChange={handleChange}
                          required={required}
                        />
                      </div>
                    ))}
                    <div className="cf-field full">
                      <label className="cf-label">{t("contact.form.message.label")}</label>
                      <textarea
                        className="cf-textarea"
                        name="message"
                        placeholder={t("contact.form.message.placeholder")}
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="cf-field full">
                      <button type="submit" className="cf-submit">
                        {t("contact.form.submit")}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        <Ticker label={t("contact.faq.ticker")} />

        {/* ══ FAQ ══ */}
        <section className="faq-section" ref={faqRef}>
          <div className="faq-inner">
            <div className="faq-left">
              <div className="faq-title">
                <span className="ft-solid">{t("contact.faq.heading1")}</span>
                <span className="ft-outline">{t("contact.faq.heading2")}</span>
              </div>
              <p className="faq-desc">{t("contact.faq.desc")}</p>
              <a href="/contact" className="faq-contact-btn">{t("contact.faq.btn")}</a>
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

Contact.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

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
  .about-hero-inner  { position: relative; z-index: 1; max-width: 1280px; width: 100%; margin: 0 auto; }
  .about-breadcrumb  {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--f-display); font-size: 11px; font-weight: 600;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: rgba(255,255,255,0.35); margin-bottom: 32px;
  }
  .about-breadcrumb .sep     { color: #7c3aed; }
  .about-breadcrumb .current { color: rgba(255,255,255,0.65); }
  .about-hero-title { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); line-height: 0.88; margin-bottom: 36px; }
  .hero-line { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; overflow: hidden; }
  .hero-line span.solid   { font-size: clamp(80px, 12vw, 170px); color: #fff; letter-spacing: -3px; line-height: 0.88; display: inline-block; }
  .hero-line span.outline { font-size: clamp(80px, 12vw, 170px); color: transparent; -webkit-text-stroke: 2.5px rgba(255,255,255,0.38); letter-spacing: -3px; line-height: 0.88; display: inline-block; }
  .about-desc { font-size: 16px; line-height: var(--lh-body); color: rgba(255,255,255,0.55); max-width: 560px; margin: 0 auto; }
  .hero-deco { position: absolute; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%); }
  .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
  .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

  /* ─── TICKER ─── */
  .ticker-wrap   { width: 100%; overflow: hidden; background: #7c3aed; padding: 13px 0; transform: rotate(-1.2deg) scaleX(1.04); margin: 10px 0; position: relative; z-index: 10; }
  .ticker-inner,
  .ticker2-inner { display: flex; width: max-content; }
  .ticker-track,
  .ticker2-track { display: flex; white-space: nowrap; }
  .ticker-item   { font-family: var(--f-display); font-weight: 700; font-size: 12px; text-transform: var(--tt); letter-spacing: var(--ls-wide); color: #fff; padding: 0 32px; display: flex; align-items: center; gap: 14px; }
  .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }
  .ticker2-wrap  { width: 100%; overflow: hidden; border-top: 1px solid rgba(124,58,237,0.2); border-bottom: 1px solid rgba(124,58,237,0.2); padding: 14px 0; }
  .ticker2-item  { font-family: var(--f-display); font-weight: 700; font-size: 12px; text-transform: var(--tt); letter-spacing: var(--ls-med); color: rgba(255,255,255,0.4); padding: 0 28px; display: flex; align-items: center; gap: 10px; }
  .t2-dot        { width: 5px; height: 5px; background: #7c3aed; border-radius: 50%; flex-shrink: 0; }

  /* ─── CONTACT SECTION ─── */
  .contact-section { background: #0e0c2e; padding: 80px 60px; }
  .contact-inner   { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid rgba(124,58,237,0.18); border-radius: 14px; overflow: hidden; }
  .contact-info    { background: #13103a; padding: 56px 48px; display: flex; flex-direction: column; gap: 36px; border-right: 1px solid rgba(124,58,237,0.18); }
  .ci-label { font-family: var(--f-body); font-size: 11px; font-weight: 600; text-transform: var(--tt); letter-spacing: var(--ls-med); color: rgba(255,255,255,0.35); margin-bottom: 6px; }
  .ci-value { font-family: var(--f-display); font-weight: 700; font-size: 18px; color: #fff; letter-spacing: 0.2px; line-height: 1.4; }
  .ci-value a { color: #fff; text-decoration: none; transition: color 0.2s; }
  .ci-value a:hover { color: #7c3aed; }
  .ci-map { border-radius: 10px; overflow: hidden; border: 1px solid rgba(124,58,237,0.25); flex-grow: 1; min-height: 200px; }
  .ci-map iframe { width: 100%; height: 100%; min-height: 200px; display: block; border: none; filter: invert(0.9) hue-rotate(195deg) saturate(0.6) brightness(0.85); }
  .contact-form-panel { background: #0e0c2e; padding: 56px 48px; }
  .cf-heading { font-family: var(--f-display); font-weight: 900; text-transform: var(--tt); font-size: clamp(30px, 3.5vw, 50px); color: #fff; letter-spacing: -0.5px; margin-bottom: 40px; line-height: 1; }
  .cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; }
  .cf-field { display: flex; flex-direction: column; margin-bottom: 28px; }
  .cf-field.full { grid-column: span 2; }
  .cf-label { font-family: var(--f-body); font-size: 11px; font-weight: 600; text-transform: var(--tt); letter-spacing: var(--ls-med); color: rgba(255,255,255,0.35); margin-bottom: 10px; }
  .cf-input, .cf-textarea { background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.15); color: #fff; font-family: var(--f-body); font-size: 14px; padding: 8px 0; outline: none; transition: border-color 0.25s; width: 100%; }
  .cf-input::placeholder, .cf-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .cf-input:focus, .cf-textarea:focus { border-bottom-color: #7c3aed; }
  .cf-textarea { resize: none; min-height: 90px; line-height: 1.6; }
  .cf-submit { font-family: var(--f-display); font-weight: 700; font-size: 12px; text-transform: var(--tt); letter-spacing: var(--ls-wide); color: #fff; background: #7c3aed; border: none; padding: 16px 0; border-radius: 6px; cursor: pointer; width: 100%; transition: background 0.2s, transform 0.2s, box-shadow 0.2s; margin-top: 6px; }
  .cf-submit:hover  { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.45); }
  .cf-submit:active { transform: translateY(0); }
  .cf-success { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 40px 0; text-align: center; }
  .cf-success-icon { width: 52px; height: 52px; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .cf-success-text { font-family: var(--f-display); font-weight: 700; font-size: 20px; text-transform: var(--tt); letter-spacing: var(--ls-tight); color: #fff; }
  .cf-success-sub  { font-size: 13px; color: rgba(255,255,255,0.4); font-family: var(--f-body); }

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
    .hero-line span.solid, .hero-line span.outline { font-size: clamp(52px, 14vw, 90px); letter-spacing: -1px; }
    .contact-section    { padding: 60px 24px; }
    .contact-inner      { grid-template-columns: 1fr; }
    .contact-info       { border-right: none; border-bottom: 1px solid rgba(124,58,237,0.18); padding: 40px 28px; }
    .contact-form-panel { padding: 40px 28px; }
    .cf-grid            { grid-template-columns: 1fr; }
    .cf-field.full      { grid-column: span 1; }
    .faq-section        { padding: 60px 24px; }
    .faq-inner          { grid-template-columns: 1fr; gap: 40px; }
  }
  @media (max-width: 480px) {
    .cf-grid { gap: 0; }
  }
`;