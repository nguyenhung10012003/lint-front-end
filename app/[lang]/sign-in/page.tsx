import { getDictionary } from "@/app/dictionaries";
import { Icons } from "@/components/Icons";
import AuthForm from "@/components/forms/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/server-action";
import Link from "next/link";
import { z } from "zod";

export default async function SignIn({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  const formSchema = z.object({
    email: z.string().email("Email must be pattern of email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
  });

  const form = {
    title: dictionary.signIn.formTitle,
    description: dictionary.signIn.formDescription,
    continueWith: dictionary.signIn.orContinueWith,
  };

  const formFields = [
    {
      name: "email",
      label: dictionary.signIn.emailLabel,
      placeholder: dictionary.signIn.emailPlaceholder,
      type: "email",
    },
    {
      name: "password",
      label: dictionary.signIn.passwordLabel,
      placeholder: dictionary.signIn.passwordPlaceholder,
      type: "password",
    },
  ];
  return (
    <main className="w-full flex justify-center h-screen items-center p-4">
      <Card className="max-w-[400px] w-full">
        <CardHeader>
          <CardTitle>{form.title}</CardTitle>
          <CardDescription>{form.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-2 flex gap-4 flex-wrap">
            <Link
              className="flex-1 min-w-[100px] flex p-1 border border-input bg-background hover:bg-accent 
              hover:text-accent-foreground justify-center whitespace-nowrap rounded-md text-sm 
              font-medium items-center transition-colors h-10 px-4 py-2"
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/callback/google`}
            >
              {Icons.google({ className: "w-6 h-6 mr-2" })}
              Google
            </Link>
            <Link
              className="flex-1 min-w-[100px] flex p-1 border border-input bg-background hover:bg-accent 
              hover:text-accent-foreground justify-center whitespace-nowrap rounded-md text-sm 
              font-medium items-center transition-colors h-10 px-4 py-2"
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/callback/facebook`}
            >
              {Icons.facebook({ className: "w-6 h-6 mr-2" })}
              Facebook
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {form.continueWith}
              </span>
            </div>
          </div>
          <AuthForm
            schema={"signin"}
            submitAction={signIn}
            fields={formFields}
            submitText={dictionary.signIn.signInButton}
          />
          <div className="text-sm flex justify-center p-2 text-gray-500">
            {dictionary.signIn.signUpLinkText} &nbsp;
            <Link href={"/sign-up"} className="underline text-primary">
              {dictionary.signIn.signUpLink}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
