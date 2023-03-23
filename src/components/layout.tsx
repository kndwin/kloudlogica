import { useTheme } from "~/hooks";
import { Outlet } from "react-router-dom";
import { DrawerHelp, useOpenDrawerHelp } from "~/features/help";

import { useHotkeys } from "~/hooks";

export const RootLayout = () => {
  const { toggleDrawer } = useOpenDrawerHelp();
  const { theme } = useTheme();

  useHotkeys([["shift+Slash", () => toggleDrawer()]]);
  return (
    <div className={theme}>
      <Outlet />
      <DrawerHelp />
    </div>
  );
};
