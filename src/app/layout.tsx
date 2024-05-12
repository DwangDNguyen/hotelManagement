import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import "./globals.css";
import "@uploadthing/react/styles.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ComforHotel",
    description: "Book your hotel with ease",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <main className="flex flex-col min-h-screen bg-secondary">
                        <Navbar />
                        {children}
                        <Footer />
                    </main>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
