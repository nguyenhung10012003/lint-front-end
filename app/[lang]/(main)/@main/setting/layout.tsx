import AddPadingLayout from "@/components/layouts/AddPadingLayout";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AddPadingLayout>{children}</AddPadingLayout>;
}
