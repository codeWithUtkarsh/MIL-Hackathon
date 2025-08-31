import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../lib/auth-context";

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
        <AuthProvider>
          <div className="min-h-screen">
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
        </AuthProvider>
      </body>
    </html>
  );
}
