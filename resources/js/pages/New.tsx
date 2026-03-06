import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Post {
    id: number;
    category: string;
    categoryColor: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    image: string;
    featured?: boolean;
    tag?: string;
    tagColor?: string;
}
interface Category {
    id: string;
    label: string;
    color: string;
    count: number;
}
interface Promo {
    label: string;
    title: string;
    desc: string;
    cta: string;
    accent: string;
    badge?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
    { id: 'all', label: 'All Updates', color: '#C0C0C0', count: 10 },
    { id: 'news', label: 'News', color: '#00B4D8', count: 4 },
    { id: 'services', label: 'New Services', color: '#E91E8C', count: 3 },
    { id: 'promotions', label: 'Promotions', color: '#FFD600', count: 2 },
    { id: 'tips', label: 'Print Tips', color: '#00B4D8', count: 2 },
];

const POSTS: Post[] = [
    {
        id: 1,
        category: 'services',
        categoryColor: '#E91E8C',
        date: 'Feb 20, 2026',
        readTime: '3 min',
        title: 'Introducing Our New UV Spot Varnish Service',
        excerpt:
            'State-of-the-art UV spot varnish technology — adding dramatic tactile finish to business cards, packaging, and premium print materials. Available now.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75&fit=crop',
        featured: true,
        tag: 'NEW SERVICE',
        tagColor: '#E91E8C',
    },
    {
        id: 2,
        category: 'promotions',
        categoryColor: '#FFD600',
        date: 'Feb 15, 2026',
        readTime: '2 min',
        title: 'Lunar New Year Special: 20% Off All Orders',
        excerpt:
            'Celebrate the Year of the Snake with 20% off all print orders placed before February 28. Use code LUNAR2026 at checkout.',
        image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=75&fit=crop',
        tag: '20% OFF',
        tagColor: '#FFD600',
    },
    {
        id: 3,
        category: 'news',
        categoryColor: '#00B4D8',
        date: 'Feb 10, 2026',
        readTime: '4 min',
        title: 'Done Printing Wins Best Print House 2025',
        excerpt:
            'Honoured to receive Best Print House at the Cambodia Business Excellence Awards 2025. Thank you to our incredible clients and team.',
        image: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=75&fit=crop',
        tag: 'AWARD',
        tagColor: '#00B4D8',
    },
    {
        id: 4,
        category: 'services',
        categoryColor: '#E91E8C',
        date: 'Feb 5, 2026',
        readTime: '3 min',
        title: 'Large Format Now Available in 5-Metre Width',
        excerpt:
            'Our wide-format printers now support prints up to 5 metres wide — perfect for stadium banners, building wraps, and large retail installations.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=75&fit=crop',
        tag: 'UPGRADED',
        tagColor: '#E91E8C',
    },
    {
        id: 5,
        category: 'tips',
        categoryColor: '#00B4D8',
        date: 'Jan 28, 2026',
        readTime: '5 min',
        title: '7 Things to Check Before Sending Your Print File',
        excerpt:
            'Bleed, resolution, colour profile, font embedding — our pre-press team shares the most common file errors and how to fix them before you submit.',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=75&fit=crop',
    },
    {
        id: 6,
        category: 'news',
        categoryColor: '#00B4D8',
        date: 'Jan 20, 2026',
        readTime: '3 min',
        title: 'New Production Facility Now Fully Operational',
        excerpt:
            'Our expanded 2,000 sqm production facility in Khan Meanchey is now fully operational — doubling our daily output capacity for faster turnaround.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=75&fit=crop',
        tag: 'EXPANSION',
        tagColor: '#00B4D8',
    },
    {
        id: 7,
        category: 'promotions',
        categoryColor: '#FFD600',
        date: 'Jan 14, 2026',
        readTime: '2 min',
        title: 'Free Delivery on Orders Over $150 in Phnom Penh',
        excerpt:
            'All orders over $150 now qualify for free same-day delivery within Phnom Penh city. No code needed — applied automatically at checkout.',
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=75&fit=crop',
        tag: 'FREE DELIVERY',
        tagColor: '#FFD600',
    },
    {
        id: 8,
        category: 'services',
        categoryColor: '#E91E8C',
        date: 'Jan 8, 2026',
        readTime: '3 min',
        title: 'Introducing Eco-Print: 100% Recycled Stock Options',
        excerpt:
            'Our new Eco-Print range uses 100% recycled paper stocks with plant-based inks — same sharp quality, much smaller environmental footprint.',
        image: 'https://images.unsplash.com/photo-1542601906897-eef2dfd49106?w=800&q=75&fit=crop',
        tag: 'ECO',
        tagColor: '#00B4D8',
    },
    {
        id: 9,
        category: 'tips',
        categoryColor: '#00B4D8',
        date: 'Dec 30, 2025',
        readTime: '6 min',
        title: 'CMYK vs RGB: Which Colour Mode Should You Use?',
        excerpt:
            'We break down the difference between CMYK and RGB, and explain exactly when to use each for the best print colour results.',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=75&fit=crop',
    },
    {
        id: 10,
        category: 'news',
        categoryColor: '#00B4D8',
        date: 'Dec 20, 2025',
        readTime: '2 min',
        title: 'Partnership: Official Printer for PPFW 2026',
        excerpt:
            'Proud to announce our partnership as the official print partner for Phnom Penh Fashion Week 2026. Exciting collateral coming soon.',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=75&fit=crop',
        tag: 'PARTNERSHIP',
        tagColor: '#00B4D8',
    },
];

