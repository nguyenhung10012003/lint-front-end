import { getDictionary } from "@/app/dictionaries";
import { Icons } from "@/components/Icons";
import AuthForm from "@/components/forms/AuthForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/server-action";
import Link from "next/link";
import { z } from "zod";

export default async function SignUp({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  const formSchema = z
    .object({
      email: z.string().email("Email must be pattern of email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be at most 32 characters"),
      confirmPassword: z.string(),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      "Password and confirm password must be the same"
    );
  const formFields = [
    {
      name: "email",
      label: dictionary.signIn.emailLabel,
      placeholder: dictionary.signIn.emailPlaceholder,
      type: "email",
    },
    {
      name: "password",
      label: dictionary.signUp.passwordLabel,
      placeholder: dictionary.signUp.passwordPlaceholder,
      type: "password",
    },
    {
      name: "confirmPassword",
      label: dictionary.signUp.confirmPasswordLabel,
      placeholder: dictionary.signUp.confirmPasswordPlaceholder,
      type: "password",
    },
  ];
  return (
    <main className="w-full flex justify-center h-screen items-center p-4">
      <Card className="max-w-[420px] w-full">
        <CardHeader>
          <CardTitle>{dictionary.signUp.formTitle}</CardTitle>
          <CardDescription>{dictionary.signUp.formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-2 flex gap-4 flex-wrap">
            <Button variant="outline" className="flex-1 min-w-[100px]">
              {Icons.google({ className: "w-6 h-6 mr-2" })}
              Google
            </Button>
            <Button variant="outline" className="flex-1 min-w-[100px]">
              {Icons.facebook({ className: "w-6 h-6 mr-2" })}
              Facebook
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {dictionary.signUp.orContinueWith}
              </span>
            </div>
          </div>
          <AuthForm
            schema={"signup"}
            submitAction={signUp}
            fields={formFields}
            submitText={dictionary.signUp.signUpButton}
          />
          <div className="text-sm flex justify-center p-2 text-gray-500">
            {dictionary.signUp.signInLinkText} &nbsp;
            <Link href={"/sign-in"} className="underline text-primary">
              {dictionary.signUp.signInLink}
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
