import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toast/toaster";
// 스타일
import "@/public/styles/globals.css";
import "@/public/styles/main.scss";
// 폰트
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
      <body className={`${FONT_NOTOSANSKR.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
