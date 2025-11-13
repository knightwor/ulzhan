import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={rebarFont.variable + " " + gothicFont.variable + " " + gobittaFont.variable + " " + magicRubyFont.variable + " " + herokingFont.variable + " dark"}
        suppressHydrationWarning
        suppressContentEditableWarning>
       
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
