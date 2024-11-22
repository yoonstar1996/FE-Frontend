import type { Metadata } from "next";
import "@/public/styles/globals.css";
import { FONT_NOTOSANSKR } from "@/public/assets/fonts";

export const metadata: Metadata = {
  title: "NEXT.js-Board SF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${FONT_NOTOSANSKR.className}`}>{children}</body>
    </html>
  );
}
