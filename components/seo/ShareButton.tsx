"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
  text: string;
  url: string;
};

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    window.gtag?.("event", "share_click", { page_title: title, page_location: url });

    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }

    await navigator.clipboard?.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button className="share-button" type="button" onClick={share} aria-label={`Compartir ${title}`}>
      {copied ? "Link copiado" : "Compartir"}
    </button>
  );
}
