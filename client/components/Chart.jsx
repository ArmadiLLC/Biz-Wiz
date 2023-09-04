import Dagre from '@dagrejs/dagre';
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
const initialEdges = [];

// sample nodes for testing layout
const initialNodes = [];

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach(edge => g.setEdge(edge.source, edge.target));
  nodes.forEach(node => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map(node => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const fetchEmployees = async () => {
    setEdges([]);
    try {
      // get data
      const response = await fetch('/api');
      const data = await response.json();

      // create nodes and edges out of the fetched data
      const formattedNodes = data.map(employee => ({
        id: employee.id.toString(),
        data: { label: `${employee.firstname} ${employee.lastname}` },
        position: { x: 0, y: 0 }, // change this logic later after verfiying the data has been retrieved
      }));

      let i = 0;
      const formattedEdges = data.map(employee => ({
        id: `edge-${i++}`,
        source: employee.bossid ? employee.bossid.toString() : null,
        target: employee.id.toString(),
      }));
      // set chart components state
      setNodes([...nodes, ...formattedNodes]);
      setEdges([...edges, ...formattedEdges]);

      //properly size the page
      fitView();
    } catch (err) {
      console.error('Error fetching Data: ', err);
    }
  };
  // useEffect(() => {
  //   fetchEmployees();
  // }, [nodes, edges]);

  const onLayout = useCallback(
    direction => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView>
      <Panel position='top-right'>
        <button onClick={() => fetchEmployees()}>update chart</button>
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
