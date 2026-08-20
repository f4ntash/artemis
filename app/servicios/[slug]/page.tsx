import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/seo/SeoLandingPage";
import { findSeoPage, pageMetadata, servicePages } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = findSeoPage("servicio", slug);
  if (!page) return {};
  return pageMetadata(page);
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const page = findSeoPage("servicio", slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
