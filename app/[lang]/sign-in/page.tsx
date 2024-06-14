import {getDictionary} from "@/app/[lang]/dictionaries";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/Icons";
import AuthForm from "@/components/forms/AuthForm";
import {z} from "zod";
import {signIn} from "@/lib/actions";


export default async function SignIn({params}: {
  params: {
    lang: string;
  }
}) {
  const dictionary = await getDictionary(params.lang);
  const formSchema = z.object({
    email: z.string().email("Email must be pattern of email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
  });
  const formFields = [
    {
      name: "email",
      label: dictionary.signIn.emailLabel,
      placeholder: dictionary.signIn.emailPlaceholder,
      type: "email"
    },
    {
      name: "password",
      label: dictionary.signIn.passwordLabel,
      placeholder: dictionary.signIn.passwordPlaceholder,
      type: "password"
    }
  ]
  return (
    <main className="w-full flex justify-center h-screen items-center p-4">
      <Card className="max-w-[400px] w-full">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Enter your email and password to sign in!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-2 flex gap-4 flex-wrap">
            <Button variant="outline" className="flex-1 min-w-[100px]">
              {Icons.google({className: "w-6 h-6 mr-2"})}
              Google
            </Button>
            <Button variant="outline" className="flex-1 min-w-[100px]">
              {Icons.facebook({className: "w-6 h-6 mr-2"})}
              Facebook
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"/>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
            </div>
          </div>
          <AuthForm schema={'signin'}
                    submitAction={signIn}
                    fields={formFields}
                    submitText={dictionary.signIn.signInButton}
          />
        </CardContent>
      </Card>
    </main>
  );
}