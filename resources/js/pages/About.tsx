import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { useEffect, useRef, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Value {
    icon: string;
    title: string;
    desc: string;
    color: string;
}
interface Milestone {
    year: string;
    title: string;
    desc: string;
}
interface TeamMember {
    name: string;
    role: string;
    initial: string;
    color: string;
}
interface Award {
    title: string;
    body: string;
    year: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const VALUES: Value[] = [
    {
        icon: 'bi-bullseye',
        color: '#00B4D8',
        title: 'Precision First',
        desc: 'Every millimeter matters. We calibrate our presses daily to guarantee perfect colour registration and sharp detail.',
    },
    {
        icon: 'bi-lightning-charge-fill',
        color: '#E91E8C',
        title: 'Speed Without Compromise',
        desc: 'Rush turnarounds are our specialty — we move fast without ever sacrificing the quality your brand deserves.',
    },
    {
        icon: 'bi-handshake-fill',
        color: '#FFD600',
        title: 'Client Partnership',
        desc: 'We treat every project as a collaboration. Your success is our success, and we stay with you from brief to delivery.',
    },
    {
        icon: 'bi-recycle',
        color: '#00B4D8',
        title: 'Sustainable Printing',
        desc: "We use eco-certified inks and responsibly sourced papers, because great printing shouldn't cost the planet.",
    },
];

const MILESTONES: Milestone[] = [
    {
        year: '2009',
        title: 'Founded',
        desc: 'Done Printing House opens its first press in Phnom Penh with a single offset machine and a big vision.',
    },
    {
        year: '2013',
        title: 'Large Format',
        desc: 'We expand into wide-format printing — banners, signage, and murals — serving event and retail clients.',
    },
    {
        year: '2017',
        title: 'Full Service',
        desc: 'In-house design studio launches, making us a one-stop creative and print partner for brands of all sizes.',
    },
    {
        year: '2020',
        title: 'Digital Offset',
        desc: 'Invested in next-generation digital offset presses for faster turnaround and even sharper colour accuracy.',
    },
    {
        year: '2023',
        title: 'Packaging Studio',
        desc: 'Dedicated packaging line opens, handling custom boxes, bags, labels, and branded wrapping for product brands.',
    },
    {
        year: '2025',
        title: 'Regional Growth',
        desc: '500+ active clients, 5,000+ projects delivered, and expanding our footprint across Southeast Asia.',
    },
];

const TEAM: TeamMember[] = [
    {
        name: 'Dara Noun',
        role: 'Founder & CEO',
        initial: 'D',
        color: '#00B4D8',
    },
    {
        name: 'Sreymom Keo',
        role: 'Creative Director',
        initial: 'S',
        color: '#E91E8C',
    },
    {
        name: 'Piseth Chan',
        role: 'Head of Production',
        initial: 'P',
        color: '#FFD600',
    },
    {
        name: 'Botum Lim',
        role: 'Client Relations Manager',
        initial: 'B',
        color: '#00B4D8',
    },
];

const AWARDS: Award[] = [
    {
        title: 'Best Print Quality',
        body: 'Cambodia Business Awards',
        year: '2023',
    },
    {
        title: 'Top SME Partner',
        body: 'Phnom Penh Chamber of Commerce',
        year: '2022',
    },
    {
        title: 'Green Printer Award',
        body: 'ASEAN Sustainability Forum',
        year: '2021',
    },
];

const STATS = [
    { val: '15+', lbl: 'Years Operating', color: '#00B4D8' },
    { val: '5K+', lbl: 'Projects Delivered', color: '#E91E8C' },
    { val: '500+', lbl: 'Active Clients', color: '#FFD600' },
    { val: '30+', lbl: 'Team Members', color: '#00B4D8' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function About() {
    const [activeYear, setActiveYear] = useState(0);
    const heroRef = useRef<HTMLElement>(null);
    const [heroVis, setHeroVis] = useState(false);

    useEffect(() => {
        setHeroVis(true);
    }, []);

    // Auto-advance timeline
    useEffect(() => {
        const t = setInterval(
            () => setActiveYear((p) => (p + 1) % MILESTONES.length),
            4500,
        );
        return () => clearInterval(t);
    }, []);

    return (
        <MainLayout>
            <Head title="About — Done Printing House & Advertising" />

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

                .about-page {
                    font-family: 'Barlow', sans-serif;
                    background: var(--K);
                    overflow-x: hidden;
                }

                /* ── Shared layout ── */
                .wrap {
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                /* ── Shared eyebrow + title ── */
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
                    font-size: clamp(40px, 5.5vw, 74px);
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
                    font-weight: 700; font-size: 14px; letter-spacing: 3px;
                    text-transform: uppercase; text-decoration: none;
                    color: #000; padding: 15px 38px;
                    background: linear-gradient(135deg, var(--C), var(--M));
                    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    overflow: hidden; white-space: nowrap;
                }
                .btn-p::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(135deg, var(--M), var(--Y));
                    opacity: 0; transition: opacity 0.3s ease;
                }
                .btn-p > * { position: relative; z-index: 1; }
                .btn-p:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(233,30,140,0.5); }
                .btn-p:hover::after { opacity: 1; }

                .btn-o {
                    display: inline-flex; align-items: center; gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 14px; letter-spacing: 3px;
                    text-transform: uppercase; text-decoration: none;
                    color: var(--silver); padding: 14px 38px;
                    border: 1px solid rgba(192,192,192,0.2);
                    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
                    transition: all 0.3s ease; white-space: nowrap;
                }
                .btn-o:hover {
                    border-color: var(--C); color: var(--C);
                    background: rgba(0,180,216,0.07);
                    box-shadow: 0 0 30px rgba(0,180,216,0.15);
                }

                /* ══════════════════════════════════════
                   HERO — PAGE HEADER
                ══════════════════════════════════════ */
                .ab-hero {
                    position: relative;
                    padding: 160px 0 110px;
                    background: var(--K);
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                /* Grid texture */
                .ab-hero-grid {
                    position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 64px 64px;
                    pointer-events: none;
                }

                /* Glows */
                .ab-hero-gl {
                    position: absolute; left: -200px; top: 0;
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 65%);
                    pointer-events: none;
                }
                .ab-hero-gr {
                    position: absolute; right: -100px; bottom: -80px;
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(233,30,140,0.12) 0%, transparent 65%);
                    pointer-events: none;
                }

                /* Big background text */
                .ab-hero-bg {
                    position: absolute; right: -20px; top: 50%;
                    transform: translateY(-50%);
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(130px, 20vw, 280px);
                    color: rgba(255,255,255,0.025);
                    white-space: nowrap; pointer-events: none; user-select: none;
                    letter-spacing: 10px; line-height: 1;
                }

                .ab-hero-inner {
                    position: relative; z-index: 2;
                }

                .ab-hero-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }

                /* Left — text */
                .ab-hero-tag {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: rgba(0,180,216,0.07);
                    border: 1px solid rgba(0,180,216,0.2);
                    padding: 6px 16px;
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                    margin-bottom: 28px;
                    opacity: 0; transform: translateY(16px);
                    animation: up 0.6s 0.1s forwards;
                }
                .ab-hero-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--C); animation: pulse 2s infinite; }
                .ab-hero-tag-txt {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 4px;
                    text-transform: uppercase; color: var(--C);
                }

                .ab-hero-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(60px, 8vw, 120px);
                    line-height: 0.88; letter-spacing: 2px;
                    margin-bottom: 28px;
                    opacity: 0; transform: translateY(30px);
                    animation: up 0.9s 0.25s forwards;
                }
                .ab-ht1 {
                    display: block;
                    background: linear-gradient(135deg, #fff 0%, #bbb 70%, #888 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .ab-ht2 {
                    display: block;
                    background: linear-gradient(135deg, var(--C) 0%, var(--M) 50%, var(--Y) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                    filter: drop-shadow(0 0 40px rgba(233,30,140,0.3));
                }

                .ab-hero-body {
                    font-family: 'Barlow', sans-serif;
                    font-size: 16px; line-height: 1.8; color: var(--dim);
                    margin-bottom: 20px;
                    opacity: 0; transform: translateY(20px);
                    animation: up 0.8s 0.45s forwards;
                }
                .ab-hero-body strong { color: var(--silver); font-weight: 600; }

                .ab-hero-body2 {
                    font-family: 'Barlow', sans-serif;
                    font-size: 16px; line-height: 1.8; color: var(--dim);
                    margin-bottom: 36px;
                    opacity: 0; transform: translateY(20px);
                    animation: up 0.8s 0.55s forwards;
                }

                .ab-hero-btns {
                    display: flex; gap: 14px; flex-wrap: wrap;
                    opacity: 0; transform: translateY(20px);
                    animation: up 0.8s 0.7s forwards;
                }

                /* Right — stat cards */
                .ab-hero-right {
                    opacity: 0; transform: translateX(30px);
                    animation: up 0.9s 0.4s forwards;
                }
                .ab-stat-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3px;
                }
                .ab-stat-card {
                    padding: 36px 28px;
                    background: var(--s1);
                    border-top: 3px solid transparent;
                    position: relative;
                    transition: background 0.3s ease, transform 0.3s ease;
                    cursor: default;
                }
                .ab-stat-card:hover { background: var(--s2); transform: translateY(-3px); }
                .ab-stat-val {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(44px, 5vw, 64px); line-height: 1;
                    margin-bottom: 6px;
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .ab-stat-lbl {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #3d3d3d;
                }

                /* CMYK bar */
                .cmyk-bar { display: flex; height: 4px; }
                .cmyk-bar span { flex: 1; }

                /* ══════════════════════════════════════
                   MISSION + VISION
                ══════════════════════════════════════ */
                .mv-sec {
                    padding: 110px 0 120px;
                    background: var(--s1);
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                }
                .mv-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3px;
                }
                .mv-card {
                    padding: 64px 56px;
                    background: var(--s2);
                    position: relative;
                    overflow: hidden;
                    transition: background 0.3s ease;
                }
                .mv-card:hover { background: var(--s3); }
                .mv-card-bg {
                    position: absolute; bottom: -20px; right: -10px;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 130px; line-height: 1;
                    color: rgba(255,255,255,0.03);
                    pointer-events: none; user-select: none;
                    transition: color 0.3s ease;
                }
                .mv-card:hover .mv-card-bg { color: rgba(255,255,255,0.055); }
                .mv-card-accent {
                    width: 48px; height: 3px;
                    margin-bottom: 28px;
                    border-radius: 2px;
                    transition: width 0.35s ease;
                }
                .mv-card:hover .mv-card-accent { width: 80px; }
                .mv-card-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 5px;
                    text-transform: uppercase; color: var(--dim);
                    margin-bottom: 16px;
                }
                .mv-card-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(36px, 4vw, 54px); line-height: 0.95;
                    color: white; margin-bottom: 20px;
                    letter-spacing: 1px;
                }
                .mv-card-body {
                    font-size: 15px; line-height: 1.8; color: var(--dim);
                    position: relative; z-index: 2;
                }
                .mv-card-body strong { color: var(--silver); }

                /* ══════════════════════════════════════
                   VALUES
                ══════════════════════════════════════ */
                .val-sec {
                    padding: 110px 0 120px;
                    background: var(--K);
                }
                .val-hdr { margin-bottom: 64px; }
                .val-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 2px;
                }
                .val-card {
                    padding: 48px 36px;
                    background: var(--s1);
                    position: relative; overflow: hidden;
                    transition: background 0.3s ease, transform 0.35s ease;
                    cursor: default;
                }
                .val-card:hover { background: var(--s2); transform: translateY(-4px); }
                .val-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    transform: scaleX(0); transform-origin: left;
                    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
                }
                .val-card:hover::before { transform: scaleX(1); }
                .val-icon {
                    font-size: 38px; display: block; margin-bottom: 24px;
                    transition: transform 0.3s ease;
                }
                .val-card:hover .val-icon { transform: scale(1.14) rotate(-5deg); }
                .val-title {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 900; font-size: 19px; letter-spacing: 1.5px;
                    text-transform: uppercase; color: white; margin-bottom: 12px;
                }
                .val-desc { font-size: 14px; line-height: 1.75; color: var(--dim); }

                /* ══════════════════════════════════════
                   TIMELINE
                ══════════════════════════════════════ */
                .timeline-sec {
                    padding: 110px 0 120px;
                    background: var(--s1);
                    border-top: 1px solid rgba(255,255,255,0.04);
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    position: relative; overflow: hidden;
                }
                .tl-bg {
                    position: absolute; left: 50%; top: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(80px, 16vw, 220px);
                    color: rgba(255,255,255,0.018);
                    pointer-events: none; user-select: none;
                    letter-spacing: 12px; white-space: nowrap;
                }
                .tl-hdr { margin-bottom: 72px; }

                .tl-layout {
                    display: grid;
                    grid-template-columns: 340px 1fr;
                    gap: 60px;
                    align-items: start;
                    position: relative; z-index: 2;
                }

                /* Left — year selector */
                .tl-years { display: flex; flex-direction: column; gap: 3px; }
                .tl-year-btn {
                    display: flex; align-items: center; gap: 16px;
                    padding: 20px 24px;
                    background: var(--s2);
                    border: none; cursor: pointer;
                    transition: background 0.25s ease;
                    text-align: left; width: 100%;
                }
                .tl-year-btn:hover { background: var(--s3); }
                .tl-year-btn.active { background: var(--s3); }
                .tl-year-dot {
                    width: 10px; height: 10px; border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                    flex-shrink: 0;
                    transition: background 0.25s ease, transform 0.25s ease;
                }
                .tl-year-btn.active .tl-year-dot { transform: scale(1.4); }
                .tl-year-num {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 28px; letter-spacing: 2px; line-height: 1;
                    color: #3a3a3a;
                    transition: color 0.25s ease;
                }
                .tl-year-btn.active .tl-year-num { color: white; }
                .tl-year-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 12px; letter-spacing: 2px;
                    text-transform: uppercase; color: #2e2e2e;
                    transition: color 0.25s ease;
                }
                .tl-year-btn.active .tl-year-label { color: var(--dim); }

                /* Right — detail panel */
                .tl-detail {
                    padding: 52px 56px;
                    background: var(--s2);
                    min-height: 280px;
                    position: relative; overflow: hidden;
                }
                .tl-detail-year {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(80px, 10vw, 140px);
                    line-height: 0.8;
                    background: linear-gradient(135deg, var(--C), var(--M));
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                    margin-bottom: 16px;
                    display: block;
                }
                .tl-detail-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 44px; letter-spacing: 2px; color: white;
                    margin-bottom: 16px; line-height: 1;
                }
                .tl-detail-desc {
                    font-size: 16px; line-height: 1.8; color: var(--dim);
                    max-width: 520px;
                }
                .tl-detail-bg {
                    position: absolute; right: -10px; bottom: -20px;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 200px; line-height: 0.8;
                    color: rgba(255,255,255,0.025);
                    pointer-events: none; user-select: none;
                }

                /* ══════════════════════════════════════
                   TEAM
                ══════════════════════════════════════ */
                .team-sec {
                    padding: 110px 0 120px;
                    background: var(--K);
                }
                .team-hdr { margin-bottom: 64px; }
                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 2px;
                }
                .team-card {
                    padding: 48px 36px;
                    background: var(--s1);
                    position: relative; overflow: hidden;
                    transition: background 0.3s ease, transform 0.35s ease;
                    cursor: default;
                    text-align: center;
                }
                .team-card:hover { background: var(--s2); transform: translateY(-4px); }
                .team-card::after {
                    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
                    transform: scaleX(0); transform-origin: center;
                    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
                }
                .team-card:hover::after { transform: scaleX(1); }
                .team-avatar {
                    width: 72px; height: 72px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 30px; color: #000;
                    margin: 0 auto 20px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .team-card:hover .team-avatar { transform: scale(1.08); }
                .team-name {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 900; font-size: 18px; letter-spacing: 1.5px;
                    text-transform: uppercase; color: white; margin-bottom: 6px;
                }
                .team-role {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #3d3d3d;
                }

                /* ══════════════════════════════════════
                   AWARDS
                ══════════════════════════════════════ */
                .awards-sec {
                    padding: 110px 0 120px;
                    background: var(--s1);
                    border-top: 1px solid rgba(255,255,255,0.04);
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                }
                .awards-hdr { margin-bottom: 60px; }
                .awards-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2px;
                }
                .award-card {
                    padding: 52px 44px;
                    background: var(--s2);
                    position: relative; overflow: hidden;
                    transition: background 0.3s ease, transform 0.3s ease;
                    cursor: default;
                }
                .award-card:hover { background: var(--s3); transform: translateY(-3px); }
                .award-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    background: linear-gradient(90deg, var(--C), var(--M), var(--Y));
                    transform: scaleX(0); transform-origin: left;
                    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
                }
                .award-card:hover::before { transform: scaleX(1); }
                .award-icon {
                    font-size: 44px; display: block; margin-bottom: 24px;
                    transition: transform 0.3s ease;
                }
                .award-card:hover .award-icon { transform: scale(1.1) rotate(-5deg); }
                .award-title {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 900; font-size: 22px; letter-spacing: 1px;
                    text-transform: uppercase; color: white; margin-bottom: 8px;
                }
                .award-body { font-size: 13px; letter-spacing: 1px; color: var(--dim); margin-bottom: 16px; }
                .award-year {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 42px; letter-spacing: 2px;
                    background: linear-gradient(135deg, var(--C), var(--M));
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text; line-height: 1;
                }

                /* ══════════════════════════════════════
                   CTA BAND
                ══════════════════════════════════════ */
                .cta-sec {
                    padding: 130px 0;
                    background: var(--K);
                    position: relative; overflow: hidden;
                }
                .cta-glow {
                    position: absolute; top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 900px; height: 500px;
                    background: radial-gradient(ellipse, rgba(233,30,140,0.1) 0%, transparent 70%);
                    pointer-events: none;
                }
                .cta-bg-txt {
                    position: absolute; top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(100px, 20vw, 280px);
                    color: rgba(255,255,255,0.018);
                    white-space: nowrap; pointer-events: none; user-select: none;
                    letter-spacing: 12px;
                }
                .cta-inner {
                    position: relative; z-index: 2;
                    text-align: center; max-width: 720px;
                    margin: 0 auto; padding: 0 24px;
                }
                .cta-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(50px, 8vw, 108px);
                    line-height: 0.9; color: white; margin-bottom: 22px;
                }
                .cta-accent {
                    display: block;
                    background: linear-gradient(135deg, var(--C) 0%, var(--M) 50%, var(--Y) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .cta-desc {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: clamp(16px, 2vw, 20px); letter-spacing: 1px;
                    color: var(--dim); margin-bottom: 48px; line-height: 1.65;
                }
                .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

                /* ══════════════════════════════════════
                   KEYFRAMES
                ══════════════════════════════════════ */
                @keyframes up {
                    to { opacity: 1; transform: translate(0, 0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%       { opacity: 0.4; transform: scale(0.8); }
                }

                /* ══════════════════════════════════════
                   RESPONSIVE
                ══════════════════════════════════════ */
                @media (max-width: 1100px) {
                    .ab-hero-layout { grid-template-columns: 1fr; gap: 56px; }
                    .ab-hero-right { animation: up 0.9s 0.6s forwards; transform: translateY(24px); }
                    .val-grid  { grid-template-columns: repeat(2, 1fr); }
                    .team-grid { grid-template-columns: repeat(2, 1fr); }
                    .tl-layout { grid-template-columns: 1fr; gap: 28px; }
                    .tl-years  { flex-direction: row; flex-wrap: wrap; }
                    .tl-year-btn { flex: 1 1 140px; }
                }

                @media (max-width: 768px) {
                    .wrap { padding: 0 22px; }
                    .ab-hero { padding: 130px 0 80px; }
                    .mv-grid { grid-template-columns: 1fr; }
                    .mv-card { padding: 48px 36px; }
                    .awards-grid { grid-template-columns: 1fr; }
                    .tl-detail { padding: 36px 30px; }
                    .cta-btns { flex-direction: column; align-items: center; }
                    .btn-p, .btn-o { clip-path: none; border-radius: 2px; justify-content: center; min-width: 260px; }
                    .mv-sec, .val-sec, .timeline-sec, .team-sec, .awards-sec, .cta-sec { padding: 80px 0 88px; }
                }

                @media (max-width: 480px) {
                    .val-grid  { grid-template-columns: 1fr; }
                    .team-grid { grid-template-columns: repeat(2, 1fr); }
                    .awards-grid { grid-template-columns: 1fr; }
                    .ab-stat-grid { grid-template-columns: repeat(2, 1fr); }
                    .tl-years { flex-direction: column; }
                    .tl-year-btn { flex: none; width: 100%; }
                    .ab-hero-btns { flex-direction: column; align-items: stretch; }
                }
            `}</style>

            <div className="about-page">
                {/* ══ HERO ══ */}
                <section className="ab-hero" ref={heroRef}>
                    <div className="ab-hero-grid" aria-hidden="true" />
                    <div className="ab-hero-gl" aria-hidden="true" />
                    <div className="ab-hero-gr" aria-hidden="true" />
                    <div className="ab-hero-bg" aria-hidden="true">
                        ABOUT
                    </div>

                    <div className="wrap ab-hero-inner">
                        <div className="ab-hero-layout">
                            {/* Left — copy */}
                            <div>
                                <div className="ab-hero-tag">
                                    <div className="ab-hero-tag-dot" />
                                    <span className="ab-hero-tag-txt">
                                        Est. 2009 — Phnom Penh, Cambodia
                                    </span>
                                </div>

                                <h1 className="ab-hero-title">
                                    <span className="ab-ht1">Who We</span>
                                    <span className="ab-ht2">Are.</span>
                                </h1>

                                <p className="ab-hero-body">
                                    <strong>
                                        Done Printing House & Advertising
                                    </strong>{' '}
                                    is Cambodia's premier full-service print and
                                    creative partner. Founded in 2009, we've
                                    spent over 15 years perfecting the art of
                                    turning ideas into tangible, high-impact
                                    printed materials.
                                </p>
                                <p className="ab-hero-body2">
                                    From a single offset press in a small Phnom
                                    Penh shop to a full-scale production
                                    facility with 30+ team members, our growth
                                    has always been driven by one thing: an
                                    unwavering commitment to quality and client
                                    success.
                                </p>

                                <div className="ab-hero-btns">
                                    <Link href="/contact" className="btn-p">
                                        <span>Work With Us</span>
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                    <Link href="/work" className="btn-o">
                                        View Portfolio
                                    </Link>
                                </div>
                            </div>

                            {/* Right — stat cards */}
                            <div className="ab-hero-right">
                                <div className="ab-stat-grid">
                                    {STATS.map((s) => (
                                        <div
                                            key={s.lbl}
                                            className="ab-stat-card"
                                            style={{ borderTopColor: s.color }}
                                        >
                                            <div
                                                className="ab-stat-val"
                                                style={{
                                                    background: `linear-gradient(135deg, ${s.color}, #fff)`,
                                                    WebkitBackgroundClip:
                                                        'text',
                                                    backgroundClip: 'text',
                                                }}
                                            >
                                                {s.val}
                                            </div>
                                            <div className="ab-stat-lbl">
                                                {s.lbl}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CMYK bar */}
                <div className="cmyk-bar" aria-hidden="true">
                    <span style={{ background: '#00B4D8' }} />
                    <span style={{ background: '#E91E8C' }} />
                    <span style={{ background: '#FFD600' }} />
                    <span style={{ background: '#1c1c1c' }} />
                </div>

                {/* ══ MISSION + VISION ══ */}
                <section className="mv-sec" aria-label="Mission and Vision">
                    <div className="wrap">
                        <div className="mv-grid">
                            {/* Mission */}
                            <div className="mv-card">
                                <div className="mv-card-bg" aria-hidden="true">
                                    M
                                </div>
                                <div
                                    className="mv-card-accent"
                                    style={{ background: '#00B4D8' }}
                                />
                                <div className="mv-card-label">Our Mission</div>
                                <div className="mv-card-title">
                                    Print That
                                    <br />
                                    Performs.
                                </div>
                                <p className="mv-card-body">
                                    To empower businesses and brands across
                                    Cambodia and Southeast Asia with{' '}
                                    <strong>exceptional print quality</strong>,
                                    creative excellence, and reliable service —
                                    delivered with speed and integrity, every
                                    single time.
                                </p>
                            </div>
                            {/* Vision */}
                            <div className="mv-card">
                                <div className="mv-card-bg" aria-hidden="true">
                                    V
                                </div>
                                <div
                                    className="mv-card-accent"
                                    style={{ background: '#E91E8C' }}
                                />
                                <div className="mv-card-label">Our Vision</div>
                                <div className="mv-card-title">
                                    Southeast
                                    <br />
                                    Asia's Best.
                                </div>
                                <p className="mv-card-body">
                                    To be the most trusted printing and
                                    advertising partner in Southeast Asia —
                                    known for{' '}
                                    <strong>precision, innovation</strong>, and
                                    a team that treats every project as if it
                                    were their own brand on the line.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ VALUES ══ */}
                <section className="val-sec" aria-label="Our values">
                    <div className="wrap">
                        <div className="val-hdr">
                            <div className="eyebrow">Our Values</div>
                            <h2 className="sec-title">
                                What <em>Drives</em> Us
                            </h2>
                        </div>
                        <div className="val-grid">
                            {VALUES.map((v, i) => (
                                <div key={v.title} className="val-card">
                                    <style>{`.val-card:nth-child(${i + 1})::before { background: ${v.color}; }`}</style>
                                    <i
                                        className={`bi ${v.icon} val-icon`}
                                        style={{ color: v.color }}
                                        aria-hidden="true"
                                    />
                                    <div className="val-title">{v.title}</div>
                                    <p className="val-desc">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ TIMELINE ══ */}
                <section className="timeline-sec" aria-label="Company history">
                    <div className="tl-bg" aria-hidden="true">
                        TIMELINE
                    </div>
                    <div className="wrap">
                        <div className="tl-hdr">
                            <div
                                className="eyebrow"
                                style={{ color: 'var(--C)' }}
                            >
                                <style>{`.timeline-sec .eyebrow::before { background: var(--C) !important; }`}</style>
                                Our Journey
                            </div>
                            <h2 className="sec-title">
                                15 Years of{' '}
                                <em
                                    style={{
                                        background:
                                            'linear-gradient(135deg, var(--C), var(--Y))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Growth
                                </em>
                            </h2>
                        </div>

                        <div className="tl-layout">
                            {/* Year selector */}
                            <div
                                className="tl-years"
                                role="tablist"
                                aria-label="Timeline years"
                            >
                                {MILESTONES.map((m, i) => (
                                    <button
                                        key={m.year}
                                        className={`tl-year-btn ${i === activeYear ? 'active' : ''}`}
                                        onClick={() => setActiveYear(i)}
                                        role="tab"
                                        aria-selected={i === activeYear}
                                        style={i === activeYear ? {} : {}}
                                    >
                                        <div
                                            className="tl-year-dot"
                                            style={
                                                i === activeYear
                                                    ? { background: '#00B4D8' }
                                                    : {}
                                            }
                                        />
                                        <div>
                                            <div className="tl-year-num">
                                                {m.year}
                                            </div>
                                            <div className="tl-year-label">
                                                {m.title}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Detail panel */}
                            <div className="tl-detail">
                                <div
                                    className="tl-detail-bg"
                                    aria-hidden="true"
                                >
                                    {MILESTONES[activeYear].year}
                                </div>
                                <span className="tl-detail-year">
                                    {MILESTONES[activeYear].year}
                                </span>
                                <div className="tl-detail-title">
                                    {MILESTONES[activeYear].title}
                                </div>
                                <p className="tl-detail-desc">
                                    {MILESTONES[activeYear].desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ TEAM ══ */}
                <section className="team-sec" aria-label="Our team">
                    <div className="wrap">
                        <div className="team-hdr">
                            <div className="eyebrow">The Team</div>
                            <h2 className="sec-title">
                                People <em>Behind</em> the Print
                            </h2>
                        </div>
                        <div className="team-grid">
                            {TEAM.map((member, i) => (
                                <div key={member.name} className="team-card">
                                    <style>{`
                                        .team-card:nth-child(${i + 1}) .team-avatar {
                                            background: ${member.color};
                                            box-shadow: 0 0 0 0 ${member.color}40;
                                        }
                                        .team-card:nth-child(${i + 1}):hover .team-avatar {
                                            box-shadow: 0 0 24px ${member.color}55;
                                        }
                                        .team-card:nth-child(${i + 1})::after {
                                            background: ${member.color};
                                        }
                                    `}</style>
                                    <div className="team-avatar">
                                        {member.initial}
                                    </div>
                                    <div className="team-name">
                                        {member.name}
                                    </div>
                                    <div className="team-role">
                                        {member.role}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ AWARDS ══ */}
                <section
                    className="awards-sec"
                    aria-label="Awards and recognition"
                >
                    <div className="wrap">
                        <div className="awards-hdr">
                            <div className="eyebrow">Recognition</div>
                            <h2 className="sec-title">
                                Awards & <em>Achievements</em>
                            </h2>
                        </div>
                        <div className="awards-grid">
                            {AWARDS.map((a) => (
                                <div key={a.title} className="award-card">
                                    <i
                                        className="bi bi-trophy-fill award-icon"
                                        aria-hidden="true"
                                    />
                                    <div className="award-title">{a.title}</div>
                                    <div className="award-body">{a.body}</div>
                                    <div className="award-year">{a.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ CTA ══ */}
                <section className="cta-sec" aria-label="Call to action">
                    <div className="cta-bg-txt" aria-hidden="true">
                        DONE
                    </div>
                    <div className="cta-glow" aria-hidden="true" />
                    <div className="cta-inner">
                        <h2 className="cta-title">
                            Let's Build
                            <span className="cta-accent">Something Great.</span>
                        </h2>
                        <p className="cta-desc">
                            Whether you have a brief ready or just an idea — our
                            team is ready to bring it to life.
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
                                <span>Start a Project</span>
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
                                See Our Work
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
