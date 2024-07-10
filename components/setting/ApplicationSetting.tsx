import { locales } from "@/utils/locale";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SettingGroup, SettingItem } from "./Setting";

export default function ApplicationSetting() {
  return (
    <SettingGroup title="Application" id={"application"}>
      <SettingItem className="w-full justify-between items-center">
        <Label htmlFor="theme" className="text-lg flex w-full">
          Theme
        </Label>
        <Select defaultValue="system">
          <SelectTrigger className="max-w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </SettingItem>
      <SettingItem className="w-full justify-between items-center">
        <Label htmlFor="theme" className="text-lg flex w-full">
          Language
        </Label>
        <Select>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {locales.map((locale) => (
              <SelectItem key={locale.key} value={locale.key}>
                {locale.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SettingItem>
      <SettingItem className="justify-end">
        <Button className="max-w-[120px] text-white w-full">Save</Button>
      </SettingItem>
    </SettingGroup>
  );
}
