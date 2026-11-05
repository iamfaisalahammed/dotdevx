
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import FloatingActions from "@/components/layout/FloatingActions";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = createMetadata({
  description: siteConfig.description,
  path: "",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang={siteConfig.language}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#08090B]"
        suppressHydrationWarning
      >
        {children}

        <FloatingActions />

        {/* Tawk.to Live Chat */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          src="https://embed.tawk.to/6ae8f0c2ee2a573c33d32acc/1k6euouua"
        />
      </body>
    </html>
  );
}
