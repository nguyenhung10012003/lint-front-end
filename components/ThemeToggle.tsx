'use client';
import {MoonIcon, SunIcon} from "lucide-react";
import {useTheme} from "next-themes";

export default function ThemeToggle() {
  const {theme, setTheme} = useTheme();
  return (
    <div className="flex items-center fixed right-0 bottom-0 p-2 z-50">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <SunIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        ) : (
          <MoonIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        )}
      </button>
    </div>
  );
}