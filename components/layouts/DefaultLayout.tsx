import MobileNav from "@/components/layouts/MobileNav";
import Sidebar from "@/components/layouts/Sidebar";

export default function DefaultLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <div className="flex w-full">
      <Sidebar lang={lang} />
      <MobileNav lang={lang} />
      <main className="flex p-4 w-full mb-20 overflow-y">{children}</main>
    </div>
  );
}
