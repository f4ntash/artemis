import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { findSeoPage, pageMetadata, sectorPages } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return sectorPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = findSeoPage("sector", slug);
  if (!page) return {};
  return pageMetadata(page);
}

export default async function SectorPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findSeoPage("sector", slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
