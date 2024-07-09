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
      <main className="flex flex-col w-full overflow-y-auto h-[100vh] sm:p-8 pb-24 p-4 items-center">
        {children}
      </main>
    </>
  );
}
