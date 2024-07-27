"use client";
import { createProfile } from "@/lib/server-action/user-action";
import { Profile } from "@/types/user";
import { contries } from "@/utils/countries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "./Icons";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export function StepDots({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full border ${
            index === currentStep ? "bg-blue-500" : ""
          }`}
        ></div>
      ))}
    </div>
  );
}

export default function ProfileSetupSteps({
  profile,
  initStep,
}: {
  profile: Profile;
  initStep: number;
}) {
  const [pf, setProfile] = useState(profile);
  const [step, setStep] = useState(initStep);
  const [avatar, setAvatar] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleStart = async () => {
    profile = await createProfile({ profile: pf, avatar: avatar });
    //window.location.reload();
  };

  const nameAndAliasSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be between 3 and 32 characters long")
      .max(32, "Name must be between 3 and 32 characters long"),
    alias: z
      .string()
      .min(3, "Alias must be between 3 and 24 characters long.")
      .max(24, "Alias must be between 3 and 24 characters long.")
      .regex(
        /^[a-zA-Z0-9_][a-zA-Z0-9._]{1,28}[a-zA-Z0-9_]$/,
        "Alias must be alphanumeric and can contain underscores and periods."
      ),
  });

  const nameAndAliasForm = useForm<z.infer<typeof nameAndAliasSchema>>({
    resolver: zodResolver(nameAndAliasSchema),
  });

  const handleSubmitStep1 = async (
    values: z.infer<typeof nameAndAliasSchema>
  ) => {
    setProfile({ ...pf, name: values.name, alias: values.alias });
    setStep(step + 1);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const pageSteps = [
    {
      component: (
        <Form {...nameAndAliasForm}>
          <form
            className="flex h-full flex-col gap-4 w-full max-w-[350px] justify-center"
            onSubmit={nameAndAliasForm.handleSubmit(handleSubmitStep1)}
            method="post"
          >
            <FormField
              control={nameAndAliasForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    {`What's your name?`}
                  </FormLabel>
                  <FormControl>
                    <Input id="name" {...field} maxLength={32} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={nameAndAliasForm.control}
              name="alias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    {`What's your alias?`}
                  </FormLabel>
                  <FormControl>
                    <Input id="alias" {...field} maxLength={24} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-white text-md">
              Next
            </Button>
          </form>
        </Form>
      ),
      submitAction: () => {},
      canSkip: false,
    },
    {
      component: (
        <div className="flex h-full flex-col gap-4 w-full max-w-[300px] justify-center">
          <div className="flex flex-col gap-2">
            <Label htmlFor="dob" className="font-semibold">
              {`When were you born?`}
            </Label>
            <Input
              id="dob"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              min={"1900-01-01"}
              value={pf.dob}
              onChange={(e) => setProfile({ ...pf, dob: e.target.value })}
              className="block"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="country" className="font-semibold">
              Where are you from?
            </Label>
            <Select
              onValueChange={(value) => setProfile({ ...pf, country: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {contries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="text-white text-md disabled:cursor-not-allowed"
            onClick={() => setStep(step + 1)}
            disabled={!pf.dob || !pf.country}
          >
            Next
          </Button>
        </div>
      ),
      submitAction: () => {},
      canSkip: true,
    },
    {
      component: (
        <div className="flex h-full flex-col gap-4 w-full max-w-[400px] justify-center">
          <div className="flex justify-between w-full border-2 rounded-xl p-4 items-center">
            <ProfileAvatar
              src={preview || pf.avatar || ""}
              alt={""}
              className="w-14 md:w-20 h-14 md:h-20"
              variant="modal"
            />

            <Label
              htmlFor="avatar"
              className="cursor-pointer p-2 border rounded-lg bg-primary text-sm text-white 
          text-center min-h-10 flex font-semibold hover:bg-primary/90 transition-colors"
            >
              Change Avatar
            </Label>
            <Input
              type="file"
              id="avatar"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="bio" className="font-semibold">
              Tell us about yourself
            </Label>
            <Textarea
              id="bio"
              value={pf.bio}
              maxLength={250}
              onChange={(e) => setProfile({ ...pf, bio: e.target.value })}
              className="resize-none"
              rows={3}
            />
          </div>
          <Button className="text-white text-md" onClick={handleStart}>
            Start
          </Button>
        </div>
      ),
      submitAction: () => {},
      canSkip: true,
    },
  ];
  return (
    <div className="flex w-full flex-col min-h-[100vh] p-4 items-center">
      <div className="w-full flex items-center md:p-6 h-10 fixed">
        {step > 0 && (
          <Button
            onClick={() => setStep(step - 1)}
            variant="ghost"
            className="rounded-full p-1 h-auto"
          >
            <Icons.arrowLeft className="w-6 h-6" />
          </Button>
        )}
        {step < pageSteps.length - 1 && pageSteps[step].canSkip && (
          <Button
            onClick={() => setStep(step + 1)}
            variant="ghost"
            className="p-1 h-auto hover:underline hover:bg-background underline-offset-2 text-md ml-auto"
          >
            Skip
          </Button>
        )}
      </div>
      {pageSteps[step].component}
    </div>
  );
}
