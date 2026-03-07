import { usePage } from "@inertiajs/react";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";

const RELATED_POSTS = [
  {
    id: 2,
    tag: "CREATIVE",
    title: "How AI is Transforming Modern Graphic Design",
    excerpt: "Discover how artificial intelligence tools are revolutionizing graphic design, making creativity faster and more efficient.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  },
  {
    id: 3,
    tag: "PROJECT",
    title: "Design Systems: Building Consistency Across Products",
    excerpt: "Learn the importance of a design system and how it can help maintain consistency, speed up development, and improve user experience.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    id: 4,
    tag: "WEBSITE",
    title: "Why Prototyping Should Be Your First Step in Web Design",
    excerpt: "Prototyping allows you to test ideas, improve usability, and avoid costly mistakes before development begins.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  },
];

export default function SingleBlog() {
  const { props } = usePage();
  const [comment, setComment] = useState({ name: "", email: "", website: "", body: "" });
  const [saveInfo, setSaveInfo] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body, html { background: #0e0c2e; }

        .page {
          font-family: 'Barlow', sans-serif;
          background: #0e0c2e;
          color: #fff;
          overflow-x: hidden;
        }

        /* ── HERO ── */
        .hero {
          min-height: 65vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 130px 40px 80px;
          position: relative;
          background: radial-gradient(ellipse 90% 70% at 50% 30%, #1a1660 0%, #0e0c2e 68%);
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
        }
        .breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
        }
        .breadcrumb .sep { color: #7c3aed; }
        .breadcrumb .cur { color: rgba(255,255,255,0.65); }

        .hero-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(36px, 6vw, 72px);
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -1px;
          color: #fff;
          margin-bottom: 24px;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }
        .hero-meta span { display: flex; align-items: center; gap: 6px; }
        .meta-dot { width: 4px; height: 4px; background: #7c3aed; border-radius: 50%; }
        .hero-meta .tag-pill {
          background: #7c3aed;
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* ── TICKER ── */
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: #7c3aed;
          padding: 13px 0;
          transform: rotate(-1.2deg) scaleX(1.04);
          margin: 0;
          position: relative;
          z-index: 10;
        }
        .ticker-inner { display: flex; width: max-content; animation: ticker 20s linear infinite; }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 14px;
          white-space: nowrap;
        }
        .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

        /* ── MAIN CONTENT ── */
        .main-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 60px 100px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 80px;
          align-items: start;
        }

        /* ── ARTICLE ── */
        .article { min-width: 0; }

        .hero-img {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 48px;
        }
        .hero-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        .article-body { max-width: 700px; }
        .article-body h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(26px, 3vw, 38px);
          text-transform: uppercase;
          letter-spacing: -0.5px;
          color: #fff;
          margin-bottom: 20px;
          line-height: 1.05;
        }
        .article-body p {
          font-size: 15px;
          line-height: 1.85;
          color: rgba(255,255,255,0.55);
          margin-bottom: 24px;
        }
        .blockquote {
          border-left: 3px solid #7c3aed;
          padding: 20px 28px;
          margin: 36px 0;
          background: rgba(124,58,237,0.06);
          border-radius: 0 8px 8px 0;
        }
        .blockquote p {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: rgba(255,255,255,0.85);
          line-height: 1.45;
          font-style: italic;
          margin: 0;
        }

        .article-imgs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 36px 0;
        }
        .article-imgs img {
          width: 100%; aspect-ratio: 4/3; object-fit: cover;
          border-radius: 8px; display: block;
        }

        /* ── SHARE BAR ── */
        .share-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 48px 0 60px;
          flex-wrap: wrap;
        }
        .share-label {
          width: 36px; height: 36px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
        }
        .share-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          padding: 9px 18px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .share-btn:hover { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.5); }
        .share-btn.fb { background: #1877f2; border-color: #1877f2; }
        .share-btn.tw { background: #000; border-color: #333; }
        .share-btn.li { background: #0a66c2; border-color: #0a66c2; }
        .share-btn.wa { background: #25d366; border-color: #25d366; }

        /* ── COMMENT FORM ── */
        .comment-section {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 60px;
        }
        .comment-section h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(28px, 3vw, 42px);
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1;
        }
        .comment-note {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 32px;
        }
        .comment-note strong { color: rgba(255,255,255,0.6); }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-field.full { grid-column: 1 / -1; }
        .form-field label {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.45);
        }
        .form-field input,
        .form-field textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 13px 16px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          width: 100%;
          resize: none;
        }
        .form-field input::placeholder,
        .form-field textarea::placeholder { color: rgba(255,255,255,0.2); }
        .form-field input:focus,
        .form-field textarea:focus {
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.04);
        }
        .form-field textarea { min-height: 130px; }

        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin: 20px 0 28px;
          cursor: pointer;
        }
        .checkbox-row input[type="checkbox"] {
          width: 16px; height: 16px;
          margin-top: 2px;
          accent-color: #7c3aed;
          cursor: pointer;
          flex-shrink: 0;
        }
        .checkbox-row span {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          line-height: 1.5;
        }

        .submit-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
          background: #7c3aed;
          border: none;
          padding: 16px 40px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .submit-btn:hover { background: #6d28d9; transform: translateY(-1px); }

        /* ── SIDEBAR ── */
        .sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 40px; }

        .sidebar-widget {}
        .widget-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 22px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #fff;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .widget-title::before {
          content: '';
          width: 4px; height: 20px;
          background: #7c3aed;
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* Categories */
        .cat-list { display: flex; flex-direction: column; }
        .cat-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: color 0.2s;
        }
        .cat-item:hover { color: #a78bfa; }
        .cat-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(255,255,255,0.65);
          transition: color 0.2s;
        }
        .cat-item:hover .cat-name { color: #a78bfa; }
        .cat-count {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.06);
          padding: 2px 8px;
          border-radius: 10px;
        }

        /* Recent Posts */
        .recent-post {
          display: flex;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
        }
        .recent-post:last-child { border-bottom: none; }
        .recent-thumb {
          width: 72px; height: 56px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .recent-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
        .recent-post:hover .recent-thumb img { transform: scale(1.08); }
        .recent-info { flex: 1; min-width: 0; }
        .recent-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #7c3aed;
          margin-bottom: 5px;
        }
        .recent-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 14px;
          line-height: 1.25;
          color: rgba(255,255,255,0.8);
          transition: color 0.2s;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .recent-post:hover .recent-title { color: #a78bfa; }

        /* Tags */
        .tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag-chip {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 7px 14px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .tag-chip:hover { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.4); color: #a78bfa; }

        /* ── RELATED POSTS ── */
        .related-section {
          max-width: 1280px;
          margin: 0 auto;
          padding: 10px 60px 100px;
        }
        .related-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(32px, 4vw, 54px);
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .related-heading .rh-outline {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.28);
        }
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .blog-card { display: flex; flex-direction: column; cursor: pointer; }
        .blog-card-img {
          width: 100%; aspect-ratio: 16/10;
          border-radius: 10px; overflow: hidden; margin-bottom: 20px;
          position: relative;
        }
        .blog-card-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .blog-card:hover .blog-card-img img { transform: scale(1.05); }
        .blog-tag-pill {
          position: absolute; bottom: 12px; left: 12px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 10px;
          text-transform: uppercase; letter-spacing: 2px;
          color: #fff; background: #7c3aed;
          padding: 4px 12px; border-radius: 20px;
        }
        .blog-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(18px, 2vw, 22px);
          line-height: 1.2;
          color: #fff;
          margin-bottom: 12px;
          transition: color 0.2s;
        }
        .blog-card:hover .blog-card-title { color: #a78bfa; }
        .blog-card-excerpt {
          font-size: 13px; line-height: 1.7;
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px; flex: 1;
        }
        .read-more-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 11px;
          text-transform: uppercase; letter-spacing: 2px;
          color: rgba(255,255,255,0.6);
          background: none; border: none; cursor: pointer; padding: 0;
          transition: color 0.2s;
        }
        .read-more-btn:hover { color: #a78bfa; }
        .read-more-btn .arr { transition: transform 0.2s; }
        .read-more-btn:hover .arr { transform: translateX(4px); }

        /* Divider ticker */
        .divider-ticker {
          border-top: 1px solid rgba(124,58,237,0.15);
          border-bottom: 1px solid rgba(124,58,237,0.15);
          overflow: hidden;
          padding: 12px 0;
          margin-bottom: 80px;
        }
        .divider-inner { display: flex; width: max-content; animation: ticker 25s linear infinite; }
        .divider-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 11px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: rgba(255,255,255,0.25);
          padding: 0 28px; display: flex; align-items: center; gap: 10px;
          white-space: nowrap;
        }
        .divider-dot { width: 4px; height: 4px; background: #7c3aed; border-radius: 50%; flex-shrink: 0; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .main-wrap { grid-template-columns: 1fr; gap: 60px; padding: 60px 40px 80px; }
          .sidebar { position: static; }
          .related-section { padding: 0 40px 80px; }
        }
        @media (max-width: 700px) {
          .hero { padding: 100px 24px 60px; }
          .main-wrap { padding: 40px 24px 60px; }
          .form-grid { grid-template-columns: 1fr; }
          .related-grid { grid-template-columns: 1fr; }
          .related-section { padding: 0 24px 60px; }
          .article-imgs { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="page">
        {/* HERO */}
        <section className="hero">
            <div className="hero-inner">
            <div className="breadcrumb">
                <span>Home</span>
                <span className="sep">/</span>
                <span>Blog</span>
                <span className="sep">/</span>
                <span className="cur">Design</span>
            </div>
            <h1 className="hero-title">
                The Role of Design in Creating Impactful <br />Digital Experiences
            </h1>
            <div className="hero-meta">
                <span>by Jane Smith</span>
                <span className="meta-dot" />
                <span>March 7, 2026</span>
                <span className="meta-dot" />
                <span className="tag-pill">Design</span>
            </div>
            </div>
        </section>

        {/* TICKER */}
        <div className="ticker-wrap">
            <div className="ticker-inner">
            {Array(20).fill("Trending Design Insights").map((t, i) => (
                <span className="ticker-item" key={i}>{t}</span>
            ))}
            </div>
        </div>

        {/* MAIN */}
        <div className="main-wrap">
            {/* ARTICLE */}
            <article className="article">
            <div className="hero-img">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80" alt="Design importance" />
            </div>

            <div className="article-body">
                <h2>Why Good Design is More Than Just Aesthetics</h2>
                <p>
                Design is the silent ambassador of your brand. It shapes how users perceive your products, communicates your message, and builds trust with your audience.
                </p>
                <p>
                Effective design combines functionality with creativity. It's about understanding user behavior, streamlining experiences, and making interfaces intuitive.
                </p>
                <p>
                Beyond visuals, design impacts engagement, conversions, and overall satisfaction. Every color choice, typography decision, and layout has a purpose.
                </p>

                <div className="blockquote">
                <p>"Design is not just what it looks like and feels like. Design is how it works." – Steve Jobs</p>
                </div>

                <p>
                Whether it's a website, app, or digital campaign, investing in good design ensures your ideas are communicated clearly and memorably.
                </p>

                <div className="article-imgs">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80" alt="Design workflow" />
                <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80" alt="Creative collaboration" />
                </div>

                <p>
                A thoughtful design process involves research, wireframing, prototyping, and iteration. It ensures the final product not only looks good but performs well.
                </p>
            </div>

            {/* SHARE */}
            <div className="share-bar">
                <div className="share-label">⇧</div>
                <button className="share-btn fb">Facebook</button>
                <button className="share-btn tw">Twitter</button>
                <button className="share-btn li">LinkedIn</button>
                <button className="share-btn wa">WhatsApp</button>
            </div>

            {/* COMMENT FORM */}
            <div className="comment-section">
                <h3>Leave A Reply</h3>
                <p className="comment-note">
                Your email address will not be published. <strong>Required fields are marked *</strong>
                </p>

                <div className="form-field full" style={{ marginBottom: 16 }}>
                <label>Comment *</label>
                <textarea
                    placeholder="Write your comment here..."
                    value={comment.body}
                    onChange={e => setComment({ ...comment, body: e.target.value })}
                />
                </div>

                <div className="form-grid">
                <div className="form-field">
                    <label>Name *</label>
                    <input
                    type="text"
                    placeholder="Your name"
                    value={comment.name}
                    onChange={e => setComment({ ...comment, name: e.target.value })}
                    />
                </div>
                <div className="form-field">
                    <label>Email *</label>
                    <input
                    type="email"
                    placeholder="your@email.com"
                    value={comment.email}
                    onChange={e => setComment({ ...comment, email: e.target.value })}
                    />
                </div>
                <div className="form-field full">
                    <label>Website</label>
                    <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={comment.website}
                    onChange={e => setComment({ ...comment, website: e.target.value })}
                    />
                </div>
                </div>

                <label className="checkbox-row">
                <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={e => setSaveInfo(e.target.checked)}
                />
                <span>Save my name, email, and website in this browser for the next time I comment.</span>
                </label>

                <button className="submit-btn">Post Comment</button>
            </div>
            </article>

            {/* SIDEBAR */}
            <aside className="sidebar">
            {/* Categories */}
            <div className="sidebar-widget">
                <div className="widget-title">Categories</div>
                <div className="cat-list">
                {[
                    ["Design", 14],
                    ["Creative", 9],
                    ["Project", 16],
                    ["Website", 7],
                    ["Branding", 10],
                    ["Motion", 5],
                ].map(([name, count]) => (
                    <div className="cat-item" key={name}>
                    <span className="cat-name">{name}</span>
                    <span className="cat-count">{count}</span>
                    </div>
                ))}
                </div>
            </div>

            {/* Recent Posts */}
            <div className="sidebar-widget">
                <div className="widget-title">Recent Posts</div>
                {RELATED_POSTS.map(post => (
                <div className="recent-post" key={post.id}>
                    <div className="recent-thumb">
                    <img src={post.image} alt={post.title} />
                    </div>
                    <div className="recent-info">
                    <div className="recent-tag">{post.tag}</div>
                    <div className="recent-title">{post.title}</div>
                    </div>
                </div>
                ))}
            </div>

            {/* Tags */}
            <div className="sidebar-widget">
                <div className="widget-title">Tags</div>
                <div className="tags-wrap">
                {["Design", "Creative", "UI/UX", "Branding", "Motion", "Digital", "Agency", "Prototype", "System", "Website"].map(tag => (
                    <span className="tag-chip" key={tag}>{tag}</span>
                ))}
                </div>
            </div>
            </aside>
        </div>
        </div>
    </>
  );
}

SingleBlog.layout = (page) => <MainLayout>{page}</MainLayout>;
