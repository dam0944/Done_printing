import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { useState, useRef, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Project {
    id: number;
    title: string;
    client: string;
    category: string;
    tags: string[];
    accent: string;
    num: string;
    desc: string;
    image: string; // ← Unsplash URL
    featured?: boolean;
    size?: 'large' | 'tall' | 'wide' | 'normal';
}

interface Category {
    id: string;
    label: string;
    color: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
    { id: 'all', label: 'All Work', color: '#C0C0C0' },
    { id: 'offset', label: 'Offset Print', color: '#00B4D8' },
    { id: 'large', label: 'Large Format', color: '#E91E8C' },
    { id: 'packaging', label: 'Packaging', color: '#FFD600' },
    { id: 'branding', label: 'Branding', color: '#00B4D8' },
    { id: 'advertising', label: 'Advertising', color: '#E91E8C' },
];

// Unsplash images — printing / branding / design themed, all w=900 for performance
const PROJECTS: Project[] = [
    {
        id: 1,
        num: '001',
        size: 'large',
        featured: true,
        category: 'branding',
        accent: '#00B4D8',
        title: 'Royal Brand Identity System',
        client: 'Royal Beverages Co.',
        tags: ['Brand', 'Print', 'Packaging'],
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=900&q=80&fit=crop',
        desc: 'Full brand identity print rollout — stationery, packaging, labels, and corporate materials across 12 product lines.',
    },
    {
        id: 2,
        num: '002',
        size: 'tall',
        category: 'large',
        accent: '#E91E8C',
        title: 'Event Grand Banner Series',
        client: 'Sokha Hotels Group',
        tags: ['Large Format', 'Event'],
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80&fit=crop',
        desc: 'Series of 40+ large-format banners and backdrop prints for a national hospitality conference.',
    },
    {
        id: 3,
        num: '003',
        category: 'packaging',
        accent: '#FFD600',
        title: 'Premium Gift Box Range',
        client: 'Phnom Penh Chocolates',
        tags: ['Packaging', 'Foil', 'Emboss'],
        image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=900&q=80&fit=crop',
        desc: 'Luxury gift box collection with foil stamping, embossing, and spot UV on premium board stock.',
    },
    {
        id: 4,
        num: '004',
        size: 'wide',
        category: 'offset',
        accent: '#00B4D8',
        title: 'City Magazine — Annual Edition',
        client: 'Phnom Penh Life Magazine',
        tags: ['Offset', 'Magazine', 'CMYK'],
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80&fit=crop',
        desc: 'Full 128-page glossy magazine print run, 10,000 copies, with perfect binding and UV coating.',
    },
    {
        id: 5,
        num: '005',
        category: 'advertising',
        accent: '#E91E8C',
        title: 'Street Campaign Billboard',
        client: 'Wing Bank Cambodia',
        tags: ['Advertising', 'Outdoor', 'Billboard'],
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=900&q=80&fit=crop',
        desc: 'City-wide outdoor advertising campaign — 8 billboard formats and 200+ bus shelter panels.',
    },
    {
        id: 6,
        num: '006',
        category: 'offset',
        accent: '#FFD600',
        title: 'Product Launch Brochure',
        client: 'Smart Axiata',
        tags: ['Brochure', 'Offset', 'Die-cut'],
        image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=900&q=80&fit=crop',
        desc: 'Die-cut tri-fold brochure for 5G product launch, 50,000 copies, coated stock with spot UV.',
    },
    {
        id: 7,
        num: '007',
        size: 'tall',
        category: 'offset',
        accent: '#00B4D8',
        title: 'Restaurant Menu Collection',
        client: 'Malis Restaurant',
        tags: ['Menu', 'Leather', 'Premium'],
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop',
        desc: 'Bespoke leather-bound menu with foil-printed inserts for award-winning Cambodian fine dining.',
    },
    {
        id: 8,
        num: '008',
        category: 'advertising',
        accent: '#E91E8C',
        title: 'NGO Campaign Materials',
        client: 'Mith Samlanh Foundation',
        tags: ['Non-profit', 'Posters', 'Impact'],
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80&fit=crop',
        desc: 'National awareness campaign — posters, flyers, and banners across 12 provinces of Cambodia.',
    },
    {
        id: 9,
        num: '009',
        size: 'large',
        category: 'packaging',
        accent: '#FFD600',
        title: 'Cosmetics Packaging Line',
        client: 'Borey Beauty',
        tags: ['Packaging', 'Cosmetics', 'Luxury'],
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&fit=crop',
        desc: 'Complete cosmetics packaging suite — boxes, inserts, labels, and tissue wrapping for 20 SKUs.',
    },
    {
        id: 10,
        num: '010',
        category: 'large',
        accent: '#00B4D8',
        title: 'Trade Show Display System',
        client: 'Chip Mong Group',
        tags: ['Exhibition', 'Large Format', 'Modular'],
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80&fit=crop',
        desc: 'Modular trade show display system with tension fabric, roll-up banners, and printed floor graphics.',
    },
    {
        id: 11,
        num: '011',
        category: 'offset',
        accent: '#E91E8C',
        title: 'Annual Report — Luxury Edition',
        client: 'ABA Bank Cambodia',
        tags: ['Annual Report', 'Premium', 'Bound'],
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=80&fit=crop',
        desc: 'Hardcover perfect-bound annual report, gold foil title treatment, 160pp on silk-coated stock.',
    },
    {
        id: 12,
        num: '012',
        size: 'wide',
        category: 'branding',
        accent: '#FFD600',
        title: 'Fashion Week Collateral',
        client: 'Cambodia Fashion Week',
        tags: ['Fashion', 'Event', 'Premium'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop',
        desc: 'Complete print collateral for annual fashion event — lookbooks, invitations, bags, and signage.',
    },
];

const STATS = [
    { val: '5K+', lbl: 'Projects Completed', color: '#00B4D8' },
    { val: '120+', lbl: 'Brand Clients', color: '#E91E8C' },
    { val: '15+', lbl: 'Industry Sectors', color: '#FFD600' },
    { val: '98%', lbl: 'Client Retention', color: '#00B4D8' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Work() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(9);
    const [lightbox, setLightbox] = useState<Project | null>(null);
    const statsRef = useRef<HTMLElement>(null);
    const [statsVis, setStatsVis] = useState(false);

    const filtered =
        activeFilter === 'all'
            ? PROJECTS
            : PROJECTS.filter((p) => p.category === activeFilter);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    useEffect(() => {
        setVisibleCount(9);
    }, [activeFilter]);

    useEffect(() => {
        const el = statsRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setStatsVis(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.3 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox(null);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [lightbox]);

    return (
        <MainLayout>
            <Head title="Work — Done Printing House & Advertising" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Barlow:wght@400;500;600&display=swap');

                :root {
                    --M: #E91E8C; --C: #00B4D8; --Y: #FFD600;
                    --K: #080808; --s1: #0f0f0f; --s2: #161616; --s3: #1d1d1d;
                    --silver: #C0C0C0; --dim: #686868;
                }
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { background: var(--K) !important; color: #fff; }

                .work-page { font-family: 'Barlow', sans-serif; background: var(--K); overflow-x: hidden; }
                .wrap { max-width: 1300px; margin: 0 auto; padding: 0 40px; }

                .eyebrow {
                    display: inline-flex; align-items: center; gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 5px;
                    text-transform: uppercase; color: var(--M); margin-bottom: 14px;
                }
                .eyebrow::before { content: ''; display: inline-block; width: 22px; height: 2px; background: currentColor; }

                .sec-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px,5.5vw,72px); line-height:.92; color: white; }
                .sec-title em { font-style: normal; background: linear-gradient(135deg,var(--C),var(--M)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

                /* Buttons */
                .btn-p {
                    position: relative; display: inline-flex; align-items: center; gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px;
                    letter-spacing: 3px; text-transform: uppercase; text-decoration: none; color: #000;
                    padding: 15px 38px; background: linear-gradient(135deg,var(--C),var(--M));
                    clip-path: polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
                    transition: transform .3s,box-shadow .3s; overflow: hidden; white-space: nowrap;
                }
                .btn-p::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,var(--M),var(--Y)); opacity:0; transition:opacity .3s; }
                .btn-p > * { position: relative; z-index: 1; }
                .btn-p:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(233,30,140,.5); }
                .btn-p:hover::after { opacity:1; }

                .btn-o {
                    display: inline-flex; align-items: center; gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px;
                    letter-spacing: 3px; text-transform: uppercase; text-decoration: none;
                    color: var(--silver); padding: 14px 38px;
                    border: 1px solid rgba(192,192,192,.2);
                    clip-path: polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
                    transition: all .3s; white-space: nowrap;
                }
                .btn-o:hover { border-color:var(--C); color:var(--C); background:rgba(0,180,216,.07); box-shadow:0 0 30px rgba(0,180,216,.15); }

                /* ══ HERO ══ */
                .wk-hero {
                    position: relative; padding: 160px 0 110px;
                    background: var(--K); overflow: hidden;
                    border-bottom: 1px solid rgba(255,255,255,.05);
                }
                .wk-hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px); background-size:64px 64px; pointer-events:none; }
                .wk-hero-gl  { position:absolute; left:-200px; top:0; width:600px; height:600px; background:radial-gradient(circle,rgba(233,30,140,.14) 0%,transparent 65%); pointer-events:none; }
                .wk-hero-gr  { position:absolute; right:-100px; bottom:-80px; width:500px; height:500px; background:radial-gradient(circle,rgba(0,180,216,.12) 0%,transparent 65%); pointer-events:none; }
                .wk-hero-bg  { position:absolute; right:-20px; top:50%; transform:translateY(-50%); font-family:'Bebas Neue',sans-serif; font-size:clamp(130px,20vw,280px); color:rgba(255,255,255,.022); white-space:nowrap; pointer-events:none; user-select:none; letter-spacing:10px; line-height:1; }
                .wk-hero-slice { position:absolute; bottom:-2px; left:0; right:0; height:100px; background:var(--K); clip-path:polygon(0 60%,100% 0,100% 100%,0 100%); pointer-events:none; z-index:3; }

                .wk-hero-inner { position:relative; z-index:2; display:flex; align-items:flex-end; justify-content:space-between; gap:40px; flex-wrap:wrap; }

                .wk-hero-tag { display:inline-flex; align-items:center; gap:10px; background:rgba(233,30,140,.07); border:1px solid rgba(233,30,140,.22); padding:6px 16px; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); margin-bottom:28px; opacity:0; transform:translateY(16px); animation:up .6s .1s forwards; }
                .wk-hero-tag-dot { width:6px; height:6px; border-radius:50%; background:var(--M); animation:pulse 2s infinite; }
                .wk-hero-tag-txt { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:11px; letter-spacing:4px; text-transform:uppercase; color:var(--M); }

                .wk-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(64px,10vw,150px); line-height:.87; letter-spacing:3px; opacity:0; transform:translateY(30px); animation:up .9s .25s forwards; }
                .wk-ht1 { display:block; background:linear-gradient(135deg,#fff 0%,#bbb 70%,#888 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
                .wk-ht2 { display:block; background:linear-gradient(135deg,var(--M) 0%,var(--C) 60%,var(--Y) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; filter:drop-shadow(0 0 40px rgba(233,30,140,.35)); }

                .wk-hero-sub { font-family:'Barlow Condensed',sans-serif; font-size:clamp(15px,2vw,20px); letter-spacing:1.5px; line-height:1.6; color:var(--dim); max-width:440px; margin-top:12px; opacity:0; transform:translateY(18px); animation:up .8s .45s forwards; }
                .wk-hero-right { opacity:0; transform:translateY(20px); animation:up .8s .6s forwards; flex-shrink:0; }

                /* CMYK bar */
                .cmyk-bar { display:flex; height:4px; }
                .cmyk-bar span { flex:1; }

                /* ══ STATS ══ */
                .wk-stats { background:var(--s1); border-bottom:1px solid rgba(255,255,255,.05); }
                .wk-stats-grid { max-width:1300px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }
                .wk-stat { padding:52px 28px; text-align:center; position:relative; transition:background .3s; cursor:default; }
                .wk-stat:hover { background:rgba(255,255,255,.02); }
                .wk-stat:not(:last-child)::after { content:''; position:absolute; right:0; top:22%; height:56%; width:1px; background:rgba(255,255,255,.06); }
                .wk-stat-bar { height:3px; width:32px; border-radius:2px; margin:0 auto 18px; transition:width .35s; }
                .wk-stat:hover .wk-stat-bar { width:56px; }
                .wk-stat-val { font-family:'Bebas Neue',sans-serif; font-size:clamp(46px,5.5vw,76px); line-height:1; margin-bottom:7px; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; transition:filter .3s; }
                .wk-stat:hover .wk-stat-val { filter:brightness(1.25); }
                .wk-stat-lbl { font-family:'Barlow Condensed',sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#3a3a3a; }

                /* ══ FILTER ══ */
                .filter-sec {
                    padding: 0; background: rgba(8,8,8,.96); backdrop-filter: blur(20px);
                    position: sticky; top: 72px; z-index: 100;
                    border-bottom: 1px solid rgba(255,255,255,.06);
                }
                .filter-inner { display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; padding:20px 0; }
                .filter-tabs { display:flex; gap:4px; flex-wrap:wrap; }
                .filter-btn { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:13px; letter-spacing:2.5px; text-transform:uppercase; padding:9px 20px; border:1px solid transparent; background:transparent; color:var(--dim); cursor:pointer; transition:all .25s; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); }
                .filter-btn:hover { color:white; background:rgba(255,255,255,.04); }
                .filter-btn.active { color:#000; }
                .filter-count { font-family:'Barlow Condensed',sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#333; white-space:nowrap; }
                .filter-count strong { color:#666; }

                /* ══ PORTFOLIO GRID ══ */
                .portfolio-sec { padding: 60px 0 100px; background: var(--K); }

                .portfolio-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: 300px;
                    gap: 4px;
                }
                .proj-card[data-size="large"] { grid-column: span 2; grid-row: span 2; }
                .proj-card[data-size="tall"]  { grid-row: span 2; }
                .proj-card[data-size="wide"]  { grid-column: span 2; }

                .proj-card {
                    position: relative; overflow: hidden; cursor: pointer;
                    background: var(--s2);
                    transition: transform .4s cubic-bezier(.16,1,.3,1);
                }
                .proj-card:hover { transform: scale(1.015); z-index: 2; }

                /* ── Real photo background ── */
                .proj-img {
                    position: absolute; inset: 0;
                    background-size: cover;
                    background-position: center;
                    transition: transform .6s cubic-bezier(.16,1,.3,1), filter .4s ease;
                    filter: brightness(.55) saturate(.9);
                }
                .proj-card:hover .proj-img {
                    transform: scale(1.07);
                    filter: brightness(.4) saturate(1.1);
                }

                /* Dark gradient over image for text legibility */
                .proj-grad {
                    position: absolute; inset: 0;
                    background: linear-gradient(
                        to top,
                        rgba(0,0,0,.92) 0%,
                        rgba(0,0,0,.5) 45%,
                        rgba(0,0,0,.1) 100%
                    );
                    transition: opacity .4s;
                }
                .proj-card:hover .proj-grad { opacity: 1; }

                /* Accent colour overlay tint on hover */
                .proj-tint {
                    position: absolute; inset: 0; opacity: 0;
                    transition: opacity .4s ease;
                    mix-blend-mode: multiply;
                }
                .proj-card:hover .proj-tint { opacity: .18; }

                /* Number badge */
                .proj-num {
                    position: absolute; top: 20px; left: 24px;
                    font-family: 'Bebas Neue', sans-serif; font-size: 12px;
                    letter-spacing: 3px; color: rgba(255,255,255,.4);
                    transition: color .3s; z-index: 3;
                }
                .proj-card:hover .proj-num { color: rgba(255,255,255,.75); }

                /* Category badge top-right */
                .proj-cat-tag {
                    position: absolute; top: 18px; right: 18px; z-index: 3;
                    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
                    font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
                    color: #000; padding: 4px 12px;
                    clip-path: polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
                    opacity: 0; transform: translateY(-8px);
                    transition: opacity .35s, transform .35s;
                }
                .proj-card:hover .proj-cat-tag { opacity: 1; transform: translateY(0); }

                /* Content at bottom */
                .proj-content {
                    position: absolute; inset: 0; z-index: 3;
                    display: flex; flex-direction: column; justify-content: flex-end;
                    padding: 28px 32px;
                }

                .proj-tags {
                    display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px;
                    transform: translateY(10px); opacity: 0;
                    transition: all .35s .05s;
                }
                .proj-card:hover .proj-tags { transform: translateY(0); opacity: 1; }
                .proj-tag { font-family:'Barlow Condensed',sans-serif; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,.55); border:1px solid rgba(255,255,255,.18); padding:2px 8px; }

                .proj-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(22px,2.5vw,34px); letter-spacing: 1.5px; line-height: 1;
                    color: white; margin-bottom: 6px;
                    text-shadow: 0 2px 16px rgba(0,0,0,.9);
                }
                .proj-card[data-size="large"] .proj-title { font-size: clamp(30px,3.5vw,52px); }

                .proj-client {
                    font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
                    letter-spacing: 2.5px; text-transform: uppercase;
                    color: rgba(255,255,255,.4);
                    transform: translateY(6px); opacity: 0; transition: all .35s .08s;
                }
                .proj-card:hover .proj-client { transform: translateY(0); opacity: 1; }

                /* View arrow */
                .proj-view {
                    position: absolute; bottom: 28px; right: 28px; z-index: 3;
                    width: 40px; height: 40px;
                    display: flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(255,255,255,.3); color: white; font-size: 16px;
                    clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
                    opacity: 0; transform: scale(.7);
                    transition: opacity .3s .1s, transform .3s .1s;
                }
                .proj-card:hover .proj-view { opacity: 1; transform: scale(1); }

                /* Bottom accent strip */
                .proj-strip {
                    position: absolute; bottom: 0; left: 0; right: 0; height: 3px; z-index: 4;
                    transform: scaleX(0); transform-origin: left;
                    transition: transform .45s cubic-bezier(.16,1,.3,1);
                }
                .proj-card:hover .proj-strip { transform: scaleX(1); }

                /* Load more */
                .load-more-wrap { text-align:center; padding:52px 0 0; }
                .load-more-btn { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:14px; letter-spacing:3px; text-transform:uppercase; color:var(--dim); background:none; border:1px solid rgba(255,255,255,.1); padding:14px 40px; cursor:pointer; clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%); transition:all .3s; display:inline-flex; align-items:center; gap:10px; }
                .load-more-btn:hover { color:white; border-color:var(--C); background:rgba(0,180,216,.06); box-shadow:0 0 24px rgba(0,180,216,.12); }

                /* ══ FEATURED LIST ══ */
                .featured-sec { padding:100px 0 110px; background:var(--s1); border-top:1px solid rgba(255,255,255,.04); }
                .featured-hdr { margin-bottom:56px; }
                .featured-list { display:flex; flex-direction:column; gap:3px; }

                .feat-row {
                    display: grid; grid-template-columns: 120px 1fr auto;
                    align-items: center; gap: 0;
                    background: var(--s2); position: relative; overflow: hidden;
                    cursor: pointer; transition: background .3s, transform .3s;
                }
                .feat-row:hover { background: var(--s3); transform: translateX(6px); }
                .feat-row::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; transform:scaleY(0); transform-origin:top; transition:transform .4s cubic-bezier(.16,1,.3,1); }
                .feat-row:hover::before { transform:scaleY(1); }

                /* Thumbnail */
                .feat-thumb {
                    width: 120px; height: 80px; flex-shrink: 0;
                    background-size: cover; background-position: center;
                    position: relative; overflow: hidden;
                }
                .feat-thumb::after { content:''; position:absolute; inset:0; background:rgba(0,0,0,.3); transition:background .3s; }
                .feat-row:hover .feat-thumb::after { background:rgba(0,0,0,.1); }

                .feat-info { padding: 20px 28px; }
                .feat-title { font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:clamp(16px,2vw,24px); letter-spacing:1px; text-transform:uppercase; color:white; margin-bottom:5px; transition:color .3s; }
                .feat-meta { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
                .feat-client { font-family:'Barlow Condensed',sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#3a3a3a; }
                .feat-tags { display:flex; gap:6px; }
                .feat-tag { font-family:'Barlow Condensed',sans-serif; font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:rgba(255,255,255,.25); border:1px solid rgba(255,255,255,.1); padding:2px 8px; }

                .feat-arrow { padding: 20px 28px; font-size:20px; color:#2a2a2a; transition:color .3s,transform .3s; flex-shrink:0; }
                .feat-row:hover .feat-arrow { transform:translateX(6px); }

                /* ══ CTA ══ */
                .cta-sec { padding:130px 0; background:var(--K); position:relative; overflow:hidden; }
                .cta-glow { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:900px; height:500px; background:radial-gradient(ellipse,rgba(233,30,140,.1) 0%,transparent 70%); pointer-events:none; }
                .cta-bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:'Bebas Neue',sans-serif; font-size:clamp(100px,20vw,280px); color:rgba(255,255,255,.018); white-space:nowrap; pointer-events:none; user-select:none; letter-spacing:12px; }
                .cta-inner { position:relative; z-index:2; text-align:center; max-width:720px; margin:0 auto; padding:0 24px; }
                .cta-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(50px,8vw,108px); line-height:.9; color:white; margin-bottom:22px; }
                .cta-accent { display:block; background:linear-gradient(135deg,var(--C) 0%,var(--M) 50%,var(--Y) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
                .cta-desc { font-family:'Barlow Condensed',sans-serif; font-size:clamp(16px,2vw,20px); letter-spacing:1px; color:var(--dim); margin-bottom:48px; line-height:1.65; }
                .cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

                /* ══ LIGHTBOX ══ */
                .lb-backdrop {
                    position:fixed; inset:0; z-index:9999;
                    background:rgba(0,0,0,.94); backdrop-filter:blur(20px);
                    display:flex; align-items:center; justify-content:center;
                    padding:24px; animation:fadeIn .25s ease;
                }
                .lb-panel {
                    background:var(--s2); max-width:780px; width:100%;
                    position:relative; animation:scaleIn .3s cubic-bezier(.16,1,.3,1); overflow:hidden;
                    max-height: 90vh; overflow-y: auto;
                }
                .lb-img {
                    width:100%; height:300px;
                    background-size:cover; background-position:center;
                    position:relative;
                }
                .lb-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 60%); }
                .lb-img-title { position:absolute; bottom:24px; left:32px; font-family:'Bebas Neue',sans-serif; font-size:clamp(28px,4vw,48px); letter-spacing:2px; color:white; line-height:1; }
                .lb-top { height:4px; background:linear-gradient(90deg,var(--C),var(--M),var(--Y)); }
                .lb-body { padding:36px 40px 44px; }
                .lb-num { font-family:'Bebas Neue',sans-serif; font-size:12px; letter-spacing:4px; color:var(--dim); margin-bottom:8px; display:block; }
                .lb-client { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:13px; letter-spacing:3px; text-transform:uppercase; margin-bottom:20px; display:block; }
                .lb-desc { font-size:15px; line-height:1.8; color:var(--dim); margin-bottom:24px; }
                .lb-tags { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:32px; }
                .lb-tag { font-family:'Barlow Condensed',sans-serif; font-size:11px; letter-spacing:2px; text-transform:uppercase; padding:5px 14px; border:1px solid rgba(255,255,255,.12); color:rgba(255,255,255,.4); }
                .lb-close { position:absolute; top:16px; right:16px; width:36px; height:36px; background:rgba(0,0,0,.5); border:none; cursor:pointer; color:white; font-size:16px; display:flex; align-items:center; justify-content:center; transition:background .2s; z-index:10; }
                .lb-close:hover { background:rgba(255,255,255,.15); }

                /* Keyframes */
                @keyframes up    { to { opacity:1; transform:translate(0,0); } }
                @keyframes pulse { 0%,100% { opacity:1;transform:scale(1); } 50% { opacity:.4;transform:scale(.8); } }
                @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
                @keyframes scaleIn { from { opacity:0;transform:scale(.94) translateY(20px); } to { opacity:1;transform:scale(1) translateY(0); } }

                /* ══ RESPONSIVE ══ */
                @media (max-width: 1024px) {
                    .portfolio-grid { grid-template-columns:repeat(2,1fr); grid-auto-rows:280px; }
                    .proj-card[data-size="large"] { grid-column:span 2; }
                    .wk-stats-grid { grid-template-columns:repeat(2,1fr); }
                    .wk-stat:nth-child(2)::after { display:none; }
                }
                @media (max-width: 768px) {
                    .wrap { padding:0 22px; }
                    .wk-hero { padding:130px 0 80px; }
                    .wk-hero-inner { flex-direction:column; align-items:flex-start; }
                    .filter-sec { top:0; }
                    .filter-inner { flex-direction:column; align-items:flex-start; gap:12px; }
                    .feat-row { grid-template-columns:90px 1fr auto; }
                    .feat-thumb { width:90px; height:68px; }
                    .lb-body { padding:24px 24px 32px; }
                    .lb-img { height:220px; }
                    .featured-sec,.cta-sec { padding:80px 0 88px; }
                    .cta-btns { flex-direction:column; align-items:center; }
                    .btn-p,.btn-o { clip-path:none; border-radius:2px; justify-content:center; min-width:240px; }
                }
                @media (max-width: 600px) {
                    .portfolio-grid { grid-template-columns:1fr; grid-auto-rows:240px; }
                    .proj-card[data-size="large"],.proj-card[data-size="wide"] { grid-column:span 1; }
                    .proj-card[data-size="tall"] { grid-row:span 1; }
                    .wk-stats-grid { grid-template-columns:repeat(2,1fr); }
                    .filter-btn { font-size:11px; padding:7px 12px; }
                    .feat-tags { display:none; }
                    .feat-row { grid-template-columns:80px 1fr 40px; }
                    .feat-info { padding:16px 18px; }
                    .feat-arrow { padding:16px 14px; }
                }
            `}</style>

            <div className="work-page">
                {/* ══ HERO ══ */}
                <section className="wk-hero">
                    <div className="wk-hero-grid" aria-hidden="true" />
                    <div className="wk-hero-gl" aria-hidden="true" />
                    <div className="wk-hero-gr" aria-hidden="true" />
                    <div className="wk-hero-bg" aria-hidden="true">
                        PORTFOLIO
                    </div>
                    <div className="wrap wk-hero-inner">
                        <div>
                            <div className="wk-hero-tag">
                                <div className="wk-hero-tag-dot" />
                                <span className="wk-hero-tag-txt">
                                    Portfolio — {PROJECTS.length} Projects
                                </span>
                            </div>
                            <h1 className="wk-hero-title">
                                <span className="wk-ht1">Our</span>
                                <span className="wk-ht2">Work.</span>
                            </h1>
                            <p className="wk-hero-sub">
                                From brand identities to large-format campaigns
                                — every project we take on is a chance to print
                                something unforgettable.
                            </p>
                        </div>
                        <div className="wk-hero-right">
                            <Link href="/contact" className="btn-p">
                                <span>Start a Project</span>
                                <i
                                    className="bi bi-arrow-right"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="wk-hero-slice" aria-hidden="true" />
                </section>

                {/* CMYK bar */}
                <div className="cmyk-bar" aria-hidden="true">
                    <span style={{ background: '#00B4D8' }} />
                    <span style={{ background: '#E91E8C' }} />
                    <span style={{ background: '#FFD600' }} />
                    <span style={{ background: '#1c1c1c' }} />
                </div>

                {/* ══ STATS ══ */}
                <section
                    ref={statsRef}
                    className="wk-stats"
                    aria-label="Work statistics"
                >
                    <div className="wk-stats-grid">
                        {STATS.map((s) => (
                            <div key={s.lbl} className="wk-stat">
                                <div
                                    className="wk-stat-bar"
                                    style={{ background: s.color }}
                                />
                                <div
                                    className="wk-stat-val"
                                    style={{
                                        background: `linear-gradient(135deg,${s.color},#fff)`,
                                        WebkitBackgroundClip: 'text',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {statsVis ? s.val : '—'}
                                </div>
                                <div className="wk-stat-lbl">{s.lbl}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══ FILTER ══ */}
                <div
                    className="filter-sec"
                    role="navigation"
                    aria-label="Filter projects"
                >
                    <div className="wrap filter-inner">
                        <div className="filter-tabs" role="tablist">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                                    style={
                                        activeFilter === cat.id
                                            ? {
                                                  background: cat.color,
                                                  color: '#000',
                                              }
                                            : {}
                                    }
                                    onClick={() => setActiveFilter(cat.id)}
                                    role="tab"
                                    aria-selected={activeFilter === cat.id}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                        <div className="filter-count">
                            Showing{' '}
                            <strong>
                                {Math.min(visibleCount, filtered.length)}
                            </strong>{' '}
                            of <strong>{filtered.length}</strong>
                        </div>
                    </div>
                </div>

                {/* ══ PORTFOLIO GRID ══ */}
                <section
                    className="portfolio-sec"
                    aria-label="Portfolio projects"
                >
                    <div className="wrap">
                        <div className="portfolio-grid">
                            {visible.map((p) => (
                                <div
                                    key={p.id}
                                    className="proj-card"
                                    data-size={p.size ?? 'normal'}
                                    onClick={() => setLightbox(p)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View project: ${p.title}`}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && setLightbox(p)
                                    }
                                >
                                    {/* Real photo */}
                                    <div
                                        className="proj-img"
                                        style={{
                                            backgroundImage: `url(${p.image})`,
                                        }}
                                        role="img"
                                        aria-label={p.title}
                                    />
                                    {/* Dark gradient */}
                                    <div className="proj-grad" />
                                    {/* Accent colour tint */}
                                    <div
                                        className="proj-tint"
                                        style={{ background: p.accent }}
                                    />

                                    {/* Number */}
                                    <div className="proj-num">{p.num}</div>

                                    {/* Category badge */}
                                    <div
                                        className="proj-cat-tag"
                                        style={{ background: p.accent }}
                                    >
                                        {
                                            CATEGORIES.find(
                                                (c) => c.id === p.category,
                                            )?.label
                                        }
                                    </div>

                                    {/* Content */}
                                    <div className="proj-content">
                                        <div className="proj-tags">
                                            {p.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="proj-tag"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="proj-title">
                                            {p.title}
                                        </div>
                                        <div className="proj-client">
                                            {p.client}
                                        </div>
                                    </div>

                                    {/* View icon */}
                                    <div
                                        className="proj-view"
                                        aria-hidden="true"
                                    >
                                        <i className="bi bi-arrow-up-right" />
                                    </div>

                                    {/* Bottom accent strip */}
                                    <div
                                        className="proj-strip"
                                        style={{ background: p.accent }}
                                    />
                                </div>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="load-more-wrap">
                                <button
                                    className="load-more-btn"
                                    onClick={() =>
                                        setVisibleCount((v) => v + 6)
                                    }
                                >
                                    <span>Load More Projects</span>
                                    <i
                                        className="bi bi-chevron-down"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* ══ FEATURED LIST ══ */}
                <section
                    className="featured-sec"
                    aria-label="Featured projects"
                >
                    <div className="wrap">
                        <div className="featured-hdr">
                            <div className="eyebrow">Spotlight</div>
                            <h2 className="sec-title">
                                Featured <em>Projects</em>
                            </h2>
                        </div>
                        <div className="featured-list">
                            {PROJECTS.slice(0, 6).map((p, i) => (
                                <div
                                    key={p.id}
                                    className="feat-row"
                                    onClick={() => setLightbox(p)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View project: ${p.title}`}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && setLightbox(p)
                                    }
                                >
                                    <style>{`.feat-row:nth-child(${i + 1})::before { background: ${p.accent}; }`}</style>
                                    {/* Thumbnail */}
                                    <div
                                        className="feat-thumb"
                                        style={{
                                            backgroundImage: `url(${p.image})`,
                                        }}
                                        aria-hidden="true"
                                    />
                                    <div className="feat-info">
                                        <div
                                            className="feat-title"
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.color =
                                                    p.accent)
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color =
                                                    'white')
                                            }
                                        >
                                            {p.title}
                                        </div>
                                        <div className="feat-meta">
                                            <span className="feat-client">
                                                {p.client}
                                            </span>
                                            <div className="feat-tags">
                                                {p.tags.slice(0, 2).map((t) => (
                                                    <span
                                                        key={t}
                                                        className="feat-tag"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="feat-arrow"
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                p.accent)
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.color =
                                                '#2a2a2a')
                                        }
                                    >
                                        <i className="bi bi-arrow-right" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ CTA ══ */}
                <section className="cta-sec" aria-label="Call to action">
                    <div className="cta-bg" aria-hidden="true">
                        PRINT
                    </div>
                    <div className="cta-glow" aria-hidden="true" />
                    <div className="cta-inner">
                        <h2 className="cta-title">
                            Your Project,
                            <span className="cta-accent">Done Next.</span>
                        </h2>
                        <p className="cta-desc">
                            Ready to add your brand to our portfolio? Let's
                            create something remarkable together.
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
                                <i
                                    className="bi bi-arrow-right"
                                    aria-hidden="true"
                                />
                            </Link>
                            <Link
                                href="/about"
                                className="btn-o"
                                style={{
                                    padding: '17px 52px',
                                    fontSize: '15px',
                                }}
                            >
                                About Us
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            {/* ══ LIGHTBOX ══ */}
            {lightbox && (
                <div
                    className="lb-backdrop"
                    onClick={(e) =>
                        e.target === e.currentTarget && setLightbox(null)
                    }
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Project: ${lightbox.title}`}
                >
                    <div className="lb-panel">
                        <div className="lb-top" />
                        {/* Full-width image at top */}
                        <div
                            className="lb-img"
                            style={{
                                backgroundImage: `url(${lightbox.image})`,
                            }}
                        >
                            <div className="lb-img-overlay" />
                            <div className="lb-img-title">{lightbox.title}</div>
                        </div>
                        <div className="lb-body">
                            <span className="lb-num">{lightbox.num}</span>
                            <span
                                className="lb-client"
                                style={{ color: lightbox.accent }}
                            >
                                {lightbox.client}
                            </span>
                            <p className="lb-desc">{lightbox.desc}</p>
                            <div className="lb-tags">
                                {lightbox.tags.map((t) => (
                                    <span key={t} className="lb-tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <Link
                                href="/contact"
                                className="btn-p"
                                onClick={() => setLightbox(null)}
                            >
                                <span>Get a Similar Quote</span>
                                <i
                                    className="bi bi-arrow-right"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                        <button
                            className="lb-close"
                            onClick={() => setLightbox(null)}
                            aria-label="Close"
                        >
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
