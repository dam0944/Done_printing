import { Link } from "@inertiajs/react";

export default function NoteFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page-404 {
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #0b0d2e;
        }

        /* ── Multi-layer background matching the screenshot ── */
        .bg-layer {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 55% at 20% 50%, rgba(80, 40, 160, 0.55) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 80% 50%, rgba(0, 80, 100, 0.35) 0%, transparent 65%),
            radial-gradient(ellipse 70% 80% at 50% 50%, rgba(20, 15, 70, 0.8) 0%, transparent 80%);
          pointer-events: none;
        }

        /* subtle grid overlay */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.025) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
        }

        /* ── Content ── */
        .content {
          position: relative;
          z-index: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          animation: fadeUp 0.9s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── 404 Number ── */
        .num-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          line-height: 1;
          margin-bottom: 28px;
        }

        .num {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(120px, 18vw, 220px);
          color: #fff;
          letter-spacing: -6px;
          line-height: 1;
          user-select: none;
        }

        /* The middle "0" is outline style */
        .num-zero {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(120px, 18vw, 220px);
          color: transparent;
          -webkit-text-stroke: 3px rgba(255,255,255,0.75);
          letter-spacing: -6px;
          line-height: 1;
          user-select: none;
          position: relative;
          /* subtle pulse */
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { -webkit-text-stroke-color: rgba(255,255,255,0.75); }
          50%       { -webkit-text-stroke-color: rgba(167,139,250,0.95); }
        }

        /* ── Text ── */
        .oops {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(18px, 2.5vw, 26px);
          text-transform: uppercase;
          letter-spacing: 4px;
          color: #fff;
          margin-bottom: 14px;
        }

        .sub {
          font-size: clamp(13px, 1.4vw, 15px);
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.3px;
          margin-bottom: 44px;
          max-width: 380px;
          line-height: 1.6;
        }

        /* ── Button ── */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #fff;
          background: #7c3aed;
          border: none;
          padding: 17px 40px;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
        }

        .back-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .back-btn:hover {
          background: #6d28d9;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(124,58,237,0.5);
        }

        .back-btn:active {
          transform: translateY(0);
        }

        .btn-arrow {
          font-size: 16px;
          transition: transform 0.25s;
        }

        .back-btn:hover .btn-arrow {
          transform: translateX(-3px);
        }

        /* ── Floating orbs for depth ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.18;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: #7c3aed;
          top: -100px; left: -120px;
          animation: drift1 10s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: #0ea5e9;
          bottom: -80px; right: -80px;
          animation: drift2 12s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 250px; height: 250px;
          background: #7c3aed;
          bottom: 60px; left: 30%;
          animation: drift1 8s ease-in-out infinite alternate;
          opacity: 0.1;
        }

        @keyframes drift1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes drift2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-30px, -40px) scale(1.05); }
        }
      `}</style>

      <div className="page-404">
        <div className="bg-layer" />
        <div className="bg-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="content">
          <div className="num-wrap">
            <span className="num">4</span>
            <span className="num-zero">0</span>
            <span className="num">4</span>
          </div>

          <p className="oops">Oops! Page Not Found</p>
          <p className="sub">The page you are looking for might is temporarily unavailable.</p>

          <Link href="/" className="back-btn">
            <span className="btn-arrow">←</span>
            Back To Home
          </Link>
        </div>
      </div>
    </>
  );
}
