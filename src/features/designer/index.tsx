import { Toolbar } from "./toolbar";
import { Sidenav } from "./sidenav";
import { Canvas } from "./canvas";

export const Designer = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Toolbar />
      <div className="flex-1 flex w-full h-full">
        <Sidenav />
        <Canvas />
      </div>
    </div>
  );
};
