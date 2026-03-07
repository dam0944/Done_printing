import { useEffect, useRef, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "4,218", suffix: "+", label: "Projects Completed",  arrow: "↗" },
  { value: "812K",  suffix: "+", label: "Satisfied Clients",   arrow: "→" },
  { value: "293",   suffix: "+", label: "Agency Partners",     arrow: "→" },
  { value: "456",   suffix: "+", label: "Services Delivered",  arrow: "→" },
  { value: "184",   suffix: "+", label: "Awards Won",          arrow: "→" },
];

const WORKS = [
  {
    img:     "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    ],
    title:        "Art Direction",
    tag:          "Art Direction",
    desc:         "A full visual art direction project for a luxury lifestyle brand — spanning campaign photography, editorial layout, and digital rollout across web and social.",
    tall:         true,
    client:       "Luminos Studio",
    category:     "Art Direction",
    year:         "2024",
    deliverables: ["Brand Campaign", "Editorial Design", "Social Media Kit"],
    challenge:    "The client needed a cohesive visual language that felt premium yet approachable — something that stood apart from typical luxury aesthetics without losing its sense of refinement.",
    solution:     "We developed a muted, high-contrast palette paired with oversized typography and intimate photography. Every frame was art-directed to feel editorial but warm, resulting in a campaign that performed 3× above industry benchmarks for engagement.",
    link:         "#",
  },
  {
    img:     "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    ],
    title:        "Logo Design",
    tag:          "Branding",
    desc:         "A complete logo and identity system for a fintech startup — designed to communicate trust, clarity, and forward momentum in a crowded market.",
    tall:         false,
    client:       "Veltro Finance",
    category:     "Brand Identity",
    year:         "2023",
    deliverables: ["Logo System", "Brand Guidelines", "Stationery Pack"],
    challenge:    "Fintech brands often default to cold, corporate visuals. The client wanted to feel approachable to young professionals without sacrificing credibility.",
    solution:     "We created a geometric wordmark built on a dynamic angle — suggesting movement and growth. The color system pairs a deep navy with a vibrant amber accent, creating warmth without sacrificing authority.",
    link:         "#",
  },
  {
    img:     "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1200&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
    ],
    title:        "Brand Identity",
    tag:          "Branding",
    desc:         "An end-to-end brand identity for a wellness company — from naming and logo to packaging, web presence, and brand voice guidelines.",
    tall:         false,
    client:       "Aura Wellness Co.",
    category:     "Brand Identity",
    year:         "2023",
    deliverables: ["Logo & Identity", "Packaging Design", "Brand Voice Guide", "Website Design"],
    challenge:    "The wellness space is saturated with soft pastels and generic leaf icons. The client wanted to stand out as a premium, science-backed alternative.",
    solution:     "We leaned into precision and clarity — a clean sans-serif wordmark, a restrained palette of off-white and deep forest green, and packaging that feels more lab than spa. The result signals trust and credibility at every touchpoint.",
    link:         "#",
  },
  {
    img:     "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    ],
    title:        "Product Design",
    tag:          "UX/UI",
    desc:         "UI/UX design for an industrial SaaS dashboard — built to make complex data readable, actionable, and visually elegant for field engineers and managers.",
    tall:         false,
    client:       "FieldOps Systems",
    category:     "UI/UX Design",
    year:         "2024",
    deliverables: ["Dashboard UI", "Design System", "Prototype & Handoff"],
    challenge:    "Users were overwhelmed by dense data tables and a cluttered interface. The previous design had 40+ screens with no consistent visual hierarchy.",
    solution:     "We rebuilt the information architecture from scratch, introducing a modular card system, a clear type scale, and color-coded status indicators. User testing showed a 62% reduction in task completion time after the redesign.",
    link:         "#",
  },
  {
    img:     "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
      "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1200&q=80",
    ],
    title:        "Website Design",
    tag:          "Web Dev",
    desc:         "A conversion-focused website redesign for a B2B SaaS company — balancing product storytelling with clear calls to action across all devices.",
    tall:         false,
    client:       "Nexlabs Inc.",
    category:     "Web Design",
    year:         "2023",
    deliverables: ["Full Website Design", "Responsive Build", "CMS Integration"],
    challenge:    "The existing site had a high bounce rate and poor mobile experience. The product's value proposition wasn't clear within the first scroll.",
    solution:     "We restructured the homepage narrative to lead with outcomes, not features. A bold hero, animated social proof, and a streamlined pricing section drove a 38% increase in demo requests within the first month post-launch.",
    link:         "#",
  },
  {
    img:     "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    ],
    title:        "Graphic Design",
    tag:          "Graphics",
    desc:         "A comprehensive graphic design package for a creative conference — covering visual identity, print collateral, signage, and motion assets for the event.",
    tall:         false,
    client:       "CreateConf 2024",
    category:     "Graphic Design",
    year:         "2024",
    deliverables: ["Event Identity", "Print Collateral", "Motion Graphics", "Signage System"],
    challenge:    "The conference needed a visual identity that could work across a huge range of applications — from large-format banners to Instagram stories — without losing its impact or coherence.",
    solution:     "We built a flexible modular system around a bold diagonal grid and a vibrant two-color palette. The system was designed to scale so the entire production team could create on-brand assets without a designer in the room.",
    link:         "#",
  },
];

