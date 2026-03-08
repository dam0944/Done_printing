import { Head } from "@inertiajs/react";
import type { ReactNode, FC } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LangProvider } from "@/contexts/LangContext";

interface MainLayoutProps {
  children: ReactNode;
}

/* ════════════════════════════════════════
   LAYOUT
════════════════════════════════════════ */
const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <LangProvider>
    <Head>
      {/* Bootstrap Icons — loaded once for the whole site */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      {/* Google Fonts — Barlow (EN body/display) + Noto Sans Khmer (KM) + Hanuman (KM fallback) */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600;700&family=Noto+Sans+Khmer:wght@400;500;600;700&family=Hanuman:wght@400;700;900&family=Koulen&display=swap"
        rel="stylesheet"
      />
    </Head>

    <div className="ml-root">
      <style>{`
        .ml-root {
          min-height: 100vh;
          background: #0e0c2e;
          color: #fff;
          display: flex;
          flex-direction: column;
        }
        .ml-main {
          flex: 1;
          width: 100%;
        }
      `}</style>

      <Navbar />
      <main className="ml-main">{children}</main>
      <Footer />
    </div>
  </LangProvider>
);

export default MainLayout;