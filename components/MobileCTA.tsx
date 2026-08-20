import { site } from "@/lib/seo";

export default function MobileCTA() {
  return (
    <a className="mobile-sticky-cta" href={`${site.basePath}/#contacto`} data-analytics="cta">
      Hablemos de tu proyecto
    </a>
  );
}
