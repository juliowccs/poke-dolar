import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
 const {setTheme} = useTheme();

  return (
   <Button
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className="absolute top-4 right-4 p-3 rounded-full bg-white hover:bg-gray-50 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-yellow-400 shadow-lg transition-all duration-300 hover:scale-105"
      aria-label="Alternar tema"
    >
      <Sun className="h-6 w-6 dark:hidden" />
      <Moon className="h-6 w-6 hidden dark:block" />
    </Button>
  )
}