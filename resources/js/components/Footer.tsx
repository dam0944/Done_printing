import { Link } from "@inertiajs/react";
import type { FC } from "react";
import { useLang } from "@/contexts/LangContext";

/* ════════════════════════════════════════
   TYPES
════════════════════════════════════════ */
interface FooterLink {
  href: string;
  key:  string;
}

interface ContactBlock {
  labelKey: string;
  valueKey:  string;
}

/* ════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════ */
const CONTACT_BLOCKS: ContactBlock[] = [
  { labelKey: "footer.office.label", valueKey: "footer.office.value" },
  { labelKey: "footer.email.label",  valueKey: "footer.email.value"  },
  { labelKey: "footer.phone.label",  valueKey: "footer.phone.value"  },
];

const COMPANY_LINKS: FooterLink[] = [
  { href: "/about",        key: "footer.company.about"        },
  { href: "/community",    key: "footer.company.community"    },
  { href: "/careers",      key: "footer.company.careers"      },
  { href: "/testimonials", key: "footer.company.testimonials" },
  { href: "/services",     key: "footer.company.services"     },
  { href: "/project",      key: "footer.company.project"      },
];

const QUICK_LINKS: FooterLink[] = [
  { href: "/contact",   key: "footer.quick.contact"   },
  { href: "/privacy",   key: "footer.quick.privacy"   },
  { href: "/faq",       key: "footer.quick.faq"       },
  { href: "/licensing", key: "footer.quick.licensing" },
  { href: "/help",      key: "footer.quick.help"      },
  { href: "/terms",     key: "footer.quick.terms"     },
];

const SOCIAL_LINKS: FooterLink[] = [
  { href: "https://facebook.com",  key: "footer.social.facebook"  },
  { href: "https://twitter.com",   key: "footer.social.twitter"   },
  { href: "https://linkedin.com",  key: "footer.social.linkedin"  },
  { href: "https://instagram.com", key: "footer.social.instagram" },
  { href: "https://pinterest.com", key: "footer.social.pinterest" },
];

/* ════════════════════════════════════════
   SUB-COMPONENTS
════════════════════════════════════════ */
interface FooterColProps {
  title:    string;
  children: React.ReactNode;
}

