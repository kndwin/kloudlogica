import { X, Plus, Play, Code } from "lucide-react";
import { cva } from "class-variance-authority";
import { DialogSettings } from "~/features/settings";

import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-gray-1">
      {children}
    </div>
  );
};

const tw = {
  header: cva(
    "w-full bg-gray-1 flex p-2 border-b border-gray-4 gap-2 items-center justify-between"
  ),
};

export const TabNav = () => {
  return (
    <nav className={tw.header()}>
      <div className="flex items-center gap-2">
        <DialogSettings />
        <div className="px-2 py-1 bg-gray-3 rounded-sm flex items-center gap-2 text-sm text-gray-10">
          <X className="h-4 w-4" />
          POST Flow API
        </div>
        <div className="px-2 py-1 bg-gray-7 rounded-sm flex items-center gap-2 text-sm text-gray-12 font-bold">
          <X className="h-4 w-4" />
          GET v1
        </div>
        <div className="px-2 py-1 bg-gray-4 rounded-sm flex items-center gap-2 text-sm h-7 hover:bg-gray-2">
          <Plus className="h-4 w-4 text-gray-12" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="px-2 py-1 bg-grass-5 rounded-sm flex items-center gap-2 text-sm text-grass-12 font-bold">
          DEV
        </div>
      </div>
    </nav>
  );
};
