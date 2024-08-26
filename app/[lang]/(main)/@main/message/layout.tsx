import { getDictionary } from "@/app/dictionaries";
import { RoomProvider } from "@/components/chat/contexts/room-context";
import LeftSide from "@/components/chat/LeftSide";

export default async function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  return (
    <RoomProvider>
      <div className="flex sm:min-h-screen w-full overflow-hidden">
        <LeftSide dictionary={dictionary} />
        {children}
      </div>
    </RoomProvider>
  );
}
