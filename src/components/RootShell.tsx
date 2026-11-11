import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ParallaxBackground from "@/components/ParallaxBackground";
import { ContentProvider } from "@/components/ContentProvider";
import type { Locale } from "@/content/ar";

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const latin = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

// set the saved theme before first paint so there is no flash
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=(t==='light'?'light':'dark')}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html
      lang={locale}
      dir={dir}
      data-theme="dark"
      suppressHydrationWarning
      className={`${arabic.variable} ${latin.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`min-h-screen ${locale === "en" ? "font-en-first" : ""}`}>
        <ContentProvider locale={locale}>
          <ParallaxBackground />
          <SmoothScroll>{children}</SmoothScroll>
        </ContentProvider>
      </body>
    </html>
  );
}
