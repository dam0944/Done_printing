import { Link } from "@inertiajs/react";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        /* ── tokens ── */
        .footer-wrap {
          --ff-head:    'Barlow Condensed', sans-serif;
          --ff-body:    'Barlow', sans-serif;
          --c-white:    #ffffff;
          --c-white2:   rgba(255,255,255,0.80);
          --c-white3:   rgba(255,255,255,0.52);
          --c-white4:   rgba(255,255,255,0.32);
          --c-purple:   #7c3aed;
          --c-purple-l: #a78bfa;
          --lh-body:    1.72;
        }

        .footer-wrap {
          background: #080620;
          font-family: var(--ff-body);
          font-size: 15px;
          -webkit-font-smoothing: antialiased;
          padding: 80px 60px 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          color: var(--c-white2);
        }

        .footer-main {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr 1fr 1fr;
          gap: 64px;
          padding-bottom: 80px;
          align-items: start;
        }

        /* ─── Contact Card ─── */
        .footer-contact-card {
          background: var(--c-purple);
          border-radius: 12px;
          padding: 34px 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .fc-label {
          font-family: var(--ff-head);
          font-weight: 800;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.65);
          margin-bottom: 6px;
        }

        .fc-value {
          font-size: 15px;
          font-weight: 500;
          color: var(--c-white);
          line-height: var(--lh-body);
        }

        .fc-value a {
          color: var(--c-white);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .fc-value a:hover { opacity: 0.75; }

        /* ─── Nav Columns ─── */
        .footer-col-title {
          font-family: var(--ff-body);
          font-weight: 700;
          font-size: 16px;
          color: var(--c-white);
          margin-bottom: 22px;
          letter-spacing: 0.1px;
          line-height: 1.3;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-nav li a {
          font-size: 15px;
          font-weight: 400;
          color: var(--c-white3);
          text-decoration: none;
          line-height: 1.4;
          transition: color 0.2s;
          display: inline-block;
        }
        .footer-nav li a:hover { color: var(--c-purple-l); }

        /* ─── Social Pills ─── */
        .footer-col-social-desc {
          font-size: 14px;
          color: var(--c-white3);
          line-height: var(--lh-body);
          margin-bottom: 20px;
          max-width: 220px;
        }

        .footer-social-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .social-pill {
          font-family: var(--ff-head);
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.8px;
          color: var(--c-white3);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 9px 20px;
          text-decoration: none;
          transition: background 0.22s, border-color 0.22s, color 0.22s;
          background: rgba(255,255,255,0.04);
          line-height: 1;
        }
        .social-pill:hover {
          background: var(--c-purple);
          border-color: var(--c-purple);
          color: var(--c-white);
        }

        /* ─── Bottom Bar ─── */
        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 24px 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .footer-logo-mark {
          font-family: var(--ff-head);
          font-weight: 900;
          font-size: 23px;
          color: var(--c-white);
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .footer-logo-mark .lm-bracket { color: var(--c-purple); }
        .footer-logo-mark .lm-dot {
          color: var(--c-purple);
          font-size: 28px;
          line-height: 0;
          vertical-align: -3px;
          margin-left: 1px;
        }

        .footer-logo-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.16);
          flex-shrink: 0;
        }

        .footer-tagline {
          font-size: 14px;
          font-weight: 400;
          color: var(--c-white3);
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        .footer-copy {
          font-size: 14px;
          font-weight: 400;
          color: var(--c-white4);
          line-height: 1.5;
        }
        .footer-copy strong {
          color: var(--c-white3);
          font-weight: 600;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1100px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
          .footer-wrap { padding: 64px 40px 0; }
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .footer-wrap { padding: 56px 24px 0; }
          .footer-main { padding-bottom: 56px; }
        }

        @media (max-width: 540px) {
          .footer-main { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            padding: 20px 0 24px;
          }
          .footer-tagline { display: none; }
          .footer-logo-divider { display: none; }
        }
      `}</style>

      <footer className="footer-wrap">
        <div className="footer-main">

          {/* ── Contact Card ── */}
          <div className="footer-contact-card">
            <div>
              <div className="fc-label">Office</div>
              <div className="fc-value">Jl. Raya Puputan No 142,<br />Denpasar, Bali</div>
            </div>
            <div>
              <div className="fc-label">Email</div>
              <div className="fc-value">
                <a href="mailto:support@domain.com">support@domain.com</a>
              </div>
            </div>
            <div>
              <div className="fc-label">Phone</div>
              <div className="fc-value">
                <a href="tel:+6281115368">(+62) 81 115 3568</a>
              </div>
            </div>
          </div>

          {/* ── Our Company ── */}
          <div>
            <div className="footer-col-title">Our Company</div>
            <ul className="footer-nav">
              {["About", "Community", "Careers", "Testimonials", "Services", "Project"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-nav">
              {[
                { label: "Contact",           href: "/contact" },
                { label: "Privacy Policy",    href: "/privacy" },
                { label: "FAQ's",             href: "/faq" },
                { label: "Licensing",         href: "/licensing" },
                { label: "Help Center",       href: "/help" },
                { label: "Terms & Condition", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Social Media ── */}
          <div>
            <div className="footer-col-title">Our Social Media</div>
            <p className="footer-col-social-desc">
              Follow us and stay updated with our latest projects and creative work.
            </p>
            <div className="footer-social-grid">
              {[
                { label: "Facebook",  href: "https://facebook.com" },
                { label: "Twitter",   href: "https://twitter.com" },
                { label: "LinkedIn",  href: "https://linkedin.com" },
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Pinterest", href: "https://pinterest.com" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="social-pill" target="_blank" rel="noreferrer">
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <a href="/" className="footer-logo">
            <span className="footer-logo-mark">
              <span className="lm-bracket">[</span>Creatv<span className="lm-bracket">]</span><span className="lm-dot">·</span>
            </span>
            <span className="footer-logo-divider" />
            <span className="footer-tagline">Creative Design Agency.</span>
          </a>

          <p className="footer-copy">
            © {new Date().getFullYear()} Templatekit by <strong>Palm Technology</strong>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
