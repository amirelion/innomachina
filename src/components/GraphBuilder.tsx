import { ReactFlow, Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState, Connection } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const startNodes = [
  { id:"n1", position:{x:0,y:0}, data:{label:"Node 1"} },
  { id:"n2", position:{x:240,y:-60}, data:{label:"Node 2"} }
];
const startEdges = [{ id:"e1-2", source:"n1", target:"n2" }];

export default function GraphBuilder(){
  const [nodes, setNodes, onNodesChange] = useNodesState(startNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(startEdges);
  const onConnect = (c:Connection)=>setEdges((eds)=>addEdge(c, eds));
  return (
    <div className="h-full">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
