import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "~/components/Header";
import AccountInfo from "~/components/AccountInfo";
import getAccountInfo from "~/utils/getAccountInfo";
import SubmitButton from "~/components/SubmitButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PR SEED",
  description: "PR SEED",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accountInfo = await getAccountInfo();
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header>
          <SubmitButton title="登録"></SubmitButton>
          <AccountInfo {...accountInfo} />
        </Header>
        <div className="pt-32">
          {children}
        </div>
      </body>
    </html>
  );
}
