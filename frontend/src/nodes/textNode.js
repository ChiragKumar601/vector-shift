// // textNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const TextNode = ({ id, data }) => {
//   const [currText, setCurrText] = useState(data?.text || '{{input}}');

//   const handleTextChange = (e) => {
//     setCurrText(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Text</span>
//       </div>
//       <div>
//         <label>
//           Text:
//           <input
//             type="text"
//             value={currText}
//             onChange={handleTextChange}
//           />
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-output`}
//       />
//     </div>
//   );
// }

import React from "react";
import BaseNode from "./baseNode";
import { Handle, Position } from "reactflow";

const TextNode = ({ id, data }) => {
  const handles = (id) => (
    <Handle
      type="source"
      position={Position.Right}
      id={`${id}-output`}
      style={{ right: "-3px", top: "50%", transform: "translateY(-50%)" }}
    />
  );

  return (
    <BaseNode
      id={id}
      data={data}
      type="Text"
      handles={handles}
      parseVariables={true}
    />
  );
};

export default TextNode;
