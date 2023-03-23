import { Code } from "lucide-react";
import { cva } from "class-variance-authority";
import { DragEvent } from "react";

import { textfield } from "~/components/ui/";
import { NodeType } from "../nodes";

const component = cva(
  "px-2 py-1 bg-indigo-4 rounded flex gap-2 items-center text-sm text-indigo-12 cursor-grab"
);
export const Sidenav = () => {
  const onDragStart = (event: DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-60 p-2">
      <input
        className={textfield()}
        type="text"
        placeholder="Search component"
      />
      <div className="flex flex-col mt-3 gap-1">
        <p className="text-gray-11 mb-2 text-sm">Common</p>
        <div
          draggable
          className={component()}
          onDragStart={(event) => onDragStart(event, "code")}
        >
          <Code className="w-4 h-4 text-indigo-10" />
          Code
        </div>
        <div
          draggable
          className={component()}
          onDragStart={(event) => onDragStart(event, "input")}
        >
          <Code className="w-4 h-4 text-indigo-10" />
          Input
        </div>
        <div
          draggable
          className={component()}
          onDragStart={(event) => onDragStart(event, "output")}
        >
          <Code className="w-4 h-4 text-indigo-10" />
          Output
        </div>
      </div>
    </aside>
  );
};
