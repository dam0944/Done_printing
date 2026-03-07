import { useEffect, useRef, useState } from "react";
import MainLayout from "@/layouts/MainLayout";

// ─── Data constants ───────────────────────────────────────────────────────────

const INFO_CARDS = [
  {
    label: "Who We Are",
    arrow: "↗",
    desc:  "We are a full-service creative agency built by designers, strategists, and storytellers who believe great design has the power to transform businesses.",
  },
  {
    label: "Our Vision",
    arrow: "→",
    desc:  "To become the most trusted creative partner for ambitious brands — delivering work that is bold, purposeful, and built to stand the test of time.",
  },
  {
    label: "Our Mission",
    arrow: "→",
    desc:  "To craft meaningful design experiences that connect brands with their audiences, drive real growth, and make every interaction count.",
  },
];

const TEAM_MEMBERS = [
  {
    name:  "Cartier Bresson",
    role:  "CEO / Founder",
    email: "cartier@creatv.com",
    bg:    "#4fc3f7",
    bio:   "With over 15 years in the creative industry, Cartier founded the agency with one vision: design that drives results. He leads strategy and client relationships.",
  },
  {
    name:  "Viola Spencer",
    role:  "Project Manager",
    email: "viola@creatv.com",
    bg:    "#f48fb1",
    bio:   "Viola keeps every project on time and on budget. Her meticulous planning and clear communication ensure seamless delivery from brief to final handoff.",
  },
  {
    name:  "Carmen Hayes",
    role:  "Motion Designer",
    email: "carmen@creatv.com",
    bg:    "#e0e0e0",
    bio:   "Carmen brings brands to life through animation and motion. Her work spans brand films, UI micro-interactions, and award-winning digital campaigns.",
  },
  {
    name:  "Monica Barker",
    role:  "Digital Manager",
    email: "monica@creatv.com",
    bg:    "#90caf9",
    bio:   "Monica oversees all digital touchpoints — from website launches to social campaigns — ensuring every channel reflects the brand with precision and impact.",
  },
];

const REVIEWS = [
  {
    name:   "Callie John",
    role:   "CEO, VScret",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    stars:  5,
    quote:  "Working with this agency transformed our brand completely. Their attention to detail, creative thinking, and ability to translate our vision into stunning visuals exceeded every expectation we had.",
  },
  {
    name:   "Marcus Lee",
    role:   "Founder, Designly",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars:  5,
    quote:  "From the first consultation to the final delivery, the process was smooth, transparent, and genuinely exciting. They don't just design — they solve real business problems with great design.",
  },
  {
    name:   "Sara Patel",
    role:   "Head of Product, Nexlabs",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    stars:  5,
    quote:  "Our product's user satisfaction scores jumped 40% after the redesign. The team deeply understood our users' needs and crafted an experience that feels effortless and truly delightful.",
  },
];

const AWARDS = [
  {
    country: "Indonesia",
    name:    "Web Design Awards",
    years:   "2010 – 2011",
    desc:    "Recognized for outstanding web design innovation and user experience across Southeast Asia.",
  },
  {
    country: "Australia",
    name:    "Mobile App Awards",
    years:   "2016 – 2017",
    desc:    "Awarded for best-in-class mobile application design, combining beautiful UI with seamless UX.",
  },
  {
    country: "Japan",
    name:    "Animation Awards",
    years:   "2019 – 2020",
    desc:    "Honored for excellence in motion design and brand animation at the Asia Pacific Creative Summit.",
  },
  {
    country: "USA",
    name:    "UX Innovation Award",
    years:   "2021 – 2022",
    desc:    "Celebrated for pushing the boundaries of user experience design with data-driven creative solutions.",
  },
];

const SKILLS = [
  { name: "UI/UX Design",      pct: 97 },
  { name: "Web Design",        pct: 90 },
  { name: "Digital Arts",      pct: 87 },
  { name: "Content Creation",  pct: 83 },
  { name: "Digital Marketing", pct: 75 },
];

