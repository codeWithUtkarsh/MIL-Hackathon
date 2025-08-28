import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MIL-CAN - Media & Information Literacy Network",
  description:
    "Media & Information Literacy Creators & Ambassadors Network - Empowering digital literacy education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <header className="bg-gradient-to-r from-slate-900 to-purple-900 border-b border-amber-400/30 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <a
                  href="/"
                  className="flex items-center gap-3 text-2xl font-bold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span className="text-amber-400">📚</span>
                  MIL-CAN
                  <span className="text-xs bg-amber-400/20 px-2 py-1 rounded-full text-amber-400">
                    LITERACY
                  </span>
                </a>
                <div className="flex gap-6">
                  <a
                    href="/assets"
                    className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors font-semibold"
                  >
                    📚 Resources
                  </a>
                  <a
                    href="/leaderboard"
                    className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors font-semibold"
                  >
                    🏆 Leaderboard
                  </a>
                  <a
                    href="/kit"
                    className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors font-semibold"
                  >
                    🎒 Creator Kit
                  </a>
                </div>
              </nav>
            </div>
          </header>
          <main className="relative">{children}</main>
          <footer className="bg-gradient-to-r from-purple-900 to-slate-900 border-t border-amber-400/30">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <div className="text-amber-400 font-bold text-lg mb-2">
                  MIL-CAN NETWORK
                </div>
                <div className="text-slate-300 text-sm mb-4">
                  Media & Information Literacy Creators & Ambassadors Network
                </div>
                <div className="flex justify-center items-center gap-4 text-xs text-slate-400">
                  <span>© 2024 MIL-CAN</span>
                  <span>•</span>
                  <span>EMPOWERING DIGITAL LITERACY</span>
                  <span>•</span>
                  <span>BUILDING CRITICAL THINKERS</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
