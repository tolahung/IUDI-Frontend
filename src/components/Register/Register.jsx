import React, { useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";

const RegisterForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("You must agree to the terms and conditions");
      return;
    }
    try {
      const response = await axios.post(
        "https://api.iudi.xyz/register",
        formData
      );
      console.log(response.data);

      response.data.Status != 200 ? setIsSuccess(false) : setIsSuccess(true);
      setShowModal(true);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md w-full mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Họ Tên
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mật Khẩu
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">Đồng ý điền khoản và điều kiện</span>
              </label>
            </div>
            <div className="mb-4">
              <button
                className={`w-full py-2 px-4 rounded focus:outline-none ${
                  formData.agreeTerms
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                type="submit"
                disabled={!formData.agreeTerms}
              >
                Đăng Kí
              </button>
            </div>
          </form>
          <p className="text-center text-gray-700 text-sm">
            Nếu đã có tài khoản?{" "}
            <a href="/login" className="text-blue-500">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>

      {showModal && (
        <Modal
          isSuccess={isSuccess}
          title="REGISTER"
          message={message}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default RegisterForm;