const WHY_CARDS = [
  {
    num:   "01.",
    title: "Hard Work",
    desc:  "We pour relentless effort into every project — no shortcuts, no half-measures. Every pixel, every word, and every decision is made with full commitment to excellence.",
  },
  {
    num:   "02.",
    title: "Transparency",
    desc:  "We believe great partnerships are built on honesty. You will always know where your project stands, how your budget is being spent, and what results to expect.",
  },
  {
    num:   "03.",
    title: "More Innovation",
    desc:  "We never recycle the same ideas. Our team actively explores emerging trends, tools, and technologies to keep your brand ahead of the curve and ahead of the competition.",
  },
  {
    num:   "04.",
    title: "Best Team Work",
    desc:  "Our designers, strategists, and developers work as one unit. That tight collaboration means fewer gaps, faster delivery, and a final product that feels truly cohesive.",
  },
  {
    num:   "05.",
    title: "Very Excellence",
    desc:  "We hold every deliverable to the highest standard before it reaches you. Our internal review process is rigorous because your brand deserves nothing less than perfect.",
  },
  {
    num:   "06.",
    title: "Fast Growth",
    desc:  "We are not just here to make things look good — we are here to move the needle. Our work is designed to generate leads, build loyalty, and accelerate your business growth.",
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
    a: "You can reach our team anytime via email at hello@creatv.agency, through the client portal, or by booking a call directly. All Gold and Platinum plan clients receive priority 24/7 support with a guaranteed response within 2 hours on business days.",
  },
];

const PLANS = [
  {
    tier:     "Silver",
    amount:   "$49.99",
    features: [
      "Brand Identity Design",
      "Up to 3 Page Web Design",
      "Social Media Kit",
      "2 Revision Rounds",
      "Email Support",
    ],
  },
  {
    tier:     "Gold",
    amount:   "$59.99",
    features: [
      "Full Branding Package",
      "Up to 8 Page Web Design",
      "Copywriting & Content",
      "Unlimited Revisions",
      "Priority 24/7 Support",
    ],
  },
  {
    tier:     "Platinum",
    amount:   "$79.99",
    features: [
      "Complete Brand System",
      "Custom Web Development",
      "Content Strategy",
      "Dedicated Designer",
      "Full Online 24/7 Support",
    ],
  },
];

const TICKER_ITEMS = ["Our Story", "Our Team", "Why Choose Us", "FAQ's"];

