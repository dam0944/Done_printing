import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { useState, useRef, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    quantity: string;
    deadline: string;
    budget: string;
    message: string;
    file: File | null;
}

interface FormErrors {
    [key: string]: string;
}

interface FAQ {
    q: string;
    a: string;
}

interface ContactInfo {
    icon: string;
    label: string;
    value: string;
    sub?: string;
    color: string;
    href?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const SERVICES_LIST = [
    'Offset Printing',
    'Large Format / Banners',
    'Packaging & Boxes',
    'Business Cards',
    'Brochures & Flyers',
    'Advertising Campaign',
    'Branding & Design',
    'Other / Not Sure',
];

const BUDGETS = [
    'Under $100',
    '$100 – $500',
    '$500 – $2,000',
    '$2,000 – $10,000',
    '$10,000+',
    'Not sure yet',
];

const CONTACT_INFO: ContactInfo[] = [
    {
        icon: 'bi-geo-alt-fill',
        label: 'Address',
        value: '#12, St. 271, Sangkat Phsar Doeum Thkov',
        sub: 'Khan Chamkarmon, Phnom Penh, Cambodia',
        color: '#00B4D8',
    },
    {
        icon: 'bi-telephone-fill',
        label: 'Phone',
        value: '+855 23 123 456',
        sub: 'Mon–Sat, 8am – 6pm',
        color: '#E91E8C',
        href: 'tel:+85523123456',
    },
    {
        icon: 'bi-envelope-fill',
        label: 'Email',
        value: 'hello@doneprinting.com.kh',
        sub: 'We reply within 2 hours',
        color: '#FFD600',
        href: 'mailto:hello@doneprinting.com.kh',
    },
    {
        icon: 'bi-clock-fill',
        label: 'Hours',
        value: 'Mon – Saturday: 8:00 AM – 6:00 PM',
        sub: 'Sunday: By appointment only',
        color: '#00B4D8',
    },
];

const FAQS: FAQ[] = [
    {
        q: 'How quickly can you turn around an order?',
        a: 'Standard orders are completed in 3–5 business days. We also offer 24-hour and 6-hour express services for urgent jobs — rush fees apply. Contact us with your deadline and we\'ll find a solution.',
    },
    {
        q: 'What file formats do you accept?',
        a: 'We accept PDF (preferred), AI, EPS, PSD, and INDD files. All files should be in CMYK colour mode, 300 DPI minimum, with 3mm bleed on all sides. We\'ll review your file and flag any issues before printing.',
    },
    {
        q: 'Do you offer design services?',
        a: 'Yes — our in-house creative team can design from scratch or adapt your existing brand assets. Just let us know in your quote request and we\'ll include design in the proposal.',
    },
    {
        q: 'Can I see a proof before you print?',
        a: 'Absolutely. We provide a digital PDF proof for every order before we begin production. For large or complex jobs, we can also provide a physical press proof on request.',
    },
    {
        q: 'Do you deliver, or is it pick-up only?',
        a: 'Both! We offer free delivery within Phnom Penh on orders over $150. For orders outside the city, we ship via trusted courier services. Delivery time and cost depends on your location.',
    },
    {
        q: 'How do I get a quote?',
        a: 'Fill in the quote request form on this page — the more detail you provide, the more accurate our quote will be. We\'ll respond within 2 business hours with a full breakdown and next steps.',
    },
];

const STEPS = [
    { num: '01', title: 'Submit Your Brief',  desc: 'Fill in the form with your project details — service, quantity, deadline, and any files.',      color: '#00B4D8' },
    { num: '02', title: 'We Review & Quote',  desc: 'Our team reviews your brief and sends back a detailed quote within 2 business hours.',             color: '#E91E8C' },
    { num: '03', title: 'Approve & Print',    desc: 'Approve your quote and proof, then we go to press — your order is ready on time, guaranteed.',     color: '#FFD600' },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '', email: '', phone: '', company: '',
        service: '', quantity: '', deadline: '', budget: '',
        message: '', file: null,
    });
    const [errors, setErrors]           = useState<FormErrors>({});
    const [submitted, setSubmitted]     = useState(false);
    const [submitting, setSubmitting]   = useState(false);
    const [openFaq, setOpenFaq]         = useState<number | null>(null);
    const fileInputRef                  = useRef<HTMLInputElement>(null);
    const formRef                       = useRef<HTMLFormElement>(null);

    const update = (field: keyof FormData, value: string | File | null) => {
        setFormData(p => ({ ...p, [field]: value }));
        if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n; });
    };

    const validate = (): boolean => {
        const e: FormErrors = {};
        if (!formData.name.trim())    e.name    = 'Your name is required.';
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                       e.email   = 'A valid email is required.';
        if (!formData.service)         e.service = 'Please select a service.';
        if (!formData.message.trim())  e.message = 'Tell us about your project.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            // Scroll to first error
            formRef.current?.querySelector('.field-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setSubmitting(true);
        // Simulate async submission
        await new Promise(r => setTimeout(r, 1400));
        setSubmitting(false);
        setSubmitted(true);
    };

    const inputClass = (field: keyof FormData) =>
        `cf-input ${errors[field] ? 'cf-input--err' : ''}`;

    return (
        <MainLayout>
            <Head title="Contact — Done Printing House & Advertising" />

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
                    --s4: #222222;
                    --silver: #C0C0C0;
                    --dim: #686868;
                }

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { background: var(--K) !important; color: #fff; }

                .contact-page {
                    font-family: 'Barlow', sans-serif;
                    background: var(--K);
                    overflow-x: hidden;
                }

                .wrap { max-width: 1300px; margin: 0 auto; padding: 0 40px; }

                .eyebrow {
                    display: inline-flex; align-items: center; gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 5px;
                    text-transform: uppercase; color: var(--M); margin-bottom: 14px;
                }
                .eyebrow::before {
                    content: ''; display: inline-block;
                    width: 22px; height: 2px; background: currentColor;
                }
                .sec-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(40px, 5.5vw, 72px);
                    line-height: .92; color: white;
                }
                .sec-title em {
                    font-style: normal;
                    background: linear-gradient(135deg, var(--C), var(--M));
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* ══════════════════════════════════════
                   HERO
                ══════════════════════════════════════ */
                .ct-hero {
                    position: relative;
                    padding: 160px 0 120px;
                    background: var(--K);
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255,255,255,.05);
                }
                .ct-hero-grid {
                    position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
                    background-size: 64px 64px; pointer-events: none;
                }
                .ct-hero-gl {
                    position: absolute; left: -200px; top: 0;
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(255,214,0,.1) 0%, transparent 65%);
                    pointer-events: none;
                }
                .ct-hero-gr {
                    position: absolute; right: -100px; bottom: -80px;
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(233,30,140,.12) 0%, transparent 65%);
                    pointer-events: none;
                }
                .ct-hero-bg {
                    position: absolute; right: -20px; top: 50%;
                    transform: translateY(-50%);
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(120px, 19vw, 260px);
                    color: rgba(255,255,255,.022);
                    white-space: nowrap; pointer-events: none; user-select: none;
                    letter-spacing: 10px; line-height: 1;
                }
                /* Diagonal slice */
                .ct-hero-slice {
                    position: absolute; bottom: -2px; left: 0; right: 0; height: 100px;
                    background: var(--K);
                    clip-path: polygon(0 65%, 100% 0, 100% 100%, 0 100%);
                    pointer-events: none; z-index: 3;
                }

                .ct-hero-inner {
                    position: relative; z-index: 2;
                    display: flex; align-items: flex-end;
                    justify-content: space-between; gap: 40px; flex-wrap: wrap;
                }

                .ct-hero-tag {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: rgba(255,214,0,.07); border: 1px solid rgba(255,214,0,.22);
                    padding: 6px 16px;
                    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
                    margin-bottom: 28px;
                    opacity: 0; transform: translateY(16px);
                    animation: up .6s .1s forwards;
                }
                .ct-hero-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--Y); animation: pulse 2s infinite; }
                .ct-hero-tag-txt {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 4px;
                    text-transform: uppercase; color: var(--Y);
                }

                .ct-hero-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(64px, 10vw, 148px);
                    line-height: .87; letter-spacing: 3px;
                    opacity: 0; transform: translateY(30px);
                    animation: up .9s .25s forwards;
                }
                .ct-ht1 {
                    display: block;
                    background: linear-gradient(135deg, #fff 0%, #bbb 70%, #888 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                }
                .ct-ht2 {
                    display: block;
                    background: linear-gradient(135deg, var(--Y) 0%, var(--M) 60%, var(--C) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
                    filter: drop-shadow(0 0 40px rgba(255,214,0,.3));
                }

                .ct-hero-sub {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: clamp(15px, 2vw, 20px); letter-spacing: 1.5px; line-height: 1.65;
                    color: var(--dim); max-width: 480px; margin-top: 16px;
                    opacity: 0; transform: translateY(18px);
                    animation: up .8s .45s forwards;
                }

                /* Response promise card */
                .ct-hero-promise {
                    flex-shrink: 0;
                    opacity: 0; transform: translateY(18px);
                    animation: up .8s .6s forwards;
                }
                .promise-card {
                    background: var(--s1);
                    border: 1px solid rgba(255,255,255,.07);
                    padding: 28px 32px;
                    min-width: 240px;
                    position: relative; overflow: hidden;
                }
                .promise-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    background: linear-gradient(90deg, var(--Y), var(--M), var(--C));
                }
                .promise-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: #3a3a3a;
                    margin-bottom: 18px;
                }
                .promise-items { display: flex; flex-direction: column; gap: 14px; }
                .promise-item {
                    display: flex; align-items: flex-start; gap: 12px;
                }
                .promise-check {
                    width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 9px; font-weight: 900; color: #000; margin-top: 1px;
                }
                .promise-text {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 14px; letter-spacing: 1px; color: var(--dim); line-height: 1.3;
                }
                .promise-text strong { color: white; display: block; }

                /* CMYK bar */
                .cmyk-bar { display: flex; height: 4px; }
                .cmyk-bar span { flex: 1; }

                /* ══════════════════════════════════════
                   HOW IT WORKS
                ══════════════════════════════════════ */
                .how-sec {
                    padding: 80px 0 88px;
                    background: var(--s1);
                    border-bottom: 1px solid rgba(255,255,255,.04);
                }
                .how-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 3px;
                    margin-top: 44px;
                }
                .how-card {
                    padding: 40px 36px;
                    background: var(--s2);
                    position: relative; overflow: hidden;
                    transition: background .3s, transform .35s;
                    cursor: default;
                }
                .how-card:hover { background: var(--s3); transform: translateY(-4px); }
                .how-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
                    transform: scaleX(0); transform-origin: left;
                    transition: transform .4s cubic-bezier(.16,1,.3,1);
                }
                .how-card:hover::before { transform: scaleX(1); }
                .how-num {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 4px;
                    text-transform: uppercase; margin-bottom: 16px;
                    display: flex; align-items: center; gap: 8px;
                }
                .how-num::before { content: ''; width: 18px; height: 2px; background: currentColor; display: inline-block; }
                .how-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 34px; letter-spacing: 2px; color: white;
                    margin-bottom: 12px; line-height: 1;
                }
                .how-desc { font-size: 14px; line-height: 1.75; color: var(--dim); }

                /* Connector arrow */
                .how-card:not(:last-child)::after {
                    content: '→'; position: absolute;
                    right: -14px; top: 44px;
                    font-size: 18px; color: rgba(255,255,255,.1); z-index: 3;
                }

                /* ══════════════════════════════════════
                   MAIN SECTION — Form + Info
                ══════════════════════════════════════ */
                .main-sec {
                    padding: 100px 0 110px;
                    background: var(--K);
                }
                .main-layout {
                    display: grid;
                    grid-template-columns: 1fr 420px;
                    gap: 60px;
                    align-items: start;
                }

                /* ── QUOTE FORM ── */
                .form-panel {
                    background: var(--s1);
                    position: relative; overflow: hidden;
                }
                .form-panel-top {
                    height: 4px;
                    background: linear-gradient(90deg, var(--C), var(--M), var(--Y));
                }
                .form-panel-body { padding: 52px 56px; }

                .form-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(32px, 4vw, 52px); letter-spacing: 2px;
                    line-height: .95; color: white; margin-bottom: 8px;
                }
                .form-sub {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 14px; letter-spacing: 1px; color: var(--dim);
                    margin-bottom: 40px;
                }

                .cf-section-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 10px; letter-spacing: 4px;
                    text-transform: uppercase; color: #3a3a3a;
                    margin: 28px 0 16px;
                    display: flex; align-items: center; gap: 12px;
                }
                .cf-section-label::after {
                    content: ''; flex: 1; height: 1px; background: rgba(255,255,255,.05);
                }

                .cf-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                    margin-bottom: 14px;
                }
                .cf-col { display: flex; flex-direction: column; gap: 6px; }
                .cf-col--full { grid-column: span 2; }

                .cf-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 3px;
                    text-transform: uppercase; color: #444;
                    display: flex; align-items: center; gap: 6px;
                }
                .cf-label-req { color: var(--M); }

                .cf-input, .cf-select, .cf-textarea {
                    width: 100%;
                    background: var(--s2);
                    border: 1px solid rgba(255,255,255,.08);
                    color: white;
                    font-family: 'Barlow', sans-serif;
                    font-size: 15px;
                    padding: 13px 16px;
                    outline: none;
                    transition: border-color .25s, background .25s;
                    border-radius: 0;
                    appearance: none;
                    -webkit-appearance: none;
                }
                .cf-input::placeholder, .cf-textarea::placeholder { color: #2e2e2e; }
                .cf-input:focus, .cf-select:focus, .cf-textarea:focus {
                    border-color: var(--C); background: var(--s3);
                }
                .cf-input--err, .cf-select--err, .cf-textarea--err {
                    border-color: var(--M) !important;
                    background: rgba(233,30,140,.04) !important;
                }
                .cf-select {
                    cursor: pointer;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23555' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 14px center;
                    padding-right: 38px;
                }
                .cf-select option { background: #1a1a1a; color: white; }
                .cf-textarea { resize: vertical; min-height: 130px; line-height: 1.6; }

                .field-error {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 11px; letter-spacing: 1.5px; color: var(--M);
                    margin-top: 4px;
                }

                /* File upload */
                .cf-file-area {
                    border: 1px dashed rgba(255,255,255,.1);
                    padding: 24px;
                    text-align: center;
                    cursor: pointer;
                    transition: border-color .25s, background .25s;
                    background: var(--s2);
                }
                .cf-file-area:hover { border-color: var(--C); background: rgba(0,180,216,.04); }
                .cf-file-area.has-file { border-color: var(--C); border-style: solid; }
                .cf-file-icon { font-size: 28px; margin-bottom: 8px; display: block; }
                .cf-file-txt {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 13px; letter-spacing: 1.5px; color: var(--dim);
                }
                .cf-file-name {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 13px; letter-spacing: 1px; color: var(--C);
                    margin-top: 6px;
                }
                .cf-file-hint {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
                    color: #333; margin-top: 8px;
                }

                /* Submit button */
                .cf-submit {
                    position: relative;
                    display: inline-flex; align-items: center; gap: 12px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 15px; letter-spacing: 3px;
                    text-transform: uppercase; color: #000;
                    padding: 18px 52px;
                    background: linear-gradient(135deg, var(--C), var(--M));
                    clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
                    border: none; cursor: pointer;
                    transition: transform .3s, box-shadow .3s;
                    overflow: hidden; margin-top: 32px; width: 100%;
                    justify-content: center;
                }
                .cf-submit::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(135deg, var(--M), var(--Y));
                    opacity: 0; transition: opacity .3s;
                }
                .cf-submit > * { position: relative; z-index: 1; }
                .cf-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(233,30,140,.5); }
                .cf-submit:hover:not(:disabled)::after { opacity: 1; }
                .cf-submit:disabled { opacity: .6; cursor: not-allowed; }

                /* Spinner */
                .spinner {
                    width: 16px; height: 16px; border-radius: 50%;
                    border: 2px solid rgba(0,0,0,.3);
                    border-top-color: #000;
                    animation: spin .7s linear infinite;
                }

                /* Success */
                .form-success {
                    text-align: center;
                    padding: 80px 40px;
                }
                .form-success-icon { font-size: 64px; margin-bottom: 24px; display: block; }
                .form-success-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 56px; letter-spacing: 2px; color: white; margin-bottom: 12px;
                }
                .form-success-sub {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 18px; letter-spacing: 1px; color: var(--dim); line-height: 1.65;
                    margin-bottom: 32px;
                }
                .form-success-note {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: rgba(0,180,216,.08); border: 1px solid rgba(0,180,216,.2);
                    padding: 10px 20px; font-family: 'Barlow Condensed', sans-serif;
                    font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--C);
                }

                /* ── RIGHT SIDEBAR ── */
                .info-panel { display: flex; flex-direction: column; gap: 3px; }

                .info-card {
                    padding: 32px 28px;
                    background: var(--s1);
                    transition: background .3s;
                    position: relative; overflow: hidden;
                }
                .info-card:hover { background: var(--s2); }
                .info-card::before {
                    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
                    transform: scaleY(0); transform-origin: top;
                    transition: transform .4s cubic-bezier(.16,1,.3,1);
                }
                .info-card:hover::before { transform: scaleY(1); }

                .info-icon {
                    font-size: 22px; margin-bottom: 14px; display: block;
                }
                .info-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 10px; letter-spacing: 3.5px;
                    text-transform: uppercase; color: #333; margin-bottom: 8px;
                }
                .info-value {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 16px; letter-spacing: .5px;
                    color: white; line-height: 1.3; text-decoration: none;
                    display: block; transition: color .2s;
                }
                a.info-value:hover { color: var(--C); }
                .info-sub {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 12px; letter-spacing: 1.5px; color: #3a3a3a;
                    margin-top: 4px;
                }

                /* Social links card */
                .social-card {
                    padding: 28px 28px;
                    background: var(--s1);
                }
                .social-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 10px; letter-spacing: 3.5px;
                    text-transform: uppercase; color: #333; margin-bottom: 16px;
                }
                .social-links { display: flex; gap: 8px; flex-wrap: wrap; }
                .social-btn {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 11px; letter-spacing: 2px;
                    text-transform: uppercase; text-decoration: none; color: var(--dim);
                    padding: 8px 16px; border: 1px solid rgba(255,255,255,.08);
                    transition: all .25s;
                    clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
                }
                .social-btn:hover { color: white; border-color: var(--C); background: rgba(0,180,216,.07); }

                /* Map placeholder */
                .map-card {
                    position: relative; overflow: hidden;
                    background: var(--s2); min-height: 200px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                }
                .map-bg {
                    position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(0,180,216,.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,180,216,.08) 1px, transparent 1px);
                    background-size: 24px 24px;
                }
                .map-pin {
                    position: relative; z-index: 2;
                    text-align: center;
                }
                .map-pin-icon { font-size: 40px; display: block; margin-bottom: 8px; animation: bounce 2s ease-in-out infinite; }
                .map-pin-txt {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 12px; letter-spacing: 3px;
                    text-transform: uppercase; color: var(--C);
                }
                .map-card::after {
                    content: 'View on Google Maps →';
                    position: absolute; bottom: 0; left: 0; right: 0;
                    background: rgba(0,180,216,.08); padding: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
                    text-align: center; color: var(--C);
                    transform: translateY(100%);
                    transition: transform .3s ease;
                }
                .map-card:hover::after { transform: translateY(0); }

                /* ══════════════════════════════════════
                   FAQ
                ══════════════════════════════════════ */
                .faq-sec {
                    padding: 100px 0 110px;
                    background: var(--s1);
                    border-top: 1px solid rgba(255,255,255,.04);
                }
                .faq-layout {
                    display: grid;
                    grid-template-columns: 380px 1fr;
                    gap: 72px;
                    align-items: start;
                }
                .faq-left {}
                .faq-left-sub {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 16px; letter-spacing: 1px; color: var(--dim);
                    line-height: 1.65; margin-top: 16px; margin-bottom: 32px;
                }
                .faq-contact-link {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 13px; letter-spacing: 3px;
                    text-transform: uppercase; color: var(--M); text-decoration: none;
                    display: inline-flex; align-items: center; gap: 8px;
                    transition: gap .2s;
                }
                .faq-contact-link:hover { gap: 14px; }

                .faq-list { display: flex; flex-direction: column; gap: 2px; }
                .faq-item {
                    background: var(--s2);
                    overflow: hidden;
                    transition: background .25s;
                }
                .faq-item.open { background: var(--s3); }
                .faq-btn {
                    width: 100%; text-align: left; background: none; border: none;
                    padding: 22px 28px;
                    display: flex; align-items: flex-start; justify-content: space-between; gap: 20px;
                    cursor: pointer; transition: background .2s;
                }
                .faq-btn:hover { background: rgba(255,255,255,.03); }
                .faq-q {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 16px; letter-spacing: .5px;
                    color: white; line-height: 1.35; flex: 1;
                    transition: color .25s;
                }
                .faq-item.open .faq-q { color: var(--C); }
                .faq-icon {
                    width: 22px; height: 22px; border-radius: 50%;
                    border: 1px solid rgba(255,255,255,.15);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 12px; color: var(--dim); flex-shrink: 0;
                    transition: all .25s; margin-top: 2px;
                }
                .faq-item.open .faq-icon {
                    background: var(--C); border-color: var(--C); color: #000; transform: rotate(45deg);
                }
                .faq-a-wrap {
                    max-height: 0; overflow: hidden;
                    transition: max-height .4s cubic-bezier(.16,1,.3,1);
                }
                .faq-item.open .faq-a-wrap { max-height: 300px; }
                .faq-a {
                    padding: 0 28px 22px;
                    font-size: 14px; line-height: 1.8; color: var(--dim);
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
                    background: radial-gradient(ellipse, rgba(255,214,0,.08) 0%, transparent 70%);
                    pointer-events: none;
                }
                .cta-bg {
                    position: absolute; top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(100px, 20vw, 280px);
                    color: rgba(255,255,255,.018);
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
                    line-height: .9; color: white; margin-bottom: 22px;
                }
                .cta-accent {
                    display: block;
                    background: linear-gradient(135deg, var(--Y) 0%, var(--M) 50%, var(--C) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .cta-desc {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: clamp(16px, 2vw, 20px); letter-spacing: 1px;
                    color: var(--dim); margin-bottom: 16px; line-height: 1.65;
                }
                .cta-phone {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(28px, 4vw, 48px); letter-spacing: 3px;
                    color: var(--Y); text-decoration: none;
                    display: inline-block; margin-bottom: 40px;
                    transition: filter .25s;
                }
                .cta-phone:hover { filter: brightness(1.2); }
                .cta-hours {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #2e2e2e;
                    margin-bottom: 44px;
                }
                .cta-divider {
                    height: 1px; background: rgba(255,255,255,.05);
                    margin: 0 auto 44px; max-width: 200px;
                }
                .btn-p {
                    position: relative; display: inline-flex; align-items: center; gap: 10px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-weight: 700; font-size: 15px; letter-spacing: 3px;
                    text-transform: uppercase; text-decoration: none; color: #000;
                    padding: 18px 52px;
                    background: linear-gradient(135deg, var(--C), var(--M));
                    clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
                    transition: transform .3s, box-shadow .3s;
                    overflow: hidden; white-space: nowrap;
                }
                .btn-p::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(135deg, var(--M), var(--Y));
                    opacity: 0; transition: opacity .3s;
                }
                .btn-p > * { position: relative; z-index: 1; }
                .btn-p:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(233,30,140,.5); }
                .btn-p:hover::after { opacity: 1; }

                /* ══════════════════════════════════════
                   KEYFRAMES
                ══════════════════════════════════════ */
                @keyframes up {
                    to { opacity: 1; transform: translate(0,0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%       { opacity: .4; transform: scale(.8); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50%       { transform: translateY(-8px); }
                }

                /* ══════════════════════════════════════
                   RESPONSIVE
                ══════════════════════════════════════ */
                @media (max-width: 1100px) {
                    .main-layout { grid-template-columns: 1fr; }
                    .info-panel { grid-row: 1; }
                    .faq-layout { grid-template-columns: 1fr; gap: 48px; }
                }

                @media (max-width: 768px) {
                    .wrap { padding: 0 22px; }
                    .ct-hero { padding: 130px 0 80px; }
                    .ct-hero-inner { flex-direction: column; align-items: flex-start; }
                    .form-panel-body { padding: 36px 28px; }
                    .cf-row { grid-template-columns: 1fr; }
                    .cf-col--full { grid-column: span 1; }
                    .how-grid { grid-template-columns: 1fr 1fr; }
                    .how-card:nth-child(2)::after { display: none; }
                    .main-sec, .faq-sec, .cta-sec { padding: 80px 0 88px; }
                }

                @media (max-width: 500px) {
                    .how-grid { grid-template-columns: 1fr; }
                    .how-card:not(:last-child)::after { display: none; }
                    .cf-submit { clip-path: none; }
                }
            `}</style>

            <div className="contact-page">

                {/* ══ HERO ══ */}
                <section className="ct-hero">
                    <div className="ct-hero-grid" aria-hidden="true" />
                    <div className="ct-hero-gl"   aria-hidden="true" />
                    <div className="ct-hero-gr"   aria-hidden="true" />
                    <div className="ct-hero-bg"   aria-hidden="true">CONTACT</div>

                    <div className="wrap ct-hero-inner">
                        <div>
                            <div className="ct-hero-tag">
                                <div className="ct-hero-tag-dot" />
                                <span className="ct-hero-tag-txt">Get in Touch — We Reply Within 2 Hours</span>
                            </div>
                            <h1 className="ct-hero-title">
                                <span className="ct-ht1">Let's</span>
                                <span className="ct-ht2">Talk.</span>
                            </h1>
                            <p className="ct-hero-sub">
                                Have a project in mind? Need a quote? Want to visit the press?
                                We're here and ready to help — every day of the week.
                            </p>
                        </div>

                        {/* Promise card */}
                        <div className="ct-hero-promise">
                            <div className="promise-card">
                                <div className="promise-label">Our Guarantee</div>
                                <div className="promise-items">
                                    {[
                                        { color: '#00B4D8', strong: '2-Hour Response', text: 'to all quote requests' },
                                        { color: '#E91E8C', strong: 'Free Consultation', text: 'for every new project' },
                                        { color: '#FFD600', strong: 'No Hidden Fees',   text: 'transparent pricing always' },
                                    ].map(p => (
                                        <div key={p.strong} className="promise-item">
                                            <div className="promise-check" style={{ background: p.color }}>✓</div>
                                            <div className="promise-text">
                                                <strong>{p.strong}</strong>
                                                {p.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ct-hero-slice" aria-hidden="true" />
                </section>

                {/* CMYK bar */}
                <div className="cmyk-bar" aria-hidden="true">
                    <span style={{ background: '#00B4D8' }} />
                    <span style={{ background: '#E91E8C' }} />
                    <span style={{ background: '#FFD600' }} />
                    <span style={{ background: '#1c1c1c' }} />
                </div>

                {/* ══ HOW IT WORKS ══ */}
                <section className="how-sec" aria-label="How our process works">
                    <div className="wrap">
                        <div className="eyebrow">Simple Process</div>
                        <h2 className="sec-title">3 Steps to <em>Your Print</em></h2>
                        <div className="how-grid">
                            {STEPS.map((s, i) => (
                                <div key={s.num} className="how-card">
                                    <style>{`.how-card:nth-child(${i + 1})::before { background: ${s.color}; }`}</style>
                                    <div className="how-num" style={{ color: s.color }}>{s.num}</div>
                                    <div className="how-title">{s.title}</div>
                                    <p className="how-desc">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ MAIN — Form + Info ══ */}
                <section className="main-sec" aria-label="Contact form and information">
                    <div className="wrap">
                        <div className="main-layout">

                            {/* ── QUOTE FORM ── */}
                            <div className="form-panel">
                                <div className="form-panel-top" />
                                <div className="form-panel-body">
                                    {submitted ? (
                                        /* Success State */
                                        <div className="form-success">
                                                <span className="form-success-icon"><i className="bi bi-check-circle-fill" style={{ color: '#00B4D8' }} /></span>
                                            <div className="form-success-title">Request Sent!</div>
                                            <p className="form-success-sub">
                                                Thank you! Your quote request has been received.
                                                Our team will review your brief and get back to
                                                you within <strong style={{ color: 'var(--C)' }}>2 business hours</strong>.
                                            </p>
                                            <div className="form-success-note">
                                                <i className="bi bi-envelope-fill" /> Check your inbox for a confirmation email
                                            </div>
                                        </div>
                                    ) : (
                                        /* Form */
                                        <>
                                            <div className="form-title">Request a Quote</div>
                                            <p className="form-sub">
                                                Fill in your project details and we'll send back a detailed quote. Fields marked <span style={{ color: 'var(--M)' }}>*</span> are required.
                                            </p>

                                            <form ref={formRef} onSubmit={handleSubmit} noValidate>

                                                {/* Contact Details */}
                                                <div className="cf-section-label">Contact Details</div>
                                                <div className="cf-row">
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-name">
                                                            Name <span className="cf-label-req">*</span>
                                                        </label>
                                                        <input
                                                            id="cf-name"
                                                            type="text"
                                                            className={inputClass('name')}
                                                            placeholder="Your full name"
                                                            value={formData.name}
                                                            onChange={e => update('name', e.target.value)}
                                                            autoComplete="name"
                                                        />
                                                        {errors.name && <span className="field-error">{errors.name}</span>}
                                                    </div>
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-email">
                                                            Email <span className="cf-label-req">*</span>
                                                        </label>
                                                        <input
                                                            id="cf-email"
                                                            type="email"
                                                            className={inputClass('email')}
                                                            placeholder="your@email.com"
                                                            value={formData.email}
                                                            onChange={e => update('email', e.target.value)}
                                                            autoComplete="email"
                                                        />
                                                        {errors.email && <span className="field-error">{errors.email}</span>}
                                                    </div>
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-phone">Phone</label>
                                                        <input
                                                            id="cf-phone"
                                                            type="tel"
                                                            className={inputClass('phone')}
                                                            placeholder="+855 XX XXX XXX"
                                                            value={formData.phone}
                                                            onChange={e => update('phone', e.target.value)}
                                                            autoComplete="tel"
                                                        />
                                                    </div>
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-company">Company</label>
                                                        <input
                                                            id="cf-company"
                                                            type="text"
                                                            className={inputClass('company')}
                                                            placeholder="Your company name"
                                                            value={formData.company}
                                                            onChange={e => update('company', e.target.value)}
                                                            autoComplete="organization"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Project Details */}
                                                <div className="cf-section-label">Project Details</div>
                                                <div className="cf-row">
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-service">
                                                            Service <span className="cf-label-req">*</span>
                                                        </label>
                                                        <select
                                                            id="cf-service"
                                                            className={`cf-select ${errors.service ? 'cf-select--err' : ''}`}
                                                            value={formData.service}
                                                            onChange={e => update('service', e.target.value)}
                                                        >
                                                            <option value="">Select a service…</option>
                                                            {SERVICES_LIST.map(s => (
                                                                <option key={s} value={s}>{s}</option>
                                                            ))}
                                                        </select>
                                                        {errors.service && <span className="field-error">{errors.service}</span>}
                                                    </div>
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-quantity">Quantity</label>
                                                        <input
                                                            id="cf-quantity"
                                                            type="text"
                                                            className={inputClass('quantity')}
                                                            placeholder="e.g. 500 copies, 3×5m banner"
                                                            value={formData.quantity}
                                                            onChange={e => update('quantity', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-deadline">Deadline</label>
                                                        <input
                                                            id="cf-deadline"
                                                            type="text"
                                                            className={inputClass('deadline')}
                                                            placeholder="e.g. March 15, 2026 or ASAP"
                                                            value={formData.deadline}
                                                            onChange={e => update('deadline', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="cf-col">
                                                        <label className="cf-label" htmlFor="cf-budget">Budget</label>
                                                        <select
                                                            id="cf-budget"
                                                            className="cf-select"
                                                            value={formData.budget}
                                                            onChange={e => update('budget', e.target.value)}
                                                        >
                                                            <option value="">Select budget range…</option>
                                                            {BUDGETS.map(b => (
                                                                <option key={b} value={b}>{b}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <div className="cf-section-label">Your Brief</div>
                                                <div className="cf-row">
                                                    <div className="cf-col cf-col--full">
                                                        <label className="cf-label" htmlFor="cf-message">
                                                            Project Description <span className="cf-label-req">*</span>
                                                        </label>
                                                        <textarea
                                                            id="cf-message"
                                                            className={`cf-textarea ${errors.message ? 'cf-textarea--err' : ''}`}
                                                            placeholder="Tell us about your project — size, finish, paper type, design needs, or anything else that will help us quote accurately…"
                                                            value={formData.message}
                                                            onChange={e => update('message', e.target.value)}
                                                            rows={5}
                                                        />
                                                        {errors.message && <span className="field-error">{errors.message}</span>}
                                                    </div>
                                                </div>

                                                {/* File Upload */}
                                                <div className="cf-section-label">Artwork / Files</div>
                                                <div
                                                    className={`cf-file-area ${formData.file ? 'has-file' : ''}`}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label="Upload file"
                                                >
                                                    <span className="cf-file-icon"><i className="bi bi-paperclip" aria-hidden="true" /></span>
                                                    {formData.file ? (
                                                        <div className="cf-file-name">✓ {formData.file.name}</div>
                                                    ) : (
                                                        <div className="cf-file-txt">Click to upload your artwork or brief</div>
                                                    )}
                                                    <div className="cf-file-hint">PDF · AI · PSD · EPS · JPG — Max 50MB</div>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        accept=".pdf,.ai,.psd,.eps,.jpg,.jpeg,.png,.indd"
                                                        onChange={e => update('file', e.target.files?.[0] ?? null)}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="cf-submit"
                                                    disabled={submitting}
                                                >
                                                    {submitting ? (
                                                        <>
                                                            <div className="spinner" />
                                                            <span>Sending…</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Send Quote Request</span>
                                                            <i className="bi bi-send-fill" aria-hidden="true" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* ── RIGHT SIDEBAR ── */}
                            <aside className="info-panel" aria-label="Contact information">
                                {CONTACT_INFO.map((c, i) => (
                                    <div key={c.label} className="info-card">
                                        <style>{`.info-card:nth-child(${i + 1})::before { background: ${c.color}; }`}</style>
                                        <i className={`bi ${c.icon} info-icon`} style={{ color: c.color }} aria-hidden="true" />
                                        <div className="info-label">{c.label}</div>
                                        {c.href ? (
                                            <a href={c.href} className="info-value">{c.value}</a>
                                        ) : (
                                            <div className="info-value" style={{ textDecoration: 'none', cursor: 'default' }}>{c.value}</div>
                                        )}
                                        {c.sub && <div className="info-sub">{c.sub}</div>}
                                    </div>
                                ))}

                                {/* Social links */}
                                <div className="social-card">
                                    <div className="social-label">Follow Us</div>
                                    <div className="social-links">
                                        {['Facebook', 'Instagram', 'Telegram', 'LinkedIn'].map(s => (
                                            <a key={s} href="#" className="social-btn">{s}</a>
                                        ))}
                                    </div>
                                </div>

                                {/* Map placeholder */}
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="map-card"
                                    aria-label="View our location on Google Maps"
                                >
                                    <div className="map-bg" />
                                    <div className="map-pin">
                                    <span className="map-pin-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true" /></span>
                                        <div className="map-pin-txt">Done Printing House</div>
                                    </div>
                                </a>
                            </aside>

                        </div>
                    </div>
                </section>

                {/* ══ FAQ ══ */}
                <section className="faq-sec" aria-label="Frequently asked questions">
                    <div className="wrap">
                        <div className="faq-layout">
                            {/* Left */}
                            <div className="faq-left">
                                <div className="eyebrow" style={{ color: 'var(--C)' }}>
                                    <style>{`.faq-sec .eyebrow::before { background: var(--C) !important; }`}</style>
                                    FAQ
                                </div>
                                <h2 className="sec-title">
                                    Common <em style={{
                                        background: 'linear-gradient(135deg, var(--C), var(--Y))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>Questions</em>
                                </h2>
                                <p className="faq-left-sub">
                                    Can't find what you're looking for? Our team is
                                    always happy to help — just reach out directly.
                                </p>
                                <a href="mailto:hello@doneprinting.com.kh" className="faq-contact-link">
                                    Email Us <span aria-hidden="true">→</span>
                                </a>
                            </div>

                            {/* Accordion */}
                            <div className="faq-list" role="list">
                                {FAQS.map((faq, i) => (
                                    <div
                                        key={i}
                                        className={`faq-item ${openFaq === i ? 'open' : ''}`}
                                        role="listitem"
                                    >
                                        <button
                                            className="faq-btn"
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                            aria-expanded={openFaq === i}
                                            aria-controls={`faq-answer-${i}`}
                                        >
                                            <span className="faq-q">{faq.q}</span>
                                            <span className="faq-icon" aria-hidden="true">+</span>
                                        </button>
                                        <div
                                            className="faq-a-wrap"
                                            id={`faq-answer-${i}`}
                                            role="region"
                                        >
                                            <p className="faq-a">{faq.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══ CTA / PHONE ══ */}
                <section className="cta-sec" aria-label="Direct contact">
                    <div className="cta-bg"  aria-hidden="true">CALL US</div>
                    <div className="cta-glow" aria-hidden="true" />
                    <div className="cta-inner">
                        <h2 className="cta-title">
                            Prefer to
                            <span className="cta-accent">Call Us?</span>
                        </h2>
                        <p className="cta-desc">
                            Speak directly with our team — we love talking print.
                        </p>
                        <a href="tel:+85523123456" className="cta-phone">
                            +855 23 123 456
                        </a>
                        <div className="cta-hours">Monday – Saturday · 8:00 AM – 6:00 PM</div>
                        <div className="cta-divider" />
                        <Link href="/work" className="btn-p">
                            <span>See Our Work First</span>
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </section>

            </div>
        </MainLayout>
    );
}