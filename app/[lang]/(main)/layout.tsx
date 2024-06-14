import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function MainLayout({children, params}: {
  params: {
    lang: string
  }
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout lang={params.lang}>
      {children}
    </DefaultLayout>
  );
}