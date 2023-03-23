import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const themeAtom = atomWithStorage<"dark" | "light">("theme", "light");

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
