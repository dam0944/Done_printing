import MainLayout from "@/layouts/MainLayout"
import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════
   SVG ICON COMPONENTS
════════════════════════════════════════ */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.894l4.383 5.795 5.717-5.795zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
  </svg>
);
const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <line x1="7" y1="17" x2="17" y2="7"/>
    <polyline points="7 7 17 7 17 17"/>
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
    <polygon points="6 3 20 12 6 21 6 3"/>
  </svg>
);
const PencilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/><path d="M10 10l2 2 4-4"/>
  </svg>
);
const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <path d="M8 10h8M8 14h5"/>
  </svg>
);
const SmartphoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <circle cx="12" cy="17" r="1"/><path d="M9 6h6"/>
  </svg>
);

/* ════════════════════════════════════════
   DATA
════════════════════════════════════════ */
const SOCIALS = [
  { icon: <FacebookIcon />,  label: "Facebook"  },
  { icon: <TwitterIcon />,   label: "Twitter"   },
  { icon: <YoutubeIcon />,   label: "YouTube"   },
  { icon: <InstagramIcon />, label: "Instagram" },
];
const SERVICES = [
  { name: "Perfect Sketching",   icon: <PencilIcon />,     desc: "Every great design starts with a strong concept. We map out ideas through precise sketching and wireframing before a single pixel is placed — saving time and ensuring the final result is exactly right." },
  { name: "Digital Prototyping", icon: <MonitorIcon />,    desc: "We build interactive prototypes that let you click, scroll, and experience your product before development begins — catching problems early and getting stakeholder sign-off faster." },
  { name: "Design System",       icon: <GridIcon />,       desc: "We create scalable, well-documented design systems that keep your brand consistent across every product and platform — a single source of truth for your entire UI." },
  { name: "Design Concept",      icon: <SunIcon />,        desc: "Before we finalize any direction, we explore bold creative concepts that push boundaries — giving you multiple distinct visions so you can choose the path that best captures your brand." },
  { name: "Brand Consultation",  icon: <ChatIcon />,       desc: "Not sure where your brand stands? Our strategic consultations help you clarify positioning, identify gaps, and build a clear roadmap for a visual identity that resonates with your audience." },
  { name: "Mobile App Design",   icon: <SmartphoneIcon />, desc: "We design mobile experiences that feel native, intuitive, and delightful. From user flows to final UI, every screen is crafted to keep users engaged and coming back." },
];
const REVIEWS = [
  { name: "Callie John",  role: "CEO, VScret",              avatar: "https://randomuser.me/api/portraits/women/44.jpg", stars: 5, quote: "Working with this agency transformed our brand completely. Their attention to detail, creative thinking, and ability to translate our vision into stunning visuals exceeded every expectation we had." },
  { name: "Marcus Lee",   role: "Founder, Designly",        avatar: "https://randomuser.me/api/portraits/men/32.jpg",   stars: 5, quote: "From the first consultation to the final delivery, the process was smooth, transparent, and genuinely exciting. They don't just design — they solve real business problems with great design." },
  { name: "Sara Patel",   role: "Head of Product, Nexlabs", avatar: "https://randomuser.me/api/portraits/women/68.jpg", stars: 5, quote: "Our product's user satisfaction scores jumped 40% after the redesign. The team deeply understood our users' needs and crafted an experience that feels effortless and truly delightful." },
];
const PLANS = [
  { tier: "Silver",   amount: "$49.99", features: ["Brand Identity Design", "Up to 3 Page Web Design", "Social Media Kit", "2 Revision Rounds", "Email Support"] },
  { tier: "Gold",     amount: "$59.99", features: ["Full Branding Package", "Up to 8 Page Web Design", "Copywriting & Content", "Unlimited Revisions", "Priority 24/7 Support"] },
  { tier: "Platinum", amount: "$79.99", features: ["Complete Brand System", "Custom Web Development", "Content Strategy", "Dedicated Designer", "Full Online 24/7 Support"] },
];
const STATS = [
  { display: "4218", suffix: "+", label: "Projects Completed" },
  { display: "812",  suffix: "K+", label: "Satisfied Clients"  },
  { display: "293",  suffix: "+", label: "Agency Partners"    },
  { display: "456",  suffix: "+", label: "Services Offered"   },
  { display: "184",  suffix: "+", label: "Awards Won"         },
];
const INFO_CARDS = [
  { label: "Who We Are", diagonal: true,  desc: "A passionate team of designers and strategists building brands that last." },
  { label: "Our Vision",  diagonal: false, desc: "To make world-class design accessible to every ambitious business." },
  { label: "Our Mission", diagonal: false, desc: "Deliver creative solutions that drive real growth and lasting impact." },
];
const WORKS = [
  { img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80", title: "Art Direction",  tag: "View Project", desc: "Visual storytelling through bold art direction and conceptual design.", tall: true  },
  { img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=80", title: "Logo Design",    tag: "Branding",     desc: "Clean, memorable marks that define a brand at a glance.", tall: false },
  { img: "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=700&q=80", title: "Brand Identity", tag: "Identity",     desc: "Comprehensive visual systems built for consistency and recognition.", tall: false },
  { img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80", title: "Product Design", tag: "UX/UI",        desc: "User-centered product interfaces that are as functional as beautiful.", tall: false },
  { img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80", title: "Website Design", tag: "Web Dev",      desc: "Conversion-focused websites that make a powerful first impression.", tall: false },
  { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",    title: "Graphic Design", tag: "Graphics",     desc: "Print and digital graphics crafted to communicate with clarity.", tall: false },
];
const POSTS = [
  { img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", tag: "Brand",    title: "How much does it really cost to build a high-quality brand identity?", excerpt: "Budget is always a concern, but investing in your brand pays dividends for years. We break down what great branding actually costs — and why it's worth it." },
  { img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80", tag: "Design",   title: "Why design thinking should be at the heart of every product decision",    excerpt: "The most successful products aren't built by engineers alone — they're shaped by empathy, iteration, and a relentless focus on the user experience." },
  { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",    tag: "Strategy", title: "Creative strategy: the invisible force behind every iconic brand",           excerpt: "Behind every unforgettable brand is a clear strategic foundation. Here's how creative strategy turns great design into measurable business results." },
];

/* ════════════════════════════════════════
   TICKER
════════════════════════════════════════ */
function Ticker({ label }) {
  const items = Array(14).fill(label);
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {[0,1].map(k => (
          <div className="tk-track" key={k} aria-hidden={k===1}>
            {items.map((t, i) => (
              <span className="ticker-item" key={i}><span className="ticker-star">✦</span>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════ */
export default function Home() {
  const [activeIdx,    setActiveIdx]    = useState(1);
  const [activeReview, setActiveReview] = useState(0);
  const r = REVIEWS[activeReview];

  /* Section refs */
  const pageRef    = useRef(null);
  const heroRef    = useRef(null);
  const sec2Ref    = useRef(null);
  const sec3Ref    = useRef(null);
  const ctaRef     = useRef(null);
  const srvRef     = useRef(null);
  const pricingRef = useRef(null);
  const reviewsRef = useRef(null);
  const statsRef   = useRef(null);
  const blogRef    = useRef(null);
  const gsapCtx    = useRef(null);

  useEffect(() => {
    const init = async () => {
      const gsap         = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsapCtx.current = gsap.context(() => {

        /* ── HERO: Social icons entrance + parallax ── */
        gsap.from(".social-icon", {
          x: 30, opacity: 0, duration: 0.55,
          stagger: 0.09, delay: 0.85, ease: "power3.out", clearProps: "all",
        });
        gsap.to(".hero-display", {
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.4 },
          y: -100, opacity: 0.3,
        });
        gsap.to(".hero-glow", {
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
          y: -140, scale: 1.4,
        });

        /* ── SECTION 2 ── */
        const st2 = { trigger: sec2Ref.current, start: "top 76%", toggleActions: "play none none reverse" };
        gsap.from(sec2Ref.current.querySelectorAll(".s2-heading .word"), {
          scrollTrigger: st2, y: 80, opacity: 0, duration: 0.85, stagger: 0.14, ease: "power3.out", clearProps: "all",
        });
        gsap.from(sec2Ref.current.querySelector(".s2-video-block"), {
          scrollTrigger: { ...st2, start: "top 72%" }, x: -50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
        });
        gsap.from(sec2Ref.current.querySelectorAll(".s2-body-text, .learn-more"), {
          scrollTrigger: { ...st2, start: "top 70%" }, y: 30, opacity: 0, duration: 0.7, stagger: 0.13, ease: "power3.out", clearProps: "all",
        });
        gsap.from(sec2Ref.current.querySelector(".s2-img-wrap"), {
          scrollTrigger: { ...st2, start: "top 68%" }, x: 90, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all",
        });
        gsap.from(sec2Ref.current.querySelectorAll(".info-card"), {
          scrollTrigger: { trigger: sec2Ref.current.querySelector(".info-cards"), start: "top 82%", toggleActions: "play none none reverse" },
          y: 40, opacity: 0, duration: 0.65, stagger: 0.13, ease: "power3.out", clearProps: "all",
        });

        /* ── SECTION 3: Work ── */
        gsap.from(sec3Ref.current.querySelectorAll(".s3-title span"), {
          scrollTrigger: { trigger: sec3Ref.current, start: "top 78%", toggleActions: "play none none reverse" },
          y: 65, opacity: 0, duration: 0.8, stagger: 0.13, ease: "power3.out", clearProps: "all",
        });
        gsap.from(sec3Ref.current.querySelector(".s3-more-btn"), {
          scrollTrigger: { trigger: sec3Ref.current, start: "top 78%", toggleActions: "play none none reverse" },
          scale: 0.75, opacity: 0, duration: 0.7, delay: 0.22, ease: "back.out(1.7)", clearProps: "all",
        });
        sec3Ref.current.querySelectorAll(".work-card").forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" },
            y: 65, x: i % 2 === 0 ? -18 : 18, opacity: 0,
            duration: 0.75, delay: i * 0.05, ease: "power3.out", clearProps: "all",
          });
        });

        /* ── CTA ── */
        gsap.from(ctaRef.current.querySelector(".cta-box"), {
          scrollTrigger: { trigger: ctaRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          y: 55, opacity: 0, scale: 0.97, duration: 0.9, ease: "power3.out", clearProps: "all",
        });
        gsap.from(ctaRef.current.querySelectorAll(".cta-heading span, .cta-btn"), {
          scrollTrigger: { trigger: ctaRef.current, start: "top 76%", toggleActions: "play none none reverse" },
          y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", clearProps: "all",
        });

        /* ── SERVICES ── */
        gsap.from(srvRef.current.querySelectorAll(".srv-heading span"), {
          scrollTrigger: { trigger: srvRef.current, start: "top 76%", toggleActions: "play none none reverse" },
          y: 65, opacity: 0, duration: 0.8, stagger: 0.14, ease: "power3.out", clearProps: "all",
        });
        gsap.from(srvRef.current.querySelector(".srv-desc"), {
          scrollTrigger: { trigger: srvRef.current, start: "top 72%", toggleActions: "play none none reverse" },
          y: 25, opacity: 0, duration: 0.7, delay: 0.22, ease: "power3.out", clearProps: "all",
        });
        gsap.from(srvRef.current.querySelectorAll(".srv-row"), {
          scrollTrigger: { trigger: srvRef.current.querySelector(".srv-right"), start: "top 78%", toggleActions: "play none none reverse" },
          x: 55, opacity: 0, duration: 0.6, stagger: 0.09, ease: "power3.out", clearProps: "all",
        });
        gsap.from(srvRef.current.querySelector(".srv-cta-card"), {
          scrollTrigger: { trigger: srvRef.current.querySelector(".srv-cta-card"), start: "top 90%", toggleActions: "play none none reverse" },
          y: 45, opacity: 0, scale: 0.95, duration: 0.8, ease: "back.out(1.4)", clearProps: "all",
        });

        /* ── PRICING ── */
        gsap.from(pricingRef.current.querySelectorAll(".pricing-title span"), {
          scrollTrigger: { trigger: pricingRef.current, start: "top 78%", toggleActions: "play none none reverse" },
          y: 55, opacity: 0, duration: 0.75, stagger: 0.12, ease: "power3.out", clearProps: "all",
        });
        gsap.from(pricingRef.current.querySelector(".pricing-subtitle"), {
          scrollTrigger: { trigger: pricingRef.current, start: "top 74%", toggleActions: "play none none reverse" },
          y: 20, opacity: 0, duration: 0.6, delay: 0.25, ease: "power3.out", clearProps: "all",
        });
        pricingRef.current.querySelectorAll(".price-card").forEach((card, i) => {
          gsap.from(card, {
            scrollTrigger: { trigger: pricingRef.current.querySelector(".pricing-grid"), start: "top 80%", toggleActions: "play none none reverse" },
            y: 80, opacity: 0, duration: 0.75, delay: i * 0.15, ease: "power3.out", clearProps: "all",
          });
        });

        /* ── REVIEWS ── */
        gsap.from(reviewsRef.current.querySelectorAll(".rev-heading span"), {
          scrollTrigger: { trigger: reviewsRef.current, start: "top 78%", toggleActions: "play none none reverse" },
          y: 65, opacity: 0, duration: 0.8, stagger: 0.14, ease: "power3.out", clearProps: "all",
        });
        gsap.from(reviewsRef.current.querySelector(".rev-right"), {
          scrollTrigger: { trigger: reviewsRef.current, start: "top 75%", toggleActions: "play none none reverse" },
          x: 70, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out", clearProps: "all",
        });

        /* ── STATS: slide from left + animated counters ── */
        statsRef.current.querySelectorAll(".stat-row").forEach((row, i) => {
          gsap.from(row, {
            scrollTrigger: { trigger: row, start: "top 86%", toggleActions: "play none none reverse" },
            x: -80, opacity: 0, duration: 0.65, delay: i * 0.08, ease: "power3.out", clearProps: "all",
          });
        });
        statsRef.current.querySelectorAll(".stat-num").forEach((el) => {
          const endVal = parseFloat(el.dataset.val || 0);
          gsap.fromTo(el,
            { innerText: 0 },
            {
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
              innerText: endVal,
              duration: 2.2,
              delay: 0.1,
              ease: "power2.out",
              snap: { innerText: endVal > 1000 ? 10 : 1 },
              onUpdate() {
                const v = Math.round(parseFloat(el.innerText));
                el.innerText = v >= 1000 ? v.toLocaleString() : v;
              },
            }
          );
        });

        /* ── BLOG ── */
        gsap.from(blogRef.current.querySelectorAll(".blog-heading span"), {
          scrollTrigger: { trigger: blogRef.current, start: "top 78%", toggleActions: "play none none reverse" },
          y: 65, opacity: 0, duration: 0.8, stagger: 0.14, ease: "power3.out", clearProps: "all",
        });
        gsap.from(blogRef.current.querySelectorAll(".blog-desc, .blog-view-btn"), {
          scrollTrigger: { trigger: blogRef.current, start: "top 74%", toggleActions: "play none none reverse" },
          y: 28, opacity: 0, duration: 0.65, stagger: 0.13, ease: "power3.out", clearProps: "all",
        });
        blogRef.current.querySelectorAll(".blog-post").forEach((post, i) => {
          gsap.from(post, {
            scrollTrigger: { trigger: post, start: "top 86%", toggleActions: "play none none reverse" },
            y: 65, opacity: 0, duration: 0.75, delay: i * 0.1, ease: "power3.out", clearProps: "all",
          });
        });
        /* Parallax on blog images */
        blogRef.current.querySelectorAll(".bp-img").forEach((img) => {
          gsap.to(img, {
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.2 },
            y: -32,
          });
        });

      }, pageRef);
    };

    init();
    return () => gsapCtx.current?.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body, html { background: #0e0c2e; overflow-x: hidden; }
        .page-wrap { font-family: 'Barlow', sans-serif; background: #0e0c2e; color: #fff; overflow-x: hidden; width: 100%; }

        /* HERO */
        .hero { min-height: 100vh; position: relative; background: radial-gradient(ellipse 80% 70% at 22% 38%, #1a1660 0%, #0e0c2e 65%); overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px); background-size: 72px 72px; pointer-events: none; }
        .hero-glow { position: absolute; top: -15%; left: -8%; width: 60%; height: 90%; background: radial-gradient(ellipse, rgba(99,60,180,0.16) 0%, transparent 70%); pointer-events: none; will-change: transform; }
        .hero-outer { max-width: 1280px; margin: 0 auto; padding: 140px 60px 100px; display: grid; grid-template-columns: 1fr 72px; align-items: center; position: relative; min-height: 100vh; z-index: 1; }
        .hero-outer::after { content: ''; position: absolute; right: 92px; top: 120px; bottom: 80px; width: 1px; background: rgba(255,255,255,0.1); }
        .hero-display { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.9; margin-bottom: 52px; will-change: transform, opacity; }
        .hero-line { display: flex; align-items: center; gap: 18px; margin-bottom: 2px; }
        .ht-solid { font-size: clamp(56px,10.5vw,168px); color: #fff; letter-spacing: -3px; line-height: 0.9; white-space: nowrap; animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .ht-outline { font-size: clamp(56px,10.5vw,168px); color: transparent; -webkit-text-stroke: 2.5px rgba(255,255,255,0.35); letter-spacing: -3px; line-height: 0.9; white-space: nowrap; animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hero-line:nth-child(3) .ht-solid { animation-delay: 0.24s; }
        @keyframes slideUp { from { transform: translateY(80px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .av-group { display: flex; align-items: center; flex-shrink: 0; animation: fadeSlideIn 0.8s ease 0.4s both; }
        .av { width: 64px; height: 64px; border-radius: 50%; border: 3px solid #0e0c2e; margin-left: -14px; overflow: hidden; flex-shrink: 0; background: linear-gradient(135deg,#7c3aed,#1d4ed8); }
        .av:first-child { margin-left: 0; }
        .av img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .av-pill { width: 118px; height: 64px; border-radius: 999px; border: 3px solid #0e0c2e; margin-left: -14px; overflow: hidden; flex-shrink: 0; background: linear-gradient(135deg,#ef4444,#7c2d12); }
        .av-pill img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
        .hero-bottom { display: flex; align-items: center; gap: 48px; animation: fadeUp 0.9s ease 0.55s both; }
        .find-out-btn { width: 114px; height: 114px; position: relative; flex-shrink: 0; cursor: pointer; }
        .fob-bg { width: 100%; height: 100%; border-radius: 50%; background: #7c3aed; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: 0 0 0 10px rgba(124,58,237,0.15); transition: box-shadow 0.3s, transform 0.3s; }
        .find-out-btn:hover .fob-bg { box-shadow: 0 0 0 18px rgba(124,58,237,0.22); transform: scale(1.04); }
        .ring-svg { position: absolute; inset: 0; width: 100%; height: 100%; animation: spinRing 9s linear infinite; transform-origin: center; }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .fob-arrow { width: 52px; height: 52px; background: rgba(255,255,255,0.14); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1.5px solid rgba(255,255,255,0.3); position: relative; z-index: 1; transition: background 0.3s; color: #fff; }
        .find-out-btn:hover .fob-arrow { background: rgba(255,255,255,0.26); }
        .hero-desc { font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.55); max-width: 360px; }
        .hero-socials-col { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; }
        .hero-socials-row { display: none; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
        .social-icon { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; color: rgba(255,255,255,0.7); text-decoration: none; transition: background 0.25s, border-color 0.25s, transform 0.25s, color 0.25s; }
        .social-icon:hover { background: #7c3aed; border-color: #7c3aed; color: #fff; transform: scale(1.12); }

        /* TICKER */
        .ticker-wrap { width: 100%; overflow: hidden; background: #7c3aed; padding: 14px 0; transform: rotate(-1.5deg) scaleX(1.06); margin: 20px 0; position: relative; z-index: 10; }
        .ticker-inner { display: flex; width: max-content; animation: tickerScroll 22s linear infinite; }
        @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .tk-track { display: flex; white-space: nowrap; }
        .ticker-item { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #fff; padding: 0 28px; display: flex; align-items: center; gap: 12px; }
        .ticker-star { font-size: 10px; opacity: 0.7; }

        /* SECTION 2 */
        .section2-wrap { background: #0c0a2e; }
        .section2 { padding: 80px 60px 120px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; max-width: 1280px; margin: 0 auto; }
        .s2-left { display: flex; flex-direction: column; min-width: 0; }
        .s2-heading { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.9; margin-bottom: auto; padding-bottom: 80px; }
        .s2-heading .word { display: block; }
        .s2-heading .solid-word { font-size: clamp(40px,6vw,96px); color: #fff; letter-spacing: -1px; }
        .s2-heading .outline-word { font-size: clamp(40px,6vw,96px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.32); letter-spacing: -1px; }
        .s2-bottom { display: flex; flex-direction: column; }
        .s2-video-block { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; cursor: pointer; }
        .play-btn { width: 50px; height: 50px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.3s, background 0.3s; box-shadow: 0 0 0 6px rgba(124,58,237,0.15); }
        .s2-video-block:hover .play-btn { transform: scale(1.08); background: #6d28d9; }
        .play-label { font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.9); }
        .s2-body-text { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.5); margin-bottom: 32px; }
        .learn-more { display: inline-flex; align-items: center; gap: 8px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 5px; transition: border-color 0.3s, color 0.3s; width: fit-content; }
        .learn-more:hover { color: #a78bfa; border-color: #a78bfa; }
        .s2-right { display: flex; flex-direction: column; min-width: 0; }
        .s2-img-wrap { width: 100%; border-radius: 14px; overflow: hidden; aspect-ratio: 16/11; background: #1a1660; flex-shrink: 0; }
        .s2-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .info-cards { display: flex; flex-direction: column; margin-top: 8px; }
        .info-card { display: grid; grid-template-columns: 120px 1fr 32px; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.08); gap: 16px; cursor: pointer; transition: background 0.25s; }
        .info-card:hover { background: rgba(124,58,237,0.04); }
        .info-card:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .card-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; text-transform: uppercase; color: #fff; white-space: nowrap; }
        .card-desc { font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.4); min-width: 0; }
        .card-arrow { width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.4); flex-shrink: 0; transition: background 0.25s, color 0.25s, border-color 0.25s; }
        .info-card:hover .card-arrow { background: #7c3aed; border-color: #7c3aed; color: #fff; }
        .card-arrow.diagonal { transform: rotate(-45deg); }

        /* SECTION 3 */
        .section3-wrap { background: #0a0828; }
        .section3 { padding: 100px 60px 80px; max-width: 1280px; margin: 0 auto; }
        .s3-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 60px; gap: 24px; }
        .s3-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.92; }
        .s3-title .t-solid { font-size: clamp(36px,5vw,72px); color: #fff; display: block; }
        .s3-title .t-outline { font-size: clamp(36px,5vw,72px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); display: block; }
        .s3-more-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: #fff; background: #7c3aed; padding: 12px 22px; border-radius: 5px; text-decoration: none; white-space: nowrap; transition: background 0.2s, transform 0.2s; flex-shrink: 0; align-self: flex-end; }
        .s3-more-btn:hover { background: #6d28d9; transform: translateY(-1px); }
        .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .work-card { position: relative; border-radius: 10px; overflow: hidden; cursor: pointer; background: #13103a; }
        .work-card.tall { grid-row: span 2; }
        .work-card-img { width: 100%; height: 100%; min-height: 220px; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .work-card.tall .work-card-img { min-height: 100%; position: absolute; inset: 0; }
        .work-card:hover .work-card-img { transform: scale(1.05); }
        .work-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top,rgba(10,8,40,0.95) 0%,rgba(10,8,40,0.2) 55%,transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; gap: 6px; }
        .wc-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .wc-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 16px; text-transform: uppercase; color: #fff; }
        .wc-tag { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #fff; background: #7c3aed; padding: 4px 10px; border-radius: 3px; white-space: nowrap; flex-shrink: 0; }
        .wc-desc { font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.5); }

        /* CTA */
        .section4 { background: #0e0c2e; padding: 0 60px 100px; }
        .cta-box { max-width: 1280px; margin: 0 auto; background: linear-gradient(135deg,#13103a 0%,#1a1660 60%,#0e0c2e 100%); border: 1px solid rgba(124,58,237,0.2); border-radius: 16px; padding: 80px 60px; text-align: center; position: relative; overflow: hidden; }
        .cta-box::before { content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 400px; height: 400px; background: radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%); pointer-events: none; }
        .cta-heading { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.92; margin-bottom: 30px; position: relative; }
        .cta-heading .ch-solid { font-size: clamp(40px,6vw,90px); color: #fff; display: block; }
        .cta-heading .ch-outline { font-size: clamp(40px,6vw,90px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block; }
        .cta-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 2.5px; color: #fff; background: #7c3aed; padding: 14px 36px; border-radius: 6px; text-decoration: none; display: inline-block; transition: transform 0.2s, box-shadow 0.2s; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.45); }

        /* SERVICES */
        .services-outer { background: #0c0a2e; padding: 0 60px 120px; }
        .services-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 340px 1fr; gap: 80px; align-items: start; }
        .srv-left { position: sticky; top: 120px; padding-top: 8px; }
        .srv-heading { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.9; margin-bottom: 28px; }
        .srv-heading .sh-solid { font-size: clamp(40px,5vw,80px); color: #fff; display: block; letter-spacing: -1px; }
        .srv-heading .sh-outline { font-size: clamp(40px,5vw,80px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); display: block; letter-spacing: -1px; }
        .srv-desc { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.45); }
        .srv-right { display: flex; flex-direction: column; min-width: 0; }
        .srv-row { display: grid; grid-template-columns: 48px 1fr 30px; align-items: start; gap: 18px; padding: 24px 16px; border-bottom: 1px solid rgba(255,255,255,0.07); cursor: pointer; border-radius: 10px; transition: background 0.3s ease, padding-left 0.3s ease; }
        .srv-row:first-of-type { border-top: 1px solid rgba(255,255,255,0.07); }
        .srv-row:hover, .srv-row.active { background: rgba(124,58,237,0.1); padding-left: 24px; }
        .srv-row.active { border-color: rgba(124,58,237,0.2); }
        .srv-icon { width: 42px; height: 42px; background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.25); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; transition: background 0.3s, border-color 0.3s; color: #a78bfa; }
        .srv-row:hover .srv-icon, .srv-row.active .srv-icon { background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.5); color: #c4b5fd; }
        .srv-text { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .srv-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 19px; text-transform: uppercase; color: rgba(255,255,255,0.75); transition: color 0.3s; line-height: 1; }
        .srv-row:hover .srv-name, .srv-row.active .srv-name { color: #fff; }
        .srv-body { font-size: 13px; line-height: 1.65; color: rgba(255,255,255,0.35); transition: color 0.3s; }
        .srv-row:hover .srv-body, .srv-row.active .srv-body { color: rgba(255,255,255,0.55); }
        .srv-arrow { width: 28px; height: 28px; border: 1px solid rgba(255,255,255,0.12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.25); flex-shrink: 0; margin-top: 4px; transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .srv-row:hover .srv-arrow, .srv-row.active .srv-arrow { background: #7c3aed; border-color: #7c3aed; color: #fff; transform: rotate(-45deg) scale(1.1); }
        .srv-cta-card { background: #7c3aed; border-radius: 12px; padding: 40px 36px; margin-top: 24px; position: relative; overflow: hidden; }
        .srv-cta-card::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; background: radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%); pointer-events: none; }
        .srv-cta-text { font-size: 19px; line-height: 1.5; color: rgba(255,255,255,0.9); margin-bottom: 24px; position: relative; }
        .srv-cta-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: #fff; background: transparent; border: 1.5px solid rgba(255,255,255,0.55); padding: 11px 26px; border-radius: 5px; text-decoration: none; display: inline-block; transition: background 0.2s, border-color 0.2s; }
        .srv-cta-btn:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.85); }

        /* PRICING */
        .pricing-outer { background: #0e0c2e; padding: 100px 60px 80px; }
        .pricing-header { text-align: center; margin-bottom: 60px; }
        .pricing-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; font-size: clamp(38px,5vw,76px); line-height: 0.95; letter-spacing: -1px; margin-bottom: 16px; }
        .pricing-title .pt-solid { color: #fff; }
        .pricing-title .pt-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); }
        .pricing-subtitle { font-size: 14px; color: rgba(255,255,255,0.4); }
        .pricing-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .price-card { background: #13103a; border: 1px solid rgba(124,58,237,0.2); border-radius: 12px; padding: 36px 32px 0; display: flex; flex-direction: column; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; position: relative; overflow: hidden; }
        .price-card::before { content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 220px; height: 220px; background: radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%); pointer-events: none; opacity: 0; transition: opacity 0.3s; }
        .price-card:hover { border-color: rgba(124,58,237,0.5); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(124,58,237,0.18); }
        .price-card:hover::before { opacity: 1; }
        .pc-tier { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.5); margin-bottom: 14px; }
        .pc-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
        .pc-amount { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(36px,4vw,56px); color: #fff; letter-spacing: -1px; line-height: 1; }
        .pc-period { font-size: 13px; color: rgba(255,255,255,0.4); }
        .pc-divider { width: 100%; height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 24px; }
        .pc-features { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; flex-grow: 1; }
        .pc-feat { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.75); }
        .pc-feat-icon { width: 22px; height: 22px; background: rgba(124,58,237,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #a78bfa; flex-shrink: 0; transition: background 0.25s, color 0.25s; }
        .price-card:hover .pc-feat-icon { background: rgba(124,58,237,0.3); color: #c4b5fd; }
        .pc-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #fff; background: #7c3aed; border: none; padding: 16px; text-align: center; cursor: pointer; text-decoration: none; display: block; margin: 0 -32px; margin-top: auto; border-radius: 0 0 11px 11px; transition: background 0.2s, letter-spacing 0.3s; }
        .pc-btn:hover { background: #6d28d9; letter-spacing: 4px; }

        /* REVIEWS */
        .reviews-outer { background: #0e0c2e; padding: 40px 60px 100px; }
        .reviews-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 340px 1fr; gap: 80px; align-items: start; }
        .rev-left { min-width: 0; }
        .rev-heading { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.92; }
        .rev-heading .rh-solid { font-size: clamp(40px,5.5vw,88px); color: #fff; display: block; letter-spacing: -1px; }
        .rev-heading .rh-outline { font-size: clamp(40px,5.5vw,88px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block; letter-spacing: -1px; }
        .rev-right { min-width: 0; }
        .rev-stars { display: flex; gap: 4px; margin-bottom: 18px; }
        .rev-star { color: #f59e0b; font-size: 18px; }
        .rev-author { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .rev-avatar { width: 52px; height: 52px; border-radius: 50%; border: 2px solid rgba(124,58,237,0.4); overflow: hidden; flex-shrink: 0; }
        .rev-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rev-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; text-transform: uppercase; color: #fff; line-height: 1.1; }
        .rev-role { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .rev-quote { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.65); margin-bottom: 36px; }
        .rev-nav { display: flex; gap: 8px; align-items: center; }
        .rev-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.18); cursor: pointer; transition: background 0.25s, width 0.25s; border: none; padding: 0; }
        .rev-dot.on { background: #7c3aed; width: 24px; border-radius: 4px; }

        /* STATS */
        .stats-section { background: #0e0c2e; padding: 0 60px 80px; }
        .stats-inner { max-width: 1280px; margin: 0 auto; }
        .stat-row { display: grid; grid-template-columns: 260px 1fr auto; align-items: center; padding: 36px 0; border-bottom: 1px solid rgba(255,255,255,0.08); gap: 24px; cursor: pointer; transition: padding-left 0.3s ease; }
        .stat-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .stat-row:hover { padding-left: 12px; }
        .stat-value { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(38px,5vw,68px); color: #fff; letter-spacing: -1px; line-height: 1; display: flex; align-items: baseline; gap: 4px; }
        .stat-plus { font-size: clamp(22px,3vw,38px); color: #7c3aed; font-weight: 700; }
        .stat-num { display: inline-block; min-width: 3ch; }
        .stat-label { font-family: 'Barlow', sans-serif; font-weight: 600; font-size: clamp(16px,1.8vw,26px); color: rgba(255,255,255,0.7); transition: color 0.3s; }
        .stat-row:hover .stat-label { color: rgba(255,255,255,0.95); }
        .stat-arrow { width: 38px; height: 38px; border: 1px solid rgba(255,255,255,0.18); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.45); flex-shrink: 0; transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        .stat-row:first-child .stat-arrow { border-color: rgba(124,58,237,0.6); color: #7c3aed; }
        .stat-row:hover .stat-arrow { background: #7c3aed; border-color: #7c3aed; color: #fff; transform: rotate(-45deg) scale(1.1); }

        /* BLOG */
        .blog-outer { background: #0e0c2e; padding: 100px 60px; }
        .blog-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .blog-left { position: sticky; top: 120px; min-width: 0; }
        .blog-heading { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.92; margin-bottom: 28px; }
        .blog-heading .bh-solid { font-size: clamp(40px,5.5vw,88px); color: #fff; display: block; letter-spacing: -1px; }
        .blog-heading .bh-outline { font-size: clamp(40px,5.5vw,88px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block; letter-spacing: -1px; }
        .blog-desc { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.45); margin-bottom: 36px; }
        .blog-view-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #fff; background: #7c3aed; padding: 14px 28px; border-radius: 6px; text-decoration: none; display: inline-block; transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
        .blog-view-btn:hover { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.4); }
        .blog-right { display: flex; flex-direction: column; min-width: 0; }
        .blog-post { display: flex; flex-direction: column; gap: 16px; cursor: pointer; padding-bottom: 44px; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 44px; }
        .blog-post:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .bp-img-wrap { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 16/9; background: #13103a; }
        .bp-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); will-change: transform; }
        .blog-post:hover .bp-img { transform: scale(1.05); }
        .bp-tag { position: absolute; bottom: 14px; left: 14px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #fff; background: #7c3aed; padding: 5px 14px; border-radius: 20px; }
        .bp-title { font-family: 'Barlow', sans-serif; font-weight: 700; font-size: clamp(16px,1.8vw,21px); color: #fff; line-height: 1.35; transition: color 0.2s; }
        .blog-post:hover .bp-title { color: #a78bfa; }
        .bp-excerpt { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,0.4); }
        .bp-read { display: inline-flex; align-items: center; gap: 8px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: rgba(255,255,255,0.6); text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 4px; width: fit-content; transition: color 0.2s, border-color 0.2s; margin-top: 4px; }
        .bp-read:hover { color: #a78bfa; border-color: #a78bfa; }
        .bp-read-arrow { transition: transform 0.25s; display: flex; align-items: center; }
        .bp-read:hover .bp-read-arrow { transform: translateX(4px); }

        /* RESPONSIVE Tablet */
        @media (max-width: 1024px) {
          .hero-outer { padding: 120px 40px 80px; grid-template-columns: 1fr 56px; }
          .hero-outer::after { right: 68px; }
          .section2 { padding: 60px 40px 80px; gap: 48px; }
          .section3 { padding: 80px 40px 60px; }
          .section4 { padding: 0 40px 80px; }
          .cta-box { padding: 70px 48px; }
          .services-outer { padding: 0 40px 80px; }
          .services-inner { gap: 56px; }
          .pricing-outer { padding: 80px 40px 60px; }
          .reviews-outer { padding: 40px 40px 80px; }
          .reviews-inner { gap: 56px; }
          .stats-section { padding: 0 40px 60px; }
          .blog-outer { padding: 80px 40px; }
          .blog-inner { gap: 56px; }
        }

        /* RESPONSIVE Mobile */
        @media (max-width: 768px) {
          .hero-outer { padding: 100px 24px 64px; grid-template-columns: 1fr; min-height: 100svh; }
          .hero-outer::after { display: none; }
          .hero-socials-col { display: none; }
          .hero-socials-row { display: flex; }
          .ht-solid, .ht-outline { font-size: clamp(44px,14vw,90px); letter-spacing: -2px; }
          .av { width: 50px; height: 50px; margin-left: -12px; }
          .av-pill { width: 84px; height: 50px; margin-left: -12px; }
          .hero-bottom { flex-direction: column; align-items: flex-start; gap: 24px; }
          .find-out-btn { width: 96px; height: 96px; }
          .fob-arrow { width: 44px; height: 44px; }
          .section2 { grid-template-columns: 1fr; padding: 56px 24px 72px; gap: 40px; }
          .s2-heading { padding-bottom: 36px; }
          .info-card { grid-template-columns: 100px 1fr 28px; gap: 12px; padding: 18px 0; }
          .card-label { font-size: 13px; }
          .section3 { padding: 56px 24px 48px; }
          .s3-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .work-grid { grid-template-columns: 1fr; gap: 16px; }
          .work-card.tall { grid-row: span 1; }
          .work-card.tall .work-card-img { position: static; min-height: 260px; height: 260px; }
          .section4 { padding: 0 24px 60px; }
          .cta-box { padding: 48px 28px; }
          .services-outer { padding: 0 24px 72px; }
          .services-inner { grid-template-columns: 1fr; gap: 40px; }
          .srv-left { position: static; }
          .srv-row { grid-template-columns: 42px 1fr 26px; gap: 12px; padding: 20px 10px; }
          .srv-cta-card { padding: 32px 28px; }
          .pricing-outer { padding: 60px 24px 48px; }
          .pricing-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
          .reviews-outer { padding: 40px 24px 72px; }
          .reviews-inner { grid-template-columns: 1fr; gap: 28px; }
          .stats-section { padding: 0 24px 56px; }
          .stat-row { grid-template-columns: auto 1fr auto; gap: 16px; padding: 24px 0; }
          .stat-label { font-size: 14px; }
          .blog-outer { padding: 56px 24px 64px; }
          .blog-inner { grid-template-columns: 1fr; gap: 40px; }
          .blog-left { position: static; }
        }

        @media (max-width: 480px) {
          .hero-outer { padding: 84px 18px 52px; }
          .ht-solid, .ht-outline { font-size: clamp(36px,15vw,64px); letter-spacing: -1.5px; }
          .av { width: 42px; height: 42px; margin-left: -10px; }
          .av-pill { width: 68px; height: 42px; margin-left: -10px; }
          .hero-line { gap: 8px; }
          .find-out-btn { width: 84px; height: 84px; }
          .fob-arrow { width: 38px; height: 38px; }
          .social-icon { width: 36px; height: 36px; }
          .section2 { padding: 48px 18px 60px; }
          .section3 { padding: 48px 18px; }
          .section4 { padding: 0 18px 48px; }
          .cta-box { padding: 40px 20px; }
          .services-outer { padding: 0 18px 60px; }
          .pricing-outer { padding: 48px 18px; }
          .pricing-grid { max-width: 100%; }
          .reviews-outer { padding: 36px 18px 60px; }
          .stats-section { padding: 0 18px 48px; }
          .blog-outer { padding: 48px 18px 56px; }
          .stat-row { grid-template-columns: 1fr auto; gap: 12px; }
          .stat-label { display: none; }
          .info-card { grid-template-columns: 90px 1fr 26px; gap: 10px; }
          .srv-row { grid-template-columns: 38px 1fr 24px; gap: 10px; padding: 18px 8px; }
          .work-card.tall .work-card-img { min-height: 220px; height: 220px; }
        }
      `}</style>

      <div className="page-wrap" ref={pageRef}>

        {/* ════════ HERO ════════ */}
        <section className="hero" ref={heroRef}>
          <div className="hero-glow" />
          <div className="hero-outer">
            <div className="hero-content">
              <div className="hero-display">
                <div className="hero-line">
                  <span className="ht-solid">Creative</span>
                </div>
                <div className="hero-line">
                  <div className="av-group">
                    {[
                      "https://templatekit.jegtheme.com/creatv/wp-content/uploads/sites/419/2023/10/contemporary-abstract-papaya-seamless-pattern-modern-exotic-tropical-fruits-colored-design--e1698314020901-800x800.jpg",
                      "https://templatekit.jegtheme.com/creatv/wp-content/uploads/sites/419/2023/10/abstract-paint-texture-art-colorful-design-psychedelic-background--e1698314026988-768x768.jpg",
                      "https://templatekit.jegtheme.com/creatv/wp-content/uploads/sites/419/2023/10/singapore-city-landmarks-artwork-e1698314038591-768x768.jpg",
                    ].map((src, i) => (
                      <div className="av" key={i}>
                        <img src={src} alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
                      </div>
                    ))}
                  </div>
                  <span className="ht-outline">Design</span>
                </div>
                <div className="hero-line">
                  <span className="ht-solid">Agency</span>
                  <div className="av-group">
                    <div className="av-pill">
                      <img src="https://templatekit.jegtheme.com/creatv/wp-content/uploads/sites/419/elementor/thumbs/young-hispanic-man-close-to-a-neon-light-with-blue-and-red-lights-e1698314047406-qefb50adzyp0swifvvgqrnum31q8no2157fhgtgne8.jpg"
                        alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
                    </div>
                    <div className="av" style={{ background: "linear-gradient(135deg,#d946ef,#86198f)" }}>
                      <img src="https://templatekit.jegtheme.com/creatv/wp-content/uploads/sites/419/2023/10/confident-look-studio-shot-indoors-with-neon-light-portrait-of-beautiful-young-girl-e1674113746744.jpg"
                        alt="" onError={e => { e.currentTarget.style.display = "none"; }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-bottom">
                <div className="find-out-btn" role="button" aria-label="Find out more">
                  <div className="fob-bg">
                    <svg className="ring-svg" viewBox="0 0 100 100" aria-hidden="true">
                      <defs><path id="rp" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs>
                      <text fill="white" fontSize="8.5" fontFamily="Barlow Condensed,sans-serif" fontWeight="700" letterSpacing="2.8">
                        <textPath href="#rp">FIND OUT MORE • FIND OUT MORE •</textPath>
                      </text>
                    </svg>
                    <div className="fob-arrow"><ArrowUpRight /></div>
                  </div>
                </div>
                <p className="hero-desc">
                  We are a creative design agency specializing in crafting visually
                  appealing and effective design solutions for clients across a variety
                  of industries. Join us and create something extraordinary.
                </p>
              </div>

              <div className="hero-socials-row">
                {SOCIALS.map(({ icon, label }) => (
                  <a key={label} href="#" className="social-icon" aria-label={label}>{icon}</a>
                ))}
              </div>
            </div>

            <div className="hero-socials-col">
              {SOCIALS.map(({ icon, label }) => (
                <a key={label} href="#" className="social-icon" aria-label={label}>{icon}</a>
              ))}
            </div>
          </div>
        </section>

        <Ticker label="Open For New Projects" />

        {/* ════════ SECTION 2 ════════ */}
        <div className="section2-wrap">
          <section className="section2" ref={sec2Ref}>
            <div className="s2-left">
              <div className="s2-heading">
                <span className="word solid-word">Jump Start</span>
                <span className="word outline-word">Your Design</span>
              </div>
              <div className="s2-bottom">
                <div className="s2-video-block">
                  <div className="play-btn"><PlayIcon /></div>
                  <span className="play-label">Video Introduction</span>
                </div>
                <p className="s2-body-text">
                  We combine strategic thinking with bold visual craft to build brands and
                  digital experiences that connect with your audience and drive real business results.
                </p>
                <a href="#" className="learn-more">Learn More <ArrowRight /></a>
              </div>
            </div>
            <div className="s2-right">
              <div className="s2-img-wrap">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team working"
                  onError={e => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div className="info-cards">
                {INFO_CARDS.map(({ label, diagonal, desc }) => (
                  <div className="info-card" key={label}>
                    <span className="card-label">{label}</span>
                    <span className="card-desc">{desc}</span>
                    <div className={`card-arrow${diagonal ? " diagonal" : ""}`}><ArrowRight /></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <Ticker label="Why Choose Us" />

        {/* ════════ OUR WORK ════════ */}
        <div className="section3-wrap">
          <section className="section3" ref={sec3Ref}>
            <div className="s3-header">
              <div className="s3-title">
                <span className="t-solid">Let's Check</span>
                <span className="t-outline">Our Work</span>
              </div>
              <a href="#" className="s3-more-btn">More Works</a>
            </div>
            <div className="work-grid">
              {WORKS.map(({ img, title, tag, desc, tall }) => (
                <div className={`work-card${tall ? " tall" : ""}`} key={title}>
                  <img src={img} alt={title} className="work-card-img"
                    onError={e => { e.currentTarget.style.display = "none"; }} />
                  <div className="work-card-overlay">
                    <div className="wc-row">
                      <span className="wc-title">{title}</span>
                      <span className="wc-tag">{tag}</span>
                    </div>
                    <p className="wc-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ════════ CTA ════════ */}
        <section className="section4" ref={ctaRef}>
          <div className="cta-box">
            <div className="cta-heading">
              <span className="ch-solid">Have a Project?</span>
              <span className="ch-outline">Let's Talk.</span>
            </div>
            <a href="#" className="cta-btn">Get Started</a>
          </div>
        </section>

        <Ticker label="What We Do" />

        {/* ════════ SERVICES ════════ */}
        <div className="services-outer" ref={srvRef}>
          <div className="services-inner">
            <div className="srv-left">
              <div className="srv-heading">
                <span className="sh-solid">Together</span>
                <span className="sh-outline">We Create</span>
              </div>
              <p className="srv-desc">
                From first sketch to final launch, we bring creative expertise and strategic
                thinking to every service we offer — so your brand always shows up at its best.
              </p>
            </div>
            <div className="srv-right">
              {SERVICES.map(({ name, desc, icon }, idx) => (
                <div className={`srv-row${idx === activeIdx ? " active" : ""}`} key={name} onMouseEnter={() => setActiveIdx(idx)}>
                  <div className="srv-icon">{icon}</div>
                  <div className="srv-text">
                    <span className="srv-name">{name}</span>
                    <p className="srv-body">{desc}</p>
                  </div>
                  <div className="srv-arrow"><ArrowRight /></div>
                </div>
              ))}
              <div className="srv-cta-card">
                <p className="srv-cta-text">Ready to start? Let's build something remarkable together.</p>
                <a href="#" className="srv-cta-btn">Get In Touch</a>
              </div>
            </div>
          </div>
        </div>

        <Ticker label="Pricing & Plans" />

        {/* ════════ PRICING ════════ */}
        <div className="pricing-outer" ref={pricingRef}>
          <div className="pricing-header">
            <h2 className="pricing-title">
              <span className="pt-solid">Special </span>
              <span className="pt-outline">Price &amp; Plan</span>
            </h2>
            <p className="pricing-subtitle">Simple, transparent pricing. Choose the plan that fits your ambitions.</p>
          </div>
          <div className="pricing-grid">
            {PLANS.map(({ tier, amount, features }) => (
              <div className="price-card" key={tier}>
                <p className="pc-tier">{tier}</p>
                <div className="pc-price">
                  <span className="pc-amount">{amount}</span>
                  <span className="pc-period">/Month</span>
                </div>
                <div className="pc-divider" />
                <ul className="pc-features">
                  {features.map(f => (
                    <li className="pc-feat" key={f}>
                      <span className="pc-feat-icon"><CheckIcon /></span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#" className="pc-btn">Select Plan</a>
              </div>
            ))}
          </div>
        </div>

        {/* ════════ REVIEWS ════════ */}
        <div className="reviews-outer" ref={reviewsRef}>
          <div className="reviews-inner">
            <div className="rev-left">
              <div className="rev-heading">
                <span className="rh-solid">Our Client</span>
                <span className="rh-outline">Reviews</span>
              </div>
            </div>
            <div className="rev-right">
              <div className="rev-stars">
                {Array(r.stars).fill(0).map((_, i) => <span className="rev-star" key={i}>★</span>)}
              </div>
              <div className="rev-author">
                <div className="rev-avatar">
                  <img src={r.avatar} alt={r.name} onError={e => { e.currentTarget.style.display = "none"; }} />
                </div>
                <div>
                  <p className="rev-name">{r.name}</p>
                  <p className="rev-role">{r.role}</p>
                </div>
              </div>
              <p className="rev-quote">{r.quote}</p>
              <div className="rev-nav">
                {REVIEWS.map((_, i) => (
                  <button key={i} className={`rev-dot${i === activeReview ? " on" : ""}`}
                    onClick={() => setActiveReview(i)} aria-label={`Review ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Ticker label="Fun Facts" />

        {/* ════════ STATS ════════ */}
        <section className="stats-section" ref={statsRef}>
          <div className="stats-inner">
            {STATS.map(({ display, suffix, label }, i) => (
              <div className="stat-row" key={label}>
                <div className="stat-value">
                  <span className="stat-num" data-val={display}>{display}</span>
                  <span className="stat-plus">{suffix}</span>
                </div>
                <span className="stat-label">{label}</span>
                <div className="stat-arrow">
                  {i === 0 ? <ArrowUpRight /> : <ArrowRight />}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Ticker label="Latest Blog" />

        {/* ════════ BLOG ════════ */}
        <div className="blog-outer" ref={blogRef}>
          <div className="blog-inner">
            <div className="blog-left">
              <div className="blog-heading">
                <span className="bh-solid">Our Blog</span>
                <span className="bh-outline">&amp; Articles</span>
              </div>
              <p className="blog-desc">
                Insights on design, branding, and strategy — written by our team to help you
                build smarter and create with confidence.
              </p>
              <a href="#" className="blog-view-btn">View All Posts</a>
            </div>
            <div className="blog-right">
              {POSTS.map(({ img, tag, title, excerpt }) => (
                <article className="blog-post" key={title}>
                  <div className="bp-img-wrap">
                    <img src={img} alt={title} className="bp-img"
                      onError={e => { e.currentTarget.style.display = "none"; }} />
                    <span className="bp-tag">{tag}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <h3 className="bp-title">{title}</h3>
                    <p className="bp-excerpt">{excerpt}</p>
                    <a href="#" className="bp-read">
                      Read More <span className="bp-read-arrow"><ArrowRight /></span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
Home.layout = (page) => <MainLayout>{page}</MainLayout>;
