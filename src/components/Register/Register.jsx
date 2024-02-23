import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const RegisterForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    Username: "",
    FullName: "",
    Email: "",
    Password: "",
    Latitude: "",
    Longitude: "",
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.iudi.xyz/register",
        formData
      );

      if (response.data.status === 200) {
        setFormData({
          Username: "",
          FullName: "",
          Email: "",
          Password: "",
          Latitude: "",
          Longitude: "",
        });
      }

      setShowModal(true);
      setIsSuccess(response.data.status === 200);
      setMessage(
        response.data.status === 200
          ? "Register Success"
          : response.data.message
      );
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Header />
      <h3
        className="text-3xl font-extrabold text-gray-900 text-center mb-6 mt-10"
        style={{
          color: "rgba(44,186,55,0.8127626050420168)",
        }}
      >
        REGISTER
      </h3>
      <div className="max-w-md w-full mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="Full Name"
              name="FullName"
              value={formData.FullName}
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
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(29,120,36,1) 0%, rgba(44,186,55,0.8127626050420168) 90%, rgba(0,255,68,1) 100%)",
              }}
              className="w-full py-2 px-4 rounded focus:outline-none text-white"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-500"
            style={{
              color: "rgba(44,186,55,0.8127626050420168)",
            }}
          >
            Log in
          </a>
        </p>
      </div>

      {/* <Footer /> */}

      {showModal && (
        <Modal
          isSuccess={isSuccess}
          title="REGISTER"
          message={message}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default RegisterForm;
