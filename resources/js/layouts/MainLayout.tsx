import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import { LangProvider } from '@/contexts/LangContext';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        // ← LangProvider wraps everything so useLang() works in Navbar + Footer
        <LangProvider>
            <div
                style={{
                    minHeight: '100vh',
                    background: '#080808',
                    color: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Bootstrap Icons CDN + Hanuman Khmer font — loaded once for the whole site */}
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                    />
                    {/* Hanuman: best Khmer web font, also renders Latin well */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Hanuman:wght@400;700;900&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                {/* Fixed Navbar */}
                <Navbar />

                {/* Page content */}
                <main style={{ flex: 1, width: '100%' }}>{children}</main>

                {/* Footer */}
                <Footer />
            </div>
        </LangProvider>
    );
}
