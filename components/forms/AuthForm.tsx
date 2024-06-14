'use client';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export enum AuthSchema {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
}

interface Field {
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

interface AuthFormProps {
  schema: string;
  submitAction: (values: any) => any;
  fields: Field[];
  submitText?: string;
}

const createZodSchema = (schema: AuthSchema) => {
  switch (schema) {
    case AuthSchema.SIGNIN:
      return z.object({
        email: z.string().email("Email must be pattern of email address"),
        password: z.string().min(8, "Password must be at least 8 characters")
          .max(32, "Password must be at most 32 characters")
      });
    case AuthSchema.SIGNUP:
      return z.object({
        email: z.string().email("Email must be pattern of email address"),
        password: z.string().min(8, "Password must be at least 8 characters")
          .max(32, "Password must be at most 32 characters"),
        confirmPassword: z.string()
      }).refine(data =>
          data.password === data.confirmPassword,
        "Password and confirm password must match"
      );
  }
}

export default function AuthForm({schema, submitAction, fields, submitText}: AuthFormProps) {
  const formSchema = createZodSchema(AuthSchema[schema.toUpperCase() as keyof typeof AuthSchema]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await submitAction(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 flex-col">
        {fields.map((f) => (
          <FormField
            key={f.name}
            // @ts-ignore
            name={f.name}
            control={form.control}
            render={({field}) => (
              <FormItem>
                <FormLabel>{f.label}</FormLabel>
                <FormControl>
                  <Input placeholder={f.placeholder} type={f.type} {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

        ))}
        <Button type="submit" className='mt-4'>{submitText}</Button>
      </form>
    </Form>
  )
}