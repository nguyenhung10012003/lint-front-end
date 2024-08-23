import AddPadingLayout from "@/components/layouts/AddPadingLayout";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AddPadingLayout>{children}</AddPadingLayout>;
}
