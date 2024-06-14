import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {Providers} from "@/components/providers/Providers";
import {ReactNode} from "react";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({subsets: ["latin"]});

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
    <body className={`${inter.className} flex justify-center`}>
      <Providers>
        <ThemeToggle/>
        {children}
      </Providers>
    </body>
    </html>
  );
}
