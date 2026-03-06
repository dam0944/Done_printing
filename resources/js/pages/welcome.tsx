import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Particle {
    x: number;
    y: number;
    r: number;
    color: string;
    vx: number;
    vy: number;
    alpha: number;
}
interface Service {
    icon: string;
    title: string;
    desc: string;
    color: string;
}
interface Stat {
    value: string;
    label: string;
    color: string;
}
interface Step {
    num: string;
    title: string;
    desc: string;
}
interface Testimonial {
    name: string;
    role: string;
    text: string;
    accent: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
    {
        icon: 'bi-printer-fill',
        title: 'Offset Printing',
        color: '#00B4D8',
        desc: 'High-volume, razor-sharp results on every sheet with true CMYK fidelity.',
    },
    {
        icon: 'bi-aspect-ratio-fill',
        title: 'Large Format',
        color: '#E91E8C',
        desc: 'Banners, signage, and murals that command attention at any scale.',
    },
    {
        icon: 'bi-box-seam-fill',
        title: 'Packaging',
        color: '#FFD600',
        desc: 'Custom boxes and wraps crafted to elevate your product on the shelf.',
    },
    {
        icon: 'bi-megaphone-fill',
        title: 'Advertising',
        color: '#00B4D8',
        desc: 'Full-service creative campaigns, from concept and design through to print.',
    },
    {
        icon: 'bi-credit-card-2-front-fill',
        title: 'Business Cards',
        color: '#E91E8C',
        desc: 'Premium finishes — foil, emboss, spot UV — that leave a lasting impression.',
    },
    {
        icon: 'bi-file-earmark-text-fill',
        title: 'Brochures',
        color: '#FFD600',
        desc: 'Multi-fold layouts designed and printed to tell your brand story with impact.',
    },
];

const STATS: Stat[] = [
    { value: '15+', label: 'Years of Excellence', color: '#00B4D8' },
    { value: '5K+', label: 'Projects Delivered', color: '#E91E8C' },
    { value: '500+', label: 'Happy Clients', color: '#FFD600' },
    { value: '24h', label: 'Rush Turnaround', color: '#00B4D8' },
];

const STEPS: Step[] = [
    {
        num: '01',
        title: 'Consult',
        desc: 'Share your vision and requirements — we listen, advise, and plan.',
    },
    {
        num: '02',
        title: 'Design',
        desc: 'Our creative team crafts artwork that aligns perfectly with your brand.',
    },
    {
        num: '03',
        title: 'Proof',
        desc: 'Review and approve a digital proof before we print a single sheet.',
    },
    {
        num: '04',
        title: 'Deliver',
        desc: 'Your order is printed, finished, quality-checked, and delivered on time.',
    },
];

const TESTIMONIALS: Testimonial[] = [
    {
        name: 'Sokha Phan',
        role: 'Marketing Director',
        accent: '#00B4D8',
        text: 'Done Printing transformed our brand collateral. The quality is outstanding and delivery was faster than we expected.',
    },
    {
        name: 'Ratha Keo',
        role: 'Business Owner',
        accent: '#E91E8C',
        text: "We've relied on Done for all our packaging needs for 3 years. Consistent quality, competitive pricing, professional team.",
    },
    {
        name: 'Chanthy Lim',
        role: 'Event Coordinator',
        accent: '#FFD600',
        text: 'Ordered large-format banners for a major event on a very tight deadline. Done delivered perfectly — not a single issue.',
    },
];

