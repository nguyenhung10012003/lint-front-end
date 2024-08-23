"use client";
import useDraggable from "@/hooks/use-draggable";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  const { position, onMouseDown } = useDraggable(ref);

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full m-3 border-gray-500 absolute z-50"
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
        style={{
          top: position.y,
          left: position.x,
        }}
        ref={ref}
        onMouseDown={onMouseDown}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
