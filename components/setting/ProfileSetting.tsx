import profiles from "@/mocks/profile.json";
import {} from "@radix-ui/react-select";
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
import { SettingGroup, SettingItem } from "./Setting";

export default function ProfileSetting() {
  const profile = profiles[0];
  return (
    <SettingGroup id="profile-setting" title="Edit Profile" className="">
      <SettingItem className="p-4 gap-4 items-center bg-secondary rounded-2xl">
        <ProfileAvatar
          src={profile.avatar}
          alt={""}
          className="w-14 md:w-14 h-14 md:h-14"
        />
        <div className="flex flex-col w-full">
          <span className="font-bold text-lg">{profile.alias}</span>
          <span className="text-gray-500 dark:text-gray-400">
            {profile.name}
          </span>
        </div>
        <Label
          htmlFor="avatar"
          className="cursor-pointer p-2 border rounded-lg bg-primary text-sm text-white 
          text-center min-h-10 flex font-semibold hover:bg-primary/90 transition-colors"
        >
          Change Avatar
        </Label>
        <Input type="file" id="avatar" className="hidden" />
      </SettingItem>
      <SettingItem className="flex-col gap-2">
        <Label htmlFor="name" className="font-semibold text-lg">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          defaultValue={profile.name}
          className="w-full rounded-lg"
        />
      </SettingItem>
      <SettingItem className="flex-col gap-2">
        <Label htmlFor="alias" className="font-semibold text-lg">
          Bio
        </Label>
        <Textarea
          className="resize-none min-h-0 rounded-lg"
          rows={3}
          placeholder="Bio"
          maxLength={150}
        />
      </SettingItem>
      <SettingItem className="flex-col gap-2">
        <Label htmlFor="gender" className="font-semibold text-lg">
          Gender
        </Label>
        <Select defaultValue={profile.gender}>
          <SelectTrigger className="hover:bg-secondary">
            <SelectValue placeholder="Choose gender"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </SettingItem>
      <SettingItem className="justify-end">
        <Button className="max-w-[120px] text-white w-full">Save</Button>
      </SettingItem>
    </SettingGroup>
  );
}
