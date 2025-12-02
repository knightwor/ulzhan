import BackgroundProvider from "@/components/BackgroundProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const metadata = {
  title: "Ulzhan — Puzzle Generator",
  description: "Generate puzzles from topics or PDFs using Gemini",
};


const magicRubyFont = localFont({
  src: [
    { path: '../public/fonts/magic-ruby.otf', style: 'normal' }
  ],
  variable: '--font-magic-ruby',
  display: 'swap',
});

const rebarFont = localFont({
  src: [
    { path: '../public/fonts/rebar.ttf', weight: '400', style: 'normal' }
  ],
  variable: '--font-rebar',
  display: 'swap',
});

const gothicFont = localFont({
  src: [
    { path: '../public/fonts/gothic.otf', weight: '400', style: 'normal' }
  ],
  variable: '--font-gothic',
  display: 'swap',
});

const gobittaFont = localFont({
  src: [
    { path: '../public/fonts/gobitta.otf', weight: '500', style: 'normal' }
  ],
  variable: '--font-gobitta',
  display: 'swap',
});

const herokingFont = localFont({
  src: [
    { path: '../public/fonts/heroking.ttf', weight: '400', style: 'normal' }
  ],
  variable: '--font-heroking',
  display: 'swap',
});

const revainFont = localFont({
  src: [
    { path: '../public/fonts/revain.ttf', weight: '400', style: 'normal' }
  ],
  variable: '--font-revain',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={`${rebarFont.variable} ${gothicFont.variable} ${gobittaFont.variable} ${magicRubyFont.variable} ${herokingFont.variable} ${revainFont.variable} dark`
      }
        suppressHydrationWarning
        suppressContentEditableWarning>
        <BackgroundProvider>{children}</BackgroundProvider>
      </body>
    </html>
  );
}
