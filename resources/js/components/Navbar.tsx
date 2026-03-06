import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [pagesOpen, setPagesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pagesMenuRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        /* ── Scroll state ── */
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });

        /* ── GSAP: only logo + CTA — NOT nav items to avoid opacity:0 stuck bug ── */
        const initGSAP = async () => {
            const gsap = (await import("gsap")).default;
            gsap.from(".nav-logo", {
                y: -24, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
            });
            gsap.from(".nav-cta", {
                scale: 0.85, opacity: 0, duration: 0.7, delay: 0.5,
                ease: "back.out(1.7)", clearProps: "all",
            });
        };
        initGSAP();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap');

                .site-header {
                    position: fixed;
                    top: 0; left: 0; right: 0;
                    z-index: 1000;
                    font-family: 'Barlow', sans-serif;
                    transition: background 0.4s ease, border-color 0.4s ease, padding 0.3s ease;
                }

                .site-header.is-transparent {
                    background: transparent;
                    border-bottom: 1px solid transparent;
                    padding: 30px 0;
                }

                .site-header.is-scrolled {
                    background: rgba(10, 8, 38, 0.88);
                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);
                    border-bottom: 1px solid rgba(124, 58, 237, 0.18);
                    padding: 14px 0;
                }

                .hd-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 60px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                }

                /* ── Logo ── */
                .hd-logo {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 800;
                    font-size: 26px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #fff;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 1px;
                    flex-shrink: 0;
                }
                .hd-logo .lb { color: #7c3aed; font-weight: 300; font-size: 30px; line-height: 1; }
                .hd-logo .ld {
                    width: 6px; height: 6px;
                    background: #7c3aed;
                    border-radius: 50%;
                    margin-left: 2px;
                    margin-bottom: 14px;
                    flex-shrink: 0;
                }

                /* ── Nav list ── */
                .hd-nav { display: flex; align-items: center; }

                .hd-list {
                    list-style: none;
                    margin: 0; padding: 0;
                    display: flex;
                    align-items: center;
                }

                .hd-sep {
                    list-style: none;
                    width: 3px; height: 3px;
                    background: rgba(255,255,255,0.18);
                    border-radius: 50%;
                    margin: 0 4px;
                    flex-shrink: 0;
                    display: list-item;
                }

                .hd-item {
                    position: relative;
                    list-style: none;
                }

                .hd-item > a,
                .hd-item > .hd-trigger {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 600;
                    font-size: 12.5px;
                    text-transform: uppercase;
                    letter-spacing: 1.8px;
                    color: rgba(255,255,255,0.75);
                    text-decoration: none;
                    padding: 8px 12px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    cursor: pointer;
                    transition: color 0.22s;
                    background: none;
                    border: none;
                    line-height: 1;
                    white-space: nowrap;
                    position: relative;
                }

                .hd-item > a::after,
                .hd-item > .hd-trigger::after {
                    content: '';
                    position: absolute;
                    bottom: 1px;
                    left: 12px; right: 12px;
                    height: 1px;
                    background: #7c3aed;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.22s ease;
                }

                .hd-item > a:hover,
                .hd-item > .hd-trigger:hover { color: #fff; }

                .hd-item > a:hover::after,
                .hd-item > .hd-trigger:hover::after { transform: scaleX(1); }

                /* ── Dropdown ── */
                .hd-dropdown {
                    position: absolute;
                    top: calc(100% + 10px);
                    left: 50%;
                    width: 156px;
                    opacity: 0;
                    pointer-events: none;
                    transform: translateX(-50%) translateY(-6px);
                    transition: opacity 0.2s ease, transform 0.2s ease;
                    z-index: 10;
                }
                .hd-dropdown.is-open {
                    opacity: 1;
                    pointer-events: all;
                    transform: translateX(-50%) translateY(0);
                }
                .hd-dropdown-inner {
                    background: #110e36;
                    border: 1px solid rgba(124, 58, 237, 0.22);
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 24px 56px rgba(0,0,0,0.55);
                }
                .hd-dropdown-inner a {
                    display: block;
                    padding: 11px 18px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 600;
                    font-size: 11.5px;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    transition: background 0.18s, color 0.18s, padding-left 0.18s;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .hd-dropdown-inner a:last-child { border-bottom: none; }
                .hd-dropdown-inner a:hover {
                    background: rgba(124, 58, 237, 0.14);
                    color: #fff;
                    padding-left: 24px;
                }
                .hd-dropdown-inner a::after { display: none !important; }

                /* chevron */
                .hd-chevron {
                    font-size: 9px;
                    opacity: 0.6;
                    transition: transform 0.2s, opacity 0.2s;
                    display: inline-block;
                }
                .hd-chevron.up { transform: rotate(180deg); opacity: 1; }

                /* ── Search ── */
                .hd-search {
                    width: 34px; height: 34px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: background 0.22s, border-color 0.22s, color 0.22s;
                    color: rgba(255,255,255,0.65);
                    flex-shrink: 0;
                    margin-left: 8px;
                }
                .hd-search:hover {
                    background: rgba(124, 58, 237, 0.22);
                    border-color: rgba(124, 58, 237, 0.5);
                    color: #fff;
                }

                /* ── CTA ── */
                .hd-cta {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #fff;
                    text-decoration: none;
                    padding: 11px 22px;
                    border-radius: 6px;
                    background: #7c3aed;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                    margin-left: 12px;
                    white-space: nowrap;
                    flex-shrink: 0;
                }
                .hd-cta::before {
                    content: '';
                    position: absolute; inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%);
                    opacity: 0;
                    transition: opacity 0.22s;
                }
                .hd-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,58,237,0.45); }
                .hd-cta:hover::before { opacity: 1; }
                .hd-cta:active { transform: translateY(0); }

                @media (max-width: 960px) {
                    .hd-inner { padding: 0 24px; gap: 12px; }
                    .hd-item > a, .hd-item > .hd-trigger { padding: 8px 8px; font-size: 11px; letter-spacing: 1.2px; }
                    .hd-cta { padding: 10px 16px; margin-left: 8px; }
                }
            `}</style>

            <header
                ref={headerRef}
                className={`site-header ${scrolled ? "is-scrolled" : "is-transparent"}`}
            >
                <div className="hd-inner">

                    {/* Logo */}
                    <Link href="/" className="hd-logo nav-logo">
                        <span className="lb">[</span>Creatv<span className="lb">]</span>
                        <span className="ld" />
                    </Link>

                    {/* Nav */}
                    <nav className="hd-nav">
                        <ul className="hd-list">

                            <li className="hd-item">
                                <Link href="/">Home</Link>
                            </li>

                            <li className="hd-sep" aria-hidden="true" />

                            <li className="hd-item">
                                <Link href="/about">About</Link>
                            </li>

                            <li className="hd-sep" aria-hidden="true" />

                            <li className="hd-item">
                                <Link href="/project">Project</Link>
                            </li>

                            <li className="hd-sep" aria-hidden="true" />

                            {/* Pages dropdown */}
                            <li
                                className="hd-item"
                                ref={pagesMenuRef}
                                onMouseEnter={() => setPagesOpen(true)}
                                onMouseLeave={() => setPagesOpen(false)}
                            >
                                <span className="hd-trigger">
                                    Pages
                                    <span className={`hd-chevron ${pagesOpen ? "up" : ""}`}>▾</span>
                                </span>
                                <div className={`hd-dropdown ${pagesOpen ? "is-open" : ""}`}>
                                    <div className="hd-dropdown-inner">
                                        <Link href="/team">Team</Link>
                                        <Link href="/pricing">Pricing</Link>
                                        <Link href="/faq">FAQ</Link>
                                    </div>
                                </div>
                            </li>

                            <li className="hd-sep" aria-hidden="true" />

                            <li className="hd-item">
                                <Link href="/contact">Contact</Link>
                            </li>

                        </ul>
                    </nav>

                    {/* Right actions */}
                    <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        <button className="hd-search" aria-label="Search">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        <Link href="/" className="hd-cta nav-cta">
                            Get Started
                        </Link>
                    </div>

                </div>
            </header>
        </>
    );
}
