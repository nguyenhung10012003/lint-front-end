import AddPadingLayout from "@/components/layouts/AddPadingLayout";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AddPadingLayout>
      <div className="flex flex-col w-full gap-4 max-w-[700px] self-center">{children}</div>
    </AddPadingLayout>
  );
}
