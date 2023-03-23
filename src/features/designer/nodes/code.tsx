import { Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Handle, Position, Node } from "reactflow";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "~/components/ui";

const placeholder = {
  code: `function addOne () {
	let num = 0; 
	return num + 1
}`,
  input: `{
	hello: "world",
	how: {
		are: "you"
	}
}`,
  output: `{
	hello: "world",
	how: {
		are: "you"
	}
}`,
};

export function NodeCode({ data }: { data: Node["data"] }) {
  return (
    <div className="py-1 shadow-md rounded bg-gray-1 border border-gray-8 text-gray-12 divide-y divide-gray-8 min-w-[20em]">
      <div className="px-2 py-1 text-sm font-bold flex gap-2 items-center">
        <Code className="w-4 h-4" />
        <p>Code</p>
      </div>
      <Accordion type="multiple">
        <AccordionItem value="code" className="px-2">
          <AccordionTrigger className="text-sm py-1">Code</AccordionTrigger>
          <AccordionContent>
            <SyntaxHighlighter
              language="javascript"
              style={dark}
              customStyle={{ margin: 0 }}
            >
              {placeholder.code}
            </SyntaxHighlighter>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="input" className="px-2">
          <AccordionTrigger className="text-sm py-1">Input</AccordionTrigger>
          <AccordionContent>
            <SyntaxHighlighter
              language="json"
              style={dark}
              customStyle={{ margin: 0 }}
            >
              {placeholder.input}
            </SyntaxHighlighter>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="output" className="px-2">
          <AccordionTrigger className="text-sm py-1">Output</AccordionTrigger>
          <AccordionContent>
            <SyntaxHighlighter
              language="javascript"
              style={dark}
              customStyle={{ margin: 0 }}
            >
              {placeholder.output}
            </SyntaxHighlighter>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Handle type="target" position={Position.Right} className="w-16" />
      <Handle type="source" position={Position.Left} className="w-16" />
    </div>
  );
}
