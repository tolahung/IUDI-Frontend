import React from "react";

function Modal({ isSuccess, title, message, onClose }) {
  return (
    <div
      style={{ color: ` ${isSuccess ? "#32CD32" : "red"}` }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div
          style={{ border: `3px solid ${isSuccess ? "#32CD32" : "red"}` }}
          className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          {/*header*/}
          <div className="flex items-center justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-xl font-semibold m-0">{title}</h3>
            <button
              className="text-gray-500 background-transparent text-xl font-bold uppercase text-sm outline-none focus:outline-none m-0 p-0"
              type="button"
              onClick={onClose}
            >
              ×
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed capitalize">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
