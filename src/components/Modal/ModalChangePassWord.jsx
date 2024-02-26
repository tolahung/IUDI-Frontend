import axios from "axios";
import React, { useState } from "react";

const ModalChangePassWord = ({ userId, isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New passwords don't match");
      return;
    }

    try {
      const response = await axios.patch(
        `https://api.iudi.xyz/api/profile/change_password/${userId}`,
        {
          Password: currentPassword,
          NewPassword: newPassword,
        }
      );
      console.log(response.data);
      response.status == 200
        ? (setMessage("Change Password Success"),
          setCurrentPassword(""),
          setNewPassword(""),
          setConfirmPassword(""))
        : setMessage("Change Password Failed");
    } catch (error) {}
  };

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
          type="password"
          placeholder="Current Password"
          className="border border-gray-300 mb-2 p-2 block w-full"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="border border-gray-300 mb-2 p-2 block w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="border border-gray-300 mb-4 p-2 block w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            onClick={handleChangePassword}
          >
            Change Password
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
