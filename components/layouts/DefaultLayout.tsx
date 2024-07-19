import { User } from "@/types/user";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

export default function DefaultLayout({
  children,
  lang,
  user,
}: {
  children: React.ReactNode;
  lang: string;
  user: User;
}) {
  
  return (
    <>
      <Sidebar lang={lang} user={user} />
      <MobileNav lang={lang} user={user} />
      <main className="flex flex-col w-full overflow-y-auto h-[100vh] sm:p-8 pb-24 p-4 items-center">
        {children}
      </main>
    </>
  );
}