const FooterCol: FC<FooterColProps> = ({ title, children }) => (
  <div className="footer-col">
    <h4 className="footer-col-title">{title}</h4>
    {children}
  </div>
);

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
export default function Footer() {
  const { t } = useLang();

  return (
    <>
      <style>{`
        /* ── Variable fallbacks (Header sets these on :root globally) ── */
        :root {
          --f-body:    'Barlow', sans-serif;
          --f-display: 'Barlow Condensed', sans-serif;
          --tt:        uppercase;
          --ls-nav:    2.5px;
          --lh-body:   1.8;
          --purple:    #7c3aed;
          --purple-h:  #6d28d9;
        }
        :root[data-lang="km"] {
          --f-body:    'Noto Sans Khmer', sans-serif;
          --f-display: 'Noto Sans Khmer', sans-serif;
          --tt:        none;
          --ls-nav:    0px;
          --lh-body:   2;
        }

        /* ════ FOOTER SHELL ════ */
        .footer-wrap {
          background: #080620;
          font-family: var(--f-body);
          color: #fff;
          border-top: 1px solid rgba(124,58,237,0.15);
        }

        /* ════ MAIN GRID ════ */
        .footer-main {
          max-width: 1400px; margin: 0 auto;
          padding: 80px 48px 72px;
          display: grid;
          grid-template-columns: 300px 1fr 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* ════ CONTACT CARD ════ */
        .footer-contact-card {
          background: var(--purple);
          border-radius: 16px;
          padding: 36px 32px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .footer-contact-block { display: flex; flex-direction: column; gap: 5px; }
        .footer-contact-label {
          font-family: var(--f-display);
          font-weight: 700; font-size: 11px;
          text-transform: var(--tt); letter-spacing: var(--ls-nav);
          color: rgba(255,255,255,0.6);
        }
        .footer-contact-value {
          font-family: var(--f-body);
          font-size: 15px; font-weight: 500;
          color: #fff; line-height: var(--lh-body);
        }

        /* ════ LINK COLUMNS ════ */
        .footer-col { display: flex; flex-direction: column; }
        .footer-col-title {
          font-family: var(--f-body);
          font-weight: 700; font-size: 17px;
          color: #fff; margin: 0 0 24px;
          letter-spacing: 0.2px;
        }
        .footer-col-links { display: flex; flex-direction: column; }
        .footer-col-links a {
          font-family: var(--f-body);
          font-size: 15px; font-weight: 400;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          padding: 7px 0;
          transition: color 0.2s, padding-left 0.2s;
          display: block;
        }
        .footer-col-links a:hover { color: #fff; padding-left: 6px; }

        /* ════ SOCIAL ════ */
        .footer-social-desc {
          font-family: var(--f-body);
          font-size: 14px; line-height: var(--lh-body);
          color: rgba(255,255,255,0.45);
          margin-bottom: 20px; max-width: 260px;
        }
        .footer-social-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .footer-social-btn {
          font-family: var(--f-display);
          font-weight: 700; font-size: 11px;
          text-transform: var(--tt); letter-spacing: var(--ls-nav);
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 20px;
          padding: 9px 18px;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
          display: inline-block;
        }
        .footer-social-btn:hover {
          background: var(--purple);
          border-color: var(--purple);
          color: #fff; transform: translateY(-1px);
        }

        /* ════ BOTTOM BAR ════ */
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); }
        .footer-bottom-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 24px 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 20px;
        }
        .footer-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; flex-shrink: 0;
        }
        .footer-logo img {
          height: 36px; width: auto;
          object-fit: contain; display: block;
        }
        .footer-logo-divider {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.2); flex-shrink: 0;
        }
        .footer-logo-tagline {
          font-family: var(--f-body);
          font-size: 14px; color: rgba(255,255,255,0.4); font-weight: 400;
        }
        .footer-copy {
          font-family: var(--f-body);
          font-size: 13px; color: rgba(255,255,255,0.35);
          text-align: right; line-height: 1.6;
        }
        .footer-copy strong { color: rgba(255,255,255,0.7); font-weight: 600; }

        /* ════ RESPONSIVE ════ */
        @media (max-width: 1100px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 40px; padding: 64px 40px 56px;
          }
          .footer-contact-card { grid-column: span 2; max-width: 440px; }
        }
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            padding: 52px 24px 44px; gap: 32px;
          }
          .footer-contact-card { grid-column: span 2; max-width: 100%; }
          .footer-bottom-inner {
            padding: 20px 24px;
            flex-direction: column; align-items: flex-start; gap: 12px;
          }
          .footer-copy { text-align: left; }
        }
        @media (max-width: 540px) {
          .footer-main {
            grid-template-columns: 1fr;
            padding: 40px 20px 36px;
          }
          .footer-contact-card { grid-column: span 1; }
          .footer-bottom-inner { padding: 18px 20px; }
          .footer-col-title    { font-size: 15px; margin-bottom: 18px; }
          .footer-social-desc  { max-width: 100%; }
        }
      `}</style>

      <footer className="footer-wrap">

        {/* ════ MAIN GRID ════ */}
        <div className="footer-main">

          {/* Contact card */}
          <div className="footer-contact-card">
            {CONTACT_BLOCKS.map(({ labelKey, valueKey }) => (
              <div className="footer-contact-block" key={labelKey}>
                <span className="footer-contact-label">{t(labelKey)}</span>
                <span className="footer-contact-value">{t(valueKey)}</span>
              </div>
            ))}
          </div>

          {/* Our Company */}
          <FooterCol title={t("footer.company")}>
            <div className="footer-col-links">
              {COMPANY_LINKS.map(({ href, key }) => (
                <Link key={key} href={href}>{t(key)}</Link>
              ))}
            </div>
          </FooterCol>

          {/* Quick Links */}
          <FooterCol title={t("footer.quicklinks")}>
            <div className="footer-col-links">
              {QUICK_LINKS.map(({ href, key }) => (
                <Link key={key} href={href}>{t(key)}</Link>
              ))}
            </div>
          </FooterCol>

          {/* Social Media */}
          <FooterCol title={t("footer.social")}>
            <p className="footer-social-desc">{t("footer.social.desc")}</p>
            <div className="footer-social-grid">
              {SOCIAL_LINKS.map(({ href, key }) => (
                <a
                  key={key}
                  href={href}
                  className="footer-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(key)}
                </a>
              ))}
            </div>
          </FooterCol>

        </div>

        {/* ════ BOTTOM BAR ════ */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <Link href="/" className="footer-logo" aria-label="Creatv – home">
              <img src="/flage/logo.png" alt="Creatv" />
              <span className="footer-logo-divider" aria-hidden="true" />
              <span className="footer-logo-tagline">{t("footer.tagline")}</span>
            </Link>
            <p className="footer-copy">
              {t("footer.copy")} <strong>{t("footer.copy.by")}</strong>. {t("footer.copy.end")}
            </p>
          </div>
        </div>

      </footer>
    </>
  );
}
