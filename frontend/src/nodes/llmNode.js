// llmNode.js

// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-system`}
//         style={{top: `${100/3}%`}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-prompt`}
//         style={{top: `${200/3}%`}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-response`}
//       />
//     </div>
//   );
// }


import React from 'react';
import BaseNode from './baseNode';
import { Handle, Position } from 'reactflow';

const LLMNode = ({ id, data }) => {
  const handles = (id) => (
    <>
      <Handle type="target" position={Position.Left} id={`${id}-system`} style={{ top: `${100 / 3}%` }} />
      <Handle type="target" position={Position.Left} id={`${id}-prompt`} style={{ top: `${200 / 3}%` }} />
      <Handle type="source" position={Position.Right} id={`${id}-response`} />
    </>
  );

  return <BaseNode id={id} data={data} type="LLM" handles={handles} parseVariables={false} />;
};

export default LLMNode;