const INK_COLORS = ['#E91E8C', '#00B4D8', '#FFD600', '#FF4D9D', '#00D4FF'];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Welcome() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const statsRef = useRef<HTMLElement>(null);
    const [activeTesti, setActiveTesti] = useState(0);
    const [statsVisible, setStatsVisible] = useState(false);

    // Canvas particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();

        const pts: Particle[] = Array.from({ length: 65 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3.5 + 0.5,
            color: INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)],
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.45 + 0.08,
        }));

        let id: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of pts) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle =
                    p.color +
                    Math.floor(p.alpha * 255)
                        .toString(16)
                        .padStart(2, '0');
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            }
            id = requestAnimationFrame(draw);
        };
        draw();
        window.addEventListener('resize', setSize);
        return () => {
            cancelAnimationFrame(id);
            window.removeEventListener('resize', setSize);
        };
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const t = setInterval(
            () => setActiveTesti((p) => (p + 1) % TESTIMONIALS.length),
            5500,
        );
        return () => clearInterval(t);
    }, []);

    // Stats visibility trigger
    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setStatsVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.25 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <MainLayout>
            <Head title="Welcome — Done Printing House & Advertising" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Barlow:wght@400;500;600&display=swap');

                :root {
                    --M: #E91E8C;
                    --C: #00B4D8;
                    --Y: #FFD600;
                    --K: #080808;
                    --s1: #0f0f0f;
                    --s2: #161616;
                    --s3: #1d1d1d;
                    --silver: #C0C0C0;
                    --dim: #686868;
                }

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { background: var(--K) !important; color: #fff; }

                .wp {
                    font-family: 'Barlow', sans-serif;
                    background: var(--K);
                    overflow-x: hidden;
                }

                /* ── Shared wrappers ── */
                .wrap {
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                /* ── Shared section eyebrow + title ── */
                .eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700;
                    font-size: 11px;
                    letter-spacing: 5px;
                    text-transform: uppercase;
                    color: var(--M);
                    margin-bottom: 14px;
                }
                .eyebrow::before {
                    content: '';
                    display: inline-block;
                    width: 22px; height: 2px;
                    background: currentColor;
                }
                .sec-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(40px, 6vw, 76px);
                    line-height: 0.92;
                    color: white;
                }
                .sec-title em {
                    font-style: normal;
                    background: linear-gradient(135deg, var(--C), var(--M));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* ── Shared buttons ── */
                .btn-p {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700;
                    font-size: 14px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    text-decoration: none;
                    color: #000;
                    padding: 16px 40px;
                    background: linear-gradient(135deg, var(--C) 0%, var(--M) 100%);
                    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .btn-p::after {
                    content: '';
                    position: absolute; inset: 0;
                    background: linear-gradient(135deg, var(--M) 0%, var(--Y) 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .btn-p > * { position: relative; z-index: 1; }
                .btn-p:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(233,30,140,0.5); }
                .btn-p:hover::after { opacity: 1; }

                .btn-o {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700;
                    font-size: 14px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    text-decoration: none;
                    color: var(--silver);
                    padding: 15px 40px;
                    border: 1px solid rgba(192,192,192,0.2);
                    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                .btn-o:hover {
                    border-color: var(--C);
                    color: var(--C);
                    background: rgba(0,180,216,0.07);
                    box-shadow: 0 0 32px rgba(0,180,216,0.15);
                }

                /* ══════════════════════════════════════
                   1. HERO
                ══════════════════════════════════════ */
                .hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .h-canvas {
                    position: absolute; inset: 0;
                    opacity: 0.48;
                    pointer-events: none;
                }
                .h-grid {
                    position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 64px 64px;
                    pointer-events: none;
                }
                .h-gl { position: absolute; left: -250px; top: 10%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(233,30,140,0.16) 0%, transparent 65%); pointer-events: none; }
                .h-gr { position: absolute; right: -150px; bottom: 5%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,180,216,0.13) 0%, transparent 65%); pointer-events: none; }
                /* Diagonal slice at bottom */
                .h-slice {
                    position: absolute; bottom: -2px; left: 0; right: 0; height: 130px;
                    background: var(--K);
                    clip-path: polygon(0 55%, 100% 0, 100% 100%, 0 100%);
                    pointer-events: none;
                    z-index: 3;
                }

                .h-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    padding: 110px 24px 100px;
                    max-width: 1100px;
                    width: 100%;
                }

                /* Pill badge */
                .h-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(0,180,216,0.07);
                    border: 1px solid rgba(0,180,216,0.22);
                    padding: 6px 18px;
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                    margin-bottom: 30px;
                    opacity: 0; transform: translateY(16px);
                    animation: up 0.6s 0.1s forwards;
                }
                .h-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--C); animation: pulse 2s infinite; }
                .h-badge-txt {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; color: var(--C);
                }

                /* Title */
                .h-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(64px, 13vw, 180px);
                    line-height: 0.87;
                    letter-spacing: 3px;
                    margin-bottom: 10px;
                    opacity: 0; transform: translateY(40px);
                    animation: up 0.9s 0.3s forwards;
                }
                .h-t1 {
                    display: block;
                    background: linear-gradient(135deg, #fff 0%, #bbb 70%, #888 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .h-t2 {
                    display: block;
                    background: linear-gradient(135deg, var(--C) 0%, var(--M) 45%, var(--Y) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                    filter: drop-shadow(0 0 48px rgba(233,30,140,0.35));
                }

                .h-sub {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: clamp(16px, 2.4vw, 23px);
                    letter-spacing: 1.5px; line-height: 1.65;
                    color: var(--dim);
                    max-width: 580px; margin: 26px auto 50px;
                    opacity: 0; transform: translateY(20px);
                    animation: up 0.8s 0.55s forwards;
                }
                .h-sub strong { color: var(--silver); }

                .h-btns {
                    display: flex; align-items: center; justify-content: center;
                    gap: 14px; flex-wrap: wrap;
                    opacity: 0; transform: translateY(20px);
                    animation: up 0.8s 0.75s forwards;
                }

                /* Trust row */
                .h-trust {
                    display: flex; align-items: center; justify-content: center;
                    gap: 28px; flex-wrap: wrap; margin-top: 48px;
                    opacity: 0; animation: up 0.8s 1s forwards;
                }
                .trust-chip {
                    display: flex; align-items: center; gap: 7px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #454545;
                }
                .trust-icon {
                    width: 16px; height: 16px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 8px; font-weight: 900; color: #000; flex-shrink: 0;
                }

                /* Scroll pulse */
                .h-scroll {
                    position: absolute; bottom: 148px; left: 50%; transform: translateX(-50%);
                    display: flex; flex-direction: column; align-items: center; gap: 8px;
                    opacity: 0; animation: up 1s 1.3s forwards;
                    pointer-events: none; z-index: 4;
                }
                .h-scroll-lbl {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #333;
                }
                .h-scroll-bar {
                    width: 1px; height: 46px;
                    background: linear-gradient(180deg, var(--M), transparent);
                    animation: scrl 2s 1.5s infinite;
                }

                /* ══════════════════════════════════════
                   2. CMYK BAR
                ══════════════════════════════════════ */
                .cmyk-bar { display: flex; height: 4px; }
                .cmyk-bar span { flex: 1; }

                /* ══════════════════════════════════════
                   3. STATS
                ══════════════════════════════════════ */
                .stats-sec {
                    background: var(--s1);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .stats-grid {
                    max-width: 1300px; margin: 0 auto;
                    display: grid; grid-template-columns: repeat(4, 1fr);
                }
                .stat-cell {
                    padding: 60px 28px; text-align: center;
                    position: relative; transition: background 0.3s ease;
                    cursor: default;
                }
                .stat-cell:hover { background: rgba(255,255,255,0.025); }
                .stat-cell:not(:last-child)::after {
                    content: ''; position: absolute; right: 0; top: 20%; height: 60%; width: 1px;
                    background: rgba(255,255,255,0.06);
                }
                .stat-bar {
                    height: 3px; width: 36px; border-radius: 2px;
                    margin: 0 auto 20px;
                    transition: width 0.4s ease;
                }
                .stat-cell:hover .stat-bar { width: 60px; }
                .stat-val {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(52px, 6vw, 86px); line-height: 1; margin-bottom: 8px;
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                    transition: filter 0.3s ease;
                }
                .stat-cell:hover .stat-val { filter: brightness(1.25); }
                .stat-lbl {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 11px; letter-spacing: 3.5px; text-transform: uppercase; color: #3d3d3d;
                }

                /* ══════════════════════════════════════
                   4. SERVICES
                ══════════════════════════════════════ */
                .svc-sec {
                    padding: 110px 0 120px;
                    background: var(--K);
                }
                .svc-hdr {
                    display: flex; align-items: flex-end; justify-content: space-between;
                    gap: 28px; flex-wrap: wrap; margin-bottom: 56px;
                }
                .svc-all {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 12px; letter-spacing: 3px;
                    text-transform: uppercase; color: var(--dim);
                    text-decoration: none;
                    display: inline-flex; align-items: center; gap: 7px;
                    transition: color 0.2s ease; white-space: nowrap;
                }
                .svc-all:hover { color: var(--C); }

                .svc-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2px;
                }
                .svc-card {
                    position: relative;
                    padding: 52px 44px 48px;
                    background: var(--s1);
                    overflow: hidden;
                    transition: background 0.3s ease, transform 0.35s ease;
                    cursor: default;
                }
                .svc-card:hover { background: var(--s2); transform: translateY(-4px); }
                .svc-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    transform: scaleX(0); transform-origin: left;
                    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .svc-card:hover::before { transform: scaleX(1); }
                .svc-num {
                    position: absolute; top: 16px; right: 20px;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 76px; color: rgba(255,255,255,0.035);
                    line-height: 1; user-select: none;
                    transition: color 0.3s ease;
                }
                .svc-card:hover .svc-num { color: rgba(255,255,255,0.075); }
                .svc-icon {
                    font-size: 42px; display: block; margin-bottom: 28px;
                    transition: transform 0.3s ease;
                }
                .svc-card:hover .svc-icon { transform: scale(1.14) rotate(-4deg); }
                .svc-title {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 900; font-size: 21px; letter-spacing: 1.5px;
                    text-transform: uppercase; color: white; margin-bottom: 12px;
                }
                .svc-desc { font-size: 14px; line-height: 1.75; color: var(--dim); }
                .svc-more {
                    display: inline-flex; align-items: center; gap: 5px;
                    margin-top: 20px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 12px; letter-spacing: 2px;
                    text-transform: uppercase; text-decoration: none;
                    opacity: 0; transition: opacity 0.3s ease;
                }
                .svc-card:hover .svc-more { opacity: 1; }

                /* ══════════════════════════════════════
                   5. PROCESS
                ══════════════════════════════════════ */
                .proc-sec {
                    padding: 110px 0 120px;
                    background: var(--s1);
                    position: relative; overflow: hidden;
                    border-top: 1px solid rgba(255,255,255,0.04);
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                }
                .proc-bg {
                    position: absolute; top: 50%; left: -10px;
                    transform: translateY(-50%);
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(90px, 17vw, 230px);
                    color: rgba(255,255,255,0.018);
                    white-space: nowrap; pointer-events: none; user-select: none;
                    letter-spacing: 10px; line-height: 1;
                }
                .proc-hdr { margin-bottom: 72px; }
                .proc-grid {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;
                    position: relative; z-index: 2;
                }
                .proc-card {
                    padding: 48px 36px; background: var(--s2);
                    position: relative; transition: background 0.3s ease;
                }
                .proc-card:hover { background: var(--s3); }
                .proc-card:not(:last-child)::after {
                    content: '→'; position: absolute; right: -16px; top: 50px;
                    font-size: 18px; color: rgba(255,255,255,0.1); z-index: 3;
                }
                .proc-n {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 4px;
                    text-transform: uppercase; color: var(--M);
                    margin-bottom: 18px;
                    display: flex; align-items: center; gap: 8px;
                }
                .proc-n::before { content: ''; width: 18px; height: 2px; background: var(--M); display: inline-block; }
                .proc-t {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 36px; letter-spacing: 2px; color: white;
                    margin-bottom: 14px; line-height: 1;
                }
                .proc-d { font-size: 14px; line-height: 1.72; color: var(--dim); }

                /* ══════════════════════════════════════
                   6. TESTIMONIALS
                ══════════════════════════════════════ */
                .testi-sec {
                    padding: 110px 0 120px;
                    background: var(--K);
                }
                .testi-hdr { margin-bottom: 60px; }
                .testi-track { position: relative; min-height: 260px; }
                .testi-card {
                    position: absolute; inset: 0;
                    padding: 52px 60px;
                    background: var(--s1);
                    border: 1px solid rgba(255,255,255,0.05);
                    clip-path: polygon(18px 0%, 100% 0%, calc(100% - 18px) 100%, 0% 100%);
                    opacity: 0; transform: translateX(24px);
                    transition: opacity 0.5s ease, transform 0.5s ease;
                    pointer-events: none;
                }
                .testi-card.on {
                    opacity: 1; transform: translateX(0);
                    position: relative; pointer-events: all;
                }
                .testi-q {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 88px; line-height: 0.55;
                    margin-bottom: 12px; display: block; opacity: 0.35;
                }
                .testi-txt {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: clamp(17px, 2.3vw, 26px);
                    letter-spacing: 0.5px; font-style: italic;
                    color: var(--silver); line-height: 1.5;
                    margin-bottom: 30px; max-width: 900px;
                }
                .testi-auth { display: flex; align-items: center; gap: 14px; }
                .testi-av {
                    width: 40px; height: 40px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: #000;
                    flex-shrink: 0;
                }
                .testi-name {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 16px; letter-spacing: 2px;
                    text-transform: uppercase; color: white;
                }
                .testi-role {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; color: #444;
                    margin-top: 3px;
                }
                .testi-nav { display: flex; gap: 8px; margin-top: 32px; }
                .testi-dot {
                    height: 3px; width: 28px; border: none; padding: 0; cursor: pointer;
                    background: rgba(255,255,255,0.1);
                    transition: background 0.3s ease, width 0.3s ease;
                }
                .testi-dot.on { width: 52px; }

                /* ══════════════════════════════════════
                   7. CTA BAND
                ══════════════════════════════════════ */
                .cta-sec {
                    position: relative;
                    padding: 130px 0;
                    background: var(--s1);
                    border-top: 1px solid rgba(255,255,255,0.04);
                    overflow: hidden;
                }
                .cta-bg {
                    position: absolute; top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(100px, 22vw, 310px);
                    color: rgba(255,255,255,0.018);
                    white-space: nowrap; pointer-events: none; user-select: none;
                    letter-spacing: 14px;
                }
                .cta-glow {
                    position: absolute; top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 900px; height: 500px;
                    background: radial-gradient(ellipse, rgba(233,30,140,0.1) 0%, transparent 70%);
                    pointer-events: none;
                }
                .cta-inner {
                    position: relative; z-index: 2;
                    text-align: center; max-width: 800px;
                    margin: 0 auto; padding: 0 24px;
                }
                .cta-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(52px, 9vw, 112px);
                    line-height: 0.88; color: white; margin-bottom: 24px;
                }
                .cta-accent {
                    display: block;
                    background: linear-gradient(135deg, var(--C) 0%, var(--M) 50%, var(--Y) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .cta-desc {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: clamp(16px, 2vw, 20px); letter-spacing: 1px; line-height: 1.65;
                    color: var(--dim); margin-bottom: 52px;
                }
                .cta-btns {
                    display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
                }
                .cta-trust {
                    display: flex; align-items: center; justify-content: center;
                    gap: 28px; flex-wrap: wrap; margin-top: 52px;
                }
                .cta-chip {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 12px; letter-spacing: 2px;
                    text-transform: uppercase; color: #3d3d3d;
                }
                .chip-dot {
                    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
                    animation: pulse 2s infinite;
                }

                /* ══════════════════════════════════════
                   KEYFRAMES
                ══════════════════════════════════════ */
                @keyframes up {
                    to { opacity: 1; transform: translateY(0) translateX(0); }
                }
                @keyframes scrl {
                    0%, 100% { opacity: 0.3; transform: scaleY(1); }
                    50%       { opacity: 0.9; transform: scaleY(1.2); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%       { opacity: 0.4; transform: scale(0.8); }
                }

                /* ══════════════════════════════════════
                   RESPONSIVE
                ══════════════════════════════════════ */

                /* Tablet — 1024px */
                @media (max-width: 1024px) {
                    .svc-grid  { grid-template-columns: repeat(2, 1fr); }
                    .proc-grid { grid-template-columns: repeat(2, 1fr); }
                    .proc-card:nth-child(2)::after,
                    .proc-card:nth-child(4)::after { display: none; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .stat-cell:nth-child(2)::after { display: none; }
                    .testi-card { padding: 44px 44px; }
                }

                /* Large mobile — 768px */
                @media (max-width: 768px) {
                    .wrap { padding: 0 22px; }
                    .svc-sec, .proc-sec, .testi-sec, .cta-sec { padding: 80px 0 88px; }
                    .svc-hdr { flex-direction: column; align-items: flex-start; gap: 18px; }
                    .proc-card:not(:last-child)::after { display: none; }
                    .testi-card { padding: 36px 30px; clip-path: none; }
                    .testi-txt { font-size: 18px; }
                    .testi-q { font-size: 64px; }
                    .h-trust { gap: 18px; }
                    .cta-btns { flex-direction: column; align-items: center; }
                    .btn-p, .btn-o { clip-path: none; border-radius: 2px; justify-content: center; min-width: 260px; }
                }

                /* Small mobile — 480px */
                @media (max-width: 480px) {
                    .svc-grid   { grid-template-columns: 1fr; }
                    .proc-grid  { grid-template-columns: 1fr; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .stat-cell  { padding: 40px 16px; }
                    .stat-cell:nth-child(4)::after { display: none; }

                    .h-trust { display: none; }
                    .h-content { padding: 100px 18px 90px; }
                    .h-btns { flex-direction: column; align-items: stretch; }

                    .svc-card { padding: 40px 26px; }
                    .testi-card { padding: 28px 20px; }
                    .testi-txt { font-size: 16px; }
                    .testi-track { min-height: 320px; }

                    .cta-trust { flex-direction: column; gap: 14px; }
                }

                /* Very small — 360px */
                @media (max-width: 360px) {
                    .h-title { font-size: 58px; }
                    .sec-title { font-size: 38px; }
                    .cta-title { font-size: 48px; }
                }
            `}</style>

            <div className="wp">
                {/* ══ 1. HERO ══ */}
                <section className="hero">
                    <canvas ref={canvasRef} className="h-canvas" />
                    <div className="h-grid" aria-hidden="true" />
                    <div className="h-gl" aria-hidden="true" />
                    <div className="h-gr" aria-hidden="true" />

                    <div className="h-content">
                        <div className="h-badge">
                            <div className="h-badge-dot" />
                            <span className="h-badge-txt">
                                Printing House &amp; Advertising — Phnom Penh
                            </span>
                        </div>

                        <h1 className="h-title">
                            <span className="h-t1">Your Vision,</span>
                            <span className="h-t2">Done Right.</span>
                        </h1>

                        <p className="h-sub">
                            From <strong>concept to print</strong>, we bring
                            your brand to life with vibrant CMYK precision,
                            expert craftsmanship, and lightning-fast turnaround.
                        </p>

                        <div className="h-btns">
                            <Link href="/work" className="btn-p">
                                <span>View Our Work</span>
                                <span aria-hidden="true">→</span>
                            </Link>
                            <Link href="/contact" className="btn-o">
                                Get a Free Quote
                            </Link>
                        </div>

                        <div className="h-trust">
                            {[
                                { label: '15+ Years', color: '#00B4D8' },
                                { label: '24h Rush', color: '#E91E8C' },
                                { label: 'Free Quote', color: '#FFD600' },
                                { label: '500+ Clients', color: '#00B4D8' },
                            ].map((t) => (
                                <div key={t.label} className="trust-chip">
                                    <span
                                        className="trust-icon"
                                        style={{ background: t.color }}
                                    >
                                        ✓
                                    </span>
                                    {t.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-scroll" aria-hidden="true">
                        <span className="h-scroll-lbl">Scroll</span>
                        <div className="h-scroll-bar" />
                    </div>

                    <div className="h-slice" aria-hidden="true" />
                </section>

                {/* ══ CMYK BAR ══ */}
                <div className="cmyk-bar" aria-hidden="true">
                    <span style={{ background: '#00B4D8' }} />
                    <span style={{ background: '#E91E8C' }} />
                    <span style={{ background: '#FFD600' }} />
                    <span style={{ background: '#1c1c1c' }} />
                </div>

                {/* ══ 2. STATS ══ */}
                <section
                    ref={statsRef}
                    className="stats-sec"
                    aria-label="Key statistics"
                >
                    <div className="stats-grid">
                        {STATS.map((s) => (
                            <div key={s.label} className="stat-cell">
                                <div
                                    className="stat-bar"
                                    style={{ background: s.color }}
                                />
                                <div
                                    className="stat-val"
                                    style={{
                                        background: `linear-gradient(135deg, ${s.color}, #ffffff)`,
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {statsVisible ? s.value : '—'}
                                </div>
                                <div className="stat-lbl">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══ 3. SERVICES ══ */}
                <section className="svc-sec" aria-label="Our services">
                    <div className="wrap">
                        <div className="svc-hdr">
                            <div>
                                <div className="eyebrow">What We Do</div>
                                <h2 className="sec-title">
                                    Our <em>Services</em>
                                </h2>
                            </div>
                            <Link href="/work" className="svc-all">
                                See all work <span aria-hidden="true">→</span>
                            </Link>
                        </div>

                        <div className="svc-grid">
                            {SERVICES.map((s, i) => (
                                <article key={s.title} className="svc-card">
                                    {/* Inject per-card colour via scoped style */}
                                    <style>{`
                                        .svc-card:nth-child(${i + 1})::before { background: ${s.color}; }
                                        .svc-card:nth-child(${i + 1}) .svc-more { color: ${s.color}; }
                                    `}</style>
                                    <span
                                        className="svc-num"
                                        aria-hidden="true"
                                    >
                                        0{i + 1}
                                    </span>
                                    <i
                                        className={`bi ${s.icon} svc-icon`}
                                        style={{ color: s.color }}
                                        aria-hidden="true"
                                    />
                                    <h3 className="svc-title">{s.title}</h3>
                                    <p className="svc-desc">{s.desc}</p>
                                    <Link href="/contact" className="svc-more">
                                        Learn more{' '}
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ 4. PROCESS ══ */}
                <section className="proc-sec" aria-label="How we work">
                    <div className="proc-bg" aria-hidden="true">
                        HOW WE WORK
                    </div>
                    <div className="wrap">
                        <div className="proc-hdr">
                            <div
                                className="eyebrow"
                                style={{ color: 'var(--C)' }}
                            >
                                <style>{`.proc-sec .eyebrow::before { background: var(--C) !important; }`}</style>
                                How It Works
                            </div>
                            <h2 className="sec-title">
                                Simple{' '}
                                <em
                                    style={{
                                        background:
                                            'linear-gradient(135deg, var(--C), var(--Y))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Process
                                </em>
                            </h2>
                        </div>

                        <div className="proc-grid">
                            {STEPS.map((p) => (
                                <div key={p.num} className="proc-card">
                                    <div className="proc-n">{p.num}</div>
                                    <div className="proc-t">{p.title}</div>
                                    <p className="proc-d">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ 5. TESTIMONIALS ══ */}
                <section className="testi-sec" aria-label="Client testimonials">
                    <div className="wrap">
                        <div className="testi-hdr">
                            <div className="eyebrow">What Clients Say</div>
                            <h2 className="sec-title">
                                Real <em>Results</em>
                            </h2>
                        </div>

                        <div className="testi-track">
                            {TESTIMONIALS.map((t, i) => (
                                <div
                                    key={t.name}
                                    className={`testi-card ${i === activeTesti ? 'on' : ''}`}
                                >
                                    <span
                                        className="testi-q"
                                        style={{ color: t.accent }}
                                        aria-hidden="true"
                                    >
                                        "
                                    </span>
                                    <p className="testi-txt">"{t.text}"</p>
                                    <div className="testi-auth">
                                        <div
                                            className="testi-av"
                                            style={{ background: t.accent }}
                                        >
                                            {t.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="testi-name">
                                                {t.name}
                                            </div>
                                            <div className="testi-role">
                                                {t.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation dots */}
                        <div
                            className="testi-nav"
                            role="tablist"
                            aria-label="Testimonial navigation"
                        >
                            {TESTIMONIALS.map((t, i) => (
                                <button
                                    key={t.name}
                                    className={`testi-dot ${i === activeTesti ? 'on' : ''}`}
                                    style={
                                        i === activeTesti
                                            ? { background: t.accent }
                                            : {}
                                    }
                                    onClick={() => setActiveTesti(i)}
                                    aria-label={`Testimonial from ${t.name}`}
                                    role="tab"
                                    aria-selected={i === activeTesti}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ 6. CTA ══ */}
                <section className="cta-sec" aria-label="Call to action">
                    <div className="cta-bg" aria-hidden="true">
                        PRINT
                    </div>
                    <div className="cta-glow" aria-hidden="true" />

                    <div className="cta-inner">
                        <h2 className="cta-title">
                            Ready to
                            <span className="cta-accent">Get It Done?</span>
                        </h2>
                        <p className="cta-desc">
                            Tell us what you need — we'll handle everything from
                            design to delivery with speed and precision.
                        </p>

                        <div className="cta-btns">
                            <Link
                                href="/contact"
                                className="btn-p"
                                style={{
                                    padding: '18px 52px',
                                    fontSize: '15px',
                                }}
                            >
                                <span>Start Your Project</span>
                                <span aria-hidden="true">→</span>
                            </Link>
                            <Link
                                href="/work"
                                className="btn-o"
                                style={{
                                    padding: '17px 52px',
                                    fontSize: '15px',
                                }}
                            >
                                View Portfolio
                            </Link>
                        </div>

                        <div className="cta-trust">
                            {[
                                { label: 'Available 7 Days', color: '#00B4D8' },
                                { label: 'Rush Orders OK', color: '#E91E8C' },
                                { label: 'Free Quotes', color: '#FFD600' },
                            ].map((b) => (
                                <div key={b.label} className="cta-chip">
                                    <div
                                        className="chip-dot"
                                        style={{ background: b.color }}
                                    />
                                    {b.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
