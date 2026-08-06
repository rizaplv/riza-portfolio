import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rizaplv.vercel.app"),
  title: "Muhammad Riza Pahlevie — Portfolio",
  description: "Portfolio of Muhammad Riza Pahlevie — Full-Stack Visual Designer · From Pixels to 3D, based in Tangerang Selatan, Indonesia.",
  keywords: [
    "Riza Pahlevie",
    "Graphic Designer",
    "UI Design",
    "3D Generalist",
    "Portfolio",
    "Motion Graphics",
    "Event Production",
    "Tangerang",
    "Indonesia",
  ],
  authors: [{ name: "Muhammad Riza Pahlevie" }],
  creator: "Muhammad Riza Pahlevie",
  publisher: "Muhammad Riza Pahlevie",
  category: "Design",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rizaplv.vercel.app",
    title: "Muhammad Riza Pahlevie — Portfolio",
    description: "Portfolio of Muhammad Riza Pahlevie — Full-Stack Visual Designer · From Pixels to 3D, based in Tangerang Selatan, Indonesia.",
    siteName: "Riza Portfolio",
    emails: ["rizaplv@gmail.com"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Riza Pahlevie — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Riza Pahlevie — Portfolio",
    description: "Portfolio of Muhammad Riza Pahlevie — Full-Stack Visual Designer · From Pixels to 3D, based in Tangerang Selatan, Indonesia.",
    creator: "@rizaplv",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e11" },
  ],
  alternates: {
    canonical: "https://rizaplv.vercel.app",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pt-16 page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
