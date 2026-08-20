import type { Metadata, Viewport } from "next";
import Analytics from "@/components/analytics/Analytics";
import { assetUrl, canonicalUrl, homeSeo, site } from "@/lib/seo";
import "../styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: homeSeo.title,
  description: homeSeo.description,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    url: canonicalUrl("/"),
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: assetUrl(site.defaultImage), alt: "Experiencias web y 3D desarrolladas por ARTEMIS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
    images: [assetUrl(site.defaultImage)],
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#f6f6f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
