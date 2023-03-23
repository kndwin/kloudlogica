import { atom, useAtom } from "jotai";
import {
  DialogRoot,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  Switch,
} from "~/components/ui";
import { Brush } from "lucide-react";
import { Grid, Moon, Sun } from "lucide-react";
import { useHotkeys, useTheme } from "~/hooks";

const dialogSettingAtom = atom(false);

export const DialogSettings = () => {
  const [open, setOpen] = useAtom(dialogSettingAtom);
  useHotkeys([["ctrl+s", () => setOpen(!open)]]);
  const { toggleTheme, theme } = useTheme();
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Grid className="h-5 w-5 text-gray-10" />
      </DialogTrigger>
      <DialogContent id="dialog-settings" className={"flex flex-col"}>
        <DialogHeader className="h-fit">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex h-full w-full lg:min-h-[80vh]">
          <aside className="w-60 h-full">
            <div className="px-2 py-1 bg-gray-4 rounded flex items-center gap-2 text-gray-12">
              <Brush className="h-3 w-3 text-gray-12 " />
              Appearance
            </div>
          </aside>
          <div className="pl-4 flex flex-col">
            <p className="text-gray-11 font-bold text-sm">Theme</p>
            <div className="flex gap-4 items-center">
              <p className="text-gray-10 text-xs flex grap-2 items-center gap-2">
                <Moon className="w-3 h-3" />
                Dark
              </p>
              <Switch
                checked={theme === "light"}
                onCheckedChange={() => toggleTheme()}
              />
              <p className="text-gray-10 text-xs flex grap-2 items-center gap-2">
                <Sun className="w-3 h-3" />
                Light
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogRoot>
  );
};
