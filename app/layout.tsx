import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://instabiogen.online'),
  title: "Instabiogen.online | Best Instagram Bio Ideas, Captions & Quotes",
  description: "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabiogen.online",
  openGraph: {
    title: "Instabiogen.online | Best Instagram Bio Ideas, Captions & Quotes",
    description: "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabiogen.online",
    url: "https://instabiogen.online",
    siteName: "Instabiogen.online",
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" }],
  },
  verification: {
    google: "hoy5yKmvoaHZzZyOTI_Zknwkb_T4XZaD12EQAtXfwmE",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 flex flex-col w-full min-w-0 overflow-x-hidden pt-14 sm:pt-16 md:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
