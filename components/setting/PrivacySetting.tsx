import BlacklistModal from "../BlacklistModal";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { SettingGroup, SettingItem } from "./Setting";

export default function PrivacySetting() {
  return (
    <SettingGroup title="Privacy" id="privacy">
      <SettingItem className="justify-between">
        <Label htmlFor="private-account" className="text-md flex items-center">
          <Icons.lock className="w-6 h-6 mr-2" />
          <span>Private Account</span>
        </Label>
        <Switch id="private-account" />
      </SettingItem>
      <SettingItem className="w-full">
        <BlacklistModal />
      </SettingItem>
      <SettingItem className="justify-end">
        <Button className="max-w-[120px] text-white w-full">Save</Button>
      </SettingItem>
    </SettingGroup>
  );
}
