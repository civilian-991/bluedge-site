import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blu Edge Agency | Creative Digital Agency in Dubai",
  description:
    "Blu Edge is a full-service creative agency specializing in branding, web design, video production, and social media management. We craft digital experiences that captivate and convert.",
  keywords: [
    "creative agency",
    "dubai agency",
    "web design",
    "branding",
    "video production",
    "social media",
    "digital marketing",
    "UI/UX design",
  ],
  authors: [{ name: "Blu Edge Agency" }],
  openGraph: {
    title: "Blu Edge Agency | Creative Digital Agency in Dubai",
    description:
      "We craft digital experiences that captivate audiences and drive results.",
    type: "website",
    locale: "en_US",
    siteName: "Blu Edge Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blu Edge Agency | Creative Digital Agency in Dubai",
    description:
      "We craft digital experiences that captivate audiences and drive results.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
