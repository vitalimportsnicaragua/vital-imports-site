import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vital Imports Nicaragua – Más vida, mejor salud",
  description: "Suplementos premium importados de EE.UU. Venta al detalle y a farmacias en Nicaragua.",
   metadataBase: new URL("https://vital-imports-site.vercel.app"),
  openGraph: {
    title: "Vital Imports Nicaragua",
    description: "Más vida, mejor salud.",
    images: ["/logo.png"],
  },
  icons: { icon: "/favicon.ico" },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
