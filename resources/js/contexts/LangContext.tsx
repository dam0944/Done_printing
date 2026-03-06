import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';

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
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.work': 'Work',
        'nav.new': 'New',
        'nav.contact': 'Contact Us',

        // ── Footer — column headings ─────────────────────────────
        'footer.company': 'Company',
        'footer.services': 'Services',
        'footer.touch': 'Get In Touch',

        // ── Footer — brand tagline ────────────────────────────────
        'footer.tagline':
            'From concept to print — we deliver vibrant, precision-crafted work that makes your brand impossible to ignore.',

        // ── Footer — contact info ─────────────────────────────────
        'footer.addr': 'Phnom Penh, Cambodia',
        'footer.hours': 'Mon – Sat: 8AM – 6PM',

        // ── Footer — CTA strip ────────────────────────────────────
        'footer.cta': 'Ready to print something',
        'footer.cta.accent': 'amazing?',
        'footer.cta.btn': 'Start a Project',

        // ── Footer — bottom bar ───────────────────────────────────
        'footer.copy': 'All rights reserved.',
    },

    km: {
        // ── Navbar ──────────────────────────────────────────────
        'nav.home': 'ទំព័រដើម',
        'nav.about': 'អំពីយើង',
        'nav.work': 'ស្នាដៃ',
        'nav.new': 'ថ្មី',
        'nav.contact': 'ទំនាក់ទំនង',

        // ── Footer — column headings ─────────────────────────────
        'footer.company': 'ក្រុមហ៊ុន',
        'footer.services': 'សេវាកម្ម',
        'footer.touch': 'ទំនាក់ទំនង',

        // ── Footer — brand tagline ────────────────────────────────
        'footer.tagline':
            'ពីគំនិតរហូតដល់ការបោះពុម្ព — យើងផ្តល់ជូននូវស្នាដៃប្រកបដោយភាពច្បាស់លាស់ ដែលធ្វើអោយương marks របស់អ្នកមិនអាចប្រម៉ត់បាន។',

        // ── Footer — contact info ─────────────────────────────────
        'footer.addr': 'ភ្នំពេញ, កម្ពុជា',
        'footer.hours': 'ច័ន្ទ – សៅរ៍: ៨ព្រឹក – ៦ល្ងាច',

        // ── Footer — CTA strip ────────────────────────────────────
        'footer.cta': 'ត្រៀមបោះពុម្ពអ្វីមួយ',
        'footer.cta.accent': 'ពិសេស?',
        'footer.cta.btn': 'ចាប់ផ្តើមគម្រោង',

        // ── Footer — bottom bar ───────────────────────────────────
        'footer.copy': 'រក្សាសិទ្ធិគ្រប់យ៉ាង។',
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

    const setLang = (l: Lang) => {
        setLangState(l);
        if (typeof window !== 'undefined') {
            localStorage.setItem('dp_lang', l);
        }
        document.documentElement.lang = l === 'km' ? 'km' : 'en';
    };

    useEffect(() => {
        document.documentElement.lang = lang === 'km' ? 'km' : 'en';
    }, [lang]);

    const t = (key: string): string =>
        translations[lang][key] ?? translations['en'][key] ?? key;

    return (
        <LangContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LangContext.Provider>
    );
}
