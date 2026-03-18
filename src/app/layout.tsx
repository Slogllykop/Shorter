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

export const metadata: Metadata = {
    metadataBase: new URL("https://a.isdevs.cv"),
    title: {
        default: "Shorter",
        template: "%s | Shorter",
    },
    description:
        "A fast, secure, premium and self-hosted URL shortener for all your links.",
    keywords: [
        "url shortener",
        "link shortener",
        "shorter",
        "analytics",
        "tracking",
    ],
    authors: [{ name: "Shorter Team" }],
    creator: "Shorter Team",
    publisher: "Shorter Team",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "Shorter",
        title: "Shorter",
        description:
            "A fast, secure, premium and self-hosted URL shortener for all your links.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shorter",
        description:
            "A fast, secure, premium and self-hosted URL shortener for all your links.",
        creator: "@shorter",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
