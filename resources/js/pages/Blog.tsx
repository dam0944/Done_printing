import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLang } from "@/contexts/LangContext";
import MainLayout from "@/layouts/MainLayout";

// ─── Static data (images & hrefs never change by language) ───────────────────
const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
];

const POST_KEYS = [1, 2, 3, 4]; // maps to blog.post.{n}.tag / .title / .excerpt

// ─── Ticker ───────────────────────────────────────────────────────────────────
interface TickerProps {
  label: string;
  className?: string;
  trackClass?: string;
  itemClass?: string;
}

function Ticker({
  label,
  className  = "ticker-wrap",
  trackClass = "ticker-track",
  itemClass  = "ticker-item",
}: TickerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const track = wrap.querySelector(`.${trackClass}`);
      if (track && !wrap.dataset.cloned) {
        wrap.appendChild(track.cloneNode(true));
        wrap.dataset.cloned = "1";
      }
      gsap.to(wrap.querySelectorAll(`.${trackClass}`), {
        x: "-100%", duration: 18, ease: "none", repeat: -1,
      });
    };
    init();
  }, [trackClass]);

  return (
    <div className={className}>
      <div className="ticker-inner" ref={wrapRef}>
        <div className={trackClass}>
          {Array(10).fill(label).map((item: string, i: number) => (
            <span className={itemClass} key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Blog() {
  const { t } = useLang();

  const heroRef = useRef<HTMLElement>(null);
  const ctxRef  = useRef<{ revert: () => void } | null>(null);

  const [visibleCount, setVisibleCount] = useState<number>(4);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctxRef.current = gsap.context(() => {
        if (!heroRef.current) return;

        gsap.from(heroRef.current.querySelectorAll(".hero-line"), {
          y: 80, opacity: 0, duration: 1, stagger: 0.15,
          ease: "power3.out", clearProps: "all",
        });
        const desc = heroRef.current.querySelector(".about-desc");
        if (desc) {
          gsap.from(desc, {
            y: 30, opacity: 0, duration: 0.9, delay: 0.5,
            ease: "power3.out", clearProps: "all",
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
        .page-wrap {
          font-family: var(--f-body);
          background: #0e0c2e;
          color: #fff;
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .hero {
          min-height: 65vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 130px 40px 80px;
          position: relative;
          background: radial-gradient(ellipse 90% 70% at 50% 30%, #1a1660 0%, #0e0c2e 68%);
          overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none;
        }
        .hero-inner {
          position: relative; z-index: 1;
          max-width: 860px; margin: 0 auto;
        }
        .breadcrumb {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--f-display);
          font-size: 11px; font-weight: 600;
          text-transform: var(--tt);
          letter-spacing: var(--ls-wide);
          color: rgba(255,255,255,0.35); margin-bottom: 28px;
        }
        .breadcrumb .sep { color: #7c3aed; }
        .breadcrumb .cur { color: rgba(255,255,255,0.65); }

        .hero-title {
          font-family: var(--f-display);
          font-weight: 900;
          font-size: clamp(28px, 5vw, 72px);
          text-transform: var(--tt);
          line-height: 1.05;
          letter-spacing: -1px;
          color: #fff;
          margin-bottom: 24px;
        }
        :root[data-lang="km"] .hero-title {
          letter-spacing: 0;
          line-height: 1.3;
        }

        .about-desc {
          font-family: var(--f-body);
          font-size: clamp(13px, 1.5vw, 16px);
          line-height: var(--lh-body);
          color: rgba(255,255,255,0.5);
          max-width: 580px; margin: 0 auto;
        }

        /* ─── TICKER ─── */
        .ticker-wrap {
          width: 100%; overflow: hidden;
          background: #7c3aed; padding: 13px 0;
          transform: rotate(-1.2deg) scaleX(1.04);
          margin: 10px 0; position: relative; z-index: 10;
        }
        .ticker-inner { display: flex; width: max-content; }
        .ticker-track { display: flex; white-space: nowrap; }
        .ticker-item {
          font-family: var(--f-display);
          font-weight: 700; font-size: 12px;
          text-transform: var(--tt);
          letter-spacing: var(--ls-wide);
          color: #fff; padding: 0 32px;
          display: flex; align-items: center; gap: 14px;
        }
        .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

        /* ─── BLOG SECTION ─── */
        .blog-section {
          background: #0e0c2e;
          padding: 80px 60px 100px;
          min-height: 60vh;
        }
        .blog-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px 36px;
        }
        .blog-card { display: flex; flex-direction: column; cursor: pointer; }
        .blog-card-img-wrap {
          position: relative; width: 100%; aspect-ratio: 16/10;
          border-radius: 10px; overflow: hidden; margin-bottom: 22px;
        }
        .blog-card-img-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .blog-card:hover .blog-card-img-wrap img { transform: scale(1.05); }
        .blog-tag {
          position: absolute; bottom: 14px; left: 14px;
          font-family: var(--f-display);
          font-weight: 700; font-size: 10px;
          text-transform: var(--tt);
          letter-spacing: var(--ls-med);
          color: #fff; background: #7c3aed;
          padding: 5px 14px; border-radius: 20px;
        }
        .blog-card-title {
          font-family: var(--f-display);
          font-weight: 800;
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.2;
          color: #fff; margin-bottom: 14px; transition: color 0.2s;
        }
        :root[data-lang="km"] .blog-card-title { line-height: 1.5; }
        .blog-card:hover .blog-card-title { color: #a78bfa; }

        .blog-card-excerpt {
          font-family: var(--f-body);
          font-size: clamp(13px, 1.2vw, 14px);
          line-height: var(--lh-body);
          color: rgba(255,255,255,0.45); margin-bottom: 20px; flex: 1;
        }
        .blog-read-more {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--f-display);
          font-weight: 700; font-size: 11px;
          text-transform: var(--tt);
          letter-spacing: var(--ls-wide);
          color: rgba(255,255,255,0.7);
          text-decoration: none; border: none;
          background: none; cursor: pointer; padding: 0;
          transition: color 0.2s;
        }
        .blog-read-more:hover { color: #a78bfa; }
        .read-arrow { font-size: 14px; transition: transform 0.2s; }
        .blog-read-more:hover .read-arrow { transform: translateX(4px); }

        .load-more-wrap {
          max-width: 1200px; margin: 60px auto 0;
          display: flex; justify-content: center;
        }
        .load-more-btn {
          font-family: var(--f-display);
          font-weight: 700; font-size: 11px;
          text-transform: var(--tt);
          letter-spacing: var(--ls-wide);
          color: #fff; background: #7c3aed;
          border: none; padding: 16px 52px; border-radius: 5px;
          cursor: pointer; transition: background 0.2s, transform 0.2s;
        }
        .load-more-btn:hover { background: #6d28d9; transform: translateY(-2px); }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1024px) {
          .blog-section { padding: 60px 40px 80px; }
          .blog-grid { gap: 32px 28px; }
        }
        @media (max-width: 768px) {
          .hero { padding: 100px 24px 60px; min-height: 55vh; }
          .hero-title { letter-spacing: -0.5px; }
          :root[data-lang="km"] .hero-title { letter-spacing: 0; }
          .blog-section { padding: 48px 24px 64px; }
          .blog-grid { grid-template-columns: 1fr; gap: 40px; }
          .blog-card-img-wrap { aspect-ratio: 16/9; margin-bottom: 16px; }
          .load-more-wrap { margin-top: 40px; }
          .load-more-btn { padding: 14px 40px; width: 100%; max-width: 320px; }
        }
        @media (max-width: 480px) {
          .hero { padding: 80px 16px 48px; }
          .hero-title { letter-spacing: 0; }
          .blog-section { padding: 36px 16px 48px; }
          .blog-grid { gap: 32px; }
          .blog-card-title { font-size: clamp(17px, 5vw, 22px); }
          .ticker-item { padding: 0 20px; font-size: 11px; }
        }
      `}</style>

      <div className="page-wrap">

        {/* ── HERO ── */}
        <section className="hero" ref={heroRef}>
          <div className="hero-inner">
            <div className="breadcrumb">
              <span>{t('nav.home')}</span>
              <span className="sep">/</span>
              <span>{t('blog.hero.breadcrumb.blog')}</span>
              <span className="sep">/</span>
              <span className="cur">{t('blog.hero.breadcrumb.current')}</span>
            </div>
            <h1 className="hero-title hero-line">
              {t('blog.hero.title')}
            </h1>
            <p className="about-desc">
              {t('blog.hero.desc')}
            </p>
          </div>
        </section>

        {/* ── TICKER ── */}
        <Ticker label={t('blog.ticker')} />

        {/* ── BLOG GRID ── */}
        <section className="blog-section">
          <div className="blog-grid">
            {POST_KEYS.slice(0, visibleCount).map((n, idx) => (
              <article className="blog-card" key={n}>
                <div className="blog-card-img-wrap">
                  <img src={BLOG_IMAGES[idx]} alt={t(`blog.post.${n}.title`)} loading="lazy" />
                  <span className="blog-tag">{t(`blog.post.${n}.tag`)}</span>
                </div>
                <h3 className="blog-card-title">{t(`blog.post.${n}.title`)}</h3>
                <p className="blog-card-excerpt">{t(`blog.post.${n}.excerpt`)}</p>
                <Link href="/single-blog" className="blog-read-more">
                  {t('blog.read_more')} <span className="read-arrow">→</span>
                </Link>
              </article>
            ))}
          </div>

          {visibleCount < POST_KEYS.length && (
            <div className="load-more-wrap">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount((v) => v + 4)}
              >
                {t('blog.load_more')}
              </button>
            </div>
          )}
        </section>

      </div>
    </>
  );
}

Blog.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;