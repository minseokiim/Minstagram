import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

// 레이아웃(폰트, 골격)
const openSans = Open_Sans({ subsets: ["latin"] });

// SEO 관련
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full max-w-screen-xl overflow-auto mx-auto">
        <header className="sticky top-0 bg-white z-10 border-b">
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
