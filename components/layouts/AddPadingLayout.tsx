export default function AddPadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full py-6 px-4 flex flex-col">{children}</div>;
}
