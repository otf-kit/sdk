import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OTF — Cross-platform Templates for Expo + Next.js",
  description:
    "Production-ready UI components and full-stack kits for Expo and Next.js, with AI configs for Cursor, Claude Code, and Lovable.",
  openGraph: {
    title: "OTF — Cross-platform Templates for Expo + Next.js",
    description:
      "Production-ready UI components and full-stack kits for Expo and Next.js, with AI configs for Cursor, Claude Code, and Lovable.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
