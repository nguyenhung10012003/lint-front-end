import { getDictionary } from "@/app/dictionaries";
import { User } from "@/types/user";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

export default async function DefaultLayout({
  children,
  lang,
  user,
}: {
  children: React.ReactNode;
  lang: string;
  user: User;
}) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="sm:flex-row flex flex-col w-full h-[100vh]">
      <Sidebar dictionary={dictionary} user={user} />
      <main className="flex flex-col w-full items-center overflow-y-auto h-full">
        {children}
      </main>
      <MobileNav dictionary={dictionary} user={user} />
    </div>
  );
}
