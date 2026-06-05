import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanskritbhashi | Learn and Practice Sanskrit",
  description: "Academically rigorous, fully responsive Sanskrit learning platform aligned with school curriculums (NCERT) and classic Shastras.",
  metadataBase: new URL("https://sanskritbhashi.com"),
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      hi: "/hi",
      ja: "/ja",
      es: "/es",
    },
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className="antialiased min-h-dvh flex flex-col bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
