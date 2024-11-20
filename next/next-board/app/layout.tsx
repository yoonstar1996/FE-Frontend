import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./styles/globals.css";
import "./styles/main.scss";
import { Aside } from "@/features";
import { Toaster } from "@/components/ui/toast/toaster";

const NOTO_SANS_KR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXT.js TODO-BOARD",
  description: "NEXT.js와 Shadcn UI를 활용한 TODO-BOARD 만들기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={NOTO_SANS_KR.className}>
        <div className="page">
          <Aside />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
