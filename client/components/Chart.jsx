import Dagre from '@dagrejs/dagre';
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import EmployeeInfoBox from './EmployeeInfoBox';
const initialEdges = [];


// sample nodes for testing layout
const initialNodes = [];
const g = new Dagre.graphlib.Graph();
g.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 172;
const nodeHeight = 36;


const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach(edge => g.setEdge(edge.source, edge.target));
  nodes.forEach(node => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);
      let sourcePosition;
      let targetPosition;
      (options.direction === 'TB') ? sourcePosition = 'bottom' : sourcePosition = 'right';
      (options.direction === 'TB') ? targetPosition = 'top' : targetPosition = 'left';
      return { ...node, position: { x, y }, 'sourcePosition': sourcePosition, 'targetPosition': targetPosition };
    }),
    edges,
  };
};

const LayoutFlow = (props) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [moreEmployeeInfohidden, setMoreEmployeeInfoHidden] = useState(true);
  const [ moreEmployeeInfoPos, setMoreEmployeeInfoPos] = useState([0,0]);
  const [employeeData, setEmployeeData] = useState(
    {
      "id": 1,
      "firstname": "Jacob",
      "lastname": "Sasser",
      "jobtitle": "server master",
      "datehired": null,
      "email": null,
      "bossid": null,
      "shortbio": null,
      "salary": null
  }
  );
  const deleteNodeById = (id) => {
    setNodes(nodes => nodes.filter(node=> +node.id !== +id));
  }
  const fetchEmployees = async () => {
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
      
      const formattedEdges = data.map((employee) => ({
        id: `edge-${Number(employee.id)*Math.random()*100}`,
        source: employee.bossid ? employee.bossid.toString() : null,
        target: employee.id.toString(),
      }));
      // set chart components state
      // const layouted = getLayoutedElements(formattedNodes, formattedEdges, {direction: 'TB'});
      
      setNodes([...formattedNodes]);
      setEdges([...formattedEdges]);
      onLayout('TB')
      //properly size the page
      fitView();
    } catch (err) {
      console.error('Error fetching Data: ', err);
    }
  };
  const fetchEmployeeData = async (id) =>{
    const response = await fetch('/api/query?id='+id)
    const data = await response.json();
    return data[0];
  }
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
    <div>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={async (e, node) => {
        const pos = e.target.getBoundingClientRect();
        setMoreEmployeeInfoPos([pos.bottom, pos.left]);
        setEmployeeData(await fetchEmployeeData(+node.id));
        setMoreEmployeeInfoHidden(!moreEmployeeInfohidden)}
      }
      fitView>
      <Panel position='top-right'>
        <button onClick={() => fetchEmployees()}>update chart</button>
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>

    </ReactFlow>
          <EmployeeInfoBox hidden = {moreEmployeeInfohidden} data={employeeData} deleteNode = {deleteNodeById} pos = {moreEmployeeInfoPos}/>
          </div>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
