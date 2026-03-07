import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [pagesOpen, setPagesOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });

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

    useEffect(() => {
        if (searchOpen || mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
        return () => { document.body.style.overflow = ""; };
    }, [searchOpen, mobileOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") { setSearchOpen(false); setMobileOpen(false); }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const NAV_PAGES = [
        { href: "/pricing", label: "Pricing" },
        { href: "/team", label: "Team" },
        { href: "/blog", label: "Blog" },
        { href:"/single-blog", label: "Single Blog" },
        { href: "/note", label: "404 Page" },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap');
                *, *::before, *::after { box-sizing: border-box; }

                /* ══ HEADER ══ */
                .site-header {
                    position: fixed; top: 0; left: 0; right: 0;
                    z-index: 1000;
                    font-family: 'Barlow', sans-serif;
                    transition: background 0.4s ease, border-color 0.4s ease, padding 0.3s ease;
                }
                .site-header.is-transparent {
                    background: transparent;
                    border-bottom: 1px solid transparent;
                    padding: 26px 0;
                }
                .site-header.is-scrolled {
                    background: rgba(10,8,38,0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(124,58,237,0.2);
                    padding: 16px 0;
                }

                .hd-inner {
                    max-width: 1280px; margin: 0 auto;
                    padding: 0 60px;
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 24px;
                }

                /* ── Logo ── */
                .hd-logo {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 800; font-size: 28px;
                    text-transform: uppercase; letter-spacing: 1px;
                    color: #fff; text-decoration: none;
                    display: flex; align-items: center; gap: 1px;
                    flex-shrink: 0; z-index: 1001;
                }
                .hd-logo .lb { color: #7c3aed; font-weight: 300; font-size: 32px; line-height: 1; }
                .hd-logo .ld {
                    width: 6px; height: 6px; background: #7c3aed;
                    border-radius: 50%; margin-left: 3px; margin-bottom: 16px; flex-shrink: 0;
                }

                /* ── Desktop Nav ── */
                .hd-nav { display: flex; align-items: center; }
                .hd-list {
                    list-style: none; margin: 0; padding: 0;
                    display: flex; align-items: center; gap: 2px;
                }
                .hd-sep {
                    list-style: none; width: 3px; height: 3px;
                    background: rgba(255,255,255,0.15); border-radius: 50%;
                    margin: 0 6px; flex-shrink: 0;
                }
                .hd-item { position: relative; list-style: none; }
                .hd-item > a, .hd-item > .hd-trigger {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 15px;
                    text-transform: uppercase; letter-spacing: 2px;
                    color: rgba(255,255,255,0.72); text-decoration: none;
                    padding: 9px 14px;
                    display: flex; align-items: center; gap: 5px;
                    cursor: pointer; transition: color 0.22s;
                    background: none; border: none; line-height: 1;
                    white-space: nowrap; position: relative;
                }
                .hd-item > a::after, .hd-item > .hd-trigger::after {
                    content: ''; position: absolute;
                    bottom: 2px; left: 14px; right: 14px;
                    height: 1.5px; background: #7c3aed;
                    transform: scaleX(0); transform-origin: left;
                    transition: transform 0.22s ease;
                }
                .hd-item > a:hover, .hd-item > .hd-trigger:hover { color: #fff; }
                .hd-item > a:hover::after, .hd-item > .hd-trigger:hover::after { transform: scaleX(1); }

                /* ── Dropdown ── */
                .hd-dropdown {
                    position: absolute; top: calc(100% + 14px); left: 50%; width: 200px;
                    opacity: 0; pointer-events: none;
                    transform: translateX(-50%) translateY(-8px);
                    transition: opacity 0.22s ease, transform 0.22s ease; z-index: 10;
                }
                .hd-dropdown::before {
                    content: ''; position: absolute; top: -6px; left: 50%;
                    transform: translateX(-50%);
                    border-left: 7px solid transparent; border-right: 7px solid transparent;
                    border-bottom: 7px solid rgba(124,58,237,0.3);
                }
                .hd-dropdown.is-open { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
                .hd-dropdown-inner {
                    background: #110e36; border: 1px solid rgba(124,58,237,0.28);
                    border-radius: 12px; overflow: hidden;
                    box-shadow: 0 28px 60px rgba(0,0,0,0.6);
                }
                .hd-dropdown-inner a {
                    display: flex; align-items: center; gap: 10px;
                    padding: 13px 20px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 14px;
                    text-transform: uppercase; letter-spacing: 1.8px;
                    color: rgba(255,255,255,0.58); text-decoration: none;
                    transition: background 0.18s, color 0.18s, padding-left 0.2s;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .hd-dropdown-inner a::before {
                    content: ''; width: 3px; height: 3px; background: #7c3aed;
                    border-radius: 50%; flex-shrink: 0; opacity: 0; transition: opacity 0.18s;
                }
                .hd-dropdown-inner a:last-child { border-bottom: none; }
                .hd-dropdown-inner a:hover { background: rgba(124,58,237,0.12); color: #fff; padding-left: 26px; }
                .hd-dropdown-inner a:hover::before { opacity: 1; }
                .hd-dropdown-inner a::after { display: none !important; }

                .hd-chevron {
                    font-size: 10px; opacity: 0.55;
                    transition: transform 0.22s, opacity 0.22s;
                    display: inline-block; margin-top: 1px;
                }
                .hd-chevron.up { transform: rotate(180deg); opacity: 1; color: #a78bfa; }

                /* ── Right actions ── */
                .hd-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
                .hd-search-btn {
                    width: 38px; height: 38px; border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: rgba(255,255,255,0.65); flex-shrink: 0;
                    transition: background 0.22s, border-color 0.22s, color 0.22s;
                }
                .hd-search-btn:hover {
                    background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.55); color: #fff;
                }
                .hd-cta {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 13px;
                    text-transform: uppercase; letter-spacing: 2.5px;
                    color: #fff; text-decoration: none;
                    padding: 12px 24px; border-radius: 6px; background: #7c3aed;
                    position: relative; overflow: hidden;
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                    white-space: nowrap; flex-shrink: 0;
                }
                .hd-cta::before {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%);
                    opacity: 0; transition: opacity 0.22s;
                }
                .hd-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(124,58,237,0.5); }
                .hd-cta:hover::before { opacity: 1; }

                /* ══ HAMBURGER ══ */
                .hd-hamburger {
                    display: none;
                    flex-direction: column; justify-content: center;
                    align-items: center; gap: 5px;
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
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    transform-origin: center;
                }
                .hd-hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
                .hd-hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
                .hd-hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

                /* ══ MOBILE DRAWER ══ */
                .mobile-drawer-backdrop {
                    position: fixed; inset: 0;
                    background: rgba(6,4,26,0.7);
                    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
                    z-index: 999; opacity: 0; pointer-events: none;
                    transition: opacity 0.35s ease;
                }
                .mobile-drawer-backdrop.is-open { opacity: 1; pointer-events: all; }

                .mobile-drawer {
                    position: fixed; top: 0; right: 0;
                    width: 100%; max-width: 340px; height: 100vh;
                    background: #0b0928;
                    border-left: 1px solid rgba(124,58,237,0.2);
                    z-index: 1000;
                    transform: translateX(100%);
                    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
                    overflow-y: auto;
                    display: flex; flex-direction: column;
                }
                .mobile-drawer.is-open { transform: translateX(0); }

                /* ── Drawer header: just a close button, no logo ── */
                .mobile-drawer-top {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding: 20px 20px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    min-height: 72px;
                }
                .mobile-drawer-close {
                    width: 36px; height: 36px; border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: rgba(255,255,255,0.6);
                    transition: background 0.2s, color 0.2s, border-color 0.2s;
                }
                .mobile-drawer-close:hover {
                    background: rgba(124,58,237,0.25);
                    border-color: rgba(124,58,237,0.4); color: #fff;
                }

                .mobile-nav { padding: 8px 0; flex: 1; }
                .mobile-nav-item {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 18px;
                    text-transform: uppercase; letter-spacing: 2px;
                    color: rgba(255,255,255,0.72); text-decoration: none;
                    padding: 16px 28px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex; align-items: center; justify-content: space-between;
                    transition: color 0.2s, background 0.2s, padding-left 0.2s;
                }
                .mobile-nav-item:hover { color: #fff; background: rgba(124,58,237,0.08); padding-left: 36px; }
                .mobile-nav-arrow { font-size: 14px; opacity: 0.3; transition: opacity 0.2s, transform 0.2s; }
                .mobile-nav-item:hover .mobile-nav-arrow { opacity: 0.8; transform: translateX(3px); }

                /* Pages accordion */
                .mobile-pages-trigger {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 18px;
                    text-transform: uppercase; letter-spacing: 2px;
                    color: rgba(255,255,255,0.72);
                    padding: 16px 28px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    display: flex; align-items: center; justify-content: space-between;
                    cursor: pointer; width: 100%; text-align: left;
                    background: none; border-left: none; border-right: none; border-top: none;
                    transition: color 0.2s, background 0.2s;
                }
                .mobile-pages-trigger:hover { color: #fff; background: rgba(124,58,237,0.08); }
                .mobile-pages-trigger.active { color: #a78bfa; }
                .mp-chevron {
                    font-size: 12px; opacity: 0.45;
                    transition: transform 0.25s, opacity 0.25s; display: inline-block;
                }
                .mp-chevron.up { transform: rotate(180deg); opacity: 1; color: #a78bfa; }

                .mobile-pages-sub {
                    overflow: hidden; max-height: 0;
                    transition: max-height 0.35s ease;
                    background: rgba(124,58,237,0.04);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .mobile-pages-sub.is-open { max-height: 400px; }
                .mobile-pages-sub a {
                    display: flex; align-items: center; gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 600; font-size: 15px;
                    text-transform: uppercase; letter-spacing: 1.5px;
                    color: rgba(255,255,255,0.45); text-decoration: none;
                    padding: 12px 28px 12px 44px;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    transition: color 0.2s, background 0.2s, padding-left 0.2s;
                }
                .mobile-pages-sub a::before {
                    content: ''; width: 3px; height: 3px; background: #7c3aed;
                    border-radius: 50%; flex-shrink: 0;
                }
                .mobile-pages-sub a:last-child { border-bottom: none; }
                .mobile-pages-sub a:hover { color: #fff; background: rgba(124,58,237,0.1); padding-left: 52px; }

                .mobile-drawer-footer {
                    padding: 20px 24px 32px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                }
                .mobile-cta {
                    display: block; width: 100%; text-align: center;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 14px;
                    text-transform: uppercase; letter-spacing: 2.5px;
                    color: #fff; text-decoration: none;
                    padding: 16px 24px; border-radius: 8px; background: #7c3aed;
                    transition: background 0.2s, transform 0.2s;
                }
                .mobile-cta:hover { background: #6d28d9; transform: translateY(-1px); }

                /* ══ SEARCH OVERLAY ══ */
                .search-overlay {
                    position: fixed; inset: 0; z-index: 2000;
                    display: flex; align-items: center; justify-content: center;
                    opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
                }
                .search-overlay.is-open { opacity: 1; pointer-events: all; }
                .search-backdrop {
                    position: absolute; inset: 0;
                    background: rgba(6,4,26,0.8);
                    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                    cursor: pointer;
                }
                .search-modal {
                    position: relative; z-index: 1;
                    width: 100%; max-width: 700px; margin: 0 24px;
                    transform: translateY(-28px) scale(0.96);
                    transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease;
                    opacity: 0;
                }
                .search-overlay.is-open .search-modal { transform: translateY(0) scale(1); opacity: 1; }
                .search-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px;
                    text-transform: uppercase; letter-spacing: 3px;
                    color: rgba(255,255,255,0.3); margin-bottom: 14px; padding-left: 4px;
                    display: flex; align-items: center; gap: 8px;
                }
                .search-label::before { content: ''; width: 18px; height: 1.5px; background: #7c3aed; flex-shrink: 0; }
                .search-input-wrap {
                    display: flex; align-items: center;
                    background: rgba(17,14,54,0.98);
                    border: 1.5px solid rgba(124,58,237,0.4); border-radius: 14px; overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(124,58,237,0.08) inset;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .search-input-wrap:focus-within {
                    border-color: rgba(124,58,237,0.8);
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 4px rgba(124,58,237,0.14);
                }
                .search-icon-wrap {
                    padding: 0 20px; color: rgba(255,255,255,0.3); flex-shrink: 0;
                    display: flex; align-items: center; transition: color 0.2s;
                }
                .search-input-wrap:focus-within .search-icon-wrap { color: #a78bfa; }
                .search-main-input {
                    flex: 1; background: transparent; border: none; outline: none;
                    font-family: 'Barlow', sans-serif; font-size: 22px; font-weight: 500;
                    color: #fff; padding: 22px 0; letter-spacing: 0.3px;
                }
                .search-main-input::placeholder { color: rgba(255,255,255,0.2); font-weight: 400; }
                .search-close-btn {
                    width: 42px; height: 42px; margin: 0 12px; border-radius: 50%;
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: rgba(255,255,255,0.45); flex-shrink: 0;
                    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
                }
                .search-close-btn:hover {
                    background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.5);
                    color: #fff; transform: rotate(90deg);
                }
                .search-hints {
                    margin-top: 18px; display: flex; align-items: center;
                    justify-content: space-between; padding: 0 4px;
                }
                .search-hints-left { display: flex; align-items: center; gap: 16px; }
                .sh-item {
                    display: flex; align-items: center; gap: 6px;
                    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
                    text-transform: uppercase; letter-spacing: 1.2px; color: rgba(255,255,255,0.2);
                }
                .sh-item kbd {
                    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 4px; padding: 2px 8px; font-family: 'Barlow', sans-serif;
                    font-size: 11px; color: rgba(255,255,255,0.35); line-height: 1.6;
                }
                .search-hints-right {
                    font-family: 'Barlow Condensed', sans-serif; font-size: 11px;
                    text-transform: uppercase; letter-spacing: 1.5px; color: rgba(124,58,237,0.6);
                }

                /* ══ RESPONSIVE ══ */
                @media (max-width: 1024px) {
                    .hd-inner { padding: 0 32px; gap: 16px; }
                    .hd-item > a, .hd-item > .hd-trigger { font-size: 13px; padding: 8px 10px; letter-spacing: 1.5px; }
                    .hd-cta { padding: 11px 18px; font-size: 12px; letter-spacing: 2px; }
                    .hd-sep { margin: 0 4px; }
                }

                @media (max-width: 768px) {
                    .hd-inner { padding: 0 20px; gap: 12px; }
                    .hd-nav { display: none; }
                    .hd-cta { display: none; }
                    .hd-hamburger { display: flex; }
                    .search-main-input { font-size: 18px; padding: 18px 0; }
                    .search-icon-wrap { padding: 0 14px; }
                    .search-hints-right { display: none; }
                }

                @media (max-width: 480px) {
                    .hd-logo { font-size: 22px; }
                    .hd-logo .lb { font-size: 26px; }
                    .hd-search-btn { width: 34px; height: 34px; }
                    .hd-hamburger { width: 36px; height: 36px; }
                    .search-modal { margin: 0 16px; }
                    .search-main-input { font-size: 16px; }
                    .sh-item { font-size: 10px; }
                    .mobile-drawer { max-width: 100%; }
                }
            `}</style>

            {/* ══ SEARCH OVERLAY ══ */}
            <div className={`search-overlay ${searchOpen ? "is-open" : ""}`}>
                <div className="search-backdrop" onClick={() => setSearchOpen(false)} />
                <div className="search-modal">
                    <div className="search-label">Search</div>
                    <div className="search-input-wrap">
                        <div className="search-icon-wrap">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <input ref={searchInputRef} className="search-main-input" type="text" placeholder="Search anything..." />
                        <button className="search-close-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <div className="search-hints">
                        <div className="search-hints-left">
                            <span className="sh-item"><kbd>↵</kbd> to search</span>
                            <span className="sh-item"><kbd>Esc</kbd> to close</span>
                        </div>
                        <span className="search-hints-right">Creatv Search</span>
                    </div>
                </div>
            </div>

            {/* ══ MOBILE DRAWER BACKDROP ══ */}
            <div className={`mobile-drawer-backdrop ${mobileOpen ? "is-open" : ""}`} onClick={() => setMobileOpen(false)} />

            {/* ══ MOBILE DRAWER — no logo inside ══ */}
            <div className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`}>
                {/* Just a close button, no logo */}
                <div className="mobile-drawer-top">
                    <button className="mobile-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <nav className="mobile-nav">
                    {[
                        { href: "/", label: "Home" },
                        { href: "/about", label: "About" },
                        { href: "/project", label: "Project" },
                    ].map(({ href, label }) => (
                        <Link key={href} href={href} className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
                            {label}
                            <span className="mobile-nav-arrow">→</span>
                        </Link>
                    ))}

                    <button
                        className={`mobile-pages-trigger ${mobilePagesOpen ? "active" : ""}`}
                        onClick={() => setMobilePagesOpen(v => !v)}
                    >
                        Pages
                        <span className={`mp-chevron ${mobilePagesOpen ? "up" : ""}`}>▾</span>
                    </button>
                    <div className={`mobile-pages-sub ${mobilePagesOpen ? "is-open" : ""}`}>
                        {NAV_PAGES.map(({ href, label }) => (
                            <Link key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</Link>
                        ))}
                    </div>

                    <Link href="/contact" className="mobile-nav-item" onClick={() => setMobileOpen(false)}>
                        Contact
                        <span className="mobile-nav-arrow">→</span>
                    </Link>
                </nav>

                <div className="mobile-drawer-footer">
                    <Link href="/contact" className="mobile-cta" onClick={() => setMobileOpen(false)}>
                        Get Started
                    </Link>
                </div>
            </div>

            {/* ══ HEADER ══ */}
            <header ref={headerRef} className={`site-header ${scrolled ? "is-scrolled" : "is-transparent"}`}>
                <div className="hd-inner">

                    <Link href="/" className="hd-logo nav-logo">
                        <span className="lb">[</span>Creatv<span className="lb">]</span>
                        <span className="ld" />
                    </Link>

                    <nav className="hd-nav">
                        <ul className="hd-list">
                            <li className="hd-item"><Link href="/">Home</Link></li>
                            <li className="hd-sep" aria-hidden="true" />
                            <li className="hd-item"><Link href="/about">About</Link></li>
                            <li className="hd-sep" aria-hidden="true" />
                            <li className="hd-item"><Link href="/project">Project</Link></li>
                            <li className="hd-sep" aria-hidden="true" />
                            <li
                                className="hd-item"
                                onMouseEnter={() => setPagesOpen(true)}
                                onMouseLeave={() => setPagesOpen(false)}
                            >
                                <span className="hd-trigger">
                                    Pages
                                    <span className={`hd-chevron ${pagesOpen ? "up" : ""}`}>▾</span>
                                </span>
                                <div className={`hd-dropdown ${pagesOpen ? "is-open" : ""}`}>
                                    <div className="hd-dropdown-inner">
                                        {NAV_PAGES.map(({ href, label }) => (
                                            <Link key={href} href={href}>{label}</Link>
                                        ))}
                                    </div>
                                </div>
                            </li>
                            <li className="hd-sep" aria-hidden="true" />
                            <li className="hd-item"><Link href="/contact">Contact</Link></li>
                        </ul>
                    </nav>

                    <div className="hd-actions">
                        <button className="hd-search-btn" aria-label="Open search" onClick={() => setSearchOpen(true)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>
                        <Link href="/contact" className="hd-cta nav-cta">Get Started</Link>
                        <button
                            className={`hd-hamburger ${mobileOpen ? "is-open" : ""}`}
                            aria-label="Toggle menu"
                            onClick={() => setMobileOpen(v => !v)}
                        >
                            <span /><span /><span />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
