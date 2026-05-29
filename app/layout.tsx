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
  metadataBase: new URL('https://instabio.online'),
  title: "Instabio.online | Best Instagram Bio Ideas, Captions & Quotes",
  description: "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabio.online",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Instabio.online | Best Instagram Bio Ideas, Captions & Quotes",
    description: "Discover thousands of stylish, trendy & creative Instagram bios for boys, girls, lovers & professionals. Find the perfect bio that matches your vibe — only at Instabio.online",
    url: "https://instabio.online",
    siteName: "Instabio.online",
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "NnWMLvEZRYt5GXepJntRQaCahkQvPPOlB90gJO3b84E",
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
          <main className="flex-1 flex flex-col w-full min-w-0 overflow-x-hidden">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
