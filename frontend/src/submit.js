// // submit.js

// // import { useEdges } from "reactflow";

// import { useStore } from "./store";
// import { shallow } from "zustand/shallow";

// const selector = (state) => ({
//     nodes: state.nodes,
//     edges: state.edges,
//   });

// export const SubmitButton = () => {

//     const {
//         nodes,
//         edges,
//       } = useStore(selector, shallow);

//     const handleSubmit = async () => {
//         let data = { nodes: nodes, edges: edges};
//         console.log(data);
//         try {
//             const response = await fetch("http://localhost:8000/setup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const result = await response.json();
//             console.log("Success:", result);
//         } catch (err) {
//             console.log("Error>>>>>", err);
//         }
//     };

//     return (
//         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//             <button type="submit" onClick={handleSubmit} >Submit</button>
//         </div>
//     );
// }

import { useState } from "react";
import { useStore } from "./store"; // Assuming this imports your Zustand store correctly
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    const data = { nodes: nodes, edges: edges };
    console.log("Submitting data:", data);
    try {
      const response = await fetch("http://localhost:8000/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAlertMessage(result);
      console.log("Success:", result);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleButtonClick = async () => {
    await handleSubmit();
    toggleModal();
  };

  return (
    <div>
      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <button
          onClick={handleButtonClick}
          className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Submit
        </button>
      </div>

      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 transition-opacity ease-out duration-300"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full transition-transform transform ease-out duration-300">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Results
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {`Number of nodes = ${alertMessage.num_nodes}`}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {`Number of edges = ${alertMessage.num_edges}`}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {`Directed Acyclic Graph = ${alertMessage.is_dag}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
