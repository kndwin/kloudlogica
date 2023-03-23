import "reactflow/dist/style.css";
import { useState, useRef, useCallback, Ref, DragEventHandler } from "react";
import { shallow } from "zustand/shallow";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  type ReactFlowInstance,
} from "reactflow";

import { nodeTypes } from "~/features/designer/nodes";
import { useCanvasStore, CanvasState } from "./store";

const selector = (state: CanvasState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

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

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();

      //@ts-expect-error: onDrop container will be present
      const reactFlowBounds = container.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      //@ts-expect-error: onDrop instance will be present
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
