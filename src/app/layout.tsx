import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "治杰 Online",
    template: "%s | 治杰 Online"
  },
  description: "个人技术博客和项目展示网站",
  keywords: ["技术博客", "开源项目", "前端开发", "后端开发", "个人作品"],
  authors: [{ name: "何治杰" }],
  creator: "何治杰",
  icons: {
    icon: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://hezhijie0327.github.io",
    title: "治杰 Online",
    description: "个人技术博客和项目展示网站",
  },
  twitter: {
    card: "summary_large_image",
    title: "治杰 Online",
    description: "个人技术博客和项目展示网站",
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
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getThemePreference() {
                  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                    return localStorage.getItem('theme');
                  }
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }

                const theme = getThemePreference();
                document.documentElement.classList.toggle('dark', theme === 'dark');
                if (typeof localStorage !== 'undefined') {
                  localStorage.setItem('theme', theme);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen bg-background text-foreground flex flex-col overflow-hidden`}
      >
        <Navigation />
        <main className="flex-1 pt-16 pb-1 overflow-hidden">
          {children}
        </main>
        <Footer className="flex-shrink-0" />
      </body>
    </html>
  );
}
