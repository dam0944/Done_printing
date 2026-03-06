import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { useLang } from '@/contexts/LangContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang, setLang, t } = useLang();
    const isKm = lang === 'km';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        // Run once on mount to set correct initial state
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/about', label: t('nav.about') },
        { href: '/work', label: t('nav.work') },
        { href: '/new', label: t('nav.new') },
        { href: '/contact', label: t('nav.contact') },
    ];

    // Switch font + styling when Khmer is active
    const ff = isKm ? "'Hanuman', sans-serif" : "'Rajdhani', sans-serif";
    const ls = isKm ? '0.5px' : '2.5px';
    const tt = isKm ? 'none' : 'uppercase';

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&family=Hanuman:wght@400;700;900&display=swap');

                :root {
                    --magenta: #E91E8C;
                    --cyan: #00B4D8;
                    --yellow: #FFD600;
                    --black: #0A0A0A;
                    --silver: #C0C0C0;
                    --silver-light: #E8E8E8;
                    --silver-dark: #888888;
                }

                /* ── Base nav ── */
                .done-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    font-family: ${ff};
                    transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                                backdrop-filter 0.4s ease,
                                border-color 0.4s ease,
                                box-shadow 0.4s ease;
                    background: ${
                        scrolled
                            ? 'rgba(8, 8, 8, 0.97)'
                            : 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, transparent 100%)'
                    };
                    backdrop-filter: ${scrolled ? 'blur(20px) saturate(180%)' : 'none'};
                    border-bottom: 1px solid ${scrolled ? 'rgba(192,192,192,0.15)' : 'transparent'};
                    box-shadow: ${scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none'};
                }

                /* CMYK top accent line — only visible when scrolled */
                .done-nav::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, var(--cyan) 0%, var(--magenta) 50%, var(--yellow) 100%);
                    opacity: ${scrolled ? 1 : 0};
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                }

                .nav-inner {
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 0 32px;
                    height: 72px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                /* ── Logo ── */
                .nav-logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    flex-shrink: 0;
                }

                .logo-img {
                    height: 78px;
                    width: auto;
                    display: block;
                    filter: drop-shadow(0 0 8px rgba(233, 30, 140, 0.3));
                    transition: filter 0.3s ease, transform 0.3s ease;
                }

                .nav-logo:hover .logo-img {
                    filter: drop-shadow(0 0 14px rgba(233, 30, 140, 0.65))
                            drop-shadow(0 0 28px rgba(0, 180, 216, 0.35));
                    transform: scale(1.04);
                }

                /* ── Desktop link list ── */
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                /* ── Individual nav link ── */
                .nav-link {
                    position: relative;
                    text-decoration: none;
                    color: var(--silver);
                    font-family: ${ff};
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: ${ls};
                    text-transform: ${tt};
                    padding: 8px 18px;
                    transition: color 0.25s ease;
                }

                /* Underline bar */
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, var(--cyan), var(--magenta));
                    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .nav-link:hover {
                    color: var(--silver-light);
                }
                .nav-link:hover::after {
                    width: calc(100% - 36px);
                }

                /* Per-link accent colours */
                .nav-links li:nth-child(2) .nav-link::after { background: var(--cyan); }
                .nav-links li:nth-child(3) .nav-link::after { background: var(--magenta); }
                .nav-links li:nth-child(4) .nav-link::after { background: var(--yellow); }

                /* Active state */
                .nav-link.active {
                    color: white;
                }
                .nav-link.active::after {
                    width: calc(100% - 36px);
                    background: linear-gradient(90deg, var(--magenta), var(--yellow));
                }

                /* ── CTA Button ── */
                .nav-cta {
                    position: relative;
                    display: inline-block;
                    text-decoration: none;
                    font-family: ${ff};
                    font-weight: 700;
                    font-size: 14px;
                    letter-spacing: ${ls};
                    text-transform: ${tt};
                    padding: 10px 28px;
                    color: #000;
                    background: linear-gradient(135deg, var(--cyan) 0%, var(--magenta) 100%);
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    margin-left: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                }

                /* Hover overlay */
                .nav-cta::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, var(--magenta) 0%, var(--yellow) 100%);
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .nav-cta-label {
                    position: relative;
                    z-index: 1;
                }

                .nav-cta:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 24px rgba(233, 30, 140, 0.5);
                }
                .nav-cta:hover::after {
                    opacity: 1;
                }

                /* ── Divider ── */
                .nav-divider {
                    width: 1px;
                    height: 20px;
                    background: linear-gradient(180deg, transparent, rgba(192,192,192,0.3), transparent);
                    margin: 0 8px;
                    flex-shrink: 0;
                }

                /* ── Language Toggle ── */
                .lang-toggle {
                    display: flex;
                    align-items: center;
                    border: 1px solid rgba(255,255,255,0.12);
                    clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
                    overflow: hidden;
                    margin-left: 14px;
                    flex-shrink: 0;
                }
                .lang-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 13px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: 'Rajdhani', sans-serif;
                    font-weight: 700;
                    font-size: 12px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    transition: background 0.25s, color 0.25s;
                    white-space: nowrap;
                    line-height: 1;
                }
                .lang-btn .flag { font-size: 14px; }
                .lang-btn.active {
                    background: linear-gradient(135deg, var(--cyan), var(--magenta));
                    color: #000;
                }
                .lang-btn:not(.active) { color: #555; }
                .lang-btn:not(.active):hover {
                    background: rgba(255,255,255,0.06);
                    color: var(--silver);
                }
                .lang-sep {
                    width: 1px;
                    background: rgba(255,255,255,0.08);
                    align-self: stretch;
                }

                /* ── Hamburger ── */
                .nav-hamburger {
                    display: none;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    cursor: pointer;
                    padding: 6px;
                    background: none;
                    border: none;
                    outline: none;
                }

                .ham-line {
                    display: block;
                    width: 28px;
                    height: 2px;
                    background: var(--silver);
                    transition: transform 0.3s ease, opacity 0.3s ease, background 0.3s ease;
                    transform-origin: center;
                }

                .nav-hamburger.open .ham-line:nth-child(1) {
                    transform: translateY(7px) rotate(45deg);
                    background: var(--magenta);
                }
                .nav-hamburger.open .ham-line:nth-child(2) {
                    opacity: 0;
                    transform: scaleX(0);
                }
                .nav-hamburger.open .ham-line:nth-child(3) {
                    transform: translateY(-7px) rotate(-45deg);
                    background: var(--cyan);
                }

                /* ── Mobile Menu ── */
                .mobile-menu {
                    position: fixed;
                    top: 72px;
                    left: 0;
                    right: 0;
                    z-index: 999;
                    background: rgba(8, 8, 8, 0.97);
                    backdrop-filter: blur(20px) saturate(180%);
                    border-bottom: 1px solid rgba(192,192,192,0.1);
                    padding: 16px 32px 30px;
                    transform: translateY(-10px);
                    opacity: 0;
                    pointer-events: none;
                    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                                opacity 0.35s ease;
                    display: none;
                }

                .mobile-menu.open {
                    transform: translateY(0);
                    opacity: 1;
                    pointer-events: all;
                }

                /* Language row inside mobile menu */
                .mob-lang-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 0 16px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    margin-bottom: 4px;
                }
                .mob-lang-btn {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 7px 16px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: none;
                    cursor: pointer;
                    font-family: 'Rajdhani', sans-serif;
                    font-weight: 700;
                    font-size: 12px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    transition: all 0.25s;
                    clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
                }
                .mob-lang-btn .flag { font-size: 15px; }
                .mob-lang-btn.active {
                    background: linear-gradient(135deg, var(--cyan), var(--magenta));
                    color: #000;
                    border-color: transparent;
                }
                .mob-lang-btn:not(.active) { color: #555; }

                .mobile-link {
                    display: block;
                    text-decoration: none;
                    color: var(--silver);
                    font-family: ${ff};
                    font-weight: 700;
                    font-size: ${isKm ? '20px' : '22px'};
                    letter-spacing: ${isKm ? '0.5px' : '3px'};
                    text-transform: ${tt};
                    padding: 13px 0;
                    border-bottom: 1px solid rgba(192,192,192,0.08);
                    transition: color 0.2s ease, padding-left 0.25s ease;
                }
                .mobile-link:hover {
                    color: white;
                    padding-left: 10px;
                }

                .mobile-cta {
                    display: block;
                    text-decoration: none;
                    font-family: ${ff};
                    font-weight: 700;
                    font-size: 16px;
                    letter-spacing: ${isKm ? '0.5px' : '3px'};
                    text-transform: ${tt};
                    text-align: center;
                    padding: 15px;
                    color: #000;
                    background: linear-gradient(135deg, var(--cyan), var(--magenta));
                    margin-top: 22px;
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                    transition: filter 0.3s ease;
                }
                .mobile-cta:hover {
                    filter: brightness(1.1);
                }

                /* ── Responsive ── */
                @media (max-width: 768px) {
                    .nav-links,
                    .nav-cta,
                    .nav-divider,
                    .lang-toggle {
                        display: none !important;
                    }

                    .nav-hamburger {
                        display: flex;
                    }

                    .mobile-menu {
                        display: block;
                    }
                }

                @media (max-width: 480px) {
                    .nav-inner {
                        padding: 0 20px;
                    }
                    .logo-img {
                        height: 60px;
                    }
                }
            `}</style>

            <nav
                className="done-nav"
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="nav-inner">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="nav-logo"
                        aria-label="Done Printing House – Home"
                    >
                        <img
                            src={logo}
                            alt="Done Printing House & Advertising"
                            className="logo-img"
                        />
                    </Link>

                    {/* Desktop Links */}
                    <ul className="nav-links" role="list">
                        <li>
                            <Link href="/" className="nav-link active">
                                {t('nav.home')}
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="nav-link">
                                {t('nav.about')}
                            </Link>
                        </li>

                        <li className="nav-divider" aria-hidden="true" />

                        <li>
                            <Link href="/work" className="nav-link">
                                {t('nav.work')}
                            </Link>
                        </li>
                        <li>
                            <Link href="/new" className="nav-link">
                                {t('nav.new')}
                            </Link>
                        </li>

                        <li className="nav-divider" aria-hidden="true" />

                        <li>
                            <Link href="/contact" className="nav-cta">
                                <span className="nav-cta-label">
                                    {t('nav.contact')}
                                </span>
                            </Link>
                        </li>
                    </ul>

                    {/* Right side: language toggle + hamburger */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        {/* Language toggle — desktop only (hidden on mobile via CSS) */}
                        <div
                            className="lang-toggle"
                            role="group"
                            aria-label="Select language"
                        >
                            <button
                                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                                onClick={() => setLang('en')}
                                aria-pressed={lang === 'en'}
                                aria-label="Switch to English"
                            >
                                <span className="flag">🇬🇧</span>
                                <span>EN</span>
                            </button>
                            <div className="lang-sep" aria-hidden="true" />
                            <button
                                className={`lang-btn ${lang === 'km' ? 'active' : ''}`}
                                onClick={() => setLang('km')}
                                aria-pressed={lang === 'km'}
                                aria-label="ប្ដូរទៅភាសាខ្មែរ"
                            >
                                <span className="flag">🇰🇭</span>
                                <span>KH</span>
                            </button>
                        </div>

                        {/* Hamburger */}
                        <button
                            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                        >
                            <span className="ham-line" />
                            <span className="ham-line" />
                            <span className="ham-line" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`mobile-menu ${menuOpen ? 'open' : ''}`}
                aria-hidden={!menuOpen}
            >
                {/* Language switcher inside mobile menu */}
                <div className="mob-lang-row">
                    <button
                        className={`mob-lang-btn ${lang === 'en' ? 'active' : ''}`}
                        onClick={() => setLang('en')}
                    >
                        <span className="flag">🇬🇧</span> EN
                    </button>
                    <button
                        className={`mob-lang-btn ${lang === 'km' ? 'active' : ''}`}
                        onClick={() => setLang('km')}
                    >
                        <span className="flag">🇰🇭</span> ខ្មែរ
                    </button>
                </div>

                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link
                    href="/contact"
                    className="mobile-cta"
                    onClick={() => setMenuOpen(false)}
                >
                    {t('nav.contact')}
                </Link>
            </div>
        </>
    );
}
