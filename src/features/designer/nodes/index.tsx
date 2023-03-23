import { NodeCode } from "./code";

export const nodeTypes = {
  code: NodeCode,
  input: NodeCode,
  output: NodeCode,
} as const;

export type NodeType = keyof typeof nodeTypes;
