// inputNode.js

// import { useState } from 'react';
// import { Handle, Position } from 'reactflow';

// export const InputNode = ({ id, data }) => {
//   const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
//   const [inputType, setInputType] = useState(data.inputType || 'Text');

//   const handleNameChange = (e) => {
//     setCurrName(e.target.value);
//   };

//   const handleTypeChange = (e) => {
//     setInputType(e.target.value);
//   };

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <div>
//         <span>Input</span>
//       </div>
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={currName}
//             onChange={handleNameChange}
//           />
//         </label>
//         <label>
//           Type:
//           <select value={inputType} onChange={handleTypeChange}>
//             <option value="Text">Text</option>
//             <option value="File">File</option>
//           </select>
//         </label>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-value`}
//       />
//     </div>
//   );
// }

import React from "react";
import BaseNode from "./baseNode";
import { Handle, Position } from "reactflow";

const InputNode = ({ id, data }) => {
  const customElements = (id, data) => (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div class="relative mb-5">
          <input
            type="text"
            id="floating_outlined"
            class="block px-2.5 pb-1.5 pt-2 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Input
          </label>
        </div>
      </div>
      <label>
        Type:
        <select
        className="mb-5"
        // value={data.inputType || "Text"} onChange={(e) => {}}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </div>
  );

  const handles = (id) => (
    <Handle type="source" position={Position.Right} id={`${id}-value`} />
  );

  return (
    <BaseNode
      id={id}
      data={data}
      type="Input"
      customElements={customElements}
      handles={handles}
      parseVariables={false}
    />
  );
};

export default InputNode;
