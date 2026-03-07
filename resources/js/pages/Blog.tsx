import { useEffect, useRef, useState } from "react";
import MainLayout from "@/layouts/MainLayout";

// ─── Info Cards ─────────────────────────────────────────

const INFO_CARDS = [
  {
    label: "Who We Are",
    arrow: "↗",
    desc: "We are a creative digital agency focused on building modern brands, engaging user experiences, and scalable digital products for startups and growing businesses."
  },
  {
    label: "Our Vision",
    arrow: "→",
    desc: "Our vision is to help businesses grow through innovative design, powerful technology, and meaningful digital experiences that connect with people."
  },
  {
    label: "Our Mission",
    arrow: "→",
    desc: "Our mission is to deliver high-quality digital solutions that combine creativity, strategy, and technology to help our clients succeed in the digital world."
  }
];


// ─── Team Members ───────────────────────────────────────

const TEAM_MEMBERS = [
  {
    name: "Cartier Bresson",
    role: "CEO / Founder",
    email: "cartier@creatv.com",
    bg: "#4fc3f7"
  },
  {
    name: "Viola Spencer",
    role: "Project Manager",
    email: "viola@creatv.com",
    bg: "#f48fb1"
  },
  {
    name: "Carmen Hayes",
    role: "Motion Designer",
    email: "carmen@creatv.com",
    bg: "#e0e0e0"
  },
  {
    name: "Monica Barker",
    role: "Digital Marketing Lead",
    email: "monica@creatv.com",
    bg: "#90caf9"
  }
];


// ─── Awards ─────────────────────────────────────────────

const AWARDS = [
  { country: "Indonesia", name: "Web Design Excellence Award", years: "2019 – 2020" },
  { country: "Australia", name: "Best Mobile App Experience", years: "2020 – 2021" },
  { country: "Japan", name: "Creative Animation Award", years: "2021 – 2022" },
  { country: "USA", name: "UX Innovation Award", years: "2023 – 2024" }
];


// ─── Skills ─────────────────────────────────────────────

const SKILLS = [
  { name: "UI / UX Design", pct: 97 },
  { name: "Content Creation", pct: 83 },
  { name: "Digital Marketing", pct: 75 },
  { name: "Web Design & Development", pct: 90 },
  { name: "Digital Illustration", pct: 87 }
];


// ─── Why Choose Us ──────────────────────────────────────

const WHY_CARDS = [
  {
    num: "01.",
    title: "Hard Work",
    desc: "Our team is committed to delivering high-quality work with attention to detail, ensuring every project reaches its full potential."
  },
  {
    num: "02.",
    title: "Transparency",
    desc: "We believe in clear communication and complete transparency throughout every stage of the project."
  },
  {
    num: "03.",
    title: "Innovation",
    desc: "We constantly explore new technologies and creative strategies to build modern digital experiences."
  },
  {
    num: "04.",
    title: "Team Collaboration",
    desc: "Our designers, developers, and strategists work closely together to deliver seamless and impactful results."
  },
  {
    num: "05.",
    title: "Excellence",
    desc: "We focus on delivering exceptional quality in every product, ensuring our clients receive outstanding results."
  },
  {
    num: "06.",
    title: "Fast Growth",
    desc: "We help businesses scale faster through effective digital strategies, branding, and modern technology."
  }
];


// ─── FAQ ────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "1. What is a digital agency?",
    a: "A digital agency helps businesses build their online presence through services such as web design, branding, digital marketing, and product development."
  },
  {
    q: "2. What services does a digital agency offer?",
    a: "Typical services include website design, UI/UX design, branding, digital marketing, social media management, and custom software development."
  },
  {
    q: "3. How can a digital agency help my business?",
    a: "A digital agency can help improve your brand visibility, attract more customers, and create digital products that improve user experience and engagement."
  },
  {
    q: "4. How do digital agencies approach a new project?",
    a: "Most agencies follow a process that includes research, strategy planning, design, development, testing, and final delivery."
  },
  {
    q: "5. What is the cost of digital agency services?",
    a: "Costs vary depending on project scope, complexity, and timeline. Most agencies provide customized quotes based on your specific needs."
  },
  {
    q: "6. What makes a good digital agency?",
    a: "A strong portfolio, transparent communication, experienced team members, and a clear design process are key qualities of a reliable agency."
  },
  {
    q: "7. How can I request support?",
    a: "You can contact the agency through email, support forms, or scheduled consultations to discuss your project requirements."
  }
];


// ─── Reviews ────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Callie John",
    role: "CEO, VScret",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
    quote: "Working with this team was an amazing experience. Their creativity, professionalism, and attention to detail helped transform our product into something truly exceptional."
  },
  {
    name: "Marcus Lee",
    role: "Founder, Designly",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
    quote: "The team delivered a beautifully designed website that exceeded our expectations. Communication was smooth and the results were outstanding."
  },
  {
    name: "Sara Patel",
    role: "Head of Product, Nexlabs",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
    quote: "Their design thinking and technical expertise helped us launch a modern digital product faster than we expected."
  }
];


// ─── Services ───────────────────────────────────────────

const SERVICES = [
  {
    name: "Perfect Sketching",
    desc: "We create clear design sketches and visual concepts that help transform ideas into structured digital products."
  },
  {
    name: "Digital Prototyping",
    desc: "Interactive prototypes help visualize product flow and user experience before development begins."
  },
  {
    name: "Design System",
    desc: "We build scalable design systems that ensure consistency across your entire digital product."
  },
  {
    name: "Design Concept",
    desc: "Our creative team develops unique visual concepts that strengthen your brand identity."
  },
  {
    name: "Brand Consultation",
    desc: "We help businesses define their brand voice, strategy, and visual identity."
  },
  {
    name: "Mobile App Design",
    desc: "We design modern mobile applications focused on usability, performance, and visual appeal."
  }
];


// ─── Blog Posts ─────────────────────────────────────────

const BLOG_POSTS = [
  {
    id: 1,
    tag: "DESIGN",
    title: "The Importance of Design in Every Project",
    excerpt: "Good design is more than aesthetics — it shapes user experience, builds trust, and improves how people interact with digital products.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    href: "single-blog"
  },
  {
    id: 2,
    tag: "AI",
    title: "How Artificial Intelligence is Transforming Modern Design",
    excerpt: "Artificial intelligence is changing the way designers work by automating tasks and enabling smarter creative workflows.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    href: "single-blog"
  },
  {
    id: 3,
    tag: "PRODUCT",
    title: "Building a Design System for Modern Digital Products",
    excerpt: "A strong design system helps teams build consistent, scalable, and user-friendly products across platforms.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
    href: "single-blog"
  },
  {
    id: 4,
    tag: "WEBSITE",
    title: "Why Prototyping Matters Before Website Development",
    excerpt: "Prototyping helps identify usability problems early and ensures a smoother development process.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    href: "single-blog"
  }
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
export default function Blog() {
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
  const [visibleCount, setVisibleCount] = useState(4);

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
        /* ── HERO ── */
        .hero {
          min-height: 65vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 130px 40px 80px;
          position: relative;
          background: radial-gradient(ellipse 90% 70% at 50% 30%, #1a1660 0%, #0e0c2e 68%);
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
        }
        .breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 28px;
        }
        .breadcrumb .sep { color: #7c3aed; }
        .breadcrumb .cur { color: rgba(255,255,255,0.65); }

        .hero-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(36px, 6vw, 72px);
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -1px;
          color: #fff;
          margin-bottom: 24px;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }
        .hero-meta span { display: flex; align-items: center; gap: 6px; }
        .meta-dot { width: 4px; height: 4px; background: #7c3aed; border-radius: 50%; }
        .hero-meta .tag-pill {
          background: #7c3aed;
          color: #fff;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 12px;
          border-radius: 20px;
        }

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

        /* ─── SERVICES ─── */
        .services-outer { background: #0c0a2e; padding: 0 60px 120px; }
        .services-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 380px 1fr; gap: 80px; align-items: start; }
        .srv-left { position: sticky; top: 120px; padding-top: 8px; }
        .srv-heading { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.9; margin-bottom: 28px; }
        .srv-heading .sh-solid { font-size: clamp(48px, 5.5vw, 80px); color: #fff; display: block; letter-spacing: -1px; }
        .srv-heading .sh-outline { font-size: clamp(48px, 5.5vw, 80px); color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,0.28); display: block; letter-spacing: -1px; }
        .srv-desc { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,0.45); max-width: 300px; }
        .srv-right { display: flex; flex-direction: column; }
        .srv-row {
          display: grid; grid-template-columns: 52px 1fr 32px;
          align-items: start; gap: 20px; padding: 28px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.07); cursor: pointer;
          border-radius: 10px;
          transition: background 0.3s ease, padding-left 0.3s ease;
        }
        .srv-row:first-of-type { border-top: 1px solid rgba(255,255,255,0.07); }
        .srv-row:hover { background: rgba(124,58,237,0.08); padding-left: 28px; }
        .srv-row.active { background: rgba(124,58,237,0.12); border-color: rgba(124,58,237,0.2); padding-left: 28px; }
        .srv-row.active + .srv-row { border-top-color: rgba(124,58,237,0.2); }
        .srv-icon {
          width: 44px; height: 44px;
          background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.25);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px; transition: background 0.3s, border-color 0.3s;
        }
        .srv-row:hover .srv-icon, .srv-row.active .srv-icon { background: rgba(124,58,237,0.25); border-color: rgba(124,58,237,0.5); }
        .srv-icon svg { width: 22px; height: 22px; stroke: #a78bfa; fill: none; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.3s; }
        .srv-row:hover .srv-icon svg, .srv-row.active .srv-icon svg { stroke: #c4b5fd; }
        .srv-text { display: flex; flex-direction: column; gap: 6px; }
        .srv-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 20px; text-transform: uppercase; color: rgba(255,255,255,0.75); transition: color 0.3s; line-height: 1; }
        .srv-row:hover .srv-name, .srv-row.active .srv-name { color: #fff; }
        .srv-body { font-size: 13px; line-height: 1.65; color: rgba(255,255,255,0.35); transition: color 0.3s; }
        .srv-row:hover .srv-body, .srv-row.active .srv-body { color: rgba(255,255,255,0.55); }
        .srv-arrow {
          width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.12); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: rgba(255,255,255,0.25); flex-shrink: 0; margin-top: 4px;
          transition: background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .srv-row:hover .srv-arrow, .srv-row.active .srv-arrow { background: #7c3aed; border-color: #7c3aed; color: #fff; transform: rotate(-45deg) scale(1.1); }
        .srv-cta-card { background: #7c3aed; border-radius: 12px; padding: 44px 40px; margin-top: 28px; position: relative; overflow: hidden; }
        .srv-cta-card::before { content: ''; position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%); pointer-events: none; }
        .srv-cta-text { font-family: 'Barlow', sans-serif; font-weight: 500; font-size: 20px; line-height: 1.5; color: rgba(255,255,255,0.9); max-width: 280px; margin-bottom: 28px; position: relative; }
        .srv-cta-btn {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 11px;
          text-transform: uppercase; letter-spacing: 2.5px; color: #fff; background: transparent;
          border: 1.5px solid rgba(255,255,255,0.55); padding: 11px 26px; border-radius: 5px;
          text-decoration: none; display: inline-block; transition: background 0.2s, border-color 0.2s;
        }
        .srv-cta-btn:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.85); }
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .blog-section {
          background: #0e0c2e;
          font-family: 'Barlow', sans-serif;
          padding: 80px 60px 100px;
          min-height: 100vh;
        }

        .blog-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px 36px;
        }

        .blog-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .blog-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 22px;
        }

        .blog-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .blog-card:hover .blog-card-img-wrap img {
          transform: scale(1.05);
        }

        .blog-tag {
          position: absolute;
          bottom: 14px;
          left: 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #fff;
          background: #7c3aed;
          padding: 5px 14px;
          border-radius: 20px;
        }

        .blog-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(20px, 2.2vw, 26px);
          line-height: 1.2;
          color: #fff;
          margin-bottom: 14px;
          transition: color 0.2s;
        }

        .blog-card:hover .blog-card-title {
          color: #a78bfa;
        }

        .blog-card-excerpt {
          font-size: 14px;
          line-height: 1.75;
          color: rgba(255,255,255,0.45);
          margin-bottom: 20px;
          flex: 1;
        }

        .blog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .blog-read-more:hover {
          color: #a78bfa;
        }

        .read-arrow {
          font-size: 14px;
          transition: transform 0.2s;
        }

        .blog-read-more:hover .read-arrow {
          transform: translateX(4px);
        }

        .load-more-wrap {
          max-width: 1200px;
          margin: 60px auto 0;
          display: flex;
          justify-content: center;
        }

        .load-more-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
          background: #7c3aed;
          border: none;
          padding: 16px 52px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .load-more-btn:hover {
          background: #6d28d9;
          transform: translateY(-2px);
        }

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
    {/* HERO */}
        <section className="hero">
            <div className="hero-inner">
            <div className="breadcrumb">
                <span>Home</span>
                <span className="sep">/</span>
                <span>Blog</span>
                <span className="sep">/</span>
                <span className="cur">Design</span>
            </div>
            <h1 className="hero-title">
                The Role of Design in Creating Impactful <br />Digital Experiences
            </h1>
            <p className="about-desc">
                Discover insights, design strategies, and creative ideas that help
                businesses build better digital products and stronger brands.
            </p>
            </div>
        </section>



    {/* ══ TICKER ══ */}
    <Ticker label="Latest Blog" />


    {/* ══ BLOG SECTION ══ */}
    <section className="blog-section">

        <div className="blog-grid">

        {BLOG_POSTS.slice(0, visibleCount).map((post) => (

            <article className="blog-card" key={post.id}>

            <div className="blog-card-img-wrap">
                <img src={post.image} alt={post.title} />
                <span className="blog-tag">{post.tag}</span>
            </div>

            <h3 className="blog-card-title">{post.title}</h3>

            <p className="blog-card-excerpt">
                {post.excerpt}
            </p>

            <a href={post.href} className="blog-read-more">
                Read More <span className="read-arrow">→</span>
            </a>

            </article>

        ))}

        </div>


        {/* LOAD MORE BUTTON */}
        {visibleCount < BLOG_POSTS.length && (
        <div className="load-more-wrap">
            <button
            className="load-more-btn"
            onClick={() => setVisibleCount((v) => v + 4)}
            >
            Load More
            </button>
        </div>
        )}

    </section>

    </div>
    </>
  );
}

Blog.layout = (page) => <MainLayout>{page}</MainLayout>;
