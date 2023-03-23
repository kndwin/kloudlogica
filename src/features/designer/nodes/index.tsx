import { Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Handle, Position, Node } from "reactflow";

export const nodeTypes = {
  code: NodeCode,
  input: NodeCode,
  output: NodeCode,
} as const;

export type NodeType = keyof typeof nodeTypes;

export function NodeCode({ data }: { data: Node["data"] }) {
  return (
    <div className="py-1 shadow-md rounded bg-gray-1 border border-gray-8 text-gray-12 divide-y divide-gray-8">
      <div className="px-2 py-1 text-sm font-bold flex gap-2 items-center">
        <Code className="w-4 h-4" />
        <p>Code</p>
      </div>
      <SyntaxHighlighter
        language="javascript"
        style={dark}
        customStyle={{ margin: 0 }}
      >
        {"var hello = 'world'"}
      </SyntaxHighlighter>
      <Handle type="target" position={Position.Right} className="w-16" />
      <Handle type="source" position={Position.Left} className="w-16" />
    </div>
  );
}
