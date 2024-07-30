'use client';
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
import { useState } from "react";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";
import { useToast } from "../ui/use-toast";
import { useRouter, usePathname } from 'next/navigation';

export default function ApplicationSetting({dictionary}: {dictionary: any}) {
  const defaultTheme = Cookies.get("theme") || "system";
  const currentLocale = Cookies.get("locale") || "vi-VN";

  const [theme, setTheme] = useState(defaultTheme);
  const [locale, setLocale] = useState(currentLocale);
  const { setTheme: applyTheme } = useTheme();

  const router = useRouter();
  const pathname = usePathname();
  
  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  const handleLanguageChange = (value: string) => {
    setLocale(value);
  };

  const { toast } = useToast();
  
  const handleSave = () => {
    applyTheme(theme);
    Cookies.set("theme", theme);

    const newLocale = locale;
    Cookies.set("locale", newLocale);

    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.replace(newPathname);
    router.refresh();
    // toast({
    //   title: dictionary.setting.application.toast.updateSettingSuccessTitle,
    //   description: dictionary.setting.application.toast.updateSettingSuccessDescription,
    // });
  }

  return (
    <SettingGroup title={dictionary.setting.application.title} id={"application"}>
      <SettingItem className="w-full justify-between items-center">
        <Label htmlFor="theme" className="text-lg flex w-full">
          {dictionary.setting.application.theme}
        </Label>
        <Select defaultValue={theme} onValueChange={handleThemeChange}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">{dictionary.setting.application.themeSystem}</SelectItem>
            <SelectItem value="light">{dictionary.setting.application.themeLight}</SelectItem>
            <SelectItem value="dark">{dictionary.setting.application.themeDark}</SelectItem>
          </SelectContent>
        </Select>
      </SettingItem>
      <SettingItem className="w-full justify-between items-center">
        <Label htmlFor="language" className="text-lg flex w-full">
          {dictionary.setting.application.language}
        </Label>
        <Select defaultValue={locale} onValueChange={handleLanguageChange}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue />
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
        <Button className="max-w-[120px] text-white w-full" onClick={handleSave}>{dictionary.setting.application.submit}</Button>
      </SettingItem>
    </SettingGroup>
  );
}
