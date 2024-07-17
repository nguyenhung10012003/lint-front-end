import ThemeToggle from "@/components/ThemeToggle";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";

const archivo = Archivo({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Lint",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html>
      <body className={`${archivo.className} flex w-full overflow-hidden `}>
        <Providers>
          <ThemeToggle />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
