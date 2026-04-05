import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "CAVO STORE | Premium 1:1 Mirror Sneakers",
  description: "Discover the ultimate collection of exact 1:1 mirror sneakers at Cavo Store. Premium quality, imported materials, and worldwide shipping.",
  keywords: ["Cavo Store", "Mirror Sneakers", "Premium Footwear", "1:1 Sneakers", "Jordan Mirror", "Nike Mirror", "Luxury Shoes Egypt"],
  authors: [{ name: "Cavo Store Team" }],
  openGraph: {
    title: "CAVO STORE | Step Into Premium",
    description: "The best 1:1 mirror quality sneakers imported directly for you.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAVO STORE",
    description: "Premium Mirror Sneakers Experience",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans selection:bg-amber-500/30 selection:text-amber-200`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col bg-zinc-950">
            {/* الخلفية اللي بتدي طابع الفخامة */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.05)_0%,transparent_50%)] -z-10" />
            <div className="fixed inset-0 noise-bg -z-10 pointer-events-none opacity-20" />
            
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