const FAQ_ITEMS = [
  {
    q: "1. What is a digital agency?",
    a: "A digital agency is a creative and strategic partner that helps businesses build their presence online and offline. We combine design, technology, and marketing to craft experiences that attract customers, communicate your brand's value, and drive measurable results.",
  },
  {
    q: "2. What services does a digital agency offer?",
    a: "We offer a full suite of creative services including brand identity design, UI/UX design, web design and development, mobile app design, motion graphics, content creation, and digital marketing strategy. Whether you need a complete brand overhaul or a single focused campaign, we have you covered.",
  },
  {
    q: "3. How can a digital agency benefit my business?",
    a: "Working with a digital agency gives you access to a team of specialists without the overhead of hiring in-house. We bring fresh perspective, proven processes, and cross-industry experience that helps you make smarter creative decisions, reach more customers, and grow faster.",
  },
  {
    q: "4. How do digital agencies approach a new project?",
    a: "Every project starts with a deep discovery session where we learn about your brand, goals, audience, and competition. From there we develop a strategy, present creative concepts, refine based on your feedback, and deliver final assets — with clear milestones and open communication throughout.",
  },
  {
    q: "5. What is the cost of digital agency services?",
    a: "Pricing depends on the scope and complexity of your project. We offer three transparent monthly plans — Silver, Gold, and Platinum — as well as custom quotes for larger engagements. We are happy to discuss your budget and find a solution that fits without compromising on quality.",
  },
  {
    q: "6. How long does a typical project take?",
    a: "Timelines vary by project type. A brand identity typically takes 3–4 weeks, a website design 4–8 weeks, and a full brand and web package 8–12 weeks. We always agree on a timeline upfront and keep you informed at every stage so there are never any surprises.",
  },
  {
    q: "7. What sets a good digital agency apart from others?",
    a: "The best agencies combine creative excellence with strategic thinking and clear communication. We do not just make things look good — we make sure they work. Our process is collaborative, our standards are high, and we measure success by the real-world impact our work has on your business.",
  },
  {
    q: "8. How do I ask for support?",
    a: "You can reach our support team anytime via email, through the client portal, or by booking a call directly from your dashboard. All Gold and Platinum plan clients receive priority 24/7 support with a guaranteed response within 2 hours on business days.",
  },
];

// ─── Ticker (self-contained ref + GSAP) ──────────────────────────────────────
function Ticker({ label, variant = "primary" }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    let anim;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const track = wrap.querySelector(".tk-track");
      if (track && !wrap.dataset.cloned) {
        wrap.appendChild(track.cloneNode(true));
        wrap.dataset.cloned = "1";
      }
      anim = gsap.to(wrap.querySelectorAll(".tk-track"), {
        x: "-100%", duration: variant === "secondary" ? 22 : 18,
        ease: "none", repeat: -1,
      });
    };
    init();
    return () => anim?.kill();
  }, [variant]);

  if (variant === "secondary") {
    return (
      <div className="ticker2-wrap">
        <div className="ticker2-inner" ref={wrapRef}>
          <div className="tk-track ticker2-track">
            {Array(12).fill(label).map((t, i) => (
              <span className="ticker2-item" key={i}>
                <span className="t2-dot" />{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ticker-wrap">
      <div className="ticker-inner" ref={wrapRef}>
        <div className="tk-track ticker-track">
          {Array(12).fill(label).map((t, i) => (
            <span className="ticker-item" key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Contact() {
  const heroRef  = useRef(null);
  const workRef  = useRef(null);
  const statsRef = useRef(null);
  const ctaRef   = useRef(null);
  const ctxRef   = useRef(null);
  const faqRef   = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);

  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your real submit logic (fetch, axios, Inertia post, etc.)
    console.log("Form submitted:", form);
    setSent(true);
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctxRef.current = gsap.context(() => {

        // ── Hero: breadcrumb + lines + desc cascade ──
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(heroRef.current.querySelector(".about-breadcrumb"),
            { y: 20, opacity: 0, duration: 0.6 })
          .from(heroRef.current.querySelectorAll(".hero-line span"),
            { y: 90, opacity: 0, duration: 1, stagger: 0.12, clearProps: "all" }, "-=0.2")
          .from(heroRef.current.querySelector(".about-desc"),
            { y: 24, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.4");

        // ── Work section header + cards ──
        if (workRef.current) {
          gsap.from(workRef.current.querySelectorAll(".s3-title span"),
            {
              scrollTrigger: { trigger: workRef.current, start: "top 78%", toggleActions: "play none none reverse" },
              y: 50, opacity: 0, duration: 0.75, stagger: 0.1,
              ease: "power3.out", clearProps: "all",
            }
          );
          gsap.from(workRef.current.querySelector(".s3-more-btn"),
            {
              scrollTrigger: { trigger: workRef.current, start: "top 78%", toggleActions: "play none none reverse" },
              scale: 0.88, opacity: 0, duration: 0.6, delay: 0.25,
              ease: "back.out(1.5)", clearProps: "all",
            }
          );
          // Cards: alternate y/x entrance for visual interest
          workRef.current.querySelectorAll(".work-card").forEach((card, idx) => {
            const fromX = idx % 2 === 0 ? -30 : 30;
            gsap.from(card, {
              scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
              x: fromX, y: 40, opacity: 0, duration: 0.75,
              delay: idx * 0.07, ease: "power3.out", clearProps: "all",
            });
          });
        }

        // ── Stats rows: staggered slide-in ──
        if (statsRef.current) {
          gsap.from(statsRef.current.querySelectorAll(".stat-row"), {
            scrollTrigger: { trigger: statsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
            x: -60, opacity: 0, duration: 0.65, stagger: 0.1,
            ease: "power3.out", clearProps: "all",
          });
          // Animate stat values counting up
          statsRef.current.querySelectorAll(".stat-num").forEach((el) => {
            const raw   = el.dataset.raw;          // e.g. "4218", "812", "293"
            const isInt = !isNaN(Number(raw));
            if (!isInt) return;
            gsap.fromTo(el,
              { innerText: 0 },
              {
                scrollTrigger: { trigger: statsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
                innerText: Number(raw),
                duration: 1.8, delay: 0.3, ease: "power2.out", snap: { innerText: 1 },
                onUpdate() { el.innerText = Math.round(Number(el.innerText)).toLocaleString(); },
              }
            );
          });
        }

        // ── CTA ──
        if (ctaRef.current) {
          gsap.from(ctaRef.current.querySelector(".cta-box"), {
            scrollTrigger: { trigger: ctaRef.current, start: "top 82%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all",
          });
        }

      }, heroRef);
    };

    initGSAP();
    return () => ctxRef.current?.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { background: #0e0c2e; }

        .page-wrap {
          font-family: 'Barlow', sans-serif;
          background: #0e0c2e;
          color: #fff;
          overflow-x: hidden;
        }

        /* ─── HERO ─── */
        .about-hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          background: radial-gradient(ellipse 90% 70% at 50% 40%, #1a1660 0%, #0e0c2e 68%);
          text-align: center;
          padding: 120px 60px 80px;
          overflow: hidden;
        }
        .about-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .about-hero-inner {
          position: relative; z-index: 1;
          max-width: 1280px; width: 100%; margin: 0 auto;
        }
        .about-breadcrumb {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 3px;
          color: rgba(255,255,255,0.35); margin-bottom: 32px;
        }
        .about-breadcrumb .sep { color: #7c3aed; }
        .about-breadcrumb .current { color: rgba(255,255,255,0.65); }
        .about-hero-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          line-height: 0.88; margin-bottom: 36px;
        }
        .hero-line {
          display: flex; align-items: center;
          justify-content: center; gap: 24px; flex-wrap: wrap;
          overflow: hidden;
        }
        .hero-line span.solid {
          font-size: clamp(80px, 12vw, 170px);
          color: #fff; letter-spacing: -3px; line-height: 0.88;
          display: inline-block;
        }
        .hero-line span.outline {
          font-size: clamp(80px, 12vw, 170px);
          color: transparent;
          -webkit-text-stroke: 2.5px rgba(255,255,255,0.38);
          letter-spacing: -3px; line-height: 0.88;
          display: inline-block;
        }
        .about-desc {
          font-size: 16px; line-height: 1.75;
          color: rgba(255,255,255,0.55);
          max-width: 560px; margin: 0 auto;
        }
        .hero-deco {
          position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
        .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

        /* ─── PRIMARY TICKER ─── */
        .ticker-wrap {
          width: 100%; overflow: hidden;
          background: #7c3aed;
          padding: 13px 0;
          transform: rotate(-1.2deg) scaleX(1.04);
          margin: 10px 0;
          position: relative; z-index: 10;
        }
        .ticker-inner,
        .ticker2-inner { display: flex; width: max-content; }
        .ticker-track,
        .ticker2-track { display: flex; white-space: nowrap; }
        .ticker-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 3px;
          color: #fff; padding: 0 32px;
          display: flex; align-items: center; gap: 14px;
        }
        .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

        /* ─── SECONDARY TICKER ─── */
        .ticker2-wrap {
          width: 100%; overflow: hidden;
          border-top: 1px solid rgba(124,58,237,0.2);
          border-bottom: 1px solid rgba(124,58,237,0.2);
          padding: 14px 0;
        }
        .ticker2-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: rgba(255,255,255,0.4);
          padding: 0 28px; display: flex; align-items: center; gap: 10px;
        }
        .t2-dot {
          width: 5px; height: 5px;
          background: #7c3aed; border-radius: 50%; flex-shrink: 0;
        }

        /* ─── OUR WORK ─── */
        .section3 {
          padding: 100px 60px 80px;
          max-width: 1280px; margin: 0 auto;
        }
        .section3-bg { background: #0a0828; }
        .s3-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 60px; gap: 20px;
        }
        .s3-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase; line-height: 0.92;
        }
        .s3-title .t-solid { font-size: clamp(42px, 5vw, 72px); color: #fff; display: block; }
        .s3-title .t-outline {
          font-size: clamp(42px, 5vw, 72px); color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.28); display: block;
        }
        .s3-more-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 11px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: #fff; background: #7c3aed;
          padding: 12px 24px; border-radius: 5px;
          text-decoration: none; white-space: nowrap;
          flex-shrink: 0; margin-bottom: 6px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .s3-more-btn:hover {
          background: #6d28d9;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(124,58,237,0.4);
        }

        /* ─── WORK GRID ─── */
        .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .work-card {
          position: relative; border-radius: 12px;
          overflow: hidden; cursor: pointer; background: #13103a;
          will-change: transform;
        }
        .work-card.tall { grid-row: span 2; }
        .work-card-img {
          width: 100%; height: 100%; min-height: 240px;
          object-fit: cover; display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .work-card.tall .work-card-img { min-height: 100%; }
        .work-card:hover .work-card-img { transform: scale(1.06); }
        .work-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,8,40,0.95) 0%, rgba(10,8,40,0.3) 50%, transparent 100%);
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 22px; gap: 8px;
          transition: background 0.4s ease;
        }
        .work-card:hover .work-card-overlay {
          background: linear-gradient(to top, rgba(10,8,40,1) 0%, rgba(10,8,40,0.4) 55%, transparent 100%);
        }
        .wc-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .wc-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 17px;
          text-transform: uppercase; letter-spacing: 0.5px; color: #fff;
        }
        .wc-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; font-size: 10px;
          text-transform: uppercase; letter-spacing: 1.5px;
          color: #fff; background: #7c3aed;
          padding: 4px 10px; border-radius: 3px; white-space: nowrap;
          transition: background 0.2s;
        }
        .work-card:hover .wc-tag { background: #6d28d9; }
        .wc-desc { font-size: 12px; line-height: 1.55; color: rgba(255,255,255,0.5); max-width: 90%; }

        /* ─── CTA ─── */
        .section4 { background: #0e0c2e; padding: 80px 60px 100px; }
        .cta-box {
          max-width: 1280px; margin: 0 auto;
          background: linear-gradient(135deg, #13103a 0%, #1a1660 60%, #0e0c2e 100%);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 16px; padding: 80px 60px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute; top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          line-height: 0.92; margin-bottom: 32px; position: relative;
        }
        .cta-heading .ch-solid { font-size: clamp(48px, 6vw, 90px); color: #fff; display: block; }
        .cta-heading .ch-outline {
          font-size: clamp(48px, 6vw, 90px); color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block;
        }
        .cta-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: #fff; background: #7c3aed;
          padding: 15px 40px; border-radius: 6px;
          text-decoration: none; display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          position: relative;
        }
        .cta-btn:hover {
          transform: translateY(-3px);
          background: #6d28d9;
          box-shadow: 0 10px 30px rgba(124,58,237,0.5);
        }

        /* ─── STATS ─── */
        .stats-section { background: #0e0c2e; padding: 0 60px 80px; }
        .stats-inner { max-width: 1280px; margin: 0 auto; }
        .stat-row {
          display: grid;
          grid-template-columns: 280px 1fr auto;
          align-items: center;
          padding: 38px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          gap: 24px; cursor: pointer;
          transition: padding-left 0.3s ease;
        }
        .stat-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .stat-row:hover { padding-left: 12px; }
        .stat-value {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; font-size: clamp(42px, 5vw, 68px);
          color: #fff; letter-spacing: -1px; line-height: 1;
          display: flex; align-items: baseline; gap: 5px;
        }
        .stat-plus {
          font-size: clamp(24px, 3vw, 38px);
          color: #7c3aed; font-weight: 700; line-height: 1;
        }
        .stat-label {
          font-family: 'Barlow', sans-serif;
          font-weight: 600; font-size: clamp(18px, 2vw, 26px);
          color: rgba(255,255,255,0.7); letter-spacing: 0.2px;
          transition: color 0.3s;
        }
        .stat-row:hover .stat-label { color: rgba(255,255,255,0.95); }
        .stat-arrow {
          width: 38px; height: 38px;
          border: 1px solid rgba(255,255,255,0.18); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; color: rgba(255,255,255,0.45); flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat-row:first-child .stat-arrow { border-color: rgba(124,58,237,0.6); color: #7c3aed; }
        .stat-row:hover .stat-arrow {
          background: #7c3aed; border-color: #7c3aed; color: #fff; transform: rotate(-45deg) scale(1.1);
        }
/* ─── CONTACT SECTION ─── */
  .contact-section {
    background: #0e0c2e;
    padding: 80px 60px;
  }
  .contact-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid rgba(124,58,237,0.18);
    border-radius: 14px;
    overflow: hidden;
  }

  /* ── LEFT PANEL ── */
  .contact-info {
    background: #13103a;
    padding: 56px 48px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    border-right: 1px solid rgba(124,58,237,0.18);
  }
  .ci-item {}
  .ci-label {
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 6px;
  }
  .ci-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    letter-spacing: 0.2px;
    line-height: 1.4;
  }
  .ci-value a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
  }
  .ci-value a:hover { color: #7c3aed; }

  /* Map embed */
  .ci-map {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(124,58,237,0.25);
    flex-grow: 1;
    min-height: 200px;
  }
  .ci-map iframe {
    width: 100%;
    height: 100%;
    min-height: 200px;
    display: block;
    border: none;
    filter: invert(0.9) hue-rotate(195deg) saturate(0.6) brightness(0.85);
  }

  /* ── RIGHT PANEL ── */
  .contact-form-panel {
    background: #0e0c2e;
    padding: 56px 48px;
  }
  .cf-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    font-size: clamp(30px, 3.5vw, 50px);
    color: #fff;
    letter-spacing: -0.5px;
    margin-bottom: 40px;
    line-height: 1;
  }
  .cf-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 28px;
  }
  .cf-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
  }
  .cf-field.full { grid-column: span 2; }
  .cf-label {
    font-family: 'Barlow', sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.35);
    margin-bottom: 10px;
  }
  .cf-input,
  .cf-textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    padding: 8px 0;
    outline: none;
    transition: border-color 0.25s;
    width: 100%;
  }
  .cf-input::placeholder,
  .cf-textarea::placeholder { color: rgba(255,255,255,0.2); }
  .cf-input:focus,
  .cf-textarea:focus { border-bottom-color: #7c3aed; }
  .cf-textarea {
    resize: none;
    min-height: 90px;
    line-height: 1.6;
  }
  .cf-submit {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #fff;
    background: #7c3aed;
    border: none;
    padding: 16px 0;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    margin-top: 6px;
  }
  .cf-submit:hover {
    background: #6d28d9;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(124,58,237,0.45);
  }
  .cf-submit:active { transform: translateY(0); }

  /* ── SUCCESS STATE ── */
  .cf-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 40px 0;
    text-align: center;
  }
  .cf-success-icon {
    width: 52px; height: 52px;
    background: rgba(124,58,237,0.15);
    border: 1px solid rgba(124,58,237,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .cf-success-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 20px;
    text-transform: uppercase; letter-spacing: 1px;
    color: #fff;
  }
  .cf-success-sub {
    font-size: 13px; color: rgba(255,255,255,0.4); font-family: 'Barlow', sans-serif;
  }
    /* ─── FAQ ─── */
        .faq-section { background: #080620; padding: 100px 60px; }
        .faq-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 380px 1fr; gap: 100px; align-items: start; }
        .faq-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.88; margin-bottom: 28px; }
        .faq-title .ft-solid { font-size: clamp(44px, 5.5vw, 78px); color: #fff; display: block; letter-spacing: -1px; }
        .faq-title .ft-outline { font-size: clamp(44px, 5.5vw, 78px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); display: block; letter-spacing: -1px; }
        .faq-desc { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.45); margin-bottom: 36px; max-width: 340px; }
        .faq-contact-btn {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 3px; color: #fff; background: #7c3aed;
          padding: 14px 30px; border-radius: 4px; text-decoration: none; display: inline-block;
          transition: background 0.2s, transform 0.2s;
        }
        .faq-contact-btn:hover { background: #6d28d9; transform: translateY(-1px); }
        .faq-list { display: flex; flex-direction: column; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.1); }
        .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
        .faq-question { display: flex; align-items: center; justify-content: space-between; padding: 22px 0; cursor: pointer; gap: 20px; user-select: none; }
        .faq-q-text { font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 15px; color: #fff; flex: 1; }
        .faq-toggle {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(124,58,237,0.25); border: 1px solid rgba(124,58,237,0.4);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 18px; color: #fff;
          transition: background 0.25s, transform 0.3s; line-height: 1;
        }
        .faq-item.open .faq-toggle { background: #7c3aed; border-color: #7c3aed; transform: rotate(45deg); }
        .faq-answer { overflow: hidden; max-height: 0; transition: max-height 0.4s ease, padding 0.3s ease; padding: 0; }
        .faq-item.open .faq-answer { max-height: 300px; padding-bottom: 22px; }
        .faq-answer p { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.45); max-width: 580px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .contact-section { padding: 60px 24px; }
    .contact-inner { grid-template-columns: 1fr; }
    .contact-info {
      border-right: none;
      border-bottom: 1px solid rgba(124,58,237,0.18);
      padding: 40px 28px;
    }
    .contact-form-panel { padding: 40px 28px; }
    .cf-grid { grid-template-columns: 1fr; }
    .cf-field.full { grid-column: span 1; }
  }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .about-hero { padding: 100px 24px 60px; }
          .hero-line span.solid,
          .hero-line span.outline { font-size: clamp(52px, 14vw, 90px); letter-spacing: -1px; }
          .section3 { padding: 60px 24px; }
          .s3-header { flex-direction: column; align-items: flex-start; }
          .work-grid { grid-template-columns: 1fr; }
          .work-card.tall { grid-row: span 1; }
          .section4 { padding: 60px 24px 80px; }
          .cta-box { padding: 50px 24px; }
          .stats-section { padding: 0 24px 60px; }
          .stat-row { grid-template-columns: 1fr auto; padding: 26px 0; }
          .stat-label { display: none; }
        }
        @media (max-width: 480px) {
          .work-card-img { min-height: 200px; }
        }
      `}</style>

      <div className="page-wrap">

        {/* ══ HERO ══ */}
        <section className="about-hero" ref={heroRef}>
            <div className="hero-deco tl" />
            <div className="hero-deco br" />
            <div className="about-hero-inner">
            <div className="about-breadcrumb">
                <span>Home</span>
                <span className="sep">/</span>
                <span className="current">Contact</span>
            </div>
            <div className="about-hero-title">
                <div className="hero-line">
                <span className="solid">Get In</span>
                <span className="outline">Touch</span>
                </div>
            </div>
            <p className="about-desc">
                Have a project in mind or just want to say hello? We would love to hear
                from you. Reach out and our team will get back to you within one business day.
            </p>
            </div>
        </section>

        {/* ══ TICKER ══ */}
        <Ticker label="Contact Us" />

        <section className="contact-section">
            <div className="contact-inner">

            {/* ── LEFT: Info + Map ── */}
            <div className="contact-info">
                <div className="ci-item">
                <p className="ci-label">Our Address</p>
                <p className="ci-value">
                    Street 271, Sangkat Toek Thla,<br />
                    Khan Sen Sok, Phnom Penh, Cambodia
                </p>
                </div>

                <div className="ci-item">
                <p className="ci-label">Our Email</p>
                <p className="ci-value">
                    <a href="mailto:hello@creatv.agency">hello@creatv.agency</a>
                </p>
                </div>

                <div className="ci-item">
                <p className="ci-label">Our Phone</p>
                <p className="ci-value">
                    <a href="tel:+85512345678">(+855) 12 345 678</a>
                </p>
                </div>

                <div className="ci-item">
                <p className="ci-label">Working Hours</p>
                <p className="ci-value">
                    Monday – Friday: 8:00 AM – 6:00 PM (ICT)<br />
                    Saturday: 9:00 AM – 1:00 PM
                </p>
                </div>

                {/* Google Map — Phnom Penh, Cambodia */}
                <div className="ci-map">
                <iframe
                    title="Office Location — Phnom Penh"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125019.72623836744!2d104.78801093593751!3d11.562108000000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x9c010ee85ab525bb!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1700000000000"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="contact-form-panel">
                <h2 className="cf-heading">Leave Your Message</h2>

                {sent ? (
                <div className="cf-success">
                    <div className="cf-success-icon">✦</div>
                    <p className="cf-success-text">Message Sent!</p>
                    <p className="cf-success-sub">We'll get back to you within one business day.</p>
                </div>
                ) : (
                <form onSubmit={handleSubmit} noValidate>
                    <div className="cf-grid">
                    <div className="cf-field">
                        <label className="cf-label">Your Name</label>
                        <input
                        className="cf-input"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="cf-field">
                        <label className="cf-label">Your Email</label>
                        <input
                        className="cf-input"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="cf-field">
                        <label className="cf-label">Subject</label>
                        <input
                        className="cf-input"
                        name="subject"
                        type="text"
                        placeholder="Project Inquiry"
                        value={form.subject}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="cf-field">
                        <label className="cf-label">Your Phone</label>
                        <input
                        className="cf-input"
                        name="phone"
                        type="tel"
                        placeholder="+855 12 ..."
                        value={form.phone}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="cf-field full">
                        <label className="cf-label">Message</label>
                        <textarea
                        className="cf-textarea"
                        name="message"
                        placeholder="Tell us about your project — what you need, your timeline, and your budget..."
                        value={form.message}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="cf-field full">
                        <button type="submit" className="cf-submit">
                        Send Message
                        </button>
                    </div>
                    </div>
                </form>
                )}
            </div>
            </div>
        </section>

        {/* ══ TICKER ══ */}
        <Ticker label="FAQ's" />

        {/* ══ FAQ ══ */}
        <section className="faq-section" ref={faqRef}>
            <div className="faq-inner">
            <div className="faq-left">
                <div className="faq-title">
                <span className="ft-solid">Help &amp; FAQ</span>
                <span className="ft-outline">Centers</span>
                </div>
                <p className="faq-desc">
                Have questions about working with us? We have answered the most common ones
                below. If you still need help, our team in Phnom Penh is always happy to
                jump on a call and talk through your specific needs.
                </p>
                <a href="/contact" className="faq-contact-btn">Contact Us</a>
            </div>
            <div className="faq-list">
                {FAQ_ITEMS.map(({ q, a }, i) => (
                <div
                    className={`faq-item${openFaq === i ? " open" : ""}`}
                    key={i}
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                    <div className="faq-question">
                    <span className="faq-q-text">{q}</span>
                    <span className="faq-toggle">+</span>
                    </div>
                    <div className="faq-answer">
                    <p>{a}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        </div>

    </>
  );
}
Contact.layout = (page) => <MainLayout>{page}</MainLayout>;
