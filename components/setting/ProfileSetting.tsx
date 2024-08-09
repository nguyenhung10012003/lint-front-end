"use client";

import { api } from "@/config/api";
import { Profile } from "@/types/user";
import {} from "@radix-ui/react-select";
import { useState } from "react";
import ProfileAvatar from "../ProfileAvatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { SettingGroup, SettingItem } from "./Setting";

export default function ProfileSetting({ profile, dictionary }: { profile: Profile, dictionary: any }) {
  const [pf, setProfile] = useState(profile);
  const [avatar, setAvatar] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const { toast } = useToast();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();
      if (pf.name) form.append("name", pf.name);
      if (pf.alias) form.append("alias", pf.alias);
      if (pf.bio) form.append("bio", pf.bio);
      if (pf.dob) form.append("dob", pf.dob);
      if (pf.country) form.append("country", pf.country);
      if (pf.gender) form.append("gender", pf.gender);
      if (avatar) form.append("avatar", avatar);
      const profile = await api.patch<any, Profile>("/profile", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(profile);
      toast({
        title: dictionary.setting.profile.toast.updateProfileSuccessTitle,
        description: dictionary.setting.profile.toast.updateProfileSuccessDescription,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SettingGroup id="profile-setting" title={dictionary.setting.profile.title} className="">
      <SettingItem className="p-4 gap-4 items-center bg-secondary rounded-2xl">
        <ProfileAvatar
          src={preview || pf.avatar}
          alt={pf.name}
          className="w-14 md:w-14 h-14 md:h-14"
          variant="modal"
        />
        <div className="flex flex-col w-full">
          <span className="font-bold text-lg">{pf.alias}</span>
          <span className="text-gray-500 dark:text-gray-400">{pf.name}</span>
        </div>
        <Label
          htmlFor="avatar"
          className="cursor-pointer p-2 border rounded-lg bg-primary text-sm text-white 
          text-center min-h-10 flex font-semibold hover:bg-primary/90 transition-colors"
        >
          {dictionary.setting.profile.changeAvatar}
        </Label>
        <Input
          type="file"
          id="avatar"
          className="hidden"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </SettingItem>
      <SettingItem className="flex-col gap-2">
        <Label htmlFor="name" className="font-semibold text-lg">
          {dictionary.setting.profile.form.name}
        </Label>
        <Input
          id="name"
          type="text"
          defaultValue={pf.name}
          className="w-full rounded-lg"
          onChange={(e) => setProfile({ ...pf, name: e.target.value })}
        />
      </SettingItem>
      <SettingItem className="flex-col gap-2">
        <Label htmlFor="alias" className="font-semibold text-lg">
          {dictionary.setting.profile.form.bio}
        </Label>
        <Textarea
          className="resize-none min-h-0 rounded-lg"
          rows={3}
          placeholder="Bio"
          maxLength={250}
          value={pf.bio}
          onChange={(e) => setProfile({ ...pf, bio: e.target.value })}
        />
      </SettingItem>
      <SettingItem className="flex-col gap-2">
        <Label htmlFor="gender" className="font-semibold text-lg">
          {dictionary.setting.profile.form.gender}
        </Label>
        <Select
          defaultValue={pf.gender}
          onValueChange={(value) => setProfile({ ...pf, gender: value })}
        >
          <SelectTrigger className="hover:bg-secondary">
            <SelectValue placeholder="Choose gender"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">{dictionary.setting.profile.form.genderMale}</SelectItem>
            <SelectItem value="female">{dictionary.setting.profile.form.genderFemale}</SelectItem>
            <SelectItem value="other">{dictionary.setting.profile.form.genderOther}</SelectItem>
          </SelectContent>
        </Select>
      </SettingItem>
      <SettingItem className="flex-col gap-2">
        <Label htmlFor="dob" className="font-semibold text-lg">
          {dictionary.setting.profile.form.birthday}
        </Label>
        <Input
          id="dob"
          type="date"
          defaultValue={
            pf.dob ? new Date(pf.dob).toISOString().split("T")[0] : ""
          }
          max={new Date().toISOString().split("T")[0]}
          min={"1900-01-01"}
          className="w-full rounded-lg block"
          onChange={(e) => setProfile({ ...pf, dob: e.target.value })}
        />
      </SettingItem>
      <SettingItem className="justify-end">
        <Button
          className="max-w-[120px] text-white w-full"
          disabled={pf == profile && !avatar}
          onClick={handleSubmit}
        >
          {dictionary.setting.profile.form.submit}
        </Button>
      </SettingItem>
    </SettingGroup>
  );
}
