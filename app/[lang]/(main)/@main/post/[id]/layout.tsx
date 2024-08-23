import AddPadingLayout from "@/components/layouts/AddPadingLayout";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AddPadingLayout>{children}</AddPadingLayout>;
}
