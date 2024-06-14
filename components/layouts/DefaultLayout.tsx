import Sidebar from "@/components/layouts/Sidebar";
import MobileNav from "@/components/layouts/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";

export default function DefaultLayout({children, lang}: {
  children: React.ReactNode,
  lang: string,
}) {
  return (
    <div className="flex w-full">
      <ThemeToggle/>
      <Sidebar lang={lang}/>
      <MobileNav lang={lang}/>
      <main className="flex p-4 w-full">{children}</main>
    </div>
  )
}