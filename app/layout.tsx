import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Nextop Point",
  description: "Study Abroad Consultancy",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}