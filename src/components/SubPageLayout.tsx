"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CursorMetamorphosis from "@/components/CursorMetamorphosis";
import SoundToggle from "@/components/retro/SoundToggle";
import TimeThemeProvider from "@/components/retro/TimeThemeProvider";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface SubPageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
}

export default function SubPageLayout({ children, breadcrumbs }: SubPageLayoutProps) {
  return (
    <>
      <CursorMetamorphosis />
      <SoundToggle />
      <TimeThemeProvider />
      <div className="noise-overlay" />
      <Navigation />

      {/* Breadcrumb trail */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="fixed top-20 left-0 right-0 z-[90] pointer-events-none"
          style={{ paddingLeft: "5%", paddingRight: "5%" }}
        >
          <nav className="max-w-[1800px] mx-auto pointer-events-auto">
            <ol className="flex items-center gap-2 text-xs font-mono text-white/40">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent transition-colors uppercase tracking-wider"
                >
                  HOME
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-accent/40">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-accent transition-colors uppercase tracking-wider"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className="text-white/60 uppercase tracking-wider"
                      aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </motion.div>
      )}

      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
