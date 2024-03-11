// import axios from "axios";
import React, { useState } from "react";

const ModalChangePassWord = ({ userId, isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <p className="mb-4">{message}</p>
        <input
          type="text"
          placeholder="Add group"
          className="border border-gray-300 mb-2 p-2 block w-full"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Add
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChangePassWord;
