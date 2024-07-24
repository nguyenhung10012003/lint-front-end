import { CookiesProvider } from "next-client-cookies/server";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <CookiesProvider>{children}</CookiesProvider>
    </ThemeProvider>
  );
}
