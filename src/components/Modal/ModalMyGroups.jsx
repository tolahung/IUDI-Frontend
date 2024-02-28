import React from "react";

function ModalMyGroups({ userId, isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <h1>My Groups</h1>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalMyGroups;
