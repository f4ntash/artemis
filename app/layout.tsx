import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "FORMA 3D — Workspace interactivo",
  description: "FORMA 3D — 3D interactivo, web y sistemas digitales.",
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
      <body>{children}</body>
    </html>
  );
}
