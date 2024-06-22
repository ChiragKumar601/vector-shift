import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import "./BaseNode.css"; // Import the common styles

const BaseNode = ({
  id,
  data,
  type,
  customElements,
  handles,
  parseVariables,
}) => {
  const [inputFields, setInputFields] = useState(
    data?.inputFields || [{ text: data?.text || "", variables: [] }]
  );

  useEffect(() => {
    if (parseVariables) {
      const newInputFields = inputFields.map((inputField) => {
        const variableRegex = /{{\s*([\w\d_]+)\s*}}/g;
        const matches = [...inputField.text.matchAll(variableRegex)].map(
          (match) => match[1]
        );
        return { ...inputField, variables: matches };
      });
      setInputFields(newInputFields);
    }
  }, [data?.text, parseVariables]); // Only update when data?.text or parseVariables changes

  const handleTextChange = (index, e) => {
    const newInputFields = [...inputFields];
    newInputFields[index].text = e.target.value;
    if (parseVariables) {
      const variableRegex = /{{\s*([\w\d_]+)\s*}}/g;
      const matches = [
        ...newInputFields[index].text.matchAll(variableRegex),
      ].map((match) => match[1]);
      newInputFields[index].variables = matches;
    }
    setInputFields(newInputFields);
    autoResizeTextarea(e.target);
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="base-node">
      <div className="heading mb-4">
        <span>{type} Node</span>
      </div>
      {customElements && customElements(id, data)}
      {inputFields.map((inputField, index) => (
        <div className="nodes flex flex-col gap-4 mb-2" key={index}>
          <div className="relative z-0 w-full">
            <textarea
              value={inputField.text}
              onChange={(e) => handleTextChange(index, e)}
              className="block px-2.5 pb-1.5 pt-1.5 w-full text-sm text-gray-900 bg-white rounded-md  appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none overflow-hidden"
              placeholder=" "
              rows={1}
              style={{ minHeight: "40px", maxHeight: "200px" }} // Adjust the maxHeight as needed
              onInput={(e) => autoResizeTextarea(e.target)}
            />
            <label
              htmlFor={`floating_input_${index}`}
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Text
            </label>
          </div>
          {parseVariables &&
            inputField.variables.map((variable) => (
              <div
                className="variable-handle"
                key={`${id}-input-${index}-${variable}`}
              >
                <span>{variable}</span>
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${id}-input-${index}-${variable}`}
                  style={{ left: "-15px" }}
                />
              </div>
            ))}
        </div>
      ))}
      {handles && handles(id)}
    </div>
  );
};

export default BaseNode;

