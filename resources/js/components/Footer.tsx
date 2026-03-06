import { Link } from '@inertiajs/react';
import logo from '../images/logo.png';
import { useLang } from '@/contexts/LangContext';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t, lang } = useLang();
    const isKm = lang === 'km';

    // Font + style switches for Khmer mode
    const ff = isKm ? "'Hanuman', sans-serif" : "'Barlow', sans-serif";
    const ffc = isKm
        ? "'Hanuman', sans-serif"
        : "'Barlow Condensed', sans-serif";
    const ls = isKm ? '0.5px' : '1px';
    const tt = isKm ? 'none' : 'uppercase';

    const links = {
        company: [
            { href: '/', label: t('nav.home') },
            { href: '/about', label: t('nav.about') },
            { href: '/work', label: t('nav.work') },
            { href: '/new', label: t('nav.new') },
            { href: '/contact', label: t('nav.contact') },
        ],
        services: [
            {
                href: '/services/offset',
                label: isKm ? 'ការបោះពុម្ព Offset' : 'Offset Printing',
            },
            {
                href: '/services/large',
                label: isKm ? 'ទ្រង់ទ្រាយធំ' : 'Large Format',
            },
            {
                href: '/services/packaging',
                label: isKm ? 'ស្រោបខ្ចប់' : 'Packaging',
            },
            {
                href: '/services/cards',
                label: isKm ? 'ប័ណ្ណអាជីវកម្ម' : 'Business Cards',
            },
            {
                href: '/services/brochures',
                label: isKm ? 'ខិត្តប័ណ្ណ' : 'Brochures',
            },
            { href: '/services/ads', label: isKm ? 'ការផ្សាយ' : 'Advertising' },
        ],
        contact: [
            {
                icon: 'bi-geo-alt-fill',
                label: t('footer.addr'),
                color: '#00B4D8',
            },
            {
                icon: 'bi-telephone-fill',
                label: '+855 23 123 456',
                color: '#E91E8C',
            },
            {
                icon: 'bi-envelope-fill',
                label: 'hello@doneprinting.com.kh',
                color: '#FFD600',
            },
            {
                icon: 'bi-clock-fill',
                label: t('footer.hours'),
                color: '#00B4D8',
            },
        ],
    };

    const socials = [
        { href: '#', label: 'Facebook', icon: 'bi-facebook' },
        { href: '#', label: 'Instagram', icon: 'bi-instagram' },
        { href: '#', label: 'TikTok', icon: 'bi-tiktok' },
        { href: '#', label: 'WhatsApp', icon: 'bi-whatsapp' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&family=Hanuman:wght@400;700;900&display=swap');

                :root {
                    --magenta:    #E91E8C;
                    --cyan:       #00B4D8;
                    --yellow:     #FFD600;
                    --black:      #080808;
                    --surface:    #0f0f0f;
                    --surface2:   #161616;
                    --silver:     #C0C0C0;
                    --silver-dim: #666666;
                }

                .site-footer {
                    position: relative;
                    background: var(--surface);
                    border-top: 1px solid rgba(255,255,255,0.06);
                    overflow: hidden;
                    font-family: ${ff};
                }

                .footer-watermark {
                    position: absolute;
                    bottom: -40px; right: -20px;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(100px, 18vw, 260px);
                    color: rgba(255,255,255,0.022);
                    line-height: 1; pointer-events: none; user-select: none;
                    letter-spacing: 8px; white-space: nowrap;
                }

                .footer-cmyk-bar { display: flex; height: 3px; width: 100%; }
                .footer-cmyk-bar span { flex: 1; display: block; }

                .footer-main {
                    max-width: 1300px; margin: 0 auto;
                    padding: 72px 40px 60px;
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.4fr;
                    gap: 56px;
                }

                .footer-logo { display: inline-block; margin-bottom: 24px; }
                .footer-logo img {
                    height: 80px; width: auto; display: block;
                    filter: drop-shadow(0 0 10px rgba(233,30,140,0.25));
                    transition: filter 0.3s ease;
                }
                .footer-logo:hover img {
                    filter: drop-shadow(0 0 18px rgba(233,30,140,0.55))
                            drop-shadow(0 0 36px rgba(0,180,216,0.3));
                }

                .footer-tagline {
                    font-family: ${ffc};
                    font-size: ${isKm ? '14px' : '15px'};
                    letter-spacing: ${isKm ? '0.5px' : '1.5px'};
                    line-height: 1.65;
                    color: var(--silver-dim); max-width: 280px; margin: 0 0 32px;
                }

                .footer-socials { display: flex; gap: 10px; flex-wrap: wrap; }

                .social-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 38px; height: 38px;
                    font-size: 16px;
                    text-decoration: none; color: var(--silver-dim);
                    border: 1px solid rgba(255,255,255,0.1);
                    clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
                    transition: color 0.25s, border-color 0.25s, background 0.25s, box-shadow 0.25s;
                }
                .social-btn:hover {
                    color: #000; border-color: transparent;
                    background: linear-gradient(135deg, var(--cyan), var(--magenta));
                    box-shadow: 0 4px 16px rgba(233,30,140,0.4);
                }

                .footer-col-title {
                    font-family: ${ffc};
                    font-weight: 700;
                    font-size: ${isKm ? '13px' : '11px'};
                    letter-spacing: ${isKm ? '0.5px' : '4px'};
                    text-transform: ${tt};
                    color: var(--magenta);
                    margin: 0 0 24px;
                    display: flex; align-items: center; gap: 8px;
                }
                .footer-col-title::before {
                    content: ''; display: inline-block;
                    width: 20px; height: 2px; background: var(--magenta); flex-shrink: 0;
                }

                .footer-nav {
                    list-style: none; margin: 0; padding: 0;
                    display: flex; flex-direction: column; gap: 4px;
                }
                .footer-nav-link {
                    display: inline-flex; align-items: center; gap: 8px;
                    text-decoration: none;
                    font-family: ${ffc};
                    font-size: ${isKm ? '14px' : '15px'};
                    font-weight: 600;
                    letter-spacing: ${ls};
                    text-transform: ${tt};
                    color: var(--silver-dim);
                    padding: 5px 0; transition: color 0.2s, padding-left 0.25s;
                }
                .footer-nav-link::before {
                    content: ''; display: inline-block;
                    width: 0; height: 1px; background: var(--cyan);
                    transition: width 0.25s; flex-shrink: 0;
                }
                .footer-nav-link:hover { color: white; }
                .footer-nav-link:hover::before { width: 14px; }

                .footer-contact-list {
                    list-style: none; margin: 0; padding: 0;
                    display: flex; flex-direction: column; gap: 16px;
                }
                .footer-contact-item {
                    display: flex; align-items: flex-start; gap: 12px;
                    font-family: ${ff}; font-size: 13px;
                    line-height: 1.5; color: var(--silver-dim);
                }
                .footer-contact-icon {
                    font-size: 15px; flex-shrink: 0; margin-top: 1px;
                    width: 22px; text-align: center;
                }

                .footer-cta-strip {
                    max-width: 1300px; margin: 0 auto; padding: 0 40px 56px;
                }
                .footer-cta-inner {
                    border: 1px solid rgba(255,255,255,0.06);
                    background: var(--surface2);
                    padding: 36px 48px;
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 24px; flex-wrap: wrap;
                    position: relative; overflow: hidden;
                    clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
                }
                .footer-cta-inner::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
                    background: linear-gradient(180deg, var(--cyan), var(--magenta), var(--yellow));
                }
                .footer-cta-text {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(22px, 3vw, 32px); letter-spacing: 2px;
                    color: white; line-height: 1;
                }
                .footer-cta-text span {
                    background: linear-gradient(90deg, var(--cyan), var(--magenta));
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text; margin-left: 10px;
                }
                .footer-cta-btn {
                    position: relative; display: inline-flex; align-items: center; gap: 10px;
                    font-family: ${ffc};
                    font-weight: 700;
                    font-size: 14px;
                    letter-spacing: ${isKm ? '0.5px' : '3px'};
                    text-transform: ${tt};
                    text-decoration: none; color: #000;
                    padding: 13px 32px;
                    background: linear-gradient(135deg, var(--cyan), var(--magenta));
                    clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
                    white-space: nowrap; overflow: hidden;
                    transition: transform 0.3s, box-shadow 0.3s; flex-shrink: 0;
                }
                .footer-cta-btn::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(135deg, var(--magenta), var(--yellow));
                    opacity: 0; transition: opacity 0.3s;
                }
                .footer-cta-btn > * { position: relative; z-index: 1; }
                .footer-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(233,30,140,0.5); }
                .footer-cta-btn:hover::after { opacity: 1; }

                .footer-bottom {
                    border-top: 1px solid rgba(255,255,255,0.05);
                    padding: 22px 40px;
                    max-width: 1300px; margin: 0 auto;
                    display: flex; align-items: center;
                    justify-content: space-between; gap: 16px; flex-wrap: wrap;
                }
                .footer-copy {
                    font-family: ${ffc};
                    font-size: 12px;
                    letter-spacing: ${isKm ? '0.5px' : '2px'};
                    text-transform: ${tt};
                    color: #3a3a3a;
                }
                .footer-copy strong { color: #555; font-weight: 700; }

                .footer-dots { display: flex; align-items: center; gap: 5px; }
                .footer-dot { width: 7px; height: 7px; border-radius: 50%; display: block; }

                @media (max-width: 1024px) {
                    .footer-main { grid-template-columns: 1fr 1fr; gap: 48px; }
                    .footer-brand { grid-column: 1 / -1; }
                }
                @media (max-width: 640px) {
                    .footer-main { grid-template-columns: 1fr; padding: 56px 24px 40px; gap: 40px; }
                    .footer-brand { grid-column: auto; }
                    .footer-cta-strip { padding: 0 24px 44px; }
                    .footer-cta-inner { flex-direction: column; align-items: flex-start; padding: 28px 32px; }
                    .footer-bottom { flex-direction: column; align-items: center; text-align: center; padding: 22px 24px; }
                }
            `}</style>

            <footer className="site-footer" role="contentinfo">
                <div className="footer-watermark" aria-hidden="true">
                    DONE
                </div>

                <div className="footer-cmyk-bar" aria-hidden="true">
                    <span style={{ background: '#00B4D8' }} />
                    <span style={{ background: '#E91E8C' }} />
                    <span style={{ background: '#FFD600' }} />
                    <span style={{ background: '#1a1a1a' }} />
                </div>

                <div className="footer-main">
                    {/* Brand */}
                    <div className="footer-brand">
                        <Link
                            href="/"
                            className="footer-logo"
                            aria-label="Done Printing House – Home"
                        >
                            <img
                                src={logo}
                                alt="Done Printing House & Advertising"
                            />
                        </Link>
                        <p className="footer-tagline">{t('footer.tagline')}</p>
                        <div
                            className="footer-socials"
                            role="list"
                            aria-label="Social media"
                        >
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    className="social-btn"
                                    aria-label={s.label}
                                    role="listitem"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i
                                        className={`bi ${s.icon}`}
                                        aria-hidden="true"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="footer-col-title">
                            {t('footer.company')}
                        </h3>
                        <ul className="footer-nav" role="list">
                            {links.company.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="footer-nav-link"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="footer-col-title">
                            {t('footer.services')}
                        </h3>
                        <ul className="footer-nav" role="list">
                            {links.services.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="footer-nav-link"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="footer-col-title">
                            {t('footer.touch')}
                        </h3>
                        <ul className="footer-contact-list" role="list">
                            {links.contact.map((c) => (
                                <li
                                    key={c.label}
                                    className="footer-contact-item"
                                >
                                    <i
                                        className={`bi ${c.icon} footer-contact-icon`}
                                        style={{ color: c.color }}
                                        aria-hidden="true"
                                    />
                                    <span>{c.label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA Strip */}
                <div className="footer-cta-strip">
                    <div className="footer-cta-inner">
                        <div className="footer-cta-text">
                            {t('footer.cta')}
                            <span>{t('footer.cta.accent')}</span>
                        </div>
                        <Link href="/contact" className="footer-cta-btn">
                            <span>{t('footer.cta.btn')}</span>
                            <i
                                className="bi bi-arrow-right"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <span className="footer-copy">
                        &copy; {currentYear}{' '}
                        <strong>Done Printing House &amp; Advertising</strong>.{' '}
                        {t('footer.copy')}
                    </span>
                    <div className="footer-dots" aria-hidden="true">
                        <span
                            className="footer-dot"
                            style={{ background: '#00B4D8' }}
                        />
                        <span
                            className="footer-dot"
                            style={{ background: '#E91E8C' }}
                        />
                        <span
                            className="footer-dot"
                            style={{ background: '#FFD600' }}
                        />
                        <span
                            className="footer-dot"
                            style={{ background: '#333' }}
                        />
                    </div>
                </div>
            </footer>
        </>
    );
}
