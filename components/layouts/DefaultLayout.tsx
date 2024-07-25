import { User } from "@/types/user";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import { getUnreadCount } from "@/lib/server-action/notification-action";

export default async function DefaultLayout({
  children,
  lang,
  user,
}: {
  children: React.ReactNode;
  lang: string;
  user: User;
}) {
  const unreadNotificationCount = await getUnreadCount();
  return (
    <>
      <Sidebar lang={lang} user={user} unreadNotificationCount={unreadNotificationCount} />
      <MobileNav lang={lang} user={user} />
      <main className="flex flex-col w-full overflow-y-auto h-[100vh] sm:p-8 pb-24 p-4 items-center">
        {children}
      </main>
    </>
  );
}
