import ThemeToggle from "@/components/ThemeToggle";
import { Providers } from "@/components/providers/Providers";
import type { Metadata } from "next";
import { Archivo, Montserrat, Oswald } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";

const oswald = Oswald({ subsets: ["latin", "vietnamese"] });
const monstserrat = Montserrat({ subsets: ["latin", "vietnamese"] });
const archivo = Archivo({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Lint",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
  welcome: ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${archivo.className} flex justify-center overflow-visible`}
      >
        <Providers>
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
