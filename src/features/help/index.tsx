import { atom, useAtom } from "jotai";

import {
  SheetRoot,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
  textfield,
} from "~/components/ui";

const dialogHelpAtom = atom(false);

export const DrawerHelp = () => {
  const [open, setOpen] = useAtom(dialogHelpAtom);

  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetContent id={"drawer-help"}>
        <SheetHeader>
          <SheetTitle>Help</SheetTitle>
          <SheetDescription>
            Adipisicing lorem deleniti possimus nostrum nisi placeat Iste sit
            doloribus modi optio porro? Beatae quisquam eveniet odio
            consequuntur sequi. Accusamus
          </SheetDescription>
        </SheetHeader>
        <div>
          <input
            className={textfield({ class: "mt-4" })}
            type="text"
            placeholder="Search"
          />
        </div>
      </SheetContent>
    </SheetRoot>
  );
};

export const useOpenDrawerHelp = () => {
  const [open, setOpen] = useAtom(dialogHelpAtom);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return {
    open,
    setOpen,
    toggleDrawer,
  };
};