const PROMOS: Promo[] = [
    {
        label: 'Limited Time',
        title: '20% Off Business Cards',
        desc: 'Order 500+ cards this month and save 20%. Premium matte, gloss, or soft-touch finishes.',
        cta: 'Claim Offer',
        accent: '#FFD600',
        badge: 'ENDS FEB 28',
    },
    {
        label: 'New Service',
        title: 'UV Spot Varnish Launch',
        desc: 'Add dramatic tactile highlights to any print job. Now available across all categories.',
        cta: 'Learn More',
        accent: '#E91E8C',
        badge: 'JUST LAUNCHED',
    },
    {
        label: 'Rush Service',
        title: '6-Hour Express Printing',
        desc: 'Need it today? Express service available for flyers, banners, and business cards.',
        cta: 'Book Express',
        accent: '#00B4D8',
    },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function NewPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(6);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [emailError, setEmailError] = useState('');

    const filtered =
        activeFilter === 'all'
            ? POSTS
            : POSTS.filter((p) => p.category === activeFilter);
    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const featuredPost = POSTS.find((p) => p.featured);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email.');
            return;
        }
        setEmailError('');
        setSubscribed(true);
    };

    return (
        <MainLayout>
            <Head title="What's New — Done Printing House & Advertising" />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
                :root{--M:#E91E8C;--C:#00B4D8;--Y:#FFD600;--K:#080808;--s1:#0f0f0f;--s2:#161616;--s3:#1d1d1d;--silver:#C0C0C0;--dim:#686868;}
                *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
                html{scroll-behavior:smooth;}body{background:var(--K)!important;color:#fff;}
                .np{font-family:'Barlow',sans-serif;background:var(--K);overflow-x:hidden;}
                .wrap{max-width:1300px;margin:0 auto;padding:0 40px;}
                .eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:var(--M);margin-bottom:14px;}
                .eyebrow::before{content:'';display:inline-block;width:22px;height:2px;background:currentColor;}
                .sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,5.5vw,72px);line-height:.92;color:white;}
                .sec-title em{font-style:normal;background:linear-gradient(135deg,var(--C),var(--M));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
                .btn-p{position:relative;display:inline-flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;color:#000;padding:15px 38px;background:linear-gradient(135deg,var(--C),var(--M));clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);transition:transform .3s,box-shadow .3s;overflow:hidden;white-space:nowrap;border:none;cursor:pointer;}
                .btn-p::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--M),var(--Y));opacity:0;transition:opacity .3s;}
                .btn-p>*{position:relative;z-index:1;}
                .btn-p:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(233,30,140,.5);}
                .btn-p:hover::after{opacity:1;}

                /* HERO */
                .np-hero{position:relative;padding:160px 0 110px;background:var(--K);overflow:hidden;border-bottom:1px solid rgba(255,255,255,.05);}
                .np-hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:64px 64px;pointer-events:none;}
                .np-hero-gl{position:absolute;left:-200px;top:0;width:600px;height:600px;background:radial-gradient(circle,rgba(0,180,216,.12) 0%,transparent 65%);pointer-events:none;}
                .np-hero-gr{position:absolute;right:-100px;bottom:-80px;width:500px;height:500px;background:radial-gradient(circle,rgba(233,30,140,.12) 0%,transparent 65%);pointer-events:none;}
                .np-hero-bg{position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:'Bebas Neue',sans-serif;font-size:clamp(120px,20vw,260px);color:rgba(255,255,255,.022);white-space:nowrap;pointer-events:none;user-select:none;letter-spacing:10px;line-height:1;}
                .np-hero-slice{position:absolute;bottom:-2px;left:0;right:0;height:100px;background:var(--K);clip-path:polygon(0 65%,100% 0,100% 100%,0 100%);pointer-events:none;z-index:3;}
                .np-hero-inner{position:relative;z-index:2;display:flex;align-items:flex-end;justify-content:space-between;gap:40px;flex-wrap:wrap;}
                .np-tag{display:inline-flex;align-items:center;gap:10px;background:rgba(0,180,216,.07);border:1px solid rgba(0,180,216,.22);padding:6px 16px;clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);margin-bottom:28px;opacity:0;transform:translateY(16px);animation:up .6s .1s forwards;}
                .np-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--C);animation:pulse 2s infinite;}
                .np-tag-txt{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--C);}
                .np-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(64px,10vw,148px);line-height:.87;letter-spacing:3px;opacity:0;transform:translateY(30px);animation:up .9s .25s forwards;}
                .np-t1{display:block;background:linear-gradient(135deg,#fff 0%,#bbb 70%,#888 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
                .np-t2{display:block;background:linear-gradient(135deg,var(--C) 0%,var(--M) 50%,var(--Y) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 40px rgba(0,180,216,.3));}
                .np-sub{font-family:'Barlow Condensed',sans-serif;font-size:clamp(15px,2vw,20px);letter-spacing:1.5px;line-height:1.65;color:var(--dim);max-width:480px;margin-top:16px;opacity:0;transform:translateY(18px);animation:up .8s .45s forwards;}
                .ticker-card{background:var(--s1);border:1px solid rgba(255,255,255,.07);padding:24px 28px;min-width:260px;position:relative;overflow:hidden;opacity:0;transform:translateY(18px);animation:up .8s .6s forwards;}
                .ticker-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--C),var(--M),var(--Y));}
                .ticker-label{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#3a3a3a;margin-bottom:14px;}
                .ticker-item{display:flex;align-items:center;gap:10px;font-family:'Barlow Condensed',sans-serif;font-size:13px;letter-spacing:1px;color:var(--dim);margin-bottom:10px;}
                .ticker-item:last-child{margin-bottom:0;}
                .ticker-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
                .cmyk-bar{display:flex;height:4px;}
                .cmyk-bar span{flex:1;}

                /* PROMOS */
                .promo-sec{padding:72px 0 80px;background:var(--s1);border-bottom:1px solid rgba(255,255,255,.04);}
                .promo-hdr{margin-bottom:44px;}
                .promo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;}
                .promo-card{padding:40px 36px;background:var(--s2);position:relative;overflow:hidden;transition:background .3s,transform .35s;}
                .promo-card:hover{background:var(--s3);transform:translateY(-4px);}
                .promo-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.16,1,.3,1);}
                .promo-card:hover::before{transform:scaleX(1);}
                .promo-badge{display:inline-flex;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#000;padding:4px 12px;clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);margin-bottom:20px;}
                .promo-label{font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--dim);margin-bottom:10px;}
                .promo-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,3vw,38px);letter-spacing:1.5px;color:white;margin-bottom:14px;line-height:1;}
                .promo-desc{font-size:14px;line-height:1.75;color:var(--dim);margin-bottom:24px;}
                .promo-cta{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;display:inline-flex;align-items:center;gap:7px;transition:gap .2s;}
                .promo-cta:hover{gap:12px;}

                /* FEATURED */
                .feat-sec{padding:80px 0 0;background:var(--K);}
                .feat-card{display:grid;grid-template-columns:1fr 1fr;overflow:hidden;cursor:pointer;}
                .feat-visual{position:relative;min-height:440px;overflow:hidden;}
                .feat-img{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.16,1,.3,1),filter .4s;filter:brightness(.6) saturate(.9);}
                .feat-card:hover .feat-img{transform:scale(1.06);filter:brightness(.45) saturate(1.1);}
                .feat-img-grad{position:absolute;inset:0;background:linear-gradient(to right,transparent 50%,rgba(0,0,0,.6) 100%);}
                .feat-label{position:absolute;top:28px;left:28px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#000;padding:5px 14px;clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);}
                .feat-num{position:absolute;bottom:24px;right:28px;font-family:'Bebas Neue',sans-serif;font-size:120px;line-height:.8;color:rgba(255,255,255,.06);user-select:none;}
                .feat-content{padding:52px 56px;display:flex;flex-direction:column;justify-content:center;background:var(--s1);transition:background .3s;}
                .feat-card:hover .feat-content{background:var(--s2);}
                .feat-meta{display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap;}
                .feat-cat{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:3px;text-transform:uppercase;padding:4px 12px;clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);color:#000;}
                .feat-date{font-family:'Barlow Condensed',sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#3a3a3a;}
                .feat-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(28px,4vw,50px);letter-spacing:1.5px;line-height:.95;color:white;margin-bottom:18px;}
                .feat-excerpt{font-size:15px;line-height:1.8;color:var(--dim);margin-bottom:32px;}
                .feat-read{display:inline-flex;align-items:center;gap:8px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;transition:gap .25s;}
                .feat-read:hover{gap:14px;}

                /* POSTS GRID */
                .posts-sec{padding:64px 0 100px;background:var(--K);}
                .posts-filter{position:sticky;top:72px;z-index:100;background:rgba(8,8,8,.96);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06);margin-bottom:48px;padding:18px 0;}
                .pf-inner{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
                .filter-tabs{display:flex;gap:4px;flex-wrap:wrap;}
                .fb{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;padding:8px 18px;border:1px solid transparent;background:transparent;color:var(--dim);cursor:pointer;transition:all .25s;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);}
                .fb:hover{color:white;background:rgba(255,255,255,.04);}
                .fb.active{color:#000;}
                .pcount{font-family:'Barlow Condensed',sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#333;white-space:nowrap;}
                .pcount strong{color:#555;}

                /* ── CARD GRID ── */
                .posts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;}

                .pc{background:var(--s1);overflow:hidden;cursor:pointer;display:flex;flex-direction:column;position:relative;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s;}
                .pc:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.5);z-index:2;}
                .pc::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;z-index:5;transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.16,1,.3,1);}
                .pc:hover::after{transform:scaleX(1);}

                /* Photo block */
                .pc-img{position:relative;height:210px;overflow:hidden;flex-shrink:0;}
                .pc-img-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .6s cubic-bezier(.16,1,.3,1),filter .4s;filter:brightness(.7) saturate(.85);}
                .pc:hover .pc-img-bg{transform:scale(1.08);filter:brightness(.5) saturate(1.1);}
                /* Gradient fade at bottom of image */
                .pc-img-fade{position:absolute;bottom:0;left:0;right:0;height:70px;background:linear-gradient(to bottom,transparent,var(--s1));z-index:2;transition:background .3s;}
                .pc:hover .pc-img-fade{background:linear-gradient(to bottom,transparent,var(--s2));}
                /* Overlaid pills on photo */
                .pc-pills{position:absolute;top:14px;left:14px;display:flex;gap:6px;z-index:3;flex-wrap:wrap;}
                .pc-cat{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#000;padding:4px 10px;clip-path:polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);}
                .pc-badge{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:3px 8px;border:1px solid;background:rgba(0,0,0,.45);backdrop-filter:blur(4px);}
                /* Date top-right on image */
                .pc-date{position:absolute;top:14px;right:14px;z-index:3;font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.6);background:rgba(0,0,0,.5);backdrop-filter:blur(4px);padding:3px 10px;}

                /* Text body */
                .pc-body{padding:20px 26px 26px;flex:1;display:flex;flex-direction:column;background:var(--s1);transition:background .3s;}
                .pc:hover .pc-body{background:var(--s2);}
                .pc-title{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(16px,1.6vw,20px);letter-spacing:.5px;line-height:1.25;color:white;margin-bottom:10px;transition:color .25s;}
                .pc:hover .pc-title{color:var(--silver);}
                .pc-excerpt{font-size:13px;line-height:1.75;color:var(--dim);flex:1;}
                .pc-foot{margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.05);display:flex;align-items:center;justify-content:space-between;}
                .pc-rt{font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#333;display:flex;align-items:center;gap:6px;}
                .pc-arr{font-size:16px;color:#2e2e2e;transition:color .25s,transform .25s;}
                .pc:hover .pc-arr{color:var(--silver);transform:translateX(4px);}

                /* Load more */
                .load-more{text-align:center;padding:52px 0 0;}
                .load-btn{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:var(--dim);background:none;border:1px solid rgba(255,255,255,.1);padding:13px 38px;cursor:pointer;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);transition:all .3s;display:inline-flex;align-items:center;gap:10px;}
                .load-btn:hover{color:white;border-color:var(--C);background:rgba(0,180,216,.06);box-shadow:0 0 24px rgba(0,180,216,.12);}

                /* NEWSLETTER */
                .nl-sec{padding:100px 0 110px;background:var(--s1);border-top:1px solid rgba(255,255,255,.04);position:relative;overflow:hidden;}
                .nl-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:400px;background:radial-gradient(ellipse,rgba(0,180,216,.08) 0%,transparent 70%);pointer-events:none;}
                .nl-bg{position:absolute;bottom:-30px;right:-10px;font-family:'Bebas Neue',sans-serif;font-size:clamp(80px,14vw,200px);color:rgba(255,255,255,.02);pointer-events:none;user-select:none;letter-spacing:8px;line-height:1;}
                .nl-inner{position:relative;z-index:2;max-width:640px;margin:0 auto;text-align:center;padding:0 24px;}
                .nl-icon{font-size:44px;color:var(--C);margin-bottom:20px;display:block;}
                .nl-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,6vw,82px);line-height:.92;color:white;margin-bottom:16px;letter-spacing:2px;}
                .nl-title em{font-style:normal;background:linear-gradient(135deg,var(--C),var(--M));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
                .nl-sub{font-family:'Barlow Condensed',sans-serif;font-size:clamp(15px,2vw,18px);letter-spacing:1px;line-height:1.65;color:var(--dim);margin-bottom:36px;}
                .nl-form{display:flex;max-width:480px;margin:0 auto;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);overflow:hidden;}
                .nl-in{flex:1;padding:16px 22px;background:var(--s3);border:1px solid rgba(255,255,255,.1);border-right:none;color:white;font-family:'Barlow Condensed',sans-serif;font-size:14px;letter-spacing:1px;outline:none;transition:border-color .25s;}
                .nl-in::placeholder{color:#3a3a3a;}
                .nl-in:focus{border-color:var(--C);}
                .nl-err{font-family:'Barlow Condensed',sans-serif;font-size:12px;letter-spacing:2px;color:var(--M);margin-top:12px;text-align:center;}
                .nl-ok{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:18px;letter-spacing:2px;text-transform:uppercase;color:var(--C);margin-top:24px;display:flex;align-items:center;justify-content:center;gap:10px;}
                .nl-note{font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#2e2e2e;margin-top:16px;}

                @keyframes up{to{opacity:1;transform:translate(0,0);}}
                @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.4;transform:scale(.8);}}

                @media(max-width:1024px){
                    .promo-grid{grid-template-columns:1fr 1fr;}
                    .promo-grid>*:last-child{grid-column:span 2;}
                    .feat-card{grid-template-columns:1fr;}
                    .feat-visual{min-height:280px;}
                    .posts-grid{grid-template-columns:repeat(2,1fr);}
                }
                @media(max-width:768px){
                    .wrap{padding:0 22px;}
                    .np-hero{padding:130px 0 80px;}
                    .np-hero-inner{flex-direction:column;align-items:flex-start;}
                    .posts-filter{top:0;}
                    .pf-inner{flex-direction:column;align-items:flex-start;gap:12px;}
                    .feat-content{padding:36px 32px;}
                    .nl-form{flex-direction:column;clip-path:none;}
                    .nl-in{border-right:1px solid rgba(255,255,255,.1);border-bottom:none;}
                    .btn-p{clip-path:none;border-radius:2px;}
                }
                @media(max-width:600px){
                    .promo-grid{grid-template-columns:1fr;}
                    .promo-grid>*:last-child{grid-column:span 1;}
                    .posts-grid{grid-template-columns:1fr;}
                    .fb{font-size:11px;padding:7px 12px;}
                    .pc-img{height:180px;}
                }
            `}</style>

            <div className="np">
                {/* HERO */}
                <section className="np-hero">
                    <div className="np-hero-grid" aria-hidden="true" />
                    <div className="np-hero-gl" aria-hidden="true" />
                    <div className="np-hero-gr" aria-hidden="true" />
                    <div className="np-hero-bg" aria-hidden="true">
                        LATEST
                    </div>
                    <div className="wrap np-hero-inner">
                        <div>
                            <div className="np-tag">
                                <div className="np-tag-dot" />
                                <span className="np-tag-txt">
                                    Latest Updates — {POSTS.length} Posts
                                </span>
                            </div>
                            <h1 className="np-title">
                                <span className="np-t1">What's</span>
                                <span className="np-t2">New.</span>
                            </h1>
                            <p className="np-sub">
                                New services, promotions, industry tips, and
                                company news — everything fresh from Done
                                Printing House.
                            </p>
                        </div>
                        <div className="ticker-card">
                            <div className="ticker-label">Latest Updates</div>
                            {[
                                {
                                    dot: '#E91E8C',
                                    text: 'UV Spot Varnish — Now Available',
                                },
                                {
                                    dot: '#FFD600',
                                    text: '20% Off — Lunar New Year Sale',
                                },
                                {
                                    dot: '#00B4D8',
                                    text: 'Award Win — Best Print House 2025',
                                },
                                {
                                    dot: '#E91E8C',
                                    text: '5-Metre Wide Format — Upgraded',
                                },
                            ].map((t, i) => (
                                <div key={i} className="ticker-item">
                                    <div
                                        className="ticker-dot"
                                        style={{ background: t.dot }}
                                    />
                                    {t.text}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="np-hero-slice" aria-hidden="true" />
                </section>

                <div className="cmyk-bar" aria-hidden="true">
                    <span style={{ background: '#00B4D8' }} />
                    <span style={{ background: '#E91E8C' }} />
                    <span style={{ background: '#FFD600' }} />
                    <span style={{ background: '#1c1c1c' }} />
                </div>

                {/* PROMOS */}
                <section className="promo-sec" aria-label="Promotions">
                    <div className="wrap">
                        <div className="promo-hdr">
                            <div className="eyebrow">Offers</div>
                            <h2 className="sec-title">
                                Current <em>Promotions</em>
                            </h2>
                        </div>
                        <div className="promo-grid">
                            {PROMOS.map((p, i) => (
                                <div key={p.title} className="promo-card">
                                    <style>{`.promo-card:nth-child(${i + 1})::before{background:${p.accent};}`}</style>
                                    {p.badge && (
                                        <div
                                            className="promo-badge"
                                            style={{ background: p.accent }}
                                        >
                                            {p.badge}
                                        </div>
                                    )}
                                    <div className="promo-label">{p.label}</div>
                                    <div className="promo-title">{p.title}</div>
                                    <p className="promo-desc">{p.desc}</p>
                                    <Link
                                        href="/contact"
                                        className="promo-cta"
                                        style={{ color: p.accent }}
                                    >
                                        {p.cta}{' '}
                                        <i
                                            className="bi bi-arrow-right"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FEATURED */}
                {featuredPost && (
                    <section className="feat-sec" aria-label="Featured post">
                        <div className="wrap">
                            <div style={{ marginBottom: '24px' }}>
                                <div className="eyebrow">Featured</div>
                                <h2 className="sec-title">
                                    Top <em>Story</em>
                                </h2>
                            </div>
                            <div className="feat-card">
                                {/* Photo */}
                                <div className="feat-visual">
                                    <div
                                        className="feat-img"
                                        style={{
                                            backgroundImage: `url(${featuredPost.image})`,
                                        }}
                                        role="img"
                                        aria-label={featuredPost.title}
                                    />
                                    <div className="feat-img-grad" />
                                    <div
                                        className="feat-label"
                                        style={{
                                            background:
                                                featuredPost.tagColor ??
                                                featuredPost.categoryColor,
                                        }}
                                    >
                                        {featuredPost.tag ??
                                            featuredPost.category}
                                    </div>
                                    <div
                                        className="feat-num"
                                        aria-hidden="true"
                                    >
                                        {String(featuredPost.id).padStart(
                                            2,
                                            '0',
                                        )}
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="feat-content">
                                    <div className="feat-meta">
                                        <span
                                            className="feat-cat"
                                            style={{
                                                background:
                                                    featuredPost.categoryColor,
                                            }}
                                        >
                                            {
                                                CATEGORIES.find(
                                                    (c) =>
                                                        c.id ===
                                                        featuredPost.category,
                                                )?.label
                                            }
                                        </span>
                                        <span className="feat-date">
                                            {featuredPost.date}
                                        </span>
                                        <span className="feat-date">
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                    <div className="feat-title">
                                        {featuredPost.title}
                                    </div>
                                    <p className="feat-excerpt">
                                        {featuredPost.excerpt}
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="feat-read"
                                        style={{
                                            color: featuredPost.categoryColor,
                                        }}
                                    >
                                        Read More{' '}
                                        <i
                                            className="bi bi-arrow-right"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* POSTS GRID */}
                <section className="posts-sec" aria-label="All updates">
                    <div className="wrap">
                        {/* Sticky filter */}
                        <div className="posts-filter">
                            <div className="pf-inner">
                                <div className="filter-tabs" role="tablist">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            className={`fb ${activeFilter === cat.id ? 'active' : ''}`}
                                            style={
                                                activeFilter === cat.id
                                                    ? {
                                                          background: cat.color,
                                                          color: '#000',
                                                      }
                                                    : {}
                                            }
                                            onClick={() => {
                                                setActiveFilter(cat.id);
                                                setVisibleCount(6);
                                            }}
                                            role="tab"
                                            aria-selected={
                                                activeFilter === cat.id
                                            }
                                        >
                                            {cat.label}{' '}
                                            <span
                                                style={{
                                                    opacity: 0.45,
                                                    marginLeft: '3px',
                                                    fontSize: '10px',
                                                }}
                                            >
                                                ({cat.count})
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <div className="pcount">
                                    <strong>
                                        {Math.min(
                                            visibleCount,
                                            filtered.length,
                                        )}
                                    </strong>{' '}
                                    of <strong>{filtered.length}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="posts-grid">
                            {visible.map((post, i) => (
                                <article key={post.id} className="pc">
                                    <style>{`.pc:nth-child(${i + 1})::after{background:${post.categoryColor};}`}</style>

                                    {/* ── Photo ── */}
                                    <div className="pc-img">
                                        <div
                                            className="pc-img-bg"
                                            style={{
                                                backgroundImage: `url(${post.image})`,
                                            }}
                                            role="img"
                                            aria-label={post.title}
                                        />
                                        <div className="pc-img-fade" />
                                        {/* Pills on photo */}
                                        <div className="pc-pills">
                                            <span
                                                className="pc-cat"
                                                style={{
                                                    background:
                                                        post.categoryColor,
                                                }}
                                            >
                                                {
                                                    CATEGORIES.find(
                                                        (c) =>
                                                            c.id ===
                                                            post.category,
                                                    )?.label
                                                }
                                            </span>
                                            {post.tag && (
                                                <span
                                                    className="pc-badge"
                                                    style={{
                                                        borderColor:
                                                            post.tagColor ??
                                                            post.categoryColor,
                                                        color:
                                                            post.tagColor ??
                                                            post.categoryColor,
                                                    }}
                                                >
                                                    {post.tag}
                                                </span>
                                            )}
                                        </div>
                                        <div className="pc-date">
                                            {post.date}
                                        </div>
                                    </div>

                                    {/* ── Body ── */}
                                    <div className="pc-body">
                                        <h3 className="pc-title">
                                            {post.title}
                                        </h3>
                                        <p className="pc-excerpt">
                                            {post.excerpt}
                                        </p>
                                        <div className="pc-foot">
                                            <span className="pc-rt">
                                                <i
                                                    className="bi bi-clock"
                                                    aria-hidden="true"
                                                />{' '}
                                                {post.readTime} read
                                            </span>
                                            <i
                                                className="bi bi-arrow-right pc-arr"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="load-more">
                                <button
                                    className="load-btn"
                                    onClick={() =>
                                        setVisibleCount((v) => v + 6)
                                    }
                                >
                                    <span>Load More Posts</span>
                                    <i
                                        className="bi bi-chevron-down"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* NEWSLETTER */}
                <section className="nl-sec" aria-label="Newsletter">
                    <div className="nl-glow" aria-hidden="true" />
                    <div className="nl-bg" aria-hidden="true">
                        UPDATES
                    </div>
                    <div className="nl-inner">
                        <i
                            className="bi bi-envelope-paper-fill nl-icon"
                            aria-hidden="true"
                        />
                        <h2 className="nl-title">
                            Stay <em>Updated</em>
                        </h2>
                        <p className="nl-sub">
                            Get new services, promotions, and print tips
                            delivered straight to your inbox.
                        </p>
                        {subscribed ? (
                            <div className="nl-ok">
                                <i className="bi bi-check-circle-fill" /> You're
                                subscribed — welcome aboard!
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} noValidate>
                                <div className="nl-form">
                                    <input
                                        type="email"
                                        className="nl-in"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        aria-label="Email address"
                                    />
                                    <button
                                        type="submit"
                                        className="btn-p"
                                        style={{
                                            clipPath: 'none',
                                            borderRadius: 0,
                                        }}
                                    >
                                        <span>Subscribe</span>
                                    </button>
                                </div>
                                {emailError && (
                                    <div className="nl-err">{emailError}</div>
                                )}
                                <p className="nl-note">
                                    Weekly digest · Unsubscribe anytime · No
                                    spam
                                </p>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
