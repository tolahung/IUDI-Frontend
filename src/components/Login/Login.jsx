import React, { useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";

function LoginForm() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginData, setLoginData] = useState({
    fullName: "",
    password: "",
    rememberPassword: false,
  });

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setLoginData({ ...loginData, [name]: newValue });
  };

  const handleLogin = async (e) => {
    setShowModal(true);
    e.preventDefault();
    try {
      const response = await axios.post("https://api.iudi.xyz/login", {
        fullName: loginData.fullName,
        password: loginData.password,
      });
      setMessage("Login Success");
      console.log("Phản hồi từ API:", response.data);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Password or name is incorrect");
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
            onSubmit={handleLogin}
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
                placeholder="Họ Tên"
                name="fullName"
                value={loginData.fullName}
                onChange={handleLoginChange}
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
                placeholder="Mật Khẩu"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                  type="checkbox"
                  name="rememberPassword"
                  checked={loginData.rememberPassword}
                  onChange={handleLoginChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-sm">Ghi nhớ mật khẩu</span>
              </label>
            </div>
            <div className="mb-4">
              <button
                className="w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <p className="text-center text-gray-700 text-sm">
            Nếu chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-500">
              Đăng ký
            </a>
          </p>
        </div>
      </div>
      {showModal && (
        <Modal
          isSuccess={isSuccess}
          title="LOGIN"
          message={message}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default LoginForm;
