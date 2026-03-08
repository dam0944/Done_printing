import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState, Fragment } from "react";
import type { FC } from "react";
import { useLang } from "@/contexts/LangContext";
import type { Lang } from "@/contexts/LangContext";

/* ════════════════════════════════════════
   TYPES
════════════════════════════════════════ */
interface NavItem {
  href:  string;
  label: string;
}

interface LangOption {
  code:  Lang;
  label: string;
  flag:  string;
}

/* ════════════════════════════════════════
   CONSTANTS
════════════════════════════════════════ */
const LANG_OPTIONS: LangOption[] = [
  { code: "en", label: "EN", flag: "/flage/en.png"  },
  { code: "km", label: "KH", flag: "/flage/cam.svg" },
];

/* ════════════════════════════════════════
   ICONS
════════════════════════════════════════ */
const SearchIcon: FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon: FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon: FC<{ open: boolean }> = ({ open }) => (
  <span className={`hd-chevron${open ? " up" : ""}`} aria-hidden="true">▾</span>
);

/* ════════════════════════════════════════
   FLAG BUTTON
════════════════════════════════════════ */
interface FlagBtnProps {
  option:  LangOption;
  active:  boolean;
  onClick: () => void;
  size?:   "sm" | "md";
}

const FlagBtn: FC<FlagBtnProps> = ({ option, active, onClick, size = "md" }) => {
  const sm = size === "sm";
  return (
    <button
      className={`lang-btn${active ? " active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Switch to ${option.label}`}
      style={{
        padding:  sm ? "6px 10px" : "7px 13px",
        minWidth: sm ? "50px"     : "56px",
        gap:      sm ? "5px"      : "6px",
      }}
    >
      <img
        src={option.flag}
        alt=""
        width={sm ? 16 : 18}
        height={sm ? 11 : 12}
        style={{ borderRadius: 2, objectFit: "cover", flexShrink: 0, display: "block" }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <span>{option.label}</span>
    </button>
  );
};

/* ════════════════════════════════════════
   LANG SWITCHER (shared desktop + mobile)
════════════════════════════════════════ */
interface LangSwitcherProps {
  lang:    Lang;
  setLang: (l: Lang) => void;
  size?:   "sm" | "md";
}

const LangSwitcher: FC<LangSwitcherProps> = ({ lang, setLang, size = "md" }) => (
  <div className="lang-switcher" role="group" aria-label="Language switcher">
    {LANG_OPTIONS.map((opt) => (
      <FlagBtn
        key={opt.code}
        option={opt}
        active={lang === opt.code}
        onClick={() => setLang(opt.code)}
        size={size}
      />
    ))}
  </div>
);

/* ════════════════════════════════════════
   HEADER
════════════════════════════════════════ */
export default function Header() {
  const headerRef      = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [pagesOpen,       setPagesOpen]       = useState<boolean>(false);
  const [scrolled,        setScrolled]        = useState<boolean>(false);
  const [searchOpen,      setSearchOpen]      = useState<boolean>(false);
  const [mobileOpen,      setMobileOpen]      = useState<boolean>(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState<boolean>(false);

  const { lang, setLang, t } = useLang();

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── body lock + search autofocus ── */
  useEffect(() => {
    document.body.style.overflow = searchOpen || mobileOpen ? "hidden" : "";
    if (searchOpen) {
      const id = setTimeout(() => searchInputRef.current?.focus(), 100);
      return () => clearTimeout(id);
    }
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen, mobileOpen]);

  /* ── Escape to close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") { setSearchOpen(false); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── nav data (inside component so t() works) ── */
  const NAV_LINKS: NavItem[] = [
    { href: "/",        label: t("nav.home")  },
    { href: "/about",   label: t("nav.about") },
    { href: "/project", label: t("nav.work")  },
  ];

  const NAV_PAGES: NavItem[] = [
    { href: "/pricing",     label: t("nav.pages.pricing")     },
    { href: "/team",        label: t("nav.pages.team")        },
    { href: "/blog",        label: t("nav.pages.blog")        },
    { href: "/single-blog", label: t("nav.pages.single-blog") },
    { href: "/note",        label: t("nav.pages.404")         },
  ];

  const closeMobile = (): void => setMobileOpen(false);

  return (
    <>
      <style>{STYLES}</style>

      {/* ════ SEARCH OVERLAY ════ */}
      <div
        className={`srch-overlay${searchOpen ? " is-open" : ""}`}
        role="dialog" aria-modal="true" aria-label="Search"
      >
        <div className="srch-backdrop" onClick={() => setSearchOpen(false)} />
        <div className="srch-modal">
          <p className="srch-label">Search</p>
          <div className="srch-wrap">
            <div className="srch-icon"><SearchIcon /></div>
            <input
              ref={searchInputRef}
              className="srch-input"
              type="search"
              placeholder="Search anything..."
              aria-label="Search"
            />
            <button className="srch-close" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <CloseIcon size={12} />
            </button>
          </div>
          <div className="srch-hints">
            <div className="srch-hints-l">
              <span className="sh-item"><kbd>↵</kbd> to search</span>
              <span className="sh-item"><kbd>Esc</kbd> to close</span>
            </div>
            <span className="srch-brand">Creatv Search</span>
          </div>
        </div>
      </div>

      {/* ════ MOBILE BACKDROP ════ */}
      <div
        className={`mob-backdrop${mobileOpen ? " is-open" : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ════ MOBILE DRAWER ════ */}
      <div
        className={`mob-drawer${mobileOpen ? " is-open" : ""}`}
        role="dialog" aria-modal="true" aria-label="Navigation menu"
      >
        <div className="mob-top">
          <LangSwitcher lang={lang} setLang={setLang} size="sm" />
          <button className="mob-close" onClick={closeMobile} aria-label="Close menu">
            <CloseIcon size={14} />
          </button>
        </div>

        <nav className="mob-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="mob-link" onClick={closeMobile}>
              {label}
              <span className="mob-arrow" aria-hidden="true">→</span>
            </Link>
          ))}

          <button
            className={`mob-pages-btn${mobilePagesOpen ? " active" : ""}`}
            onClick={() => setMobilePagesOpen((v) => !v)}
            aria-expanded={mobilePagesOpen}
          >
            {t("nav.pages")}
            <span className={`mp-chevron${mobilePagesOpen ? " up" : ""}`} aria-hidden="true">▾</span>
          </button>

          <div className={`mob-sub${mobilePagesOpen ? " is-open" : ""}`}>
            {NAV_PAGES.map(({ href, label }) => (
              <Link key={href} href={href} onClick={closeMobile}>{label}</Link>
            ))}
          </div>

          <Link href="/contact" className="mob-link" onClick={closeMobile}>
            {t("nav.contact")}
            <span className="mob-arrow" aria-hidden="true">→</span>
          </Link>
        </nav>

        <div className="mob-footer">
          <Link href="/contact" className="mob-cta" onClick={closeMobile}>
            {t("nav.cta")}
          </Link>
        </div>
      </div>

      {/* ════ HEADER ════ */}
      <header
        ref={headerRef}
        className={`site-header${scrolled ? " is-scrolled" : " is-transparent"}`}
      >
        <div className="hd-inner">

          {/* LOGO */}
          <Link href="/" className="hd-logo" aria-label="Creatv – home">
            <img src="/flage/logo.png" alt="Creatv" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hd-nav" aria-label="Main navigation">
            <ul className="hd-list">
              {NAV_LINKS.map(({ href, label }, i) => (
                <Fragment key={href}>
                  {i > 0 && <li className="hd-sep" aria-hidden="true" />}
                  <li className="hd-item">
                    <Link href={href}>{label}</Link>
                  </li>
                </Fragment>
              ))}

              <li className="hd-sep" aria-hidden="true" />

              {/* Pages dropdown */}
              <li
                className={`hd-item${pagesOpen ? " is-active" : ""}`}
                onMouseEnter={() => setPagesOpen(true)}
                onMouseLeave={() => setPagesOpen(false)}
              >
                <button
                  className="hd-trigger"
                  aria-haspopup="true"
                  aria-expanded={pagesOpen}
                >
                  {t("nav.pages")}
                  <ChevronIcon open={pagesOpen} />
                </button>
                <div className={`hd-dropdown${pagesOpen ? " is-open" : ""}`} role="menu">
                  <div className="hd-dropdown-inner">
                    {NAV_PAGES.map(({ href, label }) => (
                      <Link key={href} href={href} role="menuitem">{label}</Link>
                    ))}
                  </div>
                </div>
              </li>

              <li className="hd-sep" aria-hidden="true" />
              <li className="hd-item">
                <Link href="/contact">{t("nav.contact")}</Link>
              </li>
            </ul>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="hd-actions">
            <button
              className="hd-search-btn"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </button>

            <LangSwitcher lang={lang} setLang={setLang} size="md" />

            <Link href="/contact" className="hd-cta">{t("nav.cta")}</Link>

            <button
              className={`hd-hamburger${mobileOpen ? " is-open" : ""}`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>
    </>
  );
}

/* ════════════════════════════════════════
   STYLES
════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --f-body:      'Barlow', sans-serif;
    --f-display:   'Barlow Condensed', sans-serif;
    --f-nav-size:  14px;
    --f-cta-size:  13px;
    --f-sub-size:  13px;
    --f-mob-size:  18px;
    --f-mobc-size: 14px;
    --ls-nav:  2.5px; --ls-cta: 2.5px; --ls-sub: 2px;
    --ls-mob:  2px;   --ls-lang: 1.5px;
    --tt:      uppercase;
    --lh-nav:  1;
    --purple:  #7c3aed;
    --purple-h: #6d28d9;
  }
  :root[data-lang="km"] {
    --f-body:      'Noto Sans Khmer', sans-serif;
    --f-display:   'Noto Sans Khmer', sans-serif;
    --f-nav-size:  13px; --f-cta-size: 12px; --f-sub-size: 12px;
    --f-mob-size:  16px; --f-mobc-size: 13px;
    --ls-nav: 0px; --ls-cta: 0px; --ls-sub: 0px;
    --ls-mob: 0px; --ls-lang: 0px;
    --tt:     none;
    --lh-nav: 1.8;
  }

  /* ════ HEADER ════ */
  .site-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    font-family: var(--f-display);
    transition: background 0.4s, border-color 0.4s;
  }
  .site-header.is-transparent {
    background: transparent;
    border-bottom: 1px solid transparent;
  }
  .site-header.is-scrolled {
    background: rgba(8,6,30,0.96);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(124,58,237,0.18);
  }
  .hd-inner {
    max-width: 1400px; margin: 0 auto;
    padding: 0 48px; height: 72px;
    display: flex; align-items: center;
    justify-content: space-between; gap: 32px;
  }

  /* ── LOGO ── */
  .hd-logo {
    display: flex; align-items: center;
    text-decoration: none; flex-shrink: 0; z-index: 1001;
  }
  .hd-logo img {
    height: 40px; width: auto;
    object-fit: contain; display: block;
  }

  /* ── DESKTOP NAV ── */
  .hd-nav  { display: flex; align-items: center; flex: 1; justify-content: center; }
  .hd-list { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; }
  .hd-sep  { display: none; }
  .hd-item { position: relative; }
  .hd-item > a,
  .hd-item > .hd-trigger {
    font-family: var(--f-display);
    font-weight: 700; font-size: var(--f-nav-size);
    text-transform: var(--tt); letter-spacing: var(--ls-nav);
    color: rgba(255,255,255,0.7);
    text-decoration: none; padding: 8px 16px;
    display: flex; align-items: center; gap: 5px;
    cursor: pointer; transition: color 0.2s;
    background: none; border: none; line-height: var(--lh-nav);
    white-space: nowrap; position: relative;
  }
  .hd-item > a:hover,
  .hd-item > .hd-trigger:hover,
  .hd-item.is-active > a,
  .hd-item.is-active > .hd-trigger { color: #fff; }
  .hd-item > a::after,
  .hd-item > .hd-trigger::after {
    content: ''; position: absolute;
    bottom: 0; left: 16px; right: 16px;
    height: 2px; background: var(--purple); border-radius: 2px;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.22s ease;
  }
  .hd-item > a:hover::after,
  .hd-item > .hd-trigger:hover::after,
  .hd-item.is-active > a::after,
  .hd-item.is-active > .hd-trigger::after { transform: scaleX(1); }
  .hd-chevron {
    font-size: 9px; opacity: 0.6;
    transition: transform 0.22s; display: inline-block;
  }
  .hd-chevron.up { transform: rotate(180deg); opacity: 1; }

  /* ── DROPDOWN ── */
  .hd-dropdown {
    position: absolute; top: calc(100% + 10px); left: 50%;
    width: 210px; opacity: 0; pointer-events: none;
    transform: translateX(-50%) translateY(-6px);
    transition: opacity 0.2s, transform 0.2s; z-index: 100;
  }
  .hd-dropdown::before {
    content: ''; position: absolute; top: -5px; left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: rgba(124,58,237,0.25);
    border-top: none;
  }
  .hd-dropdown.is-open { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
  .hd-dropdown-inner {
    background: #100d35;
    border: 1px solid rgba(124,58,237,0.25);
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.7);
  }
  .hd-dropdown-inner a {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 22px;
    font-family: var(--f-display);
    font-weight: 700; font-size: var(--f-sub-size);
    text-transform: var(--tt); letter-spacing: var(--ls-sub);
    color: rgba(255,255,255,0.55); text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: background 0.18s, color 0.18s, padding-left 0.2s;
  }
  .hd-dropdown-inner a::before {
    content: ''; width: 3px; height: 3px;
    background: var(--purple); border-radius: 50%;
    flex-shrink: 0; opacity: 0; transition: opacity 0.18s;
  }
  .hd-dropdown-inner a::after { display: none !important; }
  .hd-dropdown-inner a:last-child { border-bottom: none; }
  .hd-dropdown-inner a:hover { background: rgba(124,58,237,0.1); color: #fff; padding-left: 28px; }
  .hd-dropdown-inner a:hover::before { opacity: 1; }

  /* ── RIGHT ACTIONS ── */
  .hd-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .hd-search-btn {
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,0.65); flex-shrink: 0;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .hd-search-btn:hover { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.5); color: #fff; }

  /* ── LANG SWITCHER ── */
  .lang-switcher {
    display: flex; align-items: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 9px; padding: 4px; gap: 3px; flex-shrink: 0;
  }
  .lang-btn {
    display: inline-flex; align-items: center;
    font-family: var(--f-display);
    font-weight: 700; font-size: 12px;
    text-transform: var(--tt); letter-spacing: var(--ls-lang);
    color: rgba(255,255,255,0.5);
    background: transparent; border: none;
    border-radius: 6px; cursor: pointer; line-height: 1;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .lang-btn.active { background: var(--purple); color: #fff; box-shadow: 0 2px 10px rgba(124,58,237,0.4); }
  .lang-btn:not(.active):hover { color: #fff; background: rgba(255,255,255,0.08); }

  /* ── CTA ── */
  .hd-cta {
    font-family: var(--f-display);
    font-weight: 800; font-size: var(--f-cta-size);
    text-transform: var(--tt); letter-spacing: var(--ls-cta);
    color: #fff; text-decoration: none;
    padding: 13px 28px; border-radius: 6px;
    background: var(--purple);
    white-space: nowrap; flex-shrink: 0; display: inline-block;
    transition: background 0.2s, transform 0.15s;
  }
  .hd-cta:hover { background: var(--purple-h); transform: translateY(-1px); }

  /* ════ HAMBURGER ════ */
  .hd-hamburger {
    display: none; flex-direction: column;
    justify-content: center; align-items: center; gap: 5px;
    width: 40px; height: 40px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; cursor: pointer;
    flex-shrink: 0; z-index: 1001;
    transition: background 0.2s, border-color 0.2s;
  }
  .hd-hamburger:hover { background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.4); }
  .hd-hamburger span {
    display: block; width: 20px; height: 2px;
    background: #fff; border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
    transform-origin: center;
  }
  .hd-hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hd-hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hd-hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ════ MOBILE DRAWER ════ */
  .mob-backdrop {
    position: fixed; inset: 0;
    background: rgba(6,4,26,0.7);
    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    z-index: 999; opacity: 0; pointer-events: none;
    transition: opacity 0.35s;
  }
  .mob-backdrop.is-open { opacity: 1; pointer-events: all; }
  .mob-drawer {
    position: fixed; top: 0; right: 0;
    width: min(340px, 100vw); height: 100dvh;
    background: #0b0928;
    border-left: 1px solid rgba(124,58,237,0.2);
    z-index: 1000; overflow-y: auto;
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .mob-drawer.is-open { transform: translateX(0); }
  .mob-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    min-height: 68px; flex-shrink: 0;
  }
  .mob-close {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,0.6);
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .mob-close:hover { background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.4); color: #fff; }
  .mob-nav  { padding: 6px 0; flex: 1; }
  .mob-link {
    font-family: var(--f-display);
    font-weight: 700; font-size: var(--f-mob-size);
    text-transform: var(--tt); letter-spacing: var(--ls-mob);
    color: rgba(255,255,255,0.72); text-decoration: none;
    padding: 15px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: space-between;
    transition: color 0.2s, background 0.2s, padding-left 0.2s;
  }
  .mob-link:hover { color: #fff; background: rgba(124,58,237,0.08); padding-left: 36px; }
  .mob-arrow { font-size: 14px; opacity: 0.3; transition: opacity 0.2s, transform 0.2s; }
  .mob-link:hover .mob-arrow { opacity: 0.8; transform: translateX(3px); }
  .mob-pages-btn {
    font-family: var(--f-display);
    font-weight: 700; font-size: var(--f-mob-size);
    text-transform: var(--tt); letter-spacing: var(--ls-mob);
    color: rgba(255,255,255,0.72);
    padding: 15px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; width: 100%; text-align: left;
    background: none; border-top: none; border-left: none; border-right: none;
    transition: color 0.2s, background 0.2s;
  }
  .mob-pages-btn:hover { color: #fff; background: rgba(124,58,237,0.08); }
  .mob-pages-btn.active { color: #a78bfa; }
  .mp-chevron { font-size: 12px; opacity: 0.45; transition: transform 0.25s, opacity 0.25s; display: inline-block; }
  .mp-chevron.up { transform: rotate(180deg); opacity: 1; color: #a78bfa; }
  .mob-sub {
    overflow: hidden; max-height: 0;
    transition: max-height 0.35s ease;
    background: rgba(124,58,237,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .mob-sub.is-open { max-height: 400px; }
  .mob-sub a {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--f-display);
    font-weight: 600; font-size: var(--f-sub-size);
    text-transform: var(--tt); letter-spacing: var(--ls-sub);
    color: rgba(255,255,255,0.45); text-decoration: none;
    padding: 12px 28px 12px 44px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: color 0.2s, background 0.2s, padding-left 0.2s;
  }
  .mob-sub a::before {
    content: ''; width: 3px; height: 3px;
    background: var(--purple); border-radius: 50%; flex-shrink: 0;
  }
  .mob-sub a:last-child { border-bottom: none; }
  .mob-sub a:hover { color: #fff; background: rgba(124,58,237,0.1); padding-left: 52px; }
  .mob-footer {
    padding: 20px 24px 32px;
    border-top: 1px solid rgba(255,255,255,0.06); flex-shrink: 0;
  }
  .mob-cta {
    display: block; width: 100%; text-align: center;
    font-family: var(--f-display);
    font-weight: 800; font-size: var(--f-mobc-size);
    text-transform: var(--tt); letter-spacing: var(--ls-cta);
    color: #fff; text-decoration: none;
    padding: 16px 24px; border-radius: 8px;
    background: var(--purple); transition: background 0.2s;
  }
  .mob-cta:hover { background: var(--purple-h); }

  /* ════ SEARCH OVERLAY ════ */
  .srch-overlay {
    position: fixed; inset: 0; z-index: 2000;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .srch-overlay.is-open { opacity: 1; pointer-events: all; }
  .srch-backdrop {
    position: absolute; inset: 0;
    background: rgba(6,4,26,0.85);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    cursor: pointer;
  }
  .srch-modal {
    position: relative; z-index: 1;
    width: 100%; max-width: 680px; margin: 0 24px;
    transform: translateY(-24px) scale(0.97);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s;
    opacity: 0;
  }
  .srch-overlay.is-open .srch-modal { transform: translateY(0) scale(1); opacity: 1; }
  .srch-label {
    font-family: var(--f-display);
    font-weight: 700; font-size: 11px;
    text-transform: uppercase; letter-spacing: 3px;
    color: rgba(255,255,255,0.3);
    margin-bottom: 14px; padding-left: 4px;
    display: flex; align-items: center; gap: 8px;
  }
  .srch-label::before { content: ''; width: 18px; height: 1.5px; background: var(--purple); }
  .srch-wrap {
    display: flex; align-items: center;
    background: rgba(16,13,53,0.98);
    border: 1.5px solid rgba(124,58,237,0.4);
    border-radius: 14px; overflow: hidden;
    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .srch-wrap:focus-within {
    border-color: rgba(124,58,237,0.8);
    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 4px rgba(124,58,237,0.14);
  }
  .srch-icon {
    padding: 0 20px; color: rgba(255,255,255,0.3);
    display: flex; align-items: center; flex-shrink: 0; transition: color 0.2s;
  }
  .srch-wrap:focus-within .srch-icon { color: #a78bfa; }
  .srch-input {
    flex: 1; background: transparent; border: none; outline: none;
    font-family: var(--f-body); font-size: 22px; font-weight: 500;
    color: #fff; padding: 22px 0; letter-spacing: 0.3px;
  }
  .srch-input::placeholder { color: rgba(255,255,255,0.2); font-weight: 400; }
  .srch-close {
    width: 40px; height: 40px; margin: 0 12px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(255,255,255,0.45);
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }
  .srch-close:hover { background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.5); color: #fff; transform: rotate(90deg); }
  .srch-hints {
    margin-top: 16px; display: flex; align-items: center;
    justify-content: space-between; padding: 0 4px;
  }
  .srch-hints-l { display: flex; align-items: center; gap: 14px; }
  .sh-item {
    display: flex; align-items: center; gap: 6px;
    font-family: var(--f-display); font-size: 11px;
    text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.2);
  }
  .sh-item kbd {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px; padding: 2px 8px;
    font-size: 11px; color: rgba(255,255,255,0.35); line-height: 1.6;
  }
  .srch-brand {
    font-family: var(--f-display); font-size: 11px;
    text-transform: uppercase; letter-spacing: 1.5px; color: rgba(124,58,237,0.6);
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 1100px) {
    .hd-inner { padding: 0 32px; gap: 20px; }
    .hd-item > a,
    .hd-item > .hd-trigger { font-size: 13px; padding: 8px 12px; letter-spacing: 2px; }
    .hd-cta { padding: 11px 20px; font-size: 12px; }
  }
  @media (max-width: 900px) {
    .hd-cta { display: none; }
  }
  @media (max-width: 768px) {
    .hd-inner      { padding: 0 20px; gap: 12px; height: 64px; }
    .hd-nav        { display: none; }
    .lang-switcher { display: none; }
    .hd-hamburger  { display: flex; }
    .srch-input    { font-size: 18px; padding: 18px 0; }
    .srch-icon     { padding: 0 14px; }
    .srch-brand    { display: none; }
  }
  @media (max-width: 480px) {
    .hd-inner      { padding: 0 16px; height: 60px; }
    .hd-logo img   { height: 32px; }
    .srch-modal    { margin: 0 14px; }
    .srch-input    { font-size: 16px; padding: 16px 0; }
    .mob-link,
    .mob-pages-btn { font-size: 16px; padding: 14px 22px; }
    .mob-link:hover { padding-left: 30px; }
  }
`;