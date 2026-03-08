
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
// ─── Types ────────────────────────────────────────────────────────────────────
export type Lang = 'en' | 'km';

interface LangContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: string) => string;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const LangContext = createContext<LangContextType>({
    lang: 'en',
    setLang: () => {},
    t: (k) => k,
});

export const useLang = () => useContext(LangContext);

// ─── Translations ─────────────────────────────────────────────────────────────
const translations: Record<Lang, Record<string, string>> = {
    en: {
        // ── Navbar ──────────────────────────────────────────────
        'nav.home':              'Home',
        'nav.about':             'About',
        'nav.work':              'Work',
        'nav.new':               'New',
        'nav.pages':             'Pages',
        'nav.contact':           'Contact Us',
        'nav.cta':               'Get Started',

        // ── Navbar — Pages dropdown ──────────────────────────────
        'nav.pages.pricing':     'Pricing',
        'nav.pages.team':        'Team',
        'nav.pages.blog':        'Blog',
        'nav.pages.single-blog': 'Single Blog',
        'nav.pages.404':         '404 Page',

        // ── Footer — column headings ─────────────────────────────
        'footer.company':        'Our Company',
        'footer.quicklinks':     'Quick Links',
        'footer.social':         'Our Social Media',

        // ── Footer — contact card ─────────────────────────────────
        'footer.office.label':   'Office',
        'footer.office.value':   'Jl. Sensok No 142, Phnom Penh, Cambodia',
        'footer.email.label':    'Email',
        'footer.email.value':    'support@domain.com',
        'footer.phone.label':    'Phone',
        'footer.phone.value':    '(+855) 81 115 3568',

        // ── Footer — Our Company links ────────────────────────────
        'footer.company.about':        'About',
        'footer.company.community':    'Community',
        'footer.company.careers':      'Careers',
        'footer.company.testimonials': 'Testimonials',
        'footer.company.services':     'Services',
        'footer.company.project':      'Project',

        // ── Footer — Quick Links ──────────────────────────────────
        'footer.quick.contact':   'Contact',
        'footer.quick.privacy':   'Privacy Policy',
        'footer.quick.faq':       "FAQ's",
        'footer.quick.licensing': 'Licensing',
        'footer.quick.help':      'Help Center',
        'footer.quick.terms':     'Terms & Condition',

        // ── Footer — Social Media ─────────────────────────────────
        'footer.social.desc':      'Follow us and stay updated with our latest projects and creative work.',
        'footer.social.facebook':  'Facebook',
        'footer.social.twitter':   'Twitter',
        'footer.social.linkedin':  'LinkedIn',
        'footer.social.instagram': 'Instagram',
        'footer.social.pinterest': 'Pinterest',

        // ── Footer — bottom bar ───────────────────────────────────
        'footer.tagline':  'Creative Design Agency.',
        'footer.copy':     '© 2026 Templatekit by',
        'footer.copy.by':  'Palm Technology',
        'footer.copy.end': 'All rights reserved.',

        // ══════════════════════════════════════════════════════════
        // HOME PAGE
        // ══════════════════════════════════════════════════════════

        // ── Hero ─────────────────────────────────────────────────
        'home.hero.line1':   'Creative',
        'home.hero.line2':   'Design',
        'home.hero.line3':   'Agency',
        'home.hero.desc':    'We are a creative design agency specializing in crafting visually appealing and effective design solutions for clients across a variety of industries. Join us and create something extraordinary.',
        'home.hero.findout': 'Find Out More',

        // ── Tickers ──────────────────────────────────────────────
        'home.ticker.1': 'Open For New Projects',
        'home.ticker.2': 'Why Choose Us',
        'home.ticker.3': 'What We Do',
        'home.ticker.4': 'Pricing & Plans',
        'home.ticker.5': 'Fun Facts',
        'home.ticker.6': 'Latest Blog',

        // ── Section 2 — About ────────────────────────────────────
        'home.s2.heading1':  'Jump Start',
        'home.s2.heading2':  'Your Design',
        'home.s2.video':     'Video Introduction',
        'home.s2.body':      'We combine strategic thinking with bold visual craft to build brands and digital experiences that connect with your audience and drive real business results.',
        'home.s2.learnmore': 'Learn More',

        // ── Section 2 — Info cards ────────────────────────────────
        'home.card.who.label':     'Who We Are',
        'home.card.who.desc':      'A passionate team of designers and strategists building brands that last.',
        'home.card.vision.label':  'Our Vision',
        'home.card.vision.desc':   'To make world-class design accessible to every ambitious business.',
        'home.card.mission.label': 'Our Mission',
        'home.card.mission.desc':  'Deliver creative solutions that drive real growth and lasting impact.',

        // ── Section 3 — Work ─────────────────────────────────────
        'home.work.heading1': "Let's Check",
        'home.work.heading2': 'Our Work',
        'home.work.more':     'More Works',

        // ── Work cards ────────────────────────────────────────────
        'home.work.art.title':     'Art Direction',
        'home.work.art.tag':       'View Project',
        'home.work.art.desc':      'Visual storytelling through bold art direction and conceptual design.',
        'home.work.logo.title':    'Logo Design',
        'home.work.logo.tag':      'Branding',
        'home.work.logo.desc':     'Clean, memorable marks that define a brand at a glance.',
        'home.work.brand.title':   'Brand Identity',
        'home.work.brand.tag':     'Identity',
        'home.work.brand.desc':    'Comprehensive visual systems built for consistency and recognition.',
        'home.work.product.title': 'Product Design',
        'home.work.product.tag':   'UX/UI',
        'home.work.product.desc':  'User-centered product interfaces that are as functional as beautiful.',
        'home.work.web.title':     'Website Design',
        'home.work.web.tag':       'Web Dev',
        'home.work.web.desc':      'Conversion-focused websites that make a powerful first impression.',
        'home.work.graphic.title': 'Graphic Design',
        'home.work.graphic.tag':   'Graphics',
        'home.work.graphic.desc':  'Print and digital graphics crafted to communicate with clarity.',

        // ── CTA ───────────────────────────────────────────────────
        'home.cta.heading1': 'Have a Project?',
        'home.cta.heading2': "Let's Talk.",
        'home.cta.btn':      'Get Started',

        // ── Services ─────────────────────────────────────────────
        'home.srv.heading1': 'Together',
        'home.srv.heading2': 'We Create',
        'home.srv.desc':     'From first sketch to final launch, we bring creative expertise and strategic thinking to every service we offer — so your brand always shows up at its best.',
        'home.srv.cta.text': "Ready to start? Let's build something remarkable together.",
        'home.srv.cta.btn':  'Get In Touch',

        // ── Service items ─────────────────────────────────────────
        'home.srv.sketching.name': 'Perfect Sketching',
        'home.srv.sketching.desc': 'Every great design starts with a strong concept. We map out ideas through precise sketching and wireframing before a single pixel is placed — saving time and ensuring the final result is exactly right.',
        'home.srv.proto.name':     'Digital Prototyping',
        'home.srv.proto.desc':     'We build interactive prototypes that let you click, scroll, and experience your product before development begins — catching problems early and getting stakeholder sign-off faster.',
        'home.srv.system.name':    'Design System',
        'home.srv.system.desc':    'We create scalable, well-documented design systems that keep your brand consistent across every product and platform — a single source of truth for your entire UI.',
        'home.srv.concept.name':   'Design Concept',
        'home.srv.concept.desc':   'Before we finalize any direction, we explore bold creative concepts that push boundaries — giving you multiple distinct visions so you can choose the path that best captures your brand.',
        'home.srv.brand.name':     'Brand Consultation',
        'home.srv.brand.desc':     "Not sure where your brand stands? Our strategic consultations help you clarify positioning, identify gaps, and build a clear roadmap for a visual identity that resonates with your audience.",
        'home.srv.mobile.name':    'Mobile App Design',
        'home.srv.mobile.desc':    'We design mobile experiences that feel native, intuitive, and delightful. From user flows to final UI, every screen is crafted to keep users engaged and coming back.',

        // ── Pricing ───────────────────────────────────────────────
        'home.pricing.heading1': 'Special',
        'home.pricing.heading2': 'Price & Plan',
        'home.pricing.subtitle': 'Simple, transparent pricing. Choose the plan that fits your ambitions.',
        'home.pricing.period':   '/Month',
        'home.pricing.btn':      'Select Plan',

        // ── Pricing — Silver ──────────────────────────────────────
        'home.plan.silver.tier': 'Silver',
        'home.plan.silver.f1':   'Brand Identity Design',
        'home.plan.silver.f2':   'Up to 3 Page Web Design',
        'home.plan.silver.f3':   'Social Media Kit',
        'home.plan.silver.f4':   '2 Revision Rounds',
        'home.plan.silver.f5':   'Email Support',

        // ── Pricing — Gold ────────────────────────────────────────
        'home.plan.gold.tier': 'Gold',
        'home.plan.gold.f1':   'Full Branding Package',
        'home.plan.gold.f2':   'Up to 8 Page Web Design',
        'home.plan.gold.f3':   'Copywriting & Content',
        'home.plan.gold.f4':   'Unlimited Revisions',
        'home.plan.gold.f5':   'Priority 24/7 Support',

        // ── Pricing — Platinum ────────────────────────────────────
        'home.plan.platinum.tier': 'Platinum',
        'home.plan.platinum.f1':   'Complete Brand System',
        'home.plan.platinum.f2':   'Custom Web Development',
        'home.plan.platinum.f3':   'Content Strategy',
        'home.plan.platinum.f4':   'Dedicated Designer',
        'home.plan.platinum.f5':   'Full Online 24/7 Support',

        // ── Reviews ───────────────────────────────────────────────
        'home.rev.heading1': 'Our Client',
        'home.rev.heading2': 'Reviews',

        'home.rev.1.name':  'Callie John',
        'home.rev.1.role':  'CEO, VScret',
        'home.rev.1.quote': 'Working with this agency transformed our brand completely. Their attention to detail, creative thinking, and ability to translate our vision into stunning visuals exceeded every expectation we had.',

        'home.rev.2.name':  'Marcus Lee',
        'home.rev.2.role':  'Founder, Designly',
        'home.rev.2.quote': "From the first consultation to the final delivery, the process was smooth, transparent, and genuinely exciting. They don't just design — they solve real business problems with great design.",

        'home.rev.3.name':  'Sara Patel',
        'home.rev.3.role':  'Head of Product, Nexlabs',
        'home.rev.3.quote': "Our product's user satisfaction scores jumped 40% after the redesign. The team deeply understood our users' needs and crafted an experience that feels effortless and truly delightful.",

        // ── Stats ─────────────────────────────────────────────────
        'home.stat.1.label': 'Projects Completed',
        'home.stat.2.label': 'Satisfied Clients',
        'home.stat.3.label': 'Agency Partners',
        'home.stat.4.label': 'Services Offered',
        'home.stat.5.label': 'Awards Won',

        // ── Blog ─────────────────────────────────────────────────
        'home.blog.heading1': 'Our Blog',
        'home.blog.heading2': '& Articles',
        'home.blog.desc':     'Insights on design, branding, and strategy — written by our team to help you build smarter and create with confidence.',
        'home.blog.btn':      'View All Posts',
        'home.blog.readmore': 'Read More',

        'home.post.1.tag':     'Brand',
        'home.post.1.title':   'How much does it really cost to build a high-quality brand identity?',
        'home.post.1.excerpt': "Budget is always a concern, but investing in your brand pays dividends for years. We break down what great branding actually costs — and why it's worth it.",

        'home.post.2.tag':     'Design',
        'home.post.2.title':   'Why design thinking should be at the heart of every product decision',
        'home.post.2.excerpt': "The most successful products aren't built by engineers alone — they're shaped by empathy, iteration, and a relentless focus on the user experience.",

        'home.post.3.tag':     'Strategy',
        'home.post.3.title':   'Creative strategy: the invisible force behind every iconic brand',
        'home.post.3.excerpt': "Behind every unforgettable brand is a clear strategic foundation. Here's how creative strategy turns great design into measurable business results.",


        // ══════════════════════════════════════════════════════════
        // ABOUT PAGE
        // ══════════════════════════════════════════════════════════

        // ── Hero ─────────────────────────────────────────────────
        'about.hero.title1':  'About',
        'about.hero.title2':  'Agency',
        'about.hero.desc':    'We are a passionate team of designers, strategists, and creative thinkers dedicated to building brands that are bold, meaningful, and built to last. Get to know the people and principles behind every project we deliver.',
        'about.breadcrumb':   'About',

        // ── Tickers ──────────────────────────────────────────────
        'about.ticker.story':  'Our Story',
        'about.ticker.team':   'Our Team',
        'about.ticker.why':    'Why Choose Us',
        'about.ticker.faq':    "FAQ's",

        // ── Section 2 ────────────────────────────────────────────
        'about.s2.heading1':   'Jump Start',
        'about.s2.heading2':   'Your Design',
        'about.s2.video':      'Watch Our Story',
        'about.s2.body':       'Founded on the belief that great design changes everything, we have spent over a decade helping brands across industries find their voice, sharpen their identity, and connect with the audiences that matter most. Every project we take on is a chance to create something that genuinely moves people — and moves the needle for your business.',
        'about.s2.cta':        'Work With Us →',

        // ── Info cards ────────────────────────────────────────────
        'about.card.who.label':     'Who We Are',
        'about.card.who.desc':      'We are a full-service creative agency built by designers, strategists, and storytellers who believe great design has the power to transform businesses.',
        'about.card.vision.label':  'Our Vision',
        'about.card.vision.desc':   'To become the most trusted creative partner for ambitious brands — delivering work that is bold, purposeful, and built to stand the test of time.',
        'about.card.mission.label': 'Our Mission',
        'about.card.mission.desc':  'To craft meaningful design experiences that connect brands with their audiences, drive real growth, and make every interaction count.',

        // ── Team ─────────────────────────────────────────────────
        'about.team.heading1': 'Meet Our',
        'about.team.heading2': 'Expert Team',
        'about.team.sub':      'Behind every great project is a team that cares deeply about the craft. Meet the talented individuals who bring creativity, strategy, and dedication to everything we build.',

        // ── Skills & Awards ───────────────────────────────────────
        'about.skills.heading1': 'Skills And',
        'about.skills.heading2': 'Awards',

        // ── Awards ────────────────────────────────────────────────
        'about.award.1.country': 'Indonesia',
        'about.award.1.name':    'Web Design Awards',
        'about.award.1.years':   '2010 – 2011',
        'about.award.2.country': 'Australia',
        'about.award.2.name':    'Mobile App Awards',
        'about.award.2.years':   '2016 – 2017',
        'about.award.3.country': 'Japan',
        'about.award.3.name':    'Animation Awards',
        'about.award.3.years':   '2019 – 2020',
        'about.award.4.country': 'USA',
        'about.award.4.name':    'UX Innovation Award',
        'about.award.4.years':   '2021 – 2022',

        // ── Skills ────────────────────────────────────────────────
        'about.skill.1': 'UI/UX Design',
        'about.skill.2': 'Web Design',
        'about.skill.3': 'Digital Arts',
        'about.skill.4': 'Content Creation',
        'about.skill.5': 'Digital Marketing',

        // ── Why Choose Us ─────────────────────────────────────────
        'about.why.heading':   'Why Must Choose Us',
        'about.why.sub':       'There are a lot of agencies out there. Here is what makes us different — and why our clients keep coming back project after project.',
        'about.why.1.title':   'Hard Work',
        'about.why.1.desc':    'We pour relentless effort into every project — no shortcuts, no half-measures. Every pixel, every word, and every decision is made with full commitment to excellence.',
        'about.why.2.title':   'Transparency',
        'about.why.2.desc':    'We believe great partnerships are built on honesty. You\'ll always know where your project stands, how your budget is being spent, and what results to expect.',
        'about.why.3.title':   'More Innovation',
        'about.why.3.desc':    'We never recycle the same ideas. Our team actively explores emerging trends, tools, and technologies to keep your brand ahead of the curve and ahead of the competition.',
        'about.why.4.title':   'Best Team Work',
        'about.why.4.desc':    'Our designers, strategists, and developers work as one unit. That tight collaboration means fewer gaps, faster delivery, and a final product that feels truly cohesive.',
        'about.why.5.title':   'Very Excellence',
        'about.why.5.desc':    'We hold every deliverable to the highest standard before it reaches you. Our internal review process is rigorous because your brand deserves nothing less than perfect.',
        'about.why.6.title':   'Fast Growth',
        'about.why.6.desc':    'We\'re not just here to make things look good — we\'re here to move the needle. Our work is designed to generate leads, build loyalty, and accelerate your business growth.',

        // ── FAQ ───────────────────────────────────────────────────
        'about.faq.heading1':  'Help & FAQ',
        'about.faq.heading2':  'Centers',
        'about.faq.desc':      'Have questions about working with us? We have answered the most common ones below. If you don\'t find what you\'re looking for, our team is always happy to jump on a call and talk through your specific needs.',
        'about.faq.btn':       'Contact Us',
        'about.faq.1.q':  '1. What is a digital agency?',
        'about.faq.1.a':  'A digital agency is a creative and strategic partner that helps businesses build their presence online and offline. We combine design, technology, and marketing to craft experiences that attract customers, communicate your brand\'s value, and drive measurable results.',
        'about.faq.2.q':  '2. What services does a digital agency offer?',
        'about.faq.2.a':  'We offer a full suite of creative services including brand identity design, UI/UX design, web design and development, mobile app design, motion graphics, content creation, and digital marketing strategy. Whether you need a complete brand overhaul or a single campaign, we have you covered.',
        'about.faq.3.q':  '3. How can a digital agency benefit my business?',
        'about.faq.3.a':  'Working with a digital agency gives you access to a team of specialists without the overhead of hiring in-house. We bring fresh perspective, proven processes, and cross-industry experience that helps you make smarter creative decisions, reach more customers, and grow faster.',
        'about.faq.4.q':  '4. How do digital agencies approach a new project?',
        'about.faq.4.a':  'Every project starts with a deep discovery session where we learn about your brand, goals, audience, and competition. From there we develop a strategy, present creative concepts, refine based on your feedback, and deliver final assets — with clear milestones and communication throughout.',
        'about.faq.5.q':  '5. What is the cost of digital agency services?',
        'about.faq.5.a':  'Pricing depends on the scope and complexity of your project. We offer three transparent monthly plans — Silver, Gold, and Platinum — as well as custom quotes for larger engagements. We\'re happy to discuss your budget and find a solution that fits without compromising on quality.',
        'about.faq.6.q':  '6. How long does a typical project take?',
        'about.faq.6.a':  'Timelines vary by project type. A brand identity typically takes 3–4 weeks, a website design 4–8 weeks, and a full brand and web package 8–12 weeks. We always agree on a timeline upfront and keep you informed at every stage so there are never any surprises.',
        'about.faq.7.q':  '7. What sets a good digital agency apart from others?',
        'about.faq.7.a':  'The best agencies combine creative excellence with strategic thinking and clear communication. We don\'t just make things look good — we make sure they work. Our process is collaborative, our standards are high, and we measure success by the real-world impact our work has on your business.',
        'about.faq.8.q':  '8. How do I ask for support?',
        'about.faq.8.a':  'You can reach our support team anytime via email, through the client portal, or by booking a call directly from your dashboard. All Gold and Platinum plan clients receive priority 24/7 support with a guaranteed response within 2 hours on business days.',
        'about.why.heading.highlight': 'Why',
        'about.why.heading.solid':     'Must',
        'about.why.heading.outline':   'Choose Us',


        // ══════════════════════════════════════════════════════════
        // PROJECT PAGE
        // ══════════════════════════════════════════════════════════
        'project.hero.title1':  'Awesome',
        'project.hero.title2':  'Project',
        'project.hero.desc':    'A curated selection of our finest work — spanning brand identity, digital product design, web experiences, and creative campaigns built for ambitious brands.',
        'project.breadcrumb':   'Project',

        // ── Ticker
        'project.ticker':       'Latest Works',

        // ── Work Section
        'project.work.heading1': "Let's Check",
        'project.work.heading2': 'Our Work',
        'project.work.more':     'More Works',
        'project.work.hint':     'Click to view details',

        // ── Popup labels
        'project.popup.challenge':    'The Challenge',
        'project.popup.solution':     'Our Solution',
        'project.popup.view':         'View Live Project',
        'project.popup.client':       'Client',
        'project.popup.category':     'Category',
        'project.popup.year':         'Year',
        'project.popup.deliverables': 'Deliverables',

        // ── CTA
        'project.cta.heading1': 'Have a Project?',
        'project.cta.heading2': "Let's Talk.",
        'project.cta.btn':      'Get Started',

        // ── Stats
        'project.stat.1.label': 'Project Success',
        'project.stat.2.label': 'Satisfied Clients',
        'project.stat.3.label': 'Agency Cooperation',
        'project.stat.4.label': 'Kind Of Services',
        'project.stat.5.label': 'Winning Awards',

        // ── Works data
        'project.work.1.title':     'Art Direction',
        'project.work.1.tag':       'Art Direction',
        'project.work.1.desc':      'A full visual art direction project for a luxury lifestyle brand — spanning campaign photography, editorial layout, and digital rollout.',
        'project.work.1.challenge': 'The client needed a cohesive visual language that felt premium yet approachable — something that stood apart from typical luxury aesthetics without losing its sense of refinement.',
        'project.work.1.solution':  'We developed a muted, high-contrast palette paired with oversized typography and intimate photography. Every frame was art-directed to feel editorial but warm, resulting in a campaign that performed 3× above industry benchmarks for engagement.',

        'project.work.2.title':     'Logo Design',
        'project.work.2.tag':       'Branding',
        'project.work.2.desc':      'A complete logo and identity system for a fintech startup — designed to communicate trust, clarity, and forward momentum in a crowded market.',
        'project.work.2.challenge': 'Fintech brands often default to cold, corporate visuals. The client wanted to feel approachable to young professionals without sacrificing credibility.',
        'project.work.2.solution':  'We created a geometric wordmark built on a dynamic angle — suggesting movement and growth. The color system pairs a deep navy with a vibrant amber accent, creating warmth without sacrificing authority.',

        'project.work.3.title':     'Brand Identity',
        'project.work.3.tag':       'Branding',
        'project.work.3.desc':      'An end-to-end brand identity for a wellness company — from naming and logo to packaging, web presence, and brand voice guidelines.',
        'project.work.3.challenge': 'The wellness space is saturated with soft pastels and generic leaf icons. The client wanted to stand out as a premium, science-backed alternative.',
        'project.work.3.solution':  'We leaned into precision and clarity — a clean sans-serif wordmark, a restrained palette of off-white and deep forest green, and packaging that feels more lab than spa. The result signals trust and credibility at every touchpoint.',

        'project.work.4.title':     'Product Design',
        'project.work.4.tag':       'UX/UI',
        'project.work.4.desc':      'UI/UX design for an industrial SaaS dashboard — built to make complex data readable, actionable, and visually elegant for field engineers.',
        'project.work.4.challenge': 'Users were overwhelmed by dense data tables and a cluttered interface. The previous design had 40+ screens with no consistent visual hierarchy.',
        'project.work.4.solution':  'We rebuilt the information architecture from scratch, introducing a modular card system, a clear type scale, and color-coded status indicators. User testing showed a 62% reduction in task completion time after the redesign.',

        'project.work.5.title':     'Website Design',
        'project.work.5.tag':       'Web Dev',
        'project.work.5.desc':      'A conversion-focused website redesign for a B2B SaaS company — balancing product storytelling with clear calls to action across all devices.',
        'project.work.5.challenge': 'The existing site had a high bounce rate and poor mobile experience. The product\'s value proposition wasn\'t clear within the first scroll.',
        'project.work.5.solution':  'We restructured the homepage narrative to lead with outcomes, not features. A bold hero, animated social proof, and a streamlined pricing section drove a 38% increase in demo requests within the first month post-launch.',

        'project.work.6.title':     'Graphic Design',
        'project.work.6.tag':       'Graphics',
        'project.work.6.desc':      'A comprehensive graphic design package for a creative conference — covering visual identity, print collateral, signage, and motion assets.',
        'project.work.6.challenge': 'The conference needed a visual identity that could work across a huge range of applications — from large-format banners to Instagram stories — without losing its impact or coherence.',
        'project.work.6.solution':  'We built a flexible modular system around a bold diagonal grid and a vibrant two-color palette. The system was designed to scale so the entire production team could create on-brand assets without a designer in the room.',

        // ── Deliverables (shared across pages, prefix with 'deliverable.')
        'deliverable.brand_campaign':    'Brand Campaign',
        'deliverable.editorial_design':  'Editorial Design',
        'deliverable.social_media_kit':  'Social Media Kit',
        'deliverable.logo_system':       'Logo System',
        'deliverable.brand_guidelines':  'Brand Guidelines',
        'deliverable.stationery_pack':   'Stationery Pack',
        'deliverable.logo_identity':     'Logo & Identity',
        'deliverable.packaging_design':  'Packaging Design',
        'deliverable.brand_voice_guide': 'Brand Voice Guide',
        'deliverable.website_design':    'Website Design',
        'deliverable.dashboard_ui':      'Dashboard UI',
        'deliverable.design_system':     'Design System',
        'deliverable.prototype_handoff': 'Prototype & Handoff',
        'deliverable.full_website':      'Full Website Design',
        'deliverable.responsive_build':  'Responsive Build',
        'deliverable.cms_integration':   'CMS Integration',
        'deliverable.event_identity':    'Event Identity',
        'deliverable.print_collateral':  'Print Collateral',
        'deliverable.motion_graphics':   'Motion Graphics',
        'deliverable.signage_system':    'Signage System',
        

        // ══════════════════════════════════════════════════════════
        // CONTACT PAGE
        // ══════════════════════════════════════════════════════════
        'contact.hero.title1':  'Get In',
        'contact.hero.title2':  'Touch',
        'contact.hero.desc':    'Have a project in mind or just want to say hello? We would love to hear from you. Fill in the form below or reach out through any of our channels.',
        'contact.breadcrumb':   'Contact',

        // ── Ticker
        'contact.ticker':       'Get In Touch',

        // ── Stats (reuse project.stat keys if already added, or use these)
        'contact.stat.1.label': 'Projects Completed',
        'contact.stat.2.label': 'Satisfied Clients',
        'contact.stat.3.label': 'Agency Partners',
        'contact.stat.4.label': 'Services Delivered',
        'contact.stat.5.label': 'Awards Won',

        // ── Works (desc strings differ slightly from Project page — add as new keys)
        'contact.work.1.desc': 'A full visual art direction project for a luxury lifestyle brand — spanning campaign photography, editorial layout, and digital rollout across web and social.',
        'contact.work.4.desc': 'UI/UX design for an industrial SaaS dashboard — built to make complex data readable, actionable, and visually elegant for field engineers and managers.',
        'contact.work.6.desc': 'A comprehensive graphic design package for a creative conference — covering visual identity, print collateral, signage, and motion assets for the event.',

        // ── FAQ
        'contact.faq.1.q': '1. What is a digital agency?',
        'contact.faq.1.a': 'A digital agency is a creative and strategic partner that helps businesses build their presence online and offline. We combine design, technology, and marketing to craft experiences that attract customers, communicate your brand\'s value, and drive measurable results.',

        'contact.faq.2.q': '2. What services does a digital agency offer?',
        'contact.faq.2.a': 'We offer a full suite of creative services including brand identity design, UI/UX design, web design and development, mobile app design, motion graphics, content creation, and digital marketing strategy. Whether you need a complete brand overhaul or a single focused campaign, we have you covered.',

        'contact.faq.3.q': '3. How can a digital agency benefit my business?',
        'contact.faq.3.a': 'Working with a digital agency gives you access to a team of specialists without the overhead of hiring in-house. We bring fresh perspective, proven processes, and cross-industry experience that helps you make smarter creative decisions, reach more customers, and grow faster.',

        'contact.faq.4.q': '4. How do digital agencies approach a new project?',
        'contact.faq.4.a': 'Every project starts with a deep discovery session where we learn about your brand, goals, audience, and competition. From there we develop a strategy, present creative concepts, refine based on your feedback, and deliver final assets — with clear milestones and open communication throughout.',

        'contact.faq.5.q': '5. What is the cost of digital agency services?',
        'contact.faq.5.a': 'Pricing depends on the scope and complexity of your project. We offer three transparent monthly plans — Silver, Gold, and Platinum — as well as custom quotes for larger engagements. We are happy to discuss your budget and find a solution that fits without compromising on quality.',

        'contact.faq.6.q': '6. How long does a typical project take?',
        'contact.faq.6.a': 'Timelines vary by project type. A brand identity typically takes 3–4 weeks, a website design 4–8 weeks, and a full brand and web package 8–12 weeks. We always agree on a timeline upfront and keep you informed at every stage so there are never any surprises.',

        'contact.faq.7.q': '7. What sets a good digital agency apart from others?',
        'contact.faq.7.a': 'The best agencies combine creative excellence with strategic thinking and clear communication. We do not just make things look good — we make sure they work. Our process is collaborative, our standards are high, and we measure success by the real-world impact our work has on your business.',

        'contact.faq.8.q': '8. How do I ask for support?',
        'contact.faq.8.a': 'You can reach our support team anytime via email, through the client portal, or by booking a call directly from your dashboard. All Gold and Platinum plan clients receive priority 24/7 support with a guaranteed response within 2 hours on business days.',

        // ── Contact info labels
        'contact.info.address.label': 'Our Address',
        'contact.info.address.value': 'Street 271, Sangkat Toek Thla,\nKhan Sen Sok, Phnom Penh, Cambodia',
        'contact.info.email.label':   'Our Email',
        'contact.info.phone.label':   'Our Phone',
        'contact.info.hours.label':   'Working Hours',
        'contact.info.hours.value':   'Monday – Friday: 8:00 AM – 6:00 PM (ICT)\nSaturday: 9:00 AM – 1:00 PM',

        // ── Form
        'contact.form.heading':           'Leave Your Message',
        'contact.form.name.label':        'Your Name',
        'contact.form.name.placeholder':  'John Doe',
        'contact.form.email.label':       'Your Email',
        'contact.form.email.placeholder': 'john@example.com',
        'contact.form.subject.label':     'Subject',
        'contact.form.subject.placeholder': 'Project Inquiry',
        'contact.form.phone.label':       'Your Phone',
        'contact.form.phone.placeholder': '+855 12 ...',
        'contact.form.message.label':     'Message',
        'contact.form.message.placeholder': 'Tell us about your project — what you need, your timeline, and your budget...',
        'contact.form.submit':            'Send Message',

        // ── Success state
        'contact.form.success.title': 'Message Sent!',
        'contact.form.success.sub':   "We'll get back to you within one business day.",

        // ── FAQ section (contact page version)
        'contact.faq.heading1': 'Help & FAQ',
        'contact.faq.heading2': 'Centers',
        'contact.faq.desc':     'Have questions about working with us? We have answered the most common ones below. If you still need help, our team in Phnom Penh is always happy to jump on a call and talk through your specific needs.',
        'contact.faq.btn':      'Contact Us',
        'contact.faq.ticker':   "FAQ's",


        // ══════════════════════════════════════════════════════════
        // PRICING PAGE
        // ══════════════════════════════════════════════════════════
        'pricing.hero.title1':  'Special',
        'pricing.hero.title2':  'Pricing',
        'pricing.hero.desc':    'Simple, transparent pricing with no hidden fees. Choose the plan that fits your goals and budget — and scale up anytime as your business grows.',
        'pricing.breadcrumb':   'Pricing',

        // ── Ticker
        'pricing.ticker':       'Pricing & Plans',
        'pricing.ticker.why':   'Why Choose Us',

        // ── Pricing section
        'pricing.section.title1':    'Special',
        'pricing.section.title2':    'Price & Plan',
        'pricing.section.subtitle':  'Every plan includes a dedicated creative team, clear timelines, and results you can measure. No lock-in contracts — cancel anytime.',
        'pricing.plan.period':       '/Month',
        'pricing.plan.select':       'Select Plan',

        // ── Plans
        'pricing.plan.silver.tier': 'Silver',
        'pricing.plan.silver.f1':   'Brand Identity Design',
        'pricing.plan.silver.f2':   'Up to 3 Page Web Design',
        'pricing.plan.silver.f3':   'Social Media Kit',
        'pricing.plan.silver.f4':   '2 Revision Rounds',
        'pricing.plan.silver.f5':   'Email Support',

        'pricing.plan.gold.tier':   'Gold',
        'pricing.plan.gold.f1':     'Full Branding Package',
        'pricing.plan.gold.f2':     'Up to 8 Page Web Design',
        'pricing.plan.gold.f3':     'Copywriting & Content',
        'pricing.plan.gold.f4':     'Unlimited Revisions',
        'pricing.plan.gold.f5':     'Priority 24/7 Support',

        'pricing.plan.platinum.tier': 'Platinum',
        'pricing.plan.platinum.f1':   'Complete Brand System',
        'pricing.plan.platinum.f2':   'Custom Web Development',
        'pricing.plan.platinum.f3':   'Content Strategy',
        'pricing.plan.platinum.f4':   'Dedicated Designer',
        'pricing.plan.platinum.f5':   'Full Online 24/7 Support',

        // ── Reviews
        'pricing.reviews.heading1': 'Our Client',
        'pricing.reviews.heading2': 'Reviews',
        'pricing.reviews.1.quote':  'Working with this agency transformed our brand completely. Their attention to detail, creative thinking, and ability to translate our vision into stunning visuals exceeded every expectation we had.',
        'pricing.reviews.2.quote':  'From the first consultation to the final delivery, the process was smooth, transparent, and genuinely exciting. They don\'t just design — they solve real business problems with great design.',
        'pricing.reviews.3.quote':  'Our product\'s user satisfaction scores jumped 40% after the redesign. The team deeply understood our users\' needs and crafted an experience that feels effortless and truly delightful.',

        // In both `en` and `km` blocks:
        'team.hero.desc': 'Behind every great project is a passionate team. Get to know the designers, strategists, and creators who bring your brand to life — from first concept to final delivery.',
        'team.team.sub': 'A small, focused team of specialists who care deeply about craft, collaboration, and delivering work that makes a real difference.',

          // ── Hero
        'team.hero.title1':    'Meet',
        'team.hero.title2':    'Our Team',
        'team.hero.desc':      'Behind every great project is a passionate team. Get to know the designers, strategists, and creators who bring your brand to life — from first concept to final delivery.',
        'team.breadcrumb':     'Team',

        // ── Tickers
        'team.ticker.1':       'Our Team',
        'team.ticker.2':       "What We Do",
        'team.ticker.3':       "FAQ's",

        // ── Team section heading
        'team.team.heading1':  'Meet Our',
        'team.team.heading2':  'Expert Team',

        // ── Hero
        'blog.hero.breadcrumb.blog':    'Blog',
        'blog.hero.breadcrumb.current': 'Design',
        'blog.hero.title':              'The Role of Design in Creating Impactful Digital Experiences',
        'blog.hero.desc':               'Discover insights, design strategies, and creative ideas that help businesses build better digital products and stronger brands.',

        // ── Ticker
        'blog.ticker':                  'Latest Blog',

        // ── Controls
        'blog.read_more':               'Read More',
        'blog.load_more':               'Load More',

        // ── Posts
        'blog.post.1.tag':     'Design',
        'blog.post.1.title':   'The Importance of Design in Every Project',
        'blog.post.1.excerpt': 'Good design is more than aesthetics — it shapes user experience, builds trust, and improves how people interact with digital products.',

        'blog.post.2.tag':     'AI',
        'blog.post.2.title':   'How Artificial Intelligence is Transforming Modern Design',
        'blog.post.2.excerpt': 'Artificial intelligence is changing the way designers work by automating tasks and enabling smarter creative workflows.',

        'blog.post.3.tag':     'Product',
        'blog.post.3.title':   'Building a Design System for Modern Digital Products',
        'blog.post.3.excerpt': 'A strong design system helps teams build consistent, scalable, and user-friendly products across platforms.',

        'blog.post.4.tag':     'Website',
        'blog.post.4.title':   'Why Prototyping Matters Before Website Development',
        'blog.post.4.excerpt': 'Prototyping helps identify usability problems early and ensures a smoother development process.',

        // ── Hero
        'singleblog.hero.breadcrumb.blog':    'Blog',
        'singleblog.hero.breadcrumb.current': 'Design',
        'singleblog.hero.title':              'The Role of Design in Creating Impactful Digital Experiences',
        'singleblog.hero.meta.author':        'by Jane Smith',
        'singleblog.hero.meta.date':          'March 7, 2026',
        'singleblog.hero.meta.tag':           'Design',

        // ── Ticker
        'singleblog.ticker':                  'Trending Design Insights',

        // ── Article
        'singleblog.article.img_alt':         'Design importance',
        'singleblog.article.h2':              'Why Good Design is More Than Just Aesthetics',
        'singleblog.article.p1':              'Design is the silent ambassador of your brand. It shapes how users perceive your products, communicates your message, and builds trust with your audience.',
        'singleblog.article.p2':              "Effective design combines functionality with creativity. It's about understanding user behavior, streamlining experiences, and making interfaces intuitive.",
        'singleblog.article.p3':              'Beyond visuals, design impacts engagement, conversions, and overall satisfaction. Every color choice, typography decision, and layout has a purpose.',
        'singleblog.article.quote':           '"Design is not just what it looks like and feels like. Design is how it works." – Steve Jobs',
        'singleblog.article.p4':              "Whether it's a website, app, or digital campaign, investing in good design ensures your ideas are communicated clearly and memorably.",
        'singleblog.article.img1_alt':        'Design workflow',
        'singleblog.article.img2_alt':        'Creative collaboration',
        'singleblog.article.p5':              'A thoughtful design process involves research, wireframing, prototyping, and iteration. It ensures the final product not only looks good but performs well.',

        // ── Comment form
        'singleblog.comment.heading':         'Leave A Reply',
        'singleblog.comment.note':            'Your email address will not be published.',
        'singleblog.comment.note_required':   'Required fields are marked *',
        'singleblog.comment.label_body':      'Comment *',
        'singleblog.comment.placeholder_body':'Write your comment here...',
        'singleblog.comment.label_name':      'Name *',
        'singleblog.comment.placeholder_name':'Your name',
        'singleblog.comment.label_email':     'Email *',
        'singleblog.comment.label_website':   'Website',
        'singleblog.comment.save_info':       'Save my name, email, and website in this browser for the next time I comment.',
        'singleblog.comment.submit':          'Post Comment',

        // ── Sidebar
        'singleblog.sidebar.categories':      'Categories',
        'singleblog.sidebar.recent':          'Recent Posts',
        'singleblog.sidebar.tags':            'Tags',

        // ── Sidebar categories (name only — counts are numeric)
        'singleblog.cat.design':    'Design',
        'singleblog.cat.creative':  'Creative',
        'singleblog.cat.project':   'Project',
        'singleblog.cat.website':   'Website',
        'singleblog.cat.branding':  'Branding',
        'singleblog.cat.motion':    'Motion',

        // ── Sidebar tags
        'singleblog.tag.design':    'Design',
        'singleblog.tag.creative':  'Creative',
        'singleblog.tag.uiux':      'UI/UX',
        'singleblog.tag.branding':  'Branding',
        'singleblog.tag.motion':    'Motion',
        'singleblog.tag.digital':   'Digital',
        'singleblog.tag.agency':    'Agency',
        'singleblog.tag.prototype': 'Prototype',
        'singleblog.tag.system':    'System',
        'singleblog.tag.website2':  'Website',

        // ── Related posts
        'singleblog.related.heading1': 'Related',
        'singleblog.related.heading2': 'Posts',
        'singleblog.related.read_more':'Read More',

        'singleblog.related.1.tag':     'Creative',
        'singleblog.related.1.title':   'How AI is Transforming Modern Graphic Design',
        'singleblog.related.1.excerpt': 'Discover how artificial intelligence tools are revolutionizing graphic design, making creativity faster and more efficient.',

        'singleblog.related.2.tag':     'Project',
        'singleblog.related.2.title':   'Design Systems: Building Consistency Across Products',
        'singleblog.related.2.excerpt': 'Learn the importance of a design system and how it can help maintain consistency, speed up development, and improve user experience.',

        'singleblog.related.3.tag':     'Website',
        'singleblog.related.3.title':   'Why Prototyping Should Be Your First Step in Web Design',
        'singleblog.related.3.excerpt': 'Prototyping allows you to test ideas, improve usability, and avoid costly mistakes before development begins.',

        // ── Divider ticker
        'singleblog.divider': 'Related Articles',



    },

    km: {
        // ── Navbar ──────────────────────────────────────────────
        'nav.home':              'ទំព័រដើម',
        'nav.about':             'អំពីយើង',
        'nav.work':              'ស្នាដៃ',
        'nav.new':               'ថ្មី',
        'nav.pages':             'ទំព័រ',
        'nav.contact':           'ទំនាក់ទំនង',
        'nav.cta':               'ចាប់ផ្តើម',

        // ── Navbar — Pages dropdown ──────────────────────────────
        'nav.pages.pricing':     'តម្លៃ',
        'nav.pages.team':        'ក្រុម',
        'nav.pages.blog':        'ប្លក់',
        'nav.pages.single-blog': 'ប្លក់តែមួយ',
        'nav.pages.404':         'ទំព័រ 404',

        // ── Footer — column headings ─────────────────────────────
        'footer.company':        'ក្រុមហ៊ុនយើង',
        'footer.quicklinks':     'តំណភ្ជាប់រហ័ស',
        'footer.social':         'បណ្តាញសង្គម',

        // ── Footer — contact card ─────────────────────────────────
        'footer.office.label':   'ការិយាល័យ',
        'footer.office.value':   'ជាន់លេខ ១៤២ ផ្លូវ​​ សែនសុខ​, ភ្នំពេញ, កម្ពុជា',
        'footer.email.label':    'អ៊ីមែល',
        'footer.email.value':    'support@domain.com',
        'footer.phone.label':    'ទូរស័ព្ទ',
        'footer.phone.value':    '(+855) 81 115 3568',

        // ── Footer — Our Company links ────────────────────────────
        'footer.company.about':        'អំពីយើង',
        'footer.company.community':    'សហគមន៍',
        'footer.company.careers':      'អាជីព',
        'footer.company.testimonials': 'សក្ខីកម្ម',
        'footer.company.services':     'សេវាកម្ម',
        'footer.company.project':      'គម្រោង',

        // ── Footer — Quick Links ──────────────────────────────────
        'footer.quick.contact':   'ទំនាក់ទំនង',
        'footer.quick.privacy':   'គោលការណ៍ឯកជនភាព',
        'footer.quick.faq':       'សំណួរញឹកញាប់',
        'footer.quick.licensing': 'អាជ្ញាប័ណ្ណ',
        'footer.quick.help':      'មជ្ឈមណ្ឌលជំនួយ',
        'footer.quick.terms':     'លក្ខខណ្ឌ',

        // ── Footer — Social Media ─────────────────────────────────
        'footer.social.desc':      'តាមដានយើង ហើយទទួលព័ត៌មានថ្មីៗអំពីគម្រោង និងស្នាដៃច្នៃប្រឌិតរបស់យើង។',
        'footer.social.facebook':  'Facebook',
        'footer.social.twitter':   'Twitter',
        'footer.social.linkedin':  'LinkedIn',
        'footer.social.instagram': 'Instagram',
        'footer.social.pinterest': 'Pinterest',

        // ── Footer — bottom bar ───────────────────────────────────
        'footer.tagline':  'ក្រុមហ៊ុនរចនាប័ទ្មច្នៃប្រឌិត',
        'footer.copy':     '© 2026 Templatekit ដោយ',
        'footer.copy.by':  'Palm Technology',
        'footer.copy.end': 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',

        // ══════════════════════════════════════════════════════════
        // HOME PAGE
        // ══════════════════════════════════════════════════════════

        // ── Hero ─────────────────────────────────────────────────
        'home.hero.line1':   'ច្នៃប្រឌិត',
        'home.hero.line2':   'រចនា',
        'home.hero.line3':   'ភ្នាក់ងារ',
        'home.hero.desc':    'យើងជាភ្នាក់ងាររចនាច្នៃប្រឌិត ឯកទេសសំរាប់បង្កើតដំណោះស្រាយរចនាដ៏ស្រស់ស្អាត និងមានប្រសិទ្ធភាពសម្រាប់អតិថិជននៅទូទាំងឧស្សាហកម្មផ្សេងៗ។ ចូលរួមជាមួយយើង ហើយបង្កើតអ្វីមួយអស្ចារ្យ។',
        'home.hero.findout': 'ស្វែងយល់បន្ថែម',

        // ── Tickers ──────────────────────────────────────────────
        'home.ticker.1': 'បើកទទួលគម្រោងថ្មី',
        'home.ticker.2': 'ហេតុអ្វីជ្រើសរើសយើង',
        'home.ticker.3': 'អ្វីដែលយើងធ្វើ',
        'home.ticker.4': 'តម្លៃ និងផែនការ',
        'home.ticker.5': 'ការពិតគួរឱ្យចាប់អារម្មណ៍',
        'home.ticker.6': 'ប្លក់ចុងក្រោយ',

        // ── Section 2 — About ────────────────────────────────────
        'home.s2.heading1':  'ចាប់ផ្តើម',
        'home.s2.heading2':  'ការរចនារបស់អ្នក',
        'home.s2.video':     'វីដេអូណែនាំ',
        'home.s2.body':      'យើងរួមបញ្ចូលការគិតជាយុទ្ធសាស្ត្រ ជាមួយនឹងការបង្កើតដ៏ស្រស់ស្អាតដើម្បីសាងសង់ម៉ាក និងបទពិសោធន៍ឌីជីថល ដែលភ្ជាប់ទំនាក់ទំនងជាមួយទស្សនិកជនរបស់អ្នក ហើយជំរុញលទ្ធផលអាជីវកម្មពិតប្រាកដ។',
        'home.s2.learnmore': 'ស្វែងយល់បន្ថែម',

        // ── Info cards ────────────────────────────────────────────
        'home.card.who.label':     'យើងជានរណា',
        'home.card.who.desc':      'ក្រុមអ្នករចនា និងអ្នកយុទ្ធសាស្ត្រដ៏មានចំណង់ ដែលកំពុងបង្កើតម៉ាកដ៏យូរអង្វែង។',
        'home.card.vision.label':  'ទស្សន៍វិស័យ',
        'home.card.vision.desc':   'ធ្វើឱ្យការរចនាថ្នាក់ពិភពលោក អាចចូលប្រើបានសម្រាប់អាជីវកម្មដ៏មហិច្ឆិតាគ្រប់រូប។',
        'home.card.mission.label': 'បេសកកម្ម',
        'home.card.mission.desc':  'ផ្តល់ដំណោះស្រាយច្នៃប្រឌិតដែលជំរុញការកំណើនពិតប្រាកដ និងផលប៉ះពាល់យូរអង្វែង។',

        // ── Work ─────────────────────────────────────────────────
        'home.work.heading1': 'សូមមើល',
        'home.work.heading2': 'ស្នាដៃរបស់យើង',
        'home.work.more':     'ស្នាដៃបន្ថែម',

        // ── Work cards ────────────────────────────────────────────
        'home.work.art.title':     'ការដឹកនាំសិល្បៈ',
        'home.work.art.tag':       'មើលគម្រោង',
        'home.work.art.desc':      'ការរៀបរាប់រឿងដ៏ស្រស់ស្អាតតាមរយៈការដឹកនាំសិល្បៈ និងការរចនាគំនិត។',
        'home.work.logo.title':    'រចនាសញ្ញាសម្គាល់',
        'home.work.logo.tag':      'ម៉ាក',
        'home.work.logo.desc':     'សញ្ញាសម្គាល់ដ៏ស្អាត ងាយចាំ ដែលកំណត់ម៉ាកក្នុងមួយភ្លែត។',
        'home.work.brand.title':   'អត្តសញ្ញាណម៉ាក',
        'home.work.brand.tag':     'អត្តសញ្ញាណ',
        'home.work.brand.desc':    'ប្រព័ន្ធរូបភាពដ៏ទូលំទូលាយ សាងសង់ដើម្បីភាពស្របគ្នា និងការទទួលស្គាល់។',
        'home.work.product.title': 'រចនាផលិតផល',
        'home.work.product.tag':   'UX/UI',
        'home.work.product.desc':  'ចំណុចប្រទាក់ផលិតផលដែលផ្តោតលើអ្នកប្រើ ដែលមានមុខងារ និងស្រស់ស្អាតស្មើគ្នា។',
        'home.work.web.title':     'រចនាគេហទំព័រ',
        'home.work.web.tag':       'Web Dev',
        'home.work.web.desc':      'គេហទំព័រផ្តោតលើការបំប្លែង ដែលធ្វើឱ្យចំណាប់អារម្មណ៍ដំបូងដ៏មានឥទ្ធិពល។',
        'home.work.graphic.title': 'រចនាក្រាហ្វិក',
        'home.work.graphic.tag':   'ក្រាហ្វិក',
        'home.work.graphic.desc':  'ក្រាហ្វិកបោះពុម្ព និងឌីជីថល រៀបចំដើម្បីទំនាក់ទំនងដោយភាពច្បាស់លាស់។',

        // ── CTA ───────────────────────────────────────────────────
        'home.cta.heading1': 'មានគម្រោងមួយ?',
        'home.cta.heading2': 'តោះនិយាយ។',
        'home.cta.btn':      'ចាប់ផ្តើម',

        // ── Services ─────────────────────────────────────────────
        'home.srv.heading1': 'រួមគ្នា',
        'home.srv.heading2': 'យើងបង្កើត',
        'home.srv.desc':     'ពីការបន្សាំដំបូងរហូតដល់ការដាក់ឱ្យដំណើរការ យើងនាំមកនូវជំនាញច្នៃប្រឌិត និងការគិតជាយុទ្ធសាស្ត្រ ក្នុងរាល់សេវាកម្មដែលយើងផ្តល់ជូន — ដើម្បីម៉ាករបស់អ្នកបង្ហាញខ្លួនយ៉ាងល្អបំផុតជានិច្ច។',
        'home.srv.cta.text': 'ត្រៀមចាប់ផ្តើមហើយ? តោះសាងសង់អ្វីមួយដ៏អស្ចារ្យរួមគ្នា។',
        'home.srv.cta.btn':  'ទំនាក់ទំនងយើង',

        // ── Service items ─────────────────────────────────────────
        'home.srv.sketching.name': 'ការបន្សាំដ៏ល្អឥតខ្ចោះ',
        'home.srv.sketching.desc': 'រាល់ការរចនាដ៏ល្អចាប់ផ្តើមពីគំនិតដ៏រឹងមាំ។ យើងគូររូបគំនិតតាមរយៈការបន្សាំ និងការរចនាស្ថាបត្យកម្ម មុននឹងដាក់ pixel ណាមួយ — សន្សំពេលវេលា និងធ្វើឱ្យលទ្ធផលចុងក្រោយដូចការរំពឹងទុក។',
        'home.srv.proto.name':     'គំរូឌីជីថល',
        'home.srv.proto.desc':     'យើងបង្កើតគំរូអន្តរកម្ម ដែលអនុញ្ញាតឱ្យអ្នកចុច រំកិល និងបទពិសោធន៍ផលិតផលរបស់អ្នកមុនការអភិវឌ្ឍចាប់ផ្តើម — ស្វែងរកបញ្ហាមុន និងទទួលបានការអនុម័តលឿន។',
        'home.srv.system.name':    'ប្រព័ន្ធរចនា',
        'home.srv.system.desc':    'យើងបង្កើតប្រព័ន្ធរចនាដែលអាចពង្រីក និងមានឯកសារល្អ ដែលរក្សាម៉ាករបស់អ្នកស្របគ្នានៅគ្រប់ផលិតផល និងវេទិកា — ប្រភពព័ត៌មានតែមួយសម្រាប់ UI ទាំងមូល។',
        'home.srv.concept.name':   'គំនិតរចនា',
        'home.srv.concept.desc':   'មុនពេលយើងដាក់ទិសដៅចុងក្រោយ យើងស្វែងរកគំនិតច្នៃប្រឌិតដ៏ហ៊ាន — ផ្តល់ជូននូវវិស័យទស្សន៍ច្បាស់លាស់ជាច្រើន ដើម្បីអ្នកអាចជ្រើសរើសផ្លូវដែលល្អបំផុតសម្រាប់ម៉ាករបស់អ្នក។',
        'home.srv.brand.name':     'ពិគ្រោះយោបល់ម៉ាក',
        'home.srv.brand.desc':     'មិនប្រាកដអំពីទីតាំងម៉ាករបស់អ្នក? ការពិគ្រោះយោបល់យុទ្ធសាស្ត្ររបស់យើង ជួយអ្នកកំណត់ទីតាំង ស្វែងរកគម្លាត និងបង្កើតផែនទីដំណើរច្បាស់លាស់ ដើម្បីអត្តសញ្ញាណដ៏ទាក់ទាញ។',
        'home.srv.mobile.name':    'រចនា App ទូរស័ព្ទ',
        'home.srv.mobile.desc':    'យើងរចនាបទពិសោធន៍ទូរស័ព្ទ ដែលមានអារម្មណ៍ស្រស់ស្អាត ងាយប្រើ និងគួរឱ្យចូលចិត្ត។ ពីលំហូរអ្នកប្រើប្រាស់រហូតដល់ UI ចុងក្រោយ រាល់អេក្រង់ត្រូវបានបង្កើតដើម្បីរក្សាអ្នកប្រើប្រាស់ឱ្យចូលរួម។',

        // ── Pricing ───────────────────────────────────────────────
        'home.pricing.heading1': 'ពិសេស',
        'home.pricing.heading2': 'តម្លៃ និងផែនការ',
        'home.pricing.subtitle': 'តម្លៃច្បាស់លាស់ ងាយស្រួល។ ជ្រើសរើសផែនការដែលសមស្របនឹងមហិច្ឆិតារបស់អ្នក។',
        'home.pricing.period':   '/ខែ',
        'home.pricing.btn':      'ជ្រើសរើសផែនការ',

        // ── Pricing — Silver ──────────────────────────────────────
        'home.plan.silver.tier': 'ប្រាក់',
        'home.plan.silver.f1':   'រចនាអត្តសញ្ញាណម៉ាក',
        'home.plan.silver.f2':   'រចនាគេហទំព័ររហូតដល់ ៣ ទំព័រ',
        'home.plan.silver.f3':   'បណ្តុំប្រព័ន្ធផ្សព្វផ្សាយសង្គម',
        'home.plan.silver.f4':   'កែប្រែ ២ ដង',
        'home.plan.silver.f5':   'ជំនួយតាមអ៊ីម៉ែល',

        // ── Pricing — Gold ────────────────────────────────────────
        'home.plan.gold.tier': 'មាស',
        'home.plan.gold.f1':   'កញ្ចប់ម៉ាកពេញលេញ',
        'home.plan.gold.f2':   'រចនាគេហទំព័ររហូតដល់ ៨ ទំព័រ',
        'home.plan.gold.f3':   'ការសរសេរ និងខ្លឹមសារ',
        'home.plan.gold.f4':   'កែប្រែគ្មានដែន',
        'home.plan.gold.f5':   'ជំនួយអាទិភាព ២៤/៧',

        // ── Pricing — Platinum ────────────────────────────────────
        'home.plan.platinum.tier': 'ប្លាទីន',
        'home.plan.platinum.f1':   'ប្រព័ន្ធម៉ាកពេញលេញ',
        'home.plan.platinum.f2':   'អភិវឌ្ឍន៍គេហទំព័រផ្ទាល់ខ្លួន',
        'home.plan.platinum.f3':   'យុទ្ធសាស្ត្រខ្លឹមសារ',
        'home.plan.platinum.f4':   'អ្នករចនាឧទ្ទិស',
        'home.plan.platinum.f5':   'ជំនួយអនឡាញពេញ ២៤/៧',

        // ── Reviews ───────────────────────────────────────────────
        'home.rev.heading1': 'អតិថិជន',
        'home.rev.heading2': 'របស់យើង',

        'home.rev.1.name':  'Callie John',
        'home.rev.1.role':  'នាយកប្រតិបត្តិ, VScret',
        'home.rev.1.quote': 'ការធ្វើការជាមួយភ្នាក់ងារនេះបានផ្លាស់ប្តូរម៉ាករបស់យើងទាំងស្រុង។ ការយកចិត្តទុកដាក់ ការគិតច្នៃប្រឌិត និងសមត្ថភាពបំប្លែងចក្ខុវិស័យរបស់យើងទៅជារូបភាពដ៏ស្រស់ស្អាត លើសពីការរំពឹងទុករបស់យើងទាំងស្រុង។',

        'home.rev.2.name':  'Marcus Lee',
        'home.rev.2.role':  'ស្ថាបនិក, Designly',
        'home.rev.2.quote': 'ពីការពិគ្រោះយោបល់ដំបូងរហូតដល់ការដឹកជញ្ជូនចុងក្រោយ ដំណើរការគឺរលូន ថ្លាដោះ និងគួរឱ្យរំភើប។ ពួកគេមិនត្រឹមតែរចនាទេ — ពួកគេដោះស្រាយបញ្ហាអាជីវកម្មពិតប្រាកដ ដោយការរចនាដ៏ល្អ។',

        'home.rev.3.name':  'Sara Patel',
        'home.rev.3.role':  'ប្រធានផលិតផល, Nexlabs',
        'home.rev.3.quote': 'ពិន្ទុការពេញចិត្តរបស់អ្នកប្រើប្រាស់ផលិតផលរបស់យើងបានឡើង ៤០% បន្ទាប់ពីការរចនាឡើងវិញ។ ក្រុមការងារបានយល់ដឹងយ៉ាងស៊ីជម្រៅ និងបង្កើតបទពិសោធន៍ ដែលមានអារម្មណ៍ងាយស្រួល និងគួរឱ្យចូលចិត្ត។',

        // ── Stats ─────────────────────────────────────────────────
        'home.stat.1.label': 'គម្រោងបានបញ្ចប់',
        'home.stat.2.label': 'អតិថិជនពេញចិត្ត',
        'home.stat.3.label': 'ដៃគូភ្នាក់ងារ',
        'home.stat.4.label': 'សេវាកម្មផ្តល់ជូន',
        'home.stat.5.label': 'រង្វាន់ទទួលបាន',

        // ── Blog ─────────────────────────────────────────────────
        'home.blog.heading1': 'ប្លក់',
        'home.blog.heading2': 'និងអត្ថបទ',
        'home.blog.desc':     'ការយល់ដឹងអំពីការរចនា ម៉ាក និងយុទ្ធសាស្ត្រ — សរសេរដោយក្រុមការងាររបស់យើង ដើម្បីជួយអ្នកបង្កើតដោយភាពជឿជាក់។',
        'home.blog.btn':      'មើលអត្ថបទទាំងអស់',
        'home.blog.readmore': 'អានបន្ថែម',

        'home.post.1.tag':     'ម៉ាក',
        'home.post.1.title':   'តើការសាងសង់អត្តសញ្ញាណម៉ាកដ៏មានគុណភាពខ្ពស់ ចំណាយប៉ុន្មាន?',
        'home.post.1.excerpt': 'ថវិកាតែងតែជាការព្រួយបារម្ភ ប៉ុន្តែការវិនិយោគលើម៉ាករបស់អ្នក មានប្រយោជន៍យ៉ាងច្រើន។ យើងពន្យល់ពីតម្លៃ និងហេតុអ្វីវាមានតម្លៃ។',

        'home.post.2.tag':     'ការរចនា',
        'home.post.2.title':   'ហេតុអ្វីការគិតរចនាគួរជានៅចំកណ្តាលនៃការសម្រេចចិត្តផលិតផលគ្រប់ប្រភេទ',
        'home.post.2.excerpt': 'ផលិតផលដែលទទួលជោគជ័យបំផុតមិនត្រូវបានបង្កើតដោយវិស្វករតែម្នាក់ឯង — ពួកវាត្រូវបានរៀបចំដោយការយល់ចិត្ត ការធ្វើម្តងទៀត និងការផ្តោតលើបទពិសោធន៍អ្នកប្រើប្រាស់។',

        'home.post.3.tag':     'យុទ្ធសាស្ត្រ',
        'home.post.3.title':   'យុទ្ធសាស្ត្រច្នៃប្រឌិត: កម្លាំងដែលមើលមិនឃើញនៅពីក្រោយម៉ាកដ៏ល្បីល្បាញ',
        'home.post.3.excerpt': 'នៅពីក្រោយម៉ាកដែលមិនអាចភ្លេចបាន មានគ្រឹះយុទ្ធសាស្ត្រដ៏ច្បាស់លាស់។ នេះជារបៀបដែលយុទ្ធសាស្ត្រច្នៃប្រឌិតប្រែបំប្លែងការរចនាដ៏ល្អ ទៅជាលទ្ធផលអាជីវកម្ម។',

        // ══════════════════════════════════════════════════════════
        // ABOUT PAGE
        // ══════════════════════════════════════════════════════════

        // ── Hero ─────────────────────────────────────────────────
        'about.hero.title1':  'អំពី',
        'about.hero.title2':  'ភ្នាក់ងារ',
        'about.hero.desc':    'យើងជាក្រុមអ្នករចនា អ្នកយុទ្ធសាស្ត្រ និងអ្នកគិតច្នៃប្រឌិតដ៏មានចំណង់ ដែលខ្ចីខ្លួនដើម្បីបង្កើតម៉ាកដ៏ហ៊ាន មានន័យ និងយូរអង្វែង។ ស្វែងយល់អំពីមនុស្ស និងគោលការណ៍នៅពីក្រោយគម្រោងគ្រប់ប្រភេទដែលយើងផ្តល់ជូន។',
        'about.breadcrumb':   'អំពីយើង',

        // ── Tickers ──────────────────────────────────────────────
        'about.ticker.story':  'រឿងរ៉ាវរបស់យើង',
        'about.ticker.team':   'ក្រុមការងាររបស់យើង',
        'about.ticker.why':    'ហេតុអ្វីជ្រើសរើសយើង',
        'about.ticker.faq':    'សំណួរញឹកញាប់',

        // ── Section 2 ────────────────────────────────────────────
        'about.s2.heading1':   'ចាប់ផ្តើម',
        'about.s2.heading2':   'ការរចនារបស់អ្នក',
        'about.s2.video':      'មើលរឿងរ៉ាវរបស់យើង',
        'about.s2.body':       'ដោយមានជំនឿថាការរចនាដ៏ល្អផ្លាស់ប្តូរអ្វីៗទាំងអស់ យើងបានចំណាយពេលជាងមួយទស្សវត្សជួយម៉ាកនៅគ្រប់ឧស្សាហកម្ម ឱ្យស្វែងរកសំឡេង កែស្ថានភាពអត្តសញ្ញាណ និងភ្ជាប់ជាមួយទស្សនិកជនដ៏សំខាន់។ រាល់គម្រោងដែលយើងទទួល គឺជាឱកាសសំរាប់បង្កើតអ្វីមួយដែលពិតជាធ្វើឱ្យមនុស្សរំភើប។',
        'about.s2.cta':        'ធ្វើការជាមួយយើង →',

        // ── Info cards ────────────────────────────────────────────
        'about.card.who.label':     'យើងជានរណា',
        'about.card.who.desc':      'យើងជាភ្នាក់ងាររចនាពេញលេញ បង្កើតដោយអ្នករចនា អ្នកយុទ្ធសាស្ត្រ និងអ្នករៀបរាប់រឿង ដែលជឿថាការរចនាដ៏ល្អមានអំណាចផ្លាស់ប្តូរអាជីវកម្ម។',
        'about.card.vision.label':  'ទស្សន៍វិស័យ',
        'about.card.vision.desc':   'ដើម្បីក្លាយជាដៃគូច្នៃប្រឌិតដ៏គួរជឿទុកចិត្តបំផុតសម្រាប់ម៉ាកដ៏មហិច្ឆិតា — ផ្តល់ស្នាដៃដ៏ហ៊ាន មានគោលបំណង និងសាងសង់ដើម្បីទ្រាំទ្រការប្រឡូករបស់ពេលវេលា។',
        'about.card.mission.label': 'បេសកកម្ម',
        'about.card.mission.desc':  'ដើម្បីបង្កើតបទពិសោធន៍រចនាដ៏មានន័យ ដែលភ្ជាប់ម៉ាកជាមួយទស្សនិកជន ជំរុញការកំណើនពិតប្រាកដ និងធ្វើឱ្យរាល់អន្តរកម្មមានតម្លៃ។',

        // ── Team ─────────────────────────────────────────────────
        'about.team.heading1': 'ស្គាល់',
        'about.team.heading2': 'ក្រុមជំនាញរបស់យើង',
        'about.team.sub':      'នៅពីក្រោយគម្រោងដ៏ល្អគ្រប់ប្រភេទ មានក្រុមការងារដែលយកចិត្តទុកដាក់ជ្រៅជ្រះ ស្វែងយល់ពីបុគ្គលដ៏មានទេពកោសល្យ ដែលនាំមកនូវការច្នៃប្រឌិត យុទ្ធសាស្ត្រ និងការខ្នះខ្នែងក្នុងរាល់ការងារ។',

        // ── Skills & Awards ───────────────────────────────────────
        'about.skills.heading1': 'ជំនាញ និង',
        'about.skills.heading2': 'រង្វាន់',

        // ── Awards ────────────────────────────────────────────────
        'about.award.1.country': 'ឥណ្ឌូណេស៊ី',
        'about.award.1.name':    'រង្វាន់រចនាគេហទំព័រ',
        'about.award.1.years':   '2010 – 2011',
        'about.award.2.country': 'អូស្ត្រាលី',
        'about.award.2.name':    'រង្វាន់ App ទូរស័ព្ទ',
        'about.award.2.years':   '2016 – 2017',
        'about.award.3.country': 'ជប៉ុន',
        'about.award.3.name':    'រង្វាន់សំឡេងចល័ត',
        'about.award.3.years':   '2019 – 2020',
        'about.award.4.country': 'សហរដ្ឋអាមេរិក',
        'about.award.4.name':    'រង្វាន់នវានុវត្ត UX',
        'about.award.4.years':   '2021 – 2022',

        // ── Skills ────────────────────────────────────────────────
        'about.skill.1': 'រចនា UI/UX',
        'about.skill.2': 'រចនាគេហទំព័រ',
        'about.skill.3': 'សិល្បៈឌីជីថល',
        'about.skill.4': 'ការបង្កើតខ្លឹមសារ',
        'about.skill.5': 'ទីផ្សារឌីជីថល',

        // ── Why Choose Us ─────────────────────────────────────────
        'about.why.heading':   'ហេតុអ្វីត្រូវជ្រើសរើសយើង',
        'about.why.sub':       'មានភ្នាក់ងារជាច្រើននៅទីនោះ។ នេះជាអ្វីដែលធ្វើឱ្យយើងខុសគ្នា — និងហេតុអ្វីអតិថិជនរបស់យើងបន្តត្រឡប់មកម្តងហើយម្តងទៀត។',
        'about.why.1.title':   'ការខំប្រឹងប្រែង',
        'about.why.1.desc':    'យើងខំប្រឹងប្រែងយ៉ាងមិនចេះអស់ក្នុងរាល់គម្រោង — គ្មានផ្លូវកាត់ គ្មានការធ្វើពាក់កណ្តាល។ រាល់ pixel រាល់ពាក្យ និងរាល់ការសម្រេចចិត្ត ត្រូវបានធ្វើដោយការប្ដេជ្ញាយ៉ាងពេញលេញ។',
        'about.why.2.title':   'តម្លាភាព',
        'about.why.2.desc':    'យើងជឿថាភាពជាដៃគូដ៏ល្អសាងសង់លើភាពស្មោះត្រង់។ អ្នកនឹងដឹងជានិច្ចថាតើគម្រោងរបស់អ្នកស្ថិតនៅឯណា ថវិកាបញ្ចេញដោយរបៀបណា និងលទ្ធផលអ្វីខ្លះត្រូវរំពឹងទុក។',
        'about.why.3.title':   'នវានុវត្តបន្ថែម',
        'about.why.3.desc':    'យើងមិនដែលប្រើគំនិតដដែលម្ដងទៀត។ ក្រុមការងាររបស់យើងស្វែងរកនិន្នាការ ឧបករណ៍ និងបច្ចេកវិទ្យាដ៏ថ្មីជានិច្ច ដើម្បីរក្សាម៉ាករបស់អ្នកឱ្យទាន់សម័យ។',
        'about.why.4.title':   'ការងារក្រុមល្អបំផុត',
        'about.why.4.desc':    'អ្នករចនា អ្នកយុទ្ធសាស្ត្រ និងអ្នកអភិវឌ្ឍន៍របស់យើងធ្វើការជាមួយគ្នាជាអង្គភាពតែមួយ។ ការសហការណ៍ជិតស្និទ្ធនោះ មានន័យថាគ្មានចន្លោះ ការដឹកជញ្ជូនលឿននាំ និងផលិតផលចុងក្រោយដ៏ស្ងប់ស្ងួត។',
        'about.why.5.title':   'ឧត្តមភាពខ្ពស់',
        'about.why.5.desc':    'យើងរក្សាស្តង់ដារខ្ពស់បំផុតសម្រាប់រាល់ការផ្តល់ជូនមុននឹងឈានដល់អ្នក។ ដំណើរការពិនិត្យខាងក្នុងរបស់យើងកម្រ ដោយសារម៉ាករបស់អ្នកសមនឹងទទួលបានភាពល្អឥតខ្ចោះ។',
        'about.why.6.title':   'ការលូតលាស់យ៉ាងលឿន',
        'about.why.6.desc':    'យើងមិនមែននៅទីនេះដើម្បីធ្វើឱ្យអ្វីៗមើលទៅស្រស់ស្អាតតែប៉ុណ្ណោះ — យើងនៅទីនេះដើម្បីជំរុញការស្ថានភាព។ ស្នាដៃរបស់យើងត្រូវបានរចនាដើម្បីបង្កើតសក្ដានុពល សាងសង់ភាពស្មោះត្រង់ និងបំប៉នការលូតលាស់អាជីវកម្ម។',

        // ── FAQ ───────────────────────────────────────────────────
        'about.faq.heading1':  'ជំនួយ និង FAQ',
        'about.faq.heading2':  'មជ្ឈមណ្ឌល',
        'about.faq.desc':      'មានសំណួរអំពីការធ្វើការជាមួយយើង? យើងបានឆ្លើយសំណួរទូទៅបំផុតខាងក្រោម។ បើអ្នករកមិនឃើញអ្វីដែលស្វែងរក ក្រុមការងាររបស់យើងរីករាយនឹងជួបគ្នា ហើយពិភាក្សាពីតម្រូវការជាក់លាក់របស់អ្នក។',
        'about.faq.btn':       'ទំនាក់ទំនងយើង',
        'about.faq.1.q':  '១. តើភ្នាក់ងារឌីជីថលជាអ្វី?',
        'about.faq.1.a':  'ភ្នាក់ងារឌីជីថលគឺជាដៃគូច្នៃប្រឌិត និងយុទ្ធសាស្ត្រ ដែលជួយអាជីវកម្មបង្កើតវត្តមានរបស់ខ្លួននៅលើបណ្ដាញ និងក្រៅបណ្ដាញ។ យើងរួមបញ្ចូលការរចនា បច្ចេកវិទ្យា និងទីផ្សារ ដើម្បីបង្កើតបទពិសោធន៍ ដែលទាក់ទាញអតិថិជន ប្រាស្រ័យទំនាក់ទំនងតម្លៃម៉ាក និងជំរុញលទ្ធផលវាស់វែងបាន។',
        'about.faq.2.q':  '២. តើភ្នាក់ងារឌីជីថលផ្តល់សេវាអ្វីខ្លះ?',
        'about.faq.2.a':  'យើងផ្តល់ជូននូវសេវាកម្មច្នៃប្រឌិតពេញលេញ រួមមាន រចនាអត្តសញ្ញាណម៉ាក រចនា UI/UX រចនា និងអភិវឌ្ឍន៍គេហទំព័រ រចនា App ទូរស័ព្ទ ក្រាហ្វិកចល័ត ការបង្កើតខ្លឹមសារ និងយុទ្ធសាស្ត្រទីផ្សារឌីជីថល។',
        'about.faq.3.q':  '៣. តើភ្នាក់ងារឌីជីថលអាចផ្តល់អត្ថប្រយោជន៍ដល់អាជីវកម្មខ្ញុំដោយរបៀបណា?',
        'about.faq.3.a':  'ការធ្វើការជាមួយភ្នាក់ងារឌីជីថល ផ្តល់ឱ្យអ្នកនូវការចូលដំណើរការក្រុមអ្នកជំនាញ ដោយមិនចំណាយច្រើន។ យើងនាំមកនូវទស្សនៈស្រស់ ដំណើរការដែលបានបញ្ជាក់ និងបទពិសោធន៍ ដើម្បីជួយអ្នកធ្វើការសម្រេចចិត្តឆ្លាត ចូលដល់អតិថិជនបន្ថែម និងលូតលាស់លឿន។',
        'about.faq.4.q':  '៤. តើភ្នាក់ងារឌីជីថលដោះស្រាយគម្រោងថ្មីដោយរបៀបណា?',
        'about.faq.4.a':  'គម្រោងគ្រប់ប្រភេទចាប់ផ្តើមដោយសម័យប្រជុំស្វែងរកស៊ីជម្រៅ ដែលយើងស្វែងយល់អំពីម៉ាក គោលដៅ ទស្សនិកជន និងការប្រកួតប្រជែង។ ពីទីនោះ យើងអភិវឌ្ឍយុទ្ធសាស្ត្រ បង្ហាញគំនិតច្នៃប្រឌិត កែលម្អតាមការផ្ដល់យោបល់ ហើយបញ្ជូនទ្រព្យឧបករណ៍ចុងក្រោយ — ដោយមានចំណុចសម្គាល់ច្បាស់លាស់ ។',
        'about.faq.5.q':  '៥. តើតម្លៃសេវាភ្នាក់ងារឌីជីថលប៉ុន្មាន?',
        'about.faq.5.a':  'តម្លៃអាស្រ័យលើវិសាលភាព និងភាពស្មុគស្មាញនៃគម្រោងរបស់អ្នក។ យើងផ្តល់ជូននូវផែនការប្រចាំខែដ៏ច្បាស់លាស់ចំនួនបី — ប្រាក់ មាស និងប្លាទីន — ព្រមទាំងការសម្រង់ផ្ទាល់ខ្លួនសម្រាប់ការចូលរួមធំជាងនេះ។',
        'about.faq.6.q':  '៦. តើគម្រោងធម្មតាចំណាយពេលយូរប៉ុន្មាន?',
        'about.faq.6.a':  'ពេលវេលាប្រែប្រួលតាមប្រភេទគម្រោង។ អត្តសញ្ញាណម៉ាកជាធម្មតាចំណាយ ៣–៤ សប្តាហ៍ រចនាគេហទំព័រ ៤–៨ សប្តាហ៍ និងកញ្ចប់ម៉ាក និងបណ្ដាញពេញលេញ ៨–១២ សប្តាហ៍។',
        'about.faq.7.q':  '៧. តើអ្វីធ្វើឱ្យភ្នាក់ងារឌីជីថលល្អខុសពីអ្នកផ្សេង?',
        'about.faq.7.a':  'ភ្នាក់ងារល្អបំផុតរួមបញ្ចូលឧត្តមភាពច្នៃប្រឌិត ជាមួយការគិតជាយុទ្ធសាស្ត្រ និងការទំនាក់ទំនងច្បាស់លាស់។ យើងមិនត្រឹមតែធ្វើឱ្យអ្វីៗមើលទៅស្អាត — យើងធ្វើឱ្យប្រាកដថាពួកវាដំណើរការ។ ដំណើរការរបស់យើងគឺសហការ ស្តង់ដារខ្ពស់ ហើយយើងវាស់ជោគជ័យដោយផ្អែកលើផលប៉ះពាល់ពិតប្រាកដ។',
        'about.faq.8.q':  '៨. តើខ្ញុំអាចស្នើសុំជំនួយដោយរបៀបណា?',
        'about.faq.8.a':  'អ្នកអាចទំនាក់ទំនងក្រុមជំនួយរបស់យើងបានគ្រប់ពេលតាមអ៊ីមែល តាមផ្ទាំងអតិថិជន ឬដោយការកក់ការហៅទូរស័ព្ទពីផ្ទាំងគ្រប់គ្រងរបស់អ្នក។ អតិថិជនគ្រប់ផែនការមាស និងប្លាទីន ទទួលបានជំនួយអាទិភាព ២៤/៧ ជាមួយការឆ្លើយតបបានធានាក្នុងរយៈ ២ ម៉ោង។',
        'about.why.heading.highlight': 'ហេតុអ្វី',
        'about.why.heading.solid':     'ត្រូវ',
        'about.why.heading.outline':   'ជ្រើសរើសយើង',

        // ══════════════════════════════════════════════════════════
        // PROJECT PAGE
        // ══════════════════════════════════════════════════════════
        // ── Project Page — Hero
        'project.hero.title1':  'គម្រោង',
        'project.hero.title2':  'ពិសេស',
        'project.hero.desc':    'ការជ្រើសរើសស្នាដៃដ៏ល្អបំផុតរបស់យើង — រួមមានអត្តសញ្ញាណម៉ាក ការរចនាផលិតផលឌីជីថល បទពិសោធន៍គេហទំព័រ និងយុទ្ធនាការច្នៃប្រឌិតសម្រាប់ម៉ាកដ៏មហិច្ឆិតា។',
        'project.breadcrumb':   'គម្រោង',

        // ── Ticker
        'project.ticker':       'ស្នាដៃចុងក្រោយ',

        // ── Work Section
        'project.work.heading1': 'មើល',
        'project.work.heading2': 'ស្នាដៃរបស់យើង',
        'project.work.more':     'ស្នាដៃបន្ថែម',
        'project.work.hint':     'ចុចដើម្បីមើលព័ត៌មានលម្អិត',

        // ── Popup labels
        'project.popup.challenge':    'បញ្ហាប្រឈម',
        'project.popup.solution':     'ដំណោះស្រាយរបស់យើង',
        'project.popup.view':         'មើលគម្រោងផ្ទាល់',
        'project.popup.client':       'អតិថិជន',
        'project.popup.category':     'ប្រភេទ',
        'project.popup.year':         'ឆ្នាំ',
        'project.popup.deliverables': 'ការដឹកជញ្ជូន',

        // ── CTA
        'project.cta.heading1': 'មានគម្រោងមែនទេ?',
        'project.cta.heading2': 'តោះពិភាក្សា។',
        'project.cta.btn':      'ចាប់ផ្តើម',

        // ── Stats
        'project.stat.1.label': 'គម្រោងជោគជ័យ',
        'project.stat.2.label': 'អតិថិជនពេញចិត្ត',
        'project.stat.3.label': 'ភ្នាក់ងារសហការ',
        'project.stat.4.label': 'ប្រភេទសេវាកម្ម',
        'project.stat.5.label': 'រង្វាន់ទទួលបាន',

        // ── Works data
        'project.work.1.title':     'ការដឹកនាំសិល្បៈ',
        'project.work.1.tag':       'ការដឹកនាំសិល្បៈ',
        'project.work.1.desc':      'គម្រោងដឹកនាំសិល្បៈដ៏គ្រប់ជ្រុងសម្រាប់ម៉ាករបៀបរស់នៅប្រណីត — ពីការថតរូបយុទ្ធនាការ រចនាកែវ រហូតដល់ការដាក់ប្រើប្រាស់ឌីជីថល។',
        'project.work.1.challenge': 'អតិថិជនត្រូវការភាសារូបភាពដែលមានភាពស្អិតជ្រួន ហើយមានអារម្មណ៍ប្រណីតប៉ុន្តែអាចចូលទៅជិតបាន — ខុសពីសោភ័ណភាពប្រណីតធម្មតាដោយមិនបាត់បង់ភាពសសុភ័ណ។',
        'project.work.1.solution':  'យើងបានបង្កើតឆ្នូតពណ៌ស្ងប់ ដែលផ្គូផ្គងជាមួយអក្សរសាស្ត្រធំ និងការថតរូបជិតស្និទ្ធ។ រាល់ស៊ុមមានការដឹកនាំសិល្បៈ ដើម្បីឱ្យមានអារម្មណ៍ជាអត្ថបទ ប៉ុន្តែក្តៅ ហើយយុទ្ធនាការដំណើរការលើស ៣ ដង ពីកម្រិតឧស្សាហកម្ម។',

        'project.work.2.title':     'រចនាស្លាក',
        'project.work.2.tag':       'ម៉ាក',
        'project.work.2.desc':      'ប្រព័ន្ធស្លាក និងអត្តសញ្ញាណពេញលេញសម្រាប់ startup fintech — រចនាដើម្បីបញ្ជាក់ការទុកចិត្ត ភាពច្បាស់លាស់ និងការឈានទៅមុខក្នុងទីផ្សារដ៏មមាញឹក។',
        'project.work.2.challenge': 'ម៉ាក fintech តែងតែប្រើរូបភាពសាជីវកម្មត្រជាក់។ អតិថិជនចង់ឱ្យមានអារម្មណ៍ជិតស្និទ្ធជាមួយអ្នកជំនាញវ័យក្មេង ដោយមិនបោះបង់ភាពទំនឹក។',
        'project.work.2.solution':  'យើងបានបង្កើតស្លាកអក្សររូបទ្រង់ ដែលកសាងលើមុំថាមវន្ត — សំដៅលើចលនា និងការលូតលាស់។ ប្រព័ន្ធពណ៌ផ្គូផ្គងជើងនាវីជ្រៅជាមួយការបន្ថែម amber ដ៏រស់រវើក។',

        'project.work.3.title':     'អត្តសញ្ញាណម៉ាក',
        'project.work.3.tag':       'ម៉ាក',
        'project.work.3.desc':      'អត្តសញ្ញាណម៉ាកពេញលេញសម្រាប់ក្រុមហ៊ុនសុខភាព — ពីការដាក់ឈ្មោះ និងស្លាក រហូតដល់វេចខ្ចប់ វត្តមានគេហទំព័រ និងការណែនាំសំឡេងម៉ាក។',
        'project.work.3.challenge': 'ចន្លោះសុខភាពពោរពេញដោយពណ៌ Pastel ទន់ភ្លន់ និងរូបស្លឹកទូទៅ។ អតិថិជនចង់លេចធ្លោជាជម្រើសសម្រាប់ប្រណីត ដែលត្រូវបានគាំទ្រដោយវិទ្យាសាស្ត្រ។',
        'project.work.3.solution':  'យើងផ្តោតលើភាពច្បាស់លាស់ — ស្លាកអក្សរ sans-serif ស្អាត ឆ្នូតដ៏ប្រកាន់ខ្ជាប់នៃពណ៌ Off-white និងបៃតងព្រៃ ស្ទៅ ហើយការវេចខ្ចប់ដែលមានអារម្មណ៍ជាមន្ទីរពិសោធន៍ជាង Spa។',

        'project.work.4.title':     'រចនាផលិតផល',
        'project.work.4.tag':       'UX/UI',
        'project.work.4.desc':      'ការរចនា UI/UX សម្រាប់ dashboard SaaS ឧស្សាហកម្ម — សាងសង់ដើម្បីធ្វើឱ្យទិន្នន័យស្មុគស្មាញអាចអានបាន អាចធ្វើសកម្មភាពបាន ហើយស្អាតស្អំសម្រាប់វិស្វករ។',
        'project.work.4.challenge': 'អ្នកប្រើប្រាស់ត្រូវបានលន់លង់ដោយតារាងទិន្នន័យដ៏ក្រាស់ ហើយ interface ដ៏ច្របូកច្របល់។ ការរចនាមុនមានអេក្រង់ ៤០+ ដោយគ្មានឋានានុក្រមរូបភាពស្អៀក។',
        'project.work.4.solution':  'យើងបានស្ថាបនាស្ថាបត្យកម្មព័ត៌មានឡើងវិញ ដោយណែនាំប្រព័ន្ធកាតម៉ូឌុល មាត្រដ្ឋានប្រភេទច្បាស់លាស់ និងសូចនាករស្ថានភាពដែលបំពាក់ពណ៌។ ការធ្វើតេស្តអ្នកប្រើបានបង្ហាញការកាត់បន្ថយ ៦២% នៃពេលបញ្ចប់កិច្ចការ។',

        'project.work.5.title':     'រចនាគេហទំព័រ',
        'project.work.5.tag':       'Web Dev',
        'project.work.5.desc':      'ការរចនាគេហទំព័រឡើងវិញ ដែលផ្តោតលើការបំប្លែង សម្រាប់ក្រុមហ៊ុន B2B SaaS — តុល្យភាពរឿងផលិតផលជាមួយការអំពាវនាវឱ្យធ្វើសកម្មភាពច្បាស់លាស់នៅគ្រប់ឧបករណ៍។',
        'project.work.5.challenge': 'គេហទំព័រដែលមានស្រាប់មានអត្រា bounce ខ្ពស់ ហើយបទពិសោធន៍ទូរស័ព្ទខ្សោយ។ សំណើតម្លៃផលិតផលមិនច្បាស់ក្នុង scroll ដំបូង។',
        'project.work.5.solution':  'យើងបានរៀបរៀងរឿងទំព័រដើមឡើងវិញ ដើម្បីនាំមុខដោយលទ្ធផល មិនមែនមុខងារ។ hero ហ៊ាន ភស្ដុតាងសង្គមជីវ័ន្ត និងផ្នែកតម្លៃសម្រួល បានជំរុញការស្នើសុំ demo ឡើង ៣៨% ក្នុងខែដំបូង។',

        'project.work.6.title':     'រចនាក្រាហ្វិក',
        'project.work.6.tag':       'ក្រាហ្វិក',
        'project.work.6.desc':      'កញ្ចប់រចនាក្រាហ្វិកដ៏ទូលំទូលាយសម្រាប់សន្និសីទច្នៃប្រឌិត — គ្របដណ្តប់អត្តសញ្ញាណមើលឃើញ ឯកសារបោះពុម្ព ស្លាក និងទ្រព្យចល័ត។',
        'project.work.6.challenge': 'សន្និសីទត្រូវការអត្តសញ្ញាណមើលឃើញ ដែលអាចដំណើរការបានលើការប្រើប្រាស់ជាច្រើន — ពីស្លាកទ្រង់ទ្រាយធំ រហូតដល់ Instagram Stories — ដោយមិនបាត់បង់ផលប៉ះពាល់។',
        'project.work.6.solution':  'យើងបានបង្កើតប្រព័ន្ធម៉ូឌុលអាចបត់បែនបាន ពាក់ព័ន្ធនឹងក្រឡាចត្រង្គទ្រូងដ៏ហ៊ាន និងឆ្នូតពណ៌ពីរ ដ៏រស់រវើក។ ប្រព័ន្ធត្រូវបានរចនាដើម្បីធ្វើមាត្រដ្ឋាន ដូច្នេះក្រុមផលិតកម្មមានអាចបង្កើតទ្រព្យបានដោយគ្មានអ្នករចនា។',

        // ── Deliverables
        'deliverable.brand_campaign':    'យុទ្ធនាការម៉ាក',
        'deliverable.editorial_design':  'រចនាកែវ',
        'deliverable.social_media_kit':  'ឧបករណ៍សម្រាប់ Social Media',
        'deliverable.logo_system':       'ប្រព័ន្ធស្លាក',
        'deliverable.brand_guidelines':  'គោលការណ៍ម៉ាក',
        'deliverable.stationery_pack':   'កញ្ចប់ Stationery',
        'deliverable.logo_identity':     'ស្លាក និងអត្តសញ្ញាណ',
        'deliverable.packaging_design':  'រចនាវេចខ្ចប់',
        'deliverable.brand_voice_guide': 'មគ្គុទ្ទេសក៍សំឡេងម៉ាក',
        'deliverable.website_design':    'រចនាគេហទំព័រ',
        'deliverable.dashboard_ui':      'UI Dashboard',
        'deliverable.design_system':     'ប្រព័ន្ធរចនា',
        'deliverable.prototype_handoff': 'គំរូ និងការប្រគល់',
        'deliverable.full_website':      'រចនាគេហទំព័រពេញ',
        'deliverable.responsive_build':  'ការសាងសង់ Responsive',
        'deliverable.cms_integration':   'ការរួមបញ្ចូល CMS',
        'deliverable.event_identity':    'អត្តសញ្ញាណព្រឹត្តិការណ៍',
        'deliverable.print_collateral':  'ឯកសារបោះពុម្ព',
        'deliverable.motion_graphics':   'ក្រាហ្វិកចល័ត',
        'deliverable.signage_system':    'ប្រព័ន្ធស្លាក',


        // ══════════════════════════════════════════════════════════
        // CONTACT PAGE
        // ══════════════════════════════════════════════════════════
        'contact.hero.title1':  'ទំនាក់ទំនង',
        'contact.hero.title2':  'យើង',
        'contact.hero.desc':    'មានគម្រោងក្នុងគំនិត ឬគ្រាន់តែចង់ស្វាគមន៍? យើងរីករាយនឹងស្តាប់អ្នក។ បំពេញទម្រង់ខាងក្រោម ឬទំនាក់ទំនងតាមរយៈช្វីងណាមួយរបស់យើង។',
        'contact.breadcrumb':   'ទំនាក់ទំនង',

        // ── Ticker
        'contact.ticker':       'ទំនាក់ទំនង',

        // ── Stats
        'contact.stat.1.label': 'គម្រោងបានបញ្ចប់',
        'contact.stat.2.label': 'អតិថិជនពេញចិត្ត',
        'contact.stat.3.label': 'ដៃគូភ្នាក់ងារ',
        'contact.stat.4.label': 'សេវាដែលបានផ្តល់',
        'contact.stat.5.label': 'រង្វាន់ទទួលបាន',

        // ── Works (desc overrides for contact page)
        'contact.work.1.desc': 'គម្រោងដឹកនាំសិល្បៈដ៏គ្រប់ជ្រុងសម្រាប់ម៉ាករបៀបរស់នៅប្រណីត — ពីការថតរូបយុទ្ធនាការ រចនាកែវ រហូតដល់ការដាក់ប្រើប្រាស់ឌីជីថលនៅលើ web និង social។',
        'contact.work.4.desc': 'ការរចនា UI/UX សម្រាប់ dashboard SaaS ឧស្សាហកម្ម — សាងសង់ដើម្បីធ្វើឱ្យទិន្នន័យស្មុគស្មាញ អាចអាន អាចធ្វើសកម្មភាព ហើយស្អាតស្អំ សម្រាប់វិស្វករ និងអ្នកគ្រប់គ្រង។',
        'contact.work.6.desc': 'កញ្ចប់រចនាក្រាហ្វិកដ៏ទូលំទូលាយសម្រាប់សន្និសីទច្នៃប្រឌិត — គ្របដណ្តប់អត្តសញ្ញាណមើលឃើញ ឯកសារបោះពុម្ព ស្លាក និងទ្រព្យចល័តសម្រាប់ព្រឹត្តិការណ៍។',

        // ── FAQ
        'contact.faq.1.q': '១. តើភ្នាក់ងារឌីជីថលជាអ្វី?',
        'contact.faq.1.a': 'ភ្នាក់ងារឌីជីថលគឺជាដៃគូច្នៃប្រឌិត និងយុទ្ធសាស្ត្រ ដែលជួយអាជីវកម្មបង្កើតវត្តមានរបស់ខ្លួននៅលើបណ្ដាញ និងក្រៅបណ្ដាញ។ យើងរួមបញ្ចូលការរចនា បច្ចេកវិទ្យា និងទីផ្សារ ដើម្បីបង្កើតបទពិសោធន៍ ដែលទាក់ទាញអតិថិជន ប្រាស្រ័យទំនាក់ទំនងតម្លៃម៉ាក និងជំរុញលទ្ធផលវាស់វែងបាន។',

        'contact.faq.2.q': '២. តើភ្នាក់ងារឌីជីថលផ្តល់សេវាអ្វីខ្លះ?',
        'contact.faq.2.a': 'យើងផ្តល់ជូននូវសេវាកម្មច្នៃប្រឌិតពេញលេញ រួមមាន រចនាអត្តសញ្ញាណម៉ាក រចនា UI/UX រចនា និងអភិវឌ្ឍន៍គេហទំព័រ រចនា App ទូរស័ព្ទ ក្រាហ្វិកចល័ត ការបង្កើតខ្លឹមសារ និងយុទ្ធសាស្ត្រទីផ្សារឌីជីថល។ មិនថាអ្នកត្រូវការការផ្លាស់ប្តូរម៉ាកពេញលេញ ឬយុទ្ធនាការតែមួយ យើងមានរបស់អ្នក។',

        'contact.faq.3.q': '៣. តើភ្នាក់ងារឌីជីថលអាចផ្តល់អត្ថប្រយោជន៍ដល់អាជីវកម្មខ្ញុំដោយរបៀបណា?',
        'contact.faq.3.a': 'ការធ្វើការជាមួយភ្នាក់ងារឌីជីថល ផ្តល់ឱ្យអ្នកនូវការចូលដំណើរការក្រុមអ្នកជំនាញ ដោយមិនចំណាយច្រើន។ យើងនាំមកនូវទស្សនៈស្រស់ ដំណើរការដែលបានបញ្ជាក់ និងបទពិសោធន៍ ដើម្បីជួយអ្នកធ្វើការសម្រេចចិត្តឆ្លាត ចូលដល់អតិថិជនបន្ថែម និងលូតលាស់លឿន។',

        'contact.faq.4.q': '៤. តើភ្នាក់ងារឌីជីថលដោះស្រាយគម្រោងថ្មីដោយរបៀបណា?',
        'contact.faq.4.a': 'គម្រោងគ្រប់ប្រភេទចាប់ផ្តើមដោយសម័យប្រជុំស្វែងរកស៊ីជម្រៅ ដែលយើងស្វែងយល់អំពីម៉ាក គោលដៅ ទស្សនិកជន និងការប្រកួតប្រជែង។ ពីទីនោះ យើងអភិវឌ្ឍយុទ្ធសាស្ត្រ បង្ហាញគំនិតច្នៃប្រឌិត កែលម្អតាមការផ្ដល់យោបល់ ហើយបញ្ជូនទ្រព្យឧបករណ៍ចុងក្រោយ — ដោយមានចំណុចសម្គាល់ច្បាស់លាស់ និងការទំនាក់ទំនងបើកចំហពេញ។',

        'contact.faq.5.q': '៥. តើតម្លៃសេវាភ្នាក់ងារឌីជីថលប៉ុន្មាន?',
        'contact.faq.5.a': 'តម្លៃអាស្រ័យលើវិសាលភាព និងភាពស្មុគស្មាញនៃគម្រោងរបស់អ្នក។ យើងផ្តល់ជូននូវផែនការប្រចាំខែដ៏ច្បាស់លាស់ចំនួនបី — ប្រាក់ មាស និងប្លាទីន — ព្រមទាំងការសម្រង់ផ្ទាល់ខ្លួនសម្រាប់ការចូលរួមធំជាងនេះ។ យើងរីករាយនឹងពិភាក្សាពីថវិការបស់អ្នក ហើយស្វែងរកដំណោះស្រាយដែលសមស្របដោយមិនប្រកែកលើគុណភាព។',

        'contact.faq.6.q': '៦. តើគម្រោងធម្មតាចំណាយពេលយូរប៉ុន្មាន?',
        'contact.faq.6.a': 'ពេលវេលាប្រែប្រួលតាមប្រភេទគម្រោង។ អត្តសញ្ញាណម៉ាកជាធម្មតាចំណាយ ៣–៤ សប្តាហ៍ រចនាគេហទំព័រ ៤–៨ សប្តាហ៍ និងកញ្ចប់ម៉ាក និងបណ្ដាញពេញលេញ ៨–១២ សប្តាហ៍។ យើងតែងតែយល់ព្រមលើពេលវេលាជាមុន ហើយជូនដំណឹងអ្នកនៅគ្រប់ដំណាក់កាល ដូច្នេះគ្មានការភ្ញាក់ផ្អើលណាមួយ។',

        'contact.faq.7.q': '៧. តើអ្វីធ្វើឱ្យភ្នាក់ងារឌីជីថលល្អខុសពីអ្នកផ្សេង?',
        'contact.faq.7.a': 'ភ្នាក់ងារល្អបំផុតរួមបញ្ចូលឧត្តមភាពច្នៃប្រឌិត ជាមួយការគិតជាយុទ្ធសាស្ត្រ និងការទំនាក់ទំនងច្បាស់លាស់។ យើងមិនត្រឹមតែធ្វើឱ្យអ្វីៗមើលទៅស្អាត — យើងធ្វើឱ្យប្រាកដថាពួកវាដំណើរការ។ ដំណើរការរបស់យើងជាការសហការ ស្តង់ដាររបស់យើងខ្ពស់ ហើយយើងវាស់ស្ទង់ភាពជោគជ័យតាមផលប៉ះពាល់ជាក់ស្ដែងដែលស្នាដៃរបស់យើងមានចំពោះអាជីវកម្មរបស់អ្នក។',

        'contact.faq.8.q': '៨. តើខ្ញុំអាចស្នើសុំជំនួយដោយរបៀបណា?',
        'contact.faq.8.a': 'អ្នកអាចទំនាក់ទំនងក្រុមជំនួយរបស់យើងបានគ្រប់ពេលតាមអ៊ីមែល តាមផ្ទាំងអតិថិជន ឬដោយការកក់ការហៅទូរស័ព្ទពីផ្ទាំងគ្រប់គ្រងរបស់អ្នក។ អតិថិជនគ្រប់ផែនការមាស និងប្លាទីន ទទួលបានជំនួយអាទិភាព ២៤/៧ ជាមួយការឆ្លើយតបបានធានាក្នុងរយៈ ២ ម៉ោង នៅថ្ងៃធ្វើការ។',
        // ── Contact info labels
        'contact.info.address.label': 'អាសយដ្ឋានរបស់យើង',
        'contact.info.address.value': 'ផ្លូវ ២៧១ សង្កាត់ទឹកថ្លា\nខណ្ឌសែនសុខ ភ្នំពេញ កម្ពុជា',
        'contact.info.email.label':   'អ៊ីមែលរបស់យើង',
        'contact.info.phone.label':   'លេខទូរស័ព្ទ',
        'contact.info.hours.label':   'ម៉ោងធ្វើការ',
        'contact.info.hours.value':   'ច័ន្ទ – សុក្រ: ម៉ោង ៨:០០ – ១៨:០០ (ICT)\nសៅរ៍: ម៉ោង ៩:០០ – ១៣:០០',

        // ── Form
        'contact.form.heading':             'ទុកសាររបស់អ្នក',
        'contact.form.name.label':          'ឈ្មោះរបស់អ្នក',
        'contact.form.name.placeholder':    'សុខ ដារ៉ា',
        'contact.form.email.label':         'អ៊ីមែលរបស់អ្នក',
        'contact.form.email.placeholder':   'dara@example.com',
        'contact.form.subject.label':       'ប្រធានបទ',
        'contact.form.subject.placeholder': 'សំណួរអំពីគម្រោង',
        'contact.form.phone.label':         'ទូរស័ព្ទរបស់អ្នក',
        'contact.form.phone.placeholder':   '+៨៥៥ ១២ ...',
        'contact.form.message.label':       'សារ',
        'contact.form.message.placeholder': 'ប្រាប់យើងអំពីគម្រោងរបស់អ្នក — អ្វីដែលអ្នកត្រូវការ កាលកំណត់ និងថវិការបស់អ្នក...',
        'contact.form.submit':              'ផ្ញើសារ',

        // ── Success state
        'contact.form.success.title': 'សារបានផ្ញើ!',
        'contact.form.success.sub':   'យើងនឹងឆ្លើយតបក្នុងរយៈមួយថ្ងៃធ្វើការ។',

        // ── FAQ section
        'contact.faq.heading1': 'ជំនួយ និង FAQ',
        'contact.faq.heading2': 'មជ្ឈមណ្ឌល',
        'contact.faq.desc':     'មានសំណួរអំពីការធ្វើការជាមួយយើង? យើងបានឆ្លើយសំណួរទូទៅបំផុតខាងក្រោម។ បើអ្នកនៅតែត្រូវការជំនួយ ក្រុមការងាររបស់យើងនៅភ្នំពេញ រីករាយនឹងជួបគ្នា ហើយពិភាក្សាពីតម្រូវការជាក់លាក់របស់អ្នក។',
        'contact.faq.btn':      'ទំនាក់ទំនងយើង',
        'contact.faq.ticker':   'សំណួរញឹកញាប់',

        // ══════════════════════════════════════════════════════════
        // PRICING PAGE
        // ══════════════════════════════════════════════════════════
        'pricing.hero.title1':  'តម្លៃ',
        'pricing.hero.title2':  'ពិសេស',
        'pricing.hero.desc':    'តម្លៃសាមញ្ញ ច្បាស់លាស់ ដោយគ្មានថ្លៃលាក់កំបាំង។ ជ្រើសរើសផែនការដែលសមស្របនឹងគោលដៅ និងថវិការបស់អ្នក — ហើយកំណើនបានគ្រប់ពេលនៅពេលអាជីវកម្មរបស់អ្នករីកចម្រើន។',
        'pricing.breadcrumb':   'តម្លៃ',

        // ── Ticker
        'pricing.ticker':       'តម្លៃ និងផែនការ',
        'pricing.ticker.why':   'ហេតុអ្វីជ្រើសរើសយើង',

        // ── Pricing section
        'pricing.section.title1':    'តម្លៃ',
        'pricing.section.title2':    'ពិសេស និងផែនការ',
        'pricing.section.subtitle':  'ផែនការទាំងអស់រួមបញ្ចូលក្រុមច្នៃប្រឌិតដែលយកចិត្តទុកដាក់ ពេលវេលាច្បាស់លាស់ និងលទ្ធផលដែលអ្នកអាចវាស់ស្ទង់បាន។ គ្មានកិច្ចសន្យាចាក់សោ — បោះបង់ចោលបានគ្រប់ពេល។',
        'pricing.plan.period':       '/ខែ',
        'pricing.plan.select':       'ជ្រើសរើសផែនការ',

        // ── Plans
        'pricing.plan.silver.tier': 'ប្រាក់',
        'pricing.plan.silver.f1':   'រចនាអត្តសញ្ញាណម៉ាក',
        'pricing.plan.silver.f2':   'រចនាគេហទំព័ររហូតដល់ ៣ ទំព័រ',
        'pricing.plan.silver.f3':   'ឧបករណ៍ Social Media',
        'pricing.plan.silver.f4':   'ការកែតម្រូវ ២ ដំណាក់',
        'pricing.plan.silver.f5':   'ជំនួយតាមអ៊ីមែល',

        'pricing.plan.gold.tier':   'មាស',
        'pricing.plan.gold.f1':     'កញ្ចប់ម៉ាកពេញលេញ',
        'pricing.plan.gold.f2':     'រចនាគេហទំព័ររហូតដល់ ៨ ទំព័រ',
        'pricing.plan.gold.f3':     'ការសរសេរ និងខ្លឹមសារ',
        'pricing.plan.gold.f4':     'ការកែតម្រូវគ្មានដែន',
        'pricing.plan.gold.f5':     'ជំនួយអាទិភាព ២៤/៧',

        'pricing.plan.platinum.tier': 'ប្លាទីន',
        'pricing.plan.platinum.f1':   'ប្រព័ន្ធម៉ាកពេញលេញ',
        'pricing.plan.platinum.f2':   'ការអភិវឌ្ឍន៍គេហទំព័រផ្ទាល់ខ្លួន',
        'pricing.plan.platinum.f3':   'យុទ្ធសាស្ត្រខ្លឹមសារ',
        'pricing.plan.platinum.f4':   'អ្នករចនាឯកទេស',
        'pricing.plan.platinum.f5':   'ជំនួយអនឡាញពេញលេញ ២៤/៧',

        // ── Reviews
        'pricing.reviews.heading1': 'មតិអតិថិជន',
        'pricing.reviews.heading2': 'របស់យើង',
        'pricing.reviews.1.quote':  'ការធ្វើការជាមួយភ្នាក់ងារនេះបានផ្លាស់ប្តូរម៉ាករបស់យើងទាំងស្រុង។ ការយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត ការគិតច្នៃប្រឌិត និងសមត្ថភាពក្នុងការបកប្រែចក្ខុវិស័យរបស់យើងទៅជារូបភាពដ៏ស្រស់ស្អាត បានលើសពីការរំពឹងទុករបស់យើងទាំងអស់។',
        'pricing.reviews.2.quote':  'ចាប់ពីការពិគ្រោះយោបល់ដំបូងរហូតដល់ការដឹកជញ្ជូនចុងក្រោយ ដំណើរការមានភាពរលូន ច្បាស់លាស់ ហើយពិតជាគួរឱ្យរំភើប។ ពួកគេមិនត្រឹមតែរចនាប៉ុណ្ណោះ — ពួកគេដោះស្រាយបញ្ហាអាជីវកម្មពិតប្រាកដ ដោយការរចនាដ៏ល្អ។',
        'pricing.reviews.3.quote':  'ពិន្ទុការពេញចិត្តរបស់អ្នកប្រើប្រាស់ផលិតផលរបស់យើងបានលោតឡើង ៤០% បន្ទាប់ពីការរចនាឡើងវិញ។ ក្រុមការងារយល់ដឹងយ៉ាងស៊ីជម្រៅអំពីតម្រូវការអ្នកប្រើប្រាស់ ហើយបង្កើតបទពិសោធន៍ដែលមានអារម្មណ៍ស្ងប់ស្ងួត និងពិតជាគួរឱ្យចង់ប្រើ។',

        // ── Hero
        'team.hero.title1':    'ស្គាល់',
        'team.hero.title2':    'ក្រុមការងារ',
        'team.hero.desc':      'នៅពីក្រោយគម្រោងដ៏ល្អគ្រប់ប្រភេទ មានក្រុមការងារដ៏មានចំណង់ចំណូលចិត្ត។ ស្វែងយល់ពីអ្នករចនា អ្នកយុទ្ធសាស្ត្រ និងអ្នកច្នៃប្រឌិត ដែលនាំម៉ាករបស់អ្នកឱ្យរស់ — ពីគំនិតដំបូងរហូតដល់ការដឹកជញ្ជូនចុងក្រោយ។',
        'team.breadcrumb':     'ក្រុម',

        // ── Tickers
        'team.ticker.1':       'ក្រុមការងាររបស់យើង',
        'team.ticker.2':       'អ្វីដែលយើងធ្វើ',
        'team.ticker.3':       'សំណួរញឹកញាប់',

        // ── Team section heading
        'team.team.heading1':  'ស្គាល់',
        'team.team.heading2':  'ក្រុមជំនាញរបស់យើង',
        'team.team.sub':       'ក្រុមអ្នកជំនាញតូចមួយ ដែលយកចិត្តទុកដាក់ជ្រៅជ្រះ ផ្តោតលើការបង្កើត ការសហការ និងការផ្តល់ស្នាដៃដែលធ្វើឱ្យមានភាពខុសគ្នាពិតប្រាកដ។',

        // ── Hero
        'blog.hero.breadcrumb.blog':    'ប្លក់',
        'blog.hero.breadcrumb.current': 'រចនា',
        'blog.hero.title':              'តួនាទីនៃការរចនាក្នុងការបង្កើតបទពិសោធន៍ឌីជីថលដ៏មានផលប៉ះពាល់',
        'blog.hero.desc':               'ស្វែងយល់ពីការយល់ដឹង យុទ្ធសាស្ត្ររចនា និងគំនិតច្នៃប្រឌិត ដែលជួយអាជីវកម្មបង្កើតផលិតផលឌីជីថលកាន់តែប្រសើរ និងម៉ាកកាន់តែខ្លាំង។',

        // ── Ticker
        'blog.ticker':                  'ប្លក់ចុងក្រោយ',

        // ── Controls
        'blog.read_more':               'អានបន្ថែម',
        'blog.load_more':               'បន្ថែមទៀត',

        // ── Posts
        'blog.post.1.tag':     'រចនា',
        'blog.post.1.title':   'សារៈសំខាន់នៃការរចនាក្នុងគម្រោងរាល់ប្រភេទ',
        'blog.post.1.excerpt': 'ការរចនាដ៏ល្អជាងសោភ័ណ — វាកំណត់បទពិសោធន៍អ្នកប្រើ បង្កើតការទុកចិត្ត និងធ្វើឱ្យការទំនាក់ទំនងជាមួយផលិតផលឌីជីថលកាន់តែប្រសើរ។',

        'blog.post.2.tag':     'AI',
        'blog.post.2.title':   'តើបញ្ញាសិប្បនិម្មិតកំពុងផ្លាស់ប្តូរការរចនាទំនើបដោយរបៀបណា',
        'blog.post.2.excerpt': 'បញ្ញាសិប្បនិម្មិតកំពុងផ្លាស់ប្តូររបៀបដែលអ្នករចនាធ្វើការ ដោយស្វ័យប្រវត្តិកម្មភារកិច្ច និងបើកលំហូរការងារច្នៃប្រឌិតឆ្លាតជាងមុន។',

        'blog.post.3.tag':     'ផលិតផល',
        'blog.post.3.title':   'ការសាងសង់ប្រព័ន្ធរចនាសម្រាប់ផលិតផលឌីជីថលទំនើប',
        'blog.post.3.excerpt': 'ប្រព័ន្ធរចនាដ៏រឹងមាំជួយក្រុមការងារបង្កើតផលិតផលស្រប ចំនួន និងងាយប្រើប្រាស់នៅគ្រប់វេទិកា។',

        'blog.post.4.tag':     'គេហទំព័រ',
        'blog.post.4.title':   'ហេតុអ្វីការបង្កើតគំរូសំខាន់មុនការអភិវឌ្ឍន៍គេហទំព័រ',
        'blog.post.4.excerpt': 'ការបង្កើតគំរូជួយស្វែងរកបញ្ហាការប្រើប្រាស់ភ្លាមៗ ហើយធ្វើឱ្យដំណើរការអភិវឌ្ឍន៍ រលូនជាងមុន។',

        // ── Hero
        'singleblog.hero.breadcrumb.blog':    'ប្លក់',
        'singleblog.hero.breadcrumb.current': 'រចនា',
        'singleblog.hero.title':              'តួនាទីនៃការរចនាក្នុងការបង្កើតបទពិសោធន៍ឌីជីថលដ៏មានផលប៉ះពាល់',
        'singleblog.hero.meta.author':        'ដោយ Jane Smith',
        'singleblog.hero.meta.date':          '៧ មីនា ២០២៦',
        'singleblog.hero.meta.tag':           'រចនា',

        // ── Ticker
        'singleblog.ticker':                  'ការយល់ដឹងអំពីការរចនាពេញនិយម',

        // ── Article
        'singleblog.article.img_alt':         'សារៈសំខាន់នៃការរចនា',
        'singleblog.article.h2':              'ហេតុអ្វីការរចនាល្អជាងសោភ័ណ',
        'singleblog.article.p1':              'ការរចនាជាទូតស្ងាត់នៃម៉ាករបស់អ្នក។ វាកំណត់រូបភាពដែលអ្នកប្រើម្នាក់ៗមើលឃើញផលិតផលរបស់អ្នក ទំនាក់ទំនងសារ និងបង្កើតការទុកចិត្ត។',
        'singleblog.article.p2':              'ការរចនាប្រកបដោយប្រសិទ្ធភាពបញ្ចូលគ្នានូវមុខងារ និងភាពច្នៃប្រឌិត។ វាស្តីអំពីការយល់ដឹងអំពីឥរិយាបថអ្នកប្រើ ធ្វើឱ្យបទពិសោធន៍មានប្រសិទ្ធភាព និងធ្វើឱ្យចំណុចប្រទាក់ងាយស្រួលប្រើ។',
        'singleblog.article.p3':              'លើសពីរូបភាព ការរចនាប៉ះពាល់ដល់ការចូលរួម ការបំលែង និងការពេញចិត្តទូទៅ។ ការជ្រើសរើសពណ៌ ការសម្រេចចិត្តអក្សរ និងការរៀបចំទំព័រ មានគោលបំណងច្បាស់លាស់។',
        'singleblog.article.quote':           '"ការរចនាមិនត្រឹមតែជាទំរង់ ឬអារម្មណ៍ប៉ុណ្ណោះទេ។ ការរចនាគឺជារបៀបដែលវាដំណើរការ។" – Steve Jobs',
        'singleblog.article.p4':              'មិនថាជាគេហទំព័រ កម្មវិធី ឬយុទ្ធនាការឌីជីថល ការវិនិយោគលើការរចនាល្អ ធានាថាគំនិតរបស់អ្នកត្រូវបានទំនាក់ទំនងយ៉ាងច្បាស់ និងគួរឱ្យចងចាំ។',
        'singleblog.article.img1_alt':        'លំហូរការងាររចនា',
        'singleblog.article.img2_alt':        'កិច្ចសហការច្នៃប្រឌិត',
        'singleblog.article.p5':              'ដំណើរការរចនាដ៏ប្រុងប្រយ័ត្ន រួមមានការស្រាវជ្រាវ ការបង្កើតក្របខ័ណ្ឌ ការបង្កើតគំរូ និងការធ្វើម្ដងទៀត។ វាធានាថាផលិតផលចុងក្រោយមិនត្រឹមតែមើលទៅស្រស់ស្អាត ប៉ុន្តែអនុវត្តបានល្អ។',

        // ── Comment form
        'singleblog.comment.heading':         'ទុកមតិយោបល់',
        'singleblog.comment.note':            'អាសយដ្ឋានអ៊ីមែលរបស់អ្នកនឹងមិនត្រូវបានផ្សព្វផ្សាយ។',
        'singleblog.comment.note_required':   'វាលដែលត្រូវបំពេញត្រូវបានសម្គាល់ *',
        'singleblog.comment.label_body':      'មតិយោបល់ *',
        'singleblog.comment.placeholder_body':'សរសេរមតិយោបល់របស់អ្នកនៅទីនេះ...',
        'singleblog.comment.label_name':      'ឈ្មោះ *',
        'singleblog.comment.placeholder_name':'ឈ្មោះរបស់អ្នក',
        'singleblog.comment.label_email':     'អ៊ីមែល *',
        'singleblog.comment.label_website':   'គេហទំព័រ',
        'singleblog.comment.save_info':       'រក្សាទុកឈ្មោះ អ៊ីមែល និងគេហទំព័ររបស់ខ្ញុំក្នុងកម្មវិធីសម្រាប់ការបញ្ចូលមតិលើកក្រោយ។',
        'singleblog.comment.submit':          'បង្ហោះមតិ',

        // ── Sidebar
        'singleblog.sidebar.categories':      'ប្រភេទ',
        'singleblog.sidebar.recent':          'ប្លក់ចុងក្រោយ',
        'singleblog.sidebar.tags':            'ស្លាក',

        // ── Sidebar categories
        'singleblog.cat.design':    'រចនា',
        'singleblog.cat.creative':  'ច្នៃប្រឌិត',
        'singleblog.cat.project':   'គម្រោង',
        'singleblog.cat.website':   'គេហទំព័រ',
        'singleblog.cat.branding':  'ម៉ាក',
        'singleblog.cat.motion':    'ចលនា',

        // ── Sidebar tags
        'singleblog.tag.design':    'រចនា',
        'singleblog.tag.creative':  'ច្នៃប្រឌិត',
        'singleblog.tag.uiux':      'UI/UX',
        'singleblog.tag.branding':  'ម៉ាក',
        'singleblog.tag.motion':    'ចលនា',
        'singleblog.tag.digital':   'ឌីជីថល',
        'singleblog.tag.agency':    'ភ្នាក់ងារ',
        'singleblog.tag.prototype': 'គំរូ',
        'singleblog.tag.system':    'ប្រព័ន្ធ',
        'singleblog.tag.website2':  'គេហទំព័រ',

        // ── Related posts
        'singleblog.related.heading1': 'អត្ថបទ',
        'singleblog.related.heading2': 'ពាក់ព័ន្ធ',
        'singleblog.related.read_more':'អានបន្ថែម',

        'singleblog.related.1.tag':     'ច្នៃប្រឌិត',
        'singleblog.related.1.title':   'តើ AI កំពុងផ្លាស់ប្តូរការរចនាក្រាហ្វិកទំនើបដោយរបៀបណា',
        'singleblog.related.1.excerpt': 'ស្វែងយល់ពីរបៀបដែលឧបករណ៍បញ្ញាសិប្បនិម្មិតកំពុងបដិវឌ្ឍន៍ការរចនាក្រាហ្វិក ធ្វើឱ្យការច្នៃប្រឌិតលឿន និងប្រកបដោយប្រសិទ្ធភាព។',

        'singleblog.related.2.tag':     'គម្រោង',
        'singleblog.related.2.title':   'ប្រព័ន្ធរចនា: ការសាងសង់ភាពស្រប គ្នានៅទូទាំងផលិតផល',
        'singleblog.related.2.excerpt': 'រៀនពីសារៈសំខាន់នៃប្រព័ន្ធរចនា និងរបៀបដែលវាអាចជួយរក្សាភាពស្រប គ្នា បង្កើនល្បឿនអភិវឌ្ឍន៍ និងធ្វើឱ្យបទពិសោធន៍អ្នកប្រើប្រសើរ។',

        'singleblog.related.3.tag':     'គេហទំព័រ',
        'singleblog.related.3.title':   'ហេតុអ្វីការបង្កើតគំរូគួរជាជំហានដំបូងរបស់អ្នកក្នុងការរចនាគេហទំព័រ',
        'singleblog.related.3.excerpt': 'ការបង្កើតគំរូអនុញ្ញាតឱ្យអ្នកសាកល្បងគំនិត ធ្វើឱ្យការប្រើប្រាស់ប្រសើរ និងជៀសវាងកំហុសដ៏ថ្លៃ មុនពេលចាប់ផ្ដើមអភិវឌ្ឍន៍។',

        // ── Divider ticker
        'singleblog.divider': 'អត្ថបទពាក់ព័ន្ធ',



    },
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dp_lang') as Lang | null;
            if (saved === 'en' || saved === 'km') return saved;
        }
        return 'en';
    });

    const applyFont = (l: Lang) => {
        document.documentElement.lang = l === 'km' ? 'km' : 'en';
        document.documentElement.setAttribute('data-lang', l);
    };

    const setLang = (l: Lang) => {
        setLangState(l);
        if (typeof window !== 'undefined') {
            localStorage.setItem('dp_lang', l);
        }
        applyFont(l);
    };

    useEffect(() => {
        applyFont(lang);
    }, [lang]);

    const t = (key: string): string =>
        translations[lang][key] ?? translations['en'][key] ?? key;

    return (
        <LangContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LangContext.Provider>
    );
}
