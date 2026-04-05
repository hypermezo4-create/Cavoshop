import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashLoader } from "@/components/splash-loader";
import { VisitorTracker } from "@/components/visitor-tracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
    title: "Cavo Store | Premium Footwear",
    description: "Shop premium sneakers and everyday footwear at Cavo Store. Bold design, fast delivery, and a polished shopping experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-yellow-500/30`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <SplashLoader>
                        <VisitorTracker />
                        <div className="fixed inset-0 bg-mesh -z-10" />
                        {children}
                    </SplashLoader>
                </ThemeProvider>
            </body>
        </html>
    );
}
