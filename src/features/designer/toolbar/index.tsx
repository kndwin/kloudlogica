import { cva } from "class-variance-authority";
import { Play } from "lucide-react";

const tw = {
  header: cva(
    "w-full bg-gray-1 flex p-2 border-b border-gray-4 gap-2 items-center justify-between"
  ),
};
export const Toolbar = () => {
  return (
    <header className={tw.header()}>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex gap-1 text-sm items-center text-gray-12">
          <Play className="text-grass-9 w-4 h-4" />
          RUN
        </div>
      </div>
    </header>
  );
};
