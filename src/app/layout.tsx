import type { Metadata } from "next";
import { PT_Sans } from "next/font/google"; // Changed from Geist to PT_Sans
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import "@vidstack/react/player/styles/base.css";
import Menu from "@/app/components/menu";
import Footer from "@/app/components/footer";

const ptSans = PT_Sans({
  weight: ["400", "700"], // PT Sans available weights
  variable: "--font-pt-sans", // Changed variable name
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thinking Yellow",
  description: "Test Prova Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${ptSans.variable} ${geistMono.variable} antialiased`}>
        {" "}
        <div className="flex flex-col min-h-screen">
          <Menu />

          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
