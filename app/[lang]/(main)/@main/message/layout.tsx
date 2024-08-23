import LeftSide from "@/components/chat/LeftSide";

export default function ChatLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <div className="flex sm:min-h-screen w-full overflow-hidden">
      <LeftSide />
      {children}
    </div>
  );
}
