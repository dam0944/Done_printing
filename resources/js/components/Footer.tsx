import { Link } from "@inertiajs/react";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

        .footer-wrap {
          background: #080620;
          font-family: 'Barlow', sans-serif;
          padding: 80px 60px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .footer-main {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 1fr 1fr 1fr;
          gap: 60px;
          padding-bottom: 80px;
          align-items: start;
        }

        /* ─── Contact Card ─── */
        .footer-contact-card {
          background: #7c3aed;
          border-radius: 10px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .fc-block {}

        .fc-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 17px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #fff;
          margin-bottom: 5px;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(255,255,255,0.5);
        }

        .fc-value {
          font-size: 13.5px;
          color: rgba(255,255,255,0.85);
          line-height: 1.5;
        }

        .fc-value a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: color 0.2s;
        }
        .fc-value a:hover { color: #fff; }

        /* ─── Nav Columns ─── */
        .footer-col-title {
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #fff;
          margin-bottom: 24px;
          letter-spacing: 0.2px;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 13px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-nav li a {
          font-size: 13.5px;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav li a:hover { color: #a78bfa; }

        /* ─── Social Pills ─── */
        .footer-social-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .social-pill {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          padding: 8px 18px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          background: rgba(255,255,255,0.04);
        }
        .social-pill:hover {
          background: #7c3aed;
          border-color: #7c3aed;
          color: #fff;
        }

        /* ─── Bottom Bar ─── */
        .footer-bottom {
          max-width: 1280px;
          margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 22px 0;
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
        }

        .footer-logo-mark {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 22px;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .footer-logo-mark .lm-bracket { color: #7c3aed; }
        .footer-logo-mark .lm-dot { color: #7c3aed; font-size: 26px; line-height: 0; vertical-align: -2px; }

        .footer-logo-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.18);
        }

        .footer-tagline {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }

        .footer-copy {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .footer-copy strong { color: rgba(255,255,255,0.65); font-weight: 600; }

        @media (max-width: 1024px) {
          .footer-main { grid-template-columns: 1fr 1fr; gap: 40px; }
          .footer-wrap { padding: 60px 32px 0; }
        }
        @media (max-width: 640px) {
          .footer-main { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .footer-wrap { padding: 48px 24px 0; }
        }
      `}</style>

      <footer className="footer-wrap">
        <div className="footer-main">

          {/* ── Contact Card ── */}
          <div className="footer-contact-card">
            <div className="fc-block">
              <div className="fc-label">Office</div>
              <div className="fc-value">Jl. Raya Puputan No 142, Denpasar, Bali</div>
            </div>
            <div className="fc-block">
              <div className="fc-label">Email</div>
              <div className="fc-value">
                <a href="mailto:support@domain.com">support@domain.com</a>
              </div>
            </div>
            <div className="fc-block">
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
            © Copyright {new Date().getFullYear()} Templatekit By <strong>Jegtheme</strong>. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
