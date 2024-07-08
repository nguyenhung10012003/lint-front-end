import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

export default function DefaultLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  return (
    <>
      <Sidebar lang={lang} />
      <MobileNav lang={lang} />
      <main className="flex p-4 w-full sm:mb-0 mb-20 lg:ml-[250px] sm:ml-[70px] justify-center">
        {children}
      </main>
    </>
  );
}