// ─── Reusable Ticker component (fixes duplicate-ref bug) ────────────────────
function Ticker({ label, className = "ticker-wrap", trackClass = "ticker-track", itemClass = "ticker-item" }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const track = wrap.querySelector(`.${trackClass}`);
      if (track && !wrap.dataset.cloned) {
        wrap.appendChild(track.cloneNode(true));
        wrap.dataset.cloned = "1";
      }
      gsap.to(wrap.querySelectorAll(`.${trackClass}`), {
        x: "-100%", duration: 18, ease: "none", repeat: -1,
      });
    };
    init();
  }, [trackClass]);

  return (
    <div className={className}>
      <div className="ticker-inner" ref={wrapRef}>
        <div className={trackClass}>
          {Array(10).fill(label).map((t, i) => (
            <span className={itemClass} key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function Pricing() {
  const heroRef     = useRef(null);
  const section2Ref = useRef(null);
  const imgRef      = useRef(null);
  const cardsRef    = useRef(null);
  const workRef     = useRef(null);
  const ctaRef      = useRef(null);
  const skillsRef   = useRef(null);
  const whyRef      = useRef(null);
  const faqRef      = useRef(null);
  const teamRef     = useRef(null);
  const ctxRef      = useRef(null);


    const [activeIdx, setActiveIdx]       = useState(1);
    const [activeReview, setActiveReview] = useState(0);
    const r = REVIEWS[activeReview];
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctxRef.current = gsap.context(() => {

        // ── Hero entrance ──
        gsap.from(heroRef.current.querySelectorAll(".hero-line"), {
          y: 80, opacity: 0, duration: 1, stagger: 0.15,
          ease: "power3.out", clearProps: "all",
        });
        gsap.from(heroRef.current.querySelector(".about-desc"), {
          y: 30, opacity: 0, duration: 0.9, delay: 0.5,
          ease: "power3.out", clearProps: "all",
        });

        // ── Section 2 ──
        gsap.from(section2Ref.current.querySelectorAll(".s2-heading .word"), {
          scrollTrigger: { trigger: section2Ref.current, start: "top 75%", toggleActions: "play none none reverse" },
          y: 60, opacity: 0, duration: 0.8, stagger: 0.12,
          ease: "power3.out", clearProps: "all",
        });
        gsap.from(imgRef.current, {
          scrollTrigger: { trigger: imgRef.current, start: "top 70%", toggleActions: "play none none reverse" },
          x: 80, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all",
        });
        gsap.from(cardsRef.current.querySelectorAll(".info-card"), {
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          y: 40, opacity: 0, duration: 0.7, stagger: 0.15,
          ease: "power3.out", clearProps: "all",
        });
        const videoBlock = section2Ref.current.querySelector(".s2-video-block");
        if (videoBlock) {
          gsap.from(videoBlock, {
            scrollTrigger: { trigger: videoBlock, start: "top 85%", toggleActions: "play none none reverse" },
            x: -60, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
          });
        }

        // ── Team cards ──
        if (teamRef.current) {
          gsap.from(teamRef.current.querySelector(".team-heading"), {
            scrollTrigger: { trigger: teamRef.current, start: "top 78%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(teamRef.current.querySelectorAll(".team-card"), {
            scrollTrigger: { trigger: teamRef.current, start: "top 68%", toggleActions: "play none none reverse" },
            y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", clearProps: "all",
          });
        }

        // ── Skills bars ──
        if (skillsRef.current) {
          gsap.from(skillsRef.current.querySelector(".skills-title"), {
            scrollTrigger: { trigger: skillsRef.current, start: "top 78%", toggleActions: "play none none reverse" },
            x: -50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(skillsRef.current.querySelectorAll(".award-row"), {
            scrollTrigger: { trigger: skillsRef.current, start: "top 72%", toggleActions: "play none none reverse" },
            x: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", clearProps: "all",
          });
          skillsRef.current.querySelectorAll(".skill-fill").forEach((bar) => {
            const targetWidth = bar.dataset.width;
            gsap.fromTo(bar,
              { width: "0%" },
              {
                scrollTrigger: { trigger: skillsRef.current, start: "top 70%", toggleActions: "play none none reverse" },
                width: targetWidth, duration: 1.2, ease: "power2.out", delay: 0.3,
              }
            );
          });
        }

        // ── Work cards ──
        if (workRef.current) {
          gsap.from(workRef.current.querySelector(".s3-title"), {
            scrollTrigger: { trigger: workRef.current, start: "top 75%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(workRef.current.querySelectorAll(".work-card"), {
            scrollTrigger: { trigger: workRef.current, start: "top 65%", toggleActions: "play none none reverse" },
            y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "all",
          });
        }

        // ── Why Choose Us ──
        if (whyRef.current) {
          gsap.from(whyRef.current.querySelector(".why-heading"), {
            scrollTrigger: { trigger: whyRef.current, start: "top 78%", toggleActions: "play none none reverse" },
            y: 40, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "all",
          });
          gsap.from(whyRef.current.querySelectorAll(".why-card"), {
            scrollTrigger: { trigger: whyRef.current, start: "top 68%", toggleActions: "play none none reverse" },
            y: 50, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", clearProps: "all",
          });
        }

        // ── FAQ ──
        if (faqRef.current) {
          gsap.from(faqRef.current.querySelector(".faq-left"), {
            scrollTrigger: { trigger: faqRef.current, start: "top 78%", toggleActions: "play none none reverse" },
            x: -50, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
          });
          gsap.from(faqRef.current.querySelectorAll(".faq-item"), {
            scrollTrigger: { trigger: faqRef.current, start: "top 72%", toggleActions: "play none none reverse" },
            x: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", clearProps: "all",
          });
        }

        // ── CTA ──
        if (ctaRef.current) {
          gsap.from(ctaRef.current.querySelector(".cta-box"), {
            scrollTrigger: { trigger: ctaRef.current, start: "top 80%", toggleActions: "play none none reverse" },
            y: 40, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "all",
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
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');

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
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .about-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }
        .about-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 32px;
        }
        .about-breadcrumb span.sep { color: #7c3aed; }
        .about-breadcrumb span.current { color: rgba(255,255,255,0.65); }
        .about-hero-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.88;
          margin-bottom: 36px;
        }
        .hero-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .hero-line span.solid {
          font-size: clamp(80px, 12vw, 170px);
          color: #fff;
          letter-spacing: -3px;
          line-height: 0.88;
        }
        .hero-line span.outline {
          font-size: clamp(80px, 12vw, 170px);
          color: transparent;
          -webkit-text-stroke: 2.5px rgba(255,255,255,0.38);
          letter-spacing: -3px;
          line-height: 0.88;
        }
        .about-desc {
          font-size: 16px;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          max-width: 560px;
          margin: 0 auto;
        }
        .hero-deco {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-deco.tl { width: 180px; height: 180px; top: -40px; left: -40px; }
        .hero-deco.br { width: 240px; height: 240px; bottom: 40px; right: -40px; }

        /* ─── TICKER ─── */
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: #7c3aed;
          padding: 13px 0;
          transform: rotate(-1.2deg) scaleX(1.04);
          margin: 10px 0;
          position: relative;
          z-index: 10;
        }
        .ticker-inner { display: flex; width: max-content; }
        .ticker-track { display: flex; white-space: nowrap; }
        .ticker-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ticker-item::before { content: '✦'; font-size: 9px; opacity: 0.7; }

        /* ─── SECTION 2 ─── */
        .section2 {
          max-width: 1280px;
          margin: 0 auto;
          min-height: 100vh;
          padding: 100px 60px;
          background: #0e0c2e;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .s2-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.95;
          margin-bottom: 50px;
        }
        .s2-heading .word { display: inline-block; overflow: hidden; }
        .s2-heading .solid-word { font-size: clamp(50px, 6vw, 90px); color: #fff; display: block; }
        .s2-heading .outline-word {
          font-size: clamp(50px, 6vw, 90px);
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
          display: block;
        }
        .s2-video-block { display: flex; align-items: center; gap: 14px; margin-bottom: 30px; cursor: pointer; }
        .play-btn {
          width: 46px; height: 46px;
          background: #7c3aed; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 14px;
          transition: transform 0.3s, background 0.3s;
        }
        .s2-video-block:hover .play-btn { transform: scale(1.1); background: #6d28d9; }
        .play-label { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; color: rgba(255,255,255,0.85); }
        .s2-body-text { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.55); margin-bottom: 36px; max-width: 400px; }
        .learn-more {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 16px;
          text-transform: uppercase; letter-spacing: 2px;
          color: #fff; text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 4px;
          transition: border-color 0.3s, color 0.3s;
        }
        .learn-more:hover { color: #a78bfa; border-color: #a78bfa; }
        .s2-img-wrap {
          width: 100%; border-radius: 12px; overflow: hidden;
          margin-bottom: 40px; aspect-ratio: 4/3; background: #1a1660;
        }
        .s2-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .info-cards { display: flex; flex-direction: column; }
        .info-card {
          display: grid;
          grid-template-columns: 140px 1fr 30px;
          align-items: center;
          padding: 50px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          gap: 20px;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .info-card:hover { opacity: 0.8; }
        .info-card:first-child { border-top: 1px solid rgba(255,255,255,0.1); }
        .card-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 20px;
          text-transform: uppercase; letter-spacing: 0.5px; color: #fff;
        }
        .card-desc { font-size: 16px; line-height: 1.5; color: rgba(255,255,255,0.45); }
        .card-arrow {
          width: 28px; height: 28px;
          border: 1px solid rgba(255,255,255,0.2); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: rgba(255,255,255,0.5);
          flex-shrink: 0; transition: background 0.3s, color 0.3s;
        }
        .info-card:hover .card-arrow { background: #7c3aed; border-color: #7c3aed; color: #fff; }
        .card-arrow.diagonal { transform: rotate(-45deg); }

        /* ─── SECTION 3: OUR WORK ─── */
        .section3 {
          padding: 100px 60px 80px;
          background: #0a0828;
          max-width: 1280px;
          margin: 0 auto;
        }
        .s3-header {
          display: flex; align-items: flex-end;
          justify-content: space-between; margin-bottom: 60px;
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
          padding: 12px 22px; border-radius: 5px;
          text-decoration: none; white-space: nowrap;
          transition: background 0.2s, transform 0.2s;
          flex-shrink: 0; margin-bottom: 6px;
        }
        .s3-more-btn:hover { background: #6d28d9; transform: translateY(-1px); }
        .work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .work-card {
          position: relative; border-radius: 10px;
          overflow: hidden; cursor: pointer; background: #13103a;
        }
        .work-card.tall { grid-row: span 2; }
        .work-card-img {
          width: 100%; height: 100%; min-height: 220px;
          object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .work-card.tall .work-card-img { min-height: 100%; }
        .work-card:hover .work-card-img { transform: scale(1.05); }
        .work-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,8,40,0.95) 0%, rgba(10,8,40,0.2) 55%, transparent 100%);
          display: flex; flex-direction: column;
          justify-content: flex-end; padding: 20px; gap: 6px;
        }
        .wc-row { display: flex; align-items: center; justify-content: space-between; }
        .wc-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 16px;
          text-transform: uppercase; letter-spacing: 0.5px; color: #fff;
        }
        .wc-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600; font-size: 10px;
          text-transform: uppercase; letter-spacing: 1.5px;
          color: #fff; background: #7c3aed;
          padding: 4px 10px; border-radius: 3px; white-space: nowrap;
        }
        .wc-desc { font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.5); max-width: 85%; }

        /* ─── SECTION 4: CTA ─── */
        .section4 { background: #0e0c2e; padding: 0 60px 100px; }
        .cta-box {
          max-width: 1280px; margin: 0 auto;
          background: linear-gradient(135deg, #13103a 0%, #1a1660 60%, #0e0c2e 100%);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 16px; padding: 80px 60px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-box::before {
          content: '';
          position: absolute; top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          line-height: 0.92; margin-bottom: 30px; position: relative;
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
          padding: 14px 36px; border-radius: 6px;
          text-decoration: none; display: inline-block;
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.45); }

        /* ─── TEAM ─── */
        .team-section { background: #0a0828; padding: 100px 60px 80px; }
        .team-inner { max-width: 1280px; margin: 0 auto; }
        .team-heading { text-align: center; margin-bottom: 16px; }
        .team-heading h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          font-size: clamp(42px, 5vw, 68px);
          line-height: 1;
          display: flex; align-items: center; justify-content: center;
          gap: 16px; flex-wrap: wrap;
        }
        .team-heading h2 .th-solid { color: #fff; }
        .team-heading h2 .th-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.35); }
        .team-heading p { font-size: 14px; color: rgba(255,255,255,0.45); margin-top: 12px; }
        .team-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 28px; margin-top: 56px;
        }
        .team-card { display: flex; flex-direction: column; cursor: pointer; }
        .team-card-img {
          width: 100%; aspect-ratio: 3/3.6;
          border-radius: 10px; overflow: hidden;
          margin-bottom: 18px; position: relative;
        }
        .team-card-img img {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
          display: block; transition: transform 0.5s ease;
        }
        .team-card:hover .team-card-img img { transform: scale(1.06); }
        .team-card-img .tc-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,8,40,0.5) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .team-card:hover .tc-overlay { opacity: 1; }
        .team-card-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800; font-size: 17px;
          text-transform: uppercase; letter-spacing: 0.5px;
          color: #fff; margin-bottom: 6px;
        }
        .team-card-role { font-size: 16px; color: rgba(255,255,255,0.45); margin-bottom: 3px; }
        .team-card-email { font-size: 12px; color: rgba(124,58,237,0.8); text-decoration: none; transition: color 0.2s; }
        .team-card-email:hover { color: #a78bfa; }

        /* ─── BOTTOM TICKER ─── */
        .ticker2-wrap {
          width: 100%; overflow: hidden;
          border-top: 1px solid rgba(124,58,237,0.2);
          border-bottom: 1px solid rgba(124,58,237,0.2);
          padding: 14px 0;
        }
        .ticker2-inner { display: flex; width: max-content; }
        .ticker2-track { display: flex; white-space: nowrap; }
        .ticker2-item {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 12px;
          text-transform: uppercase; letter-spacing: 2.5px;
          color: rgba(255,255,255,0.4);
          padding: 0 28px; display: flex; align-items: center; gap: 10px;
        }
        .ticker2-item .t2-dot { width: 5px; height: 5px; background: #7c3aed; border-radius: 50%; flex-shrink: 0; }

        /* ─── SKILLS & AWARDS ─── */
        .skills-section {
          background: #0a0828;
          padding: 80px 60px 100px;
          border-top: 1px solid rgba(124,58,237,0.1);
        }
        .skills-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 280px 1fr 1fr;
          gap: 60px; align-items: start;
        }
        .skills-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.88; }
        .skills-title .st-solid { font-size: clamp(44px, 5vw, 70px); color: #fff; display: block; }
        .skills-title .st-outline { font-size: clamp(44px, 5vw, 70px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.3); display: block; }
        .awards-list { display: flex; flex-direction: column; }
        .award-row {
          padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
          display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: end;
        }
        .award-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .award-country { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
        .award-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 16px; text-transform: uppercase; letter-spacing: 0.3px; color: #fff; }
        .award-year { font-size: 13px; color: rgba(255,255,255,0.35); white-space: nowrap; }
        .skill-bars { display: flex; flex-direction: column; padding-top: 4px; }
        .skill-row { padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .skill-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
        .skill-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .skill-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: rgba(255,255,255,0.8); }
        .skill-pct { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; color: #7c3aed; }
        .skill-track { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
        .skill-fill { height: 100%; background: linear-gradient(90deg, #7c3aed, #a78bfa); border-radius: 2px; }

        /* ─── WHY CHOOSE US ─── */
        .why-section { background: #080620; padding: 100px 60px; }
        .why-inner { max-width: 1280px; margin: 0 auto; }
        .why-heading { text-align: center; margin-bottom: 60px; }
        .why-heading h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900; text-transform: uppercase;
          font-size: clamp(38px, 6vw, 80px);
          line-height: 1; letter-spacing: -1px;
          display: inline-flex; align-items: center;
          gap: 14px; flex-wrap: wrap; justify-content: center;
        }
        .why-heading h2 .wh-highlight { color: #fff; background: #1e3a8a; padding: 2px 14px 4px; border-radius: 4px; }
        .why-heading h2 .wh-solid { color: #fff; }
        .why-heading h2 .wh-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.32); }
        .why-heading p { font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 14px; }
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .why-card {
          border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
          padding: 36px 32px 40px; background: rgba(255,255,255,0.02);
          transition: border-color 0.3s, background 0.3s; cursor: default;
        }
        .why-card:hover { border-color: rgba(124,58,237,0.4); background: rgba(124,58,237,0.05); }
        .why-card-num { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 40px; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.18); line-height: 1; margin-bottom: 22px; letter-spacing: -1px; }
        .why-card-title { font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 18px; color: #fff; margin-bottom: 14px; }
        .why-card-desc { font-size: 13.5px; line-height: 1.7; color: rgba(255,255,255,0.42); }

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
        /* ─── PRICING ─── */
        .pricing-outer { background: #0e0c2e; padding: 100px 60px 80px; }
        .pricing-header { text-align: center; margin-bottom: 60px; }
        .pricing-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; font-size: clamp(42px, 5.5vw, 76px); line-height: 0.95; letter-spacing: -1px; margin-bottom: 16px; }
        .pricing-title .pt-solid { color: #fff; }
        .pricing-title .pt-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); }
        .pricing-subtitle { font-size: 14px; color: rgba(255,255,255,0.4); }
        .pricing-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .price-card {
          background: #13103a; border: 1px solid rgba(124,58,237,0.2);
          border-radius: 12px; padding: 36px 32px 0;
          display: flex; flex-direction: column;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .price-card::before {
          content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
          pointer-events: none; transition: opacity 0.3s; opacity: 0;
        }
        .price-card:hover { border-color: rgba(124,58,237,0.5); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(124,58,237,0.18); }
        .price-card:hover::before { opacity: 1; }
        .pc-tier { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.5); margin-bottom: 14px; }
        .pc-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
        .pc-amount { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(38px, 4vw, 56px); color: #fff; letter-spacing: -1px; line-height: 1; }
        .pc-period { font-size: 13px; color: rgba(255,255,255,0.4); }
        .pc-divider { width: 100%; height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 24px; }
        .pc-features { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; flex-grow: 1; }
        .pc-feat { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.75); }
        .pc-feat-arrow { width: 22px; height: 22px; background: rgba(124,58,237,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #a78bfa; flex-shrink: 0; transition: background 0.25s, color 0.25s; }
        .price-card:hover .pc-feat-arrow { background: rgba(124,58,237,0.3); color: #c4b5fd; }
        .pc-btn {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px;
          text-transform: uppercase; letter-spacing: 3px; color: #fff; background: #7c3aed;
          border: none; padding: 16px; text-align: center; cursor: pointer; text-decoration: none;
          display: block; margin: 0 -32px; margin-top: auto;
          border-radius: 0 0 11px 11px; transition: background 0.2s, letter-spacing 0.3s;
        }
        /* ─── REVIEWS ─── */
        .reviews-outer { background: #0e0c2e; padding: 40px 60px 100px; }
        .reviews-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 380px 1fr; gap: 80px; align-items: start; }
        .rev-heading { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.92; }
        .rev-heading .rh-solid { font-size: clamp(52px, 6vw, 88px); color: #fff; display: block; letter-spacing: -1px; }
        .rev-heading .rh-outline { font-size: clamp(52px, 6vw, 88px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.25); display: block; letter-spacing: -1px; }
        .rev-stars { display: flex; gap: 4px; margin-bottom: 18px; }
        .rev-star { color: #f59e0b; font-size: 18px; }
        .rev-author { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .rev-avatar { width: 52px; height: 52px; border-radius: 50%; border: 2px solid rgba(124,58,237,0.4); background: linear-gradient(135deg, #7c3aed, #1a1660); overflow: hidden; flex-shrink: 0; }
        .rev-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .rev-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 18px; text-transform: uppercase; color: #fff; line-height: 1.1; }
        .rev-role { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }
        .rev-quote { font-size: 16px; line-height: 1.75; color: rgba(255,255,255,0.65); max-width: 580px; margin-bottom: 36px; }
        .rev-nav { display: flex; gap: 8px; align-items: center; }
        .rev-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.18); cursor: pointer; transition: background 0.25s, width 0.25s; border: none; padding: 0; }
        .rev-dot.on { background: #7c3aed; width: 24px; border-radius: 4px; }
        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .about-hero { padding: 100px 24px 60px; }
          .hero-line span.solid,
          .hero-line span.outline { font-size: clamp(56px, 14vw, 90px); letter-spacing: -1px; }

          .section2 { grid-template-columns: 1fr; padding: 60px 24px; gap: 40px; }

          .section3 { padding: 60px 24px; }
          .work-grid { grid-template-columns: 1fr; }
          .work-card.tall { grid-row: span 1; }
          .s3-header { flex-direction: column; align-items: flex-start; gap: 20px; }

          .section4 { padding: 0 24px 60px; }
          .cta-box { padding: 50px 24px; }

          .team-section { padding: 60px 24px; }
          .team-grid { grid-template-columns: repeat(2, 1fr); }

          .skills-section { padding: 60px 24px; }
          .skills-inner { grid-template-columns: 1fr; gap: 40px; }

          .why-section { padding: 60px 24px; }
          .why-grid { grid-template-columns: 1fr 1fr; }

          .faq-section { padding: 60px 24px; }
          .faq-inner { grid-template-columns: 1fr; gap: 40px; }
        }

        @media (max-width: 540px) {
          .team-grid { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: 1fr; }
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
                <span className="current">Pricing</span>
            </div>
            <div className="about-hero-title">
                <div className="hero-line">
                <span className="solid">Special</span>
                <span className="outline">Pricing</span>
                </div>
            </div>
            <p className="about-desc">
                Simple, transparent pricing with no hidden fees. Choose the plan that fits
                your goals and budget — and scale up anytime as your business grows.
            </p>
            </div>
        </section>

        {/* ══ TICKER ══ */}
        <Ticker label="Pricing & Plans" />

        {/* ══ PRICING ══ */}
        <div className="pricing-outer">
            <div className="pricing-header">
            <h2 className="pricing-title">
                <span className="pt-solid">Special </span>
                <span className="pt-outline">Price &amp; Plan</span>
            </h2>
            <p className="pricing-subtitle">
                Every plan includes a dedicated creative team, clear timelines, and results
                you can measure. No lock-in contracts — cancel anytime.
            </p>
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
                    {features.map((f) => (
                    <li className="pc-feat" key={f}>
                        <span className="pc-feat-arrow">→</span>
                        {f}
                    </li>
                    ))}
                </ul>
                <a href="/contact" className="pc-btn">Select Plan</a>
                </div>
            ))}
            </div>
        </div>

        {/* ══ REVIEWS ══ */}
        <div className="reviews-outer">
            <div className="reviews-inner">
            <div className="rev-left">
                <div className="rev-heading">
                <span className="rh-solid">Our Client</span>
                <span className="rh-outline">Reviews</span>
                </div>
            </div>
            <div className="rev-right">
                <div className="rev-stars">
                {Array(r.stars).fill(0).map((_, i) => (
                    <span className="rev-star" key={i}>★</span>
                ))}
                </div>
                <div className="rev-author">
                <div className="rev-avatar">
                    <img
                    src={r.avatar}
                    alt={r.name}
                    onError={(e) => { e.target.style.display = "none"; }}
                    />
                </div>
                <div>
                    <p className="rev-name">{r.name}</p>
                    <p className="rev-role">{r.role}</p>
                </div>
                </div>
                <p className="rev-quote">{r.quote}</p>
                <div className="rev-nav">
                {REVIEWS.map((_, i) => (
                    <button
                    key={i}
                    className={`rev-dot${i === activeReview ? " on" : ""}`}
                    onClick={() => setActiveReview(i)}
                    aria-label={`Review ${i + 1}`}
                    />
                ))}
                </div>
            </div>
            </div>
        </div>

        {/* ══ TICKER ══ */}
        <Ticker label="Why Choose Us" />

        {/* ══ WHY CHOOSE US ══ */}
        <section className="why-section" ref={whyRef}>
            <div className="why-inner">
            <div className="why-heading">
                <h2>
                <span className="wh-highlight">Why</span>
                <span className="wh-solid">Must</span>
                <span className="wh-outline">Choose Us</span>
                </h2>
                <p>
                There are a lot of agencies out there. Here is what makes us different —
                and why our clients keep coming back project after project.
                </p>
            </div>
            <div className="why-grid">
                {WHY_CARDS.map(({ num, title, desc }) => (
                <div className="why-card" key={num}>
                    <div className="why-card-num">{num}</div>
                    <div className="why-card-title">{title}</div>
                    <p className="why-card-desc">{desc}</p>
                </div>
                ))}
            </div>
            </div>
        </section>

        </div>
    </>
  );
}

Pricing.layout = (page) => <MainLayout>{page}</MainLayout>;
