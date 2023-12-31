import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/styles/globals.css";
import Favicon from "../public/favicon.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doclite",
  description: "text editor",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
