import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";

function LoginForm() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginData, setLoginData] = useState({
    Username: "",
    Password: "",
    Latitude: "",
    Longitude: "",
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLoginData({
          ...loginData,
          Latitude: latitude,
          Longitude: longitude,
        });
      });
    } else {
      console.log("Trình duyệt không hỗ trợ geolocation.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    setShowModal(true);
    e.preventDefault();
    try {
      const response = await axios.post("https://api.iudi.xyz/login", {
        Username: loginData.Username,
        Email: loginData.Email,
        Password: loginData.Password,
        Latitude: loginData.Latitude,
        Longitude: loginData.Longitude,
      });
      setMessage("Login Success");
      setIsSuccess(true);
      console.log("Phản hồi từ API:", response.data);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Password or Username is incorrect");
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
                htmlFor="Username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Username"
                type="text"
                placeholder="Username"
                name="Username"
                value={loginData.Username}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Password"
                type="password"
                placeholder="Password"
                name="Password"
                value={loginData.Password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-4">
              <button
                className="w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center text-gray-700 text-sm">
            Don't have an account ?{" "}
            <a href="/register" className="text-blue-500">
              Register
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
