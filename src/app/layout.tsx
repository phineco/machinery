import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Used Construction Machinery Export",
  description: "High quality second hand excavators and construction equipment for global export",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}