import "reactflow/dist/style.css";
import { Suspense, useState, useRef, useCallback, Ref, useEffect } from "react";
import { shallow } from "zustand/shallow";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  Handle,
  Position,
  Node,
  type ReactFlowInstance,
} from "reactflow";
import { Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { useCanvasStore, CanvasState } from "./store";

const selector = (state: CanvasState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  code: NodeCode,
};

export const Canvas = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [instance, setInstance] = useState<ReactFlowInstance | null>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useCanvasStore(selector, shallow);
  const { onDrop, onDragOver } = useCanvas({ container, instance });

  return (
    <ReactFlowProvider>
      <div className="w-full h-auto flex-1" ref={container}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setInstance}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

type UseCanvasProps = {
  container: Ref<HTMLDivElement> | null;
  instance: ReactFlowInstance | null;
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const useCanvas = ({ container, instance }: UseCanvasProps) => {
  const addNode = useCanvasStore((s) => s.addNode);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = container.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = instance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      addNode(newNode);
    },
    [instance]
  );

  return {
    onDrop,
    onDragOver,
  };
};

function NodeCode({ data }: { data: Node["data"] }) {
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
