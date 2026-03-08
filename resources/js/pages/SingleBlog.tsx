import { useState } from "react";
import type { ReactElement, ChangeEvent } from "react";
import { useLang } from "@/contexts/LangContext";
import MainLayout from "@/layouts/MainLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CommentForm {
  name: string;
  email: string;
  website: string;
  body: string;
}


// ─── Constants ────────────────────────────────────────────────────────────────

const COMMENT_INITIAL: CommentForm = { name: "", email: "", website: "", body: "" };


const SHARE_BUTTONS = [
  { label: "Facebook", cls: "fb" },
  { label: "Twitter",  cls: "tw" },
  { label: "LinkedIn", cls: "li" },
  { label: "WhatsApp", cls: "wa" },
] as const;

const ARTICLE_IMAGES = [
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80", altKey: "singleblog.article.img1_alt" },
  { src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80", altKey: "singleblog.article.img2_alt" },
] as const;

// ─── Main component ───────────────────────────────────────────────────────────

export default function SingleBlog() {
  const { t } = useLang();

  const [comment, setComment] = useState<CommentForm>(COMMENT_INITIAL);
  const [saveInfo, setSaveInfo] = useState(false);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleField =
    (field: keyof CommentForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setComment((prev) => ({ ...prev, [field]: e.target.value }));

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{STYLES}</style>

      <div className="page">

        {/* ══ HERO ══ */}
        <section className="hero">
          <div className="hero-inner">
            <div className="breadcrumb">
              <span>{t("nav.home")}</span>
              <span className="sep">/</span>
              <span>{t("singleblog.hero.breadcrumb.blog")}</span>
              <span className="sep">/</span>
              <span className="cur">{t("singleblog.hero.breadcrumb.current")}</span>
            </div>
            <h1 className="hero-title">{t("singleblog.hero.title")}</h1>
            <div className="hero-meta">
              <span>{t("singleblog.hero.meta.author")}</span>
              <span className="meta-dot" />
              <span>{t("singleblog.hero.meta.date")}</span>
              <span className="meta-dot" />
              <span className="tag-pill">{t("singleblog.hero.meta.tag")}</span>
            </div>
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {Array.from({ length: 20 }, (_, i) => (
              <span className="ticker-item" key={i}>{t("singleblog.ticker")}</span>
            ))}
          </div>
        </div>

        {/* ══ ARTICLE ══ */}
        <div className="article-wrap">
          <div className="hero-img">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80"
              alt={t("singleblog.article.img_alt")}
            />
          </div>

          <div className="article-body">
            <h2>{t("singleblog.article.h2")}</h2>
            <p>{t("singleblog.article.p1")}</p>
            <p>{t("singleblog.article.p2")}</p>
            <p>{t("singleblog.article.p3")}</p>

            <div className="blockquote">
              <p>{t("singleblog.article.quote")}</p>
            </div>

            <p>{t("singleblog.article.p4")}</p>

            <div className="article-imgs">
              {ARTICLE_IMAGES.map(({ src, altKey }) => (
                <img key={src} src={src} alt={t(altKey)} />
              ))}
            </div>

            <p>{t("singleblog.article.p5")}</p>
          </div>

          {/* ── SHARE BAR ── */}
          <div className="share-bar">
            <div className="share-label">⇧</div>
            {SHARE_BUTTONS.map(({ label, cls }) => (
              <button key={cls} className={`share-btn ${cls}`}>{label}</button>
            ))}
          </div>

          {/* ── COMMENT FORM ── */}
          <div className="comment-section">
            <h3>{t("singleblog.comment.heading")}</h3>
            <p className="comment-note">
              {t("singleblog.comment.note")}{" "}
              <strong>{t("singleblog.comment.note_required")}</strong>
            </p>

            <div className="form-field full" style={{ marginBottom: 16 }}>
              <label>{t("singleblog.comment.label_body")}</label>
              <textarea
                placeholder={t("singleblog.comment.placeholder_body")}
                value={comment.body}
                onChange={handleField("body")}
              />
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>{t("singleblog.comment.label_name")}</label>
                <input
                  type="text"
                  placeholder={t("singleblog.comment.placeholder_name")}
                  value={comment.name}
                  onChange={handleField("name")}
                />
              </div>
              <div className="form-field">
                <label>{t("singleblog.comment.label_email")}</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={comment.email}
                  onChange={handleField("email")}
                />
              </div>
              <div className="form-field full">
                <label>{t("singleblog.comment.label_website")}</label>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={comment.website}
                  onChange={handleField("website")}
                />
              </div>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
              />
              <span>{t("singleblog.comment.save_info")}</span>
            </label>

            <button className="submit-btn">{t("singleblog.comment.submit")}</button>
          </div>
        </div>
      </div>
    </>
  );
}
SingleBlog.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;


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

  /* ─── PAGE ─── */
  .page { font-family: var(--f-body); background: #0e0c2e; color: #fff; overflow-x: hidden; }

  /* ─── HERO ─── */
  .hero {
    min-height: 65vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 130px 40px 80px;
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
  .hero-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
  .breadcrumb {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--f-display); font-size: 11px; font-weight: 600;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: rgba(255,255,255,0.35); margin-bottom: 28px;
  }
  .breadcrumb .sep { color: #7c3aed; }
  .breadcrumb .cur { color: rgba(255,255,255,0.65); }
  .hero-title {
    font-family: var(--f-display); font-weight: 900;
    font-size: clamp(36px, 6vw, 72px); text-transform: var(--tt);
    line-height: 1; letter-spacing: -1px; color: #fff; margin-bottom: 24px;
  }
  :root[data-lang="km"] .hero-title { letter-spacing: 0; line-height: 1.3; }
  .hero-meta {
    display: flex; align-items: center; justify-content: center;
    gap: 20px; font-size: 13px; font-family: var(--f-body);
    color: rgba(255,255,255,0.4); flex-wrap: wrap;
  }
  .hero-meta span { display: flex; align-items: center; gap: 6px; }
  .meta-dot { width: 4px; height: 4px; background: #7c3aed; border-radius: 50%; flex-shrink: 0; }
  .hero-meta .tag-pill {
    background: #7c3aed; color: #fff; font-family: var(--f-display);
    font-weight: 700; font-size: 10px; text-transform: var(--tt);
    letter-spacing: var(--ls-med); padding: 4px 12px; border-radius: 20px;
  }

  /* ─── TICKER ─── */
  .ticker-wrap {
    width: 100%; overflow: hidden; background: #7c3aed; padding: 13px 0;
    transform: rotate(-1.2deg) scaleX(1.04); margin: 0; position: relative; z-index: 10;
  }
  .ticker-inner { display: flex; width: max-content; animation: ticker 20s linear infinite; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-item {
    font-family: var(--f-display); font-weight: 700; font-size: 12px;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: #fff; padding: 0 32px; display: flex; align-items: center; gap: 14px; white-space: nowrap;
  }
  .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

  /* ─── ARTICLE ─── */
  .article-wrap { max-width: 780px; margin: 0 auto; padding: 80px 40px 100px; }
  .hero-img { width: 100%; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; margin-bottom: 56px; }
  .hero-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .article-body h2 {
    font-family: var(--f-display); font-weight: 900;
    font-size: clamp(26px, 3vw, 38px); text-transform: var(--tt);
    letter-spacing: -0.5px; color: #fff; margin-bottom: 20px; line-height: 1.05;
  }
  :root[data-lang="km"] .article-body h2 { letter-spacing: 0; line-height: 1.3; }
  .article-body p {
    font-family: var(--f-body); font-size: 15px;
    line-height: var(--lh-body); color: rgba(255,255,255,0.55); margin-bottom: 24px;
  }
  .blockquote {
    border-left: 3px solid #7c3aed; padding: 20px 28px;
    margin: 36px 0; background: rgba(124,58,237,0.06); border-radius: 0 8px 8px 0;
  }
  .blockquote p {
    font-family: var(--f-display); font-weight: 700; font-size: 20px;
    color: rgba(255,255,255,0.85); line-height: 1.45; font-style: italic; margin: 0;
  }
  :root[data-lang="km"] .blockquote p { font-style: normal; line-height: var(--lh-body); font-size: 17px; }
  .article-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 36px 0; }
  .article-imgs img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px; display: block; }

  /* ─── SHARE BAR ─── */
  .share-bar { display: flex; align-items: center; gap: 14px; margin: 48px 0 60px; flex-wrap: wrap; }
  .share-label {
    width: 36px; height: 36px; background: rgba(124,58,237,0.15);
    border: 1px solid rgba(124,58,237,0.3); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; font-size: 14px;
  }
  .share-btn {
    font-family: var(--f-display); font-weight: 700; font-size: 10px;
    text-transform: var(--tt); letter-spacing: var(--ls-med);
    color: #fff; padding: 9px 18px; border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.15);
    background: transparent; cursor: pointer; transition: background 0.2s, border-color 0.2s;
  }
  .share-btn:hover { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.5); }
  .share-btn.fb { background: #1877f2; border-color: #1877f2; }
  .share-btn.tw { background: #000;    border-color: #333; }
  .share-btn.li { background: #0a66c2; border-color: #0a66c2; }
  .share-btn.wa { background: #25d366; border-color: #25d366; }

  /* ─── COMMENT FORM ─── */
  .comment-section { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 60px; }
  .comment-section h3 {
    font-family: var(--f-display); font-weight: 900;
    font-size: clamp(28px, 3vw, 42px); text-transform: var(--tt);
    color: #fff; margin-bottom: 8px; line-height: 1;
  }
  :root[data-lang="km"] .comment-section h3 { line-height: 1.3; }
  .comment-note {
    font-family: var(--f-body); font-size: 13px;
    line-height: var(--lh-body); color: rgba(255,255,255,0.35); margin-bottom: 32px;
  }
  .comment-note strong { color: rgba(255,255,255,0.6); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-field { display: flex; flex-direction: column; gap: 8px; }
  .form-field.full { grid-column: 1 / -1; }
  .form-field label {
    font-family: var(--f-display); font-weight: 700; font-size: 11px;
    text-transform: var(--tt); letter-spacing: var(--ls-med); color: rgba(255,255,255,0.45);
  }
  .form-field input, .form-field textarea {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px; padding: 13px 16px; font-family: var(--f-body);
    font-size: 14px; color: #fff; outline: none;
    transition: border-color 0.2s, background 0.2s; width: 100%; resize: none;
  }
  .form-field input::placeholder, .form-field textarea::placeholder { color: rgba(255,255,255,0.2); }
  .form-field input:focus, .form-field textarea:focus {
    border-color: rgba(124,58,237,0.5); background: rgba(124,58,237,0.04);
  }
  .form-field textarea { min-height: 130px; }
  .checkbox-row { display: flex; align-items: flex-start; gap: 12px; margin: 20px 0 28px; cursor: pointer; }
  .checkbox-row input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; accent-color: #7c3aed; cursor: pointer; flex-shrink: 0; }
  .checkbox-row span { font-family: var(--f-body); font-size: 13px; line-height: var(--lh-body); color: rgba(255,255,255,0.4); }
  .submit-btn {
    font-family: var(--f-display); font-weight: 700; font-size: 12px;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: #fff; background: #7c3aed; border: none;
    padding: 16px 40px; border-radius: 5px; cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .submit-btn:hover { background: #6d28d9; transform: translateY(-1px); }

  /* ─── DIVIDER TICKER ─── */
  .divider-ticker {
    border-top: 1px solid rgba(124,58,237,0.15); border-bottom: 1px solid rgba(124,58,237,0.15);
    overflow: hidden; padding: 12px 0; margin-bottom: 80px;
  }
  .divider-inner { display: flex; width: max-content; animation: ticker 25s linear infinite; }
  .divider-item {
    font-family: var(--f-display); font-weight: 700; font-size: 11px;
    text-transform: var(--tt); letter-spacing: var(--ls-wide);
    color: rgba(255,255,255,0.25); padding: 0 28px;
    display: flex; align-items: center; gap: 10px; white-space: nowrap;
  }
  .divider-dot { width: 4px; height: 4px; background: #7c3aed; border-radius: 50%; flex-shrink: 0; }

  /* ─── RELATED POSTS ─── */
  .related-section { max-width: 1280px; margin: 0 auto; padding: 10px 60px 100px; }
  .related-heading {
    font-family: var(--f-display); font-weight: 900;
    font-size: clamp(32px, 4vw, 54px); text-transform: var(--tt);
    color: #fff; margin-bottom: 40px;
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  }
  :root[data-lang="km"] .related-heading { line-height: 1.3; }
  .related-heading .rh-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); }
  :root[data-lang="km"] .related-heading .rh-outline { -webkit-text-stroke: 0; color: rgba(255,255,255,0.28); }
  .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
  .blog-card { display: flex; flex-direction: column; cursor: pointer; }
  .blog-card-img { width: 100%; aspect-ratio: 16/10; border-radius: 10px; overflow: hidden; margin-bottom: 20px; position: relative; }
  .blog-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
  .blog-card:hover .blog-card-img img { transform: scale(1.05); }
  .blog-tag-pill {
    position: absolute; bottom: 12px; left: 12px;
    font-family: var(--f-display); font-weight: 700; font-size: 10px;
    text-transform: var(--tt); letter-spacing: var(--ls-med);
    color: #fff; background: #7c3aed; padding: 4px 12px; border-radius: 20px;
  }
  .blog-card-title {
    font-family: var(--f-display); font-weight: 800;
    font-size: clamp(18px, 2vw, 22px); line-height: 1.2;
    color: #fff; margin-bottom: 12px; transition: color 0.2s;
  }
  :root[data-lang="km"] .blog-card-title { line-height: 1.5; }
  .blog-card:hover .blog-card-title { color: #a78bfa; }
  .blog-card-excerpt {
    font-family: var(--f-body); font-size: 13px;
    line-height: var(--lh-body); color: rgba(255,255,255,0.4); margin-bottom: 16px; flex: 1;
  }
  .read-more-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--f-display); font-weight: 700; font-size: 11px;
    text-transform: var(--tt); letter-spacing: var(--ls-med);
    color: rgba(255,255,255,0.6); background: none; border: none; cursor: pointer; padding: 0; transition: color 0.2s;
  }
  .read-more-btn:hover { color: #a78bfa; }
  .read-more-btn .arr { transition: transform 0.2s; }
  .read-more-btn:hover .arr { transform: translateX(4px); }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 700px) {
    .hero { padding: 100px 24px 60px; }
    .hero-title { letter-spacing: -0.5px; }
    :root[data-lang="km"] .hero-title { letter-spacing: 0; }
    .article-wrap { padding: 48px 24px 60px; }
    .form-grid { grid-template-columns: 1fr; }
    .article-imgs { grid-template-columns: 1fr; }
    .related-grid { grid-template-columns: 1fr; }
    .related-section { padding: 0 24px 60px; }
  }
`;