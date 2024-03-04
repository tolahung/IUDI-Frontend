import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import background from "../../images/background.jpg";

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
    LastLoginIP : "1",
    avatarLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9Zde21fi2AnY9_C17tqYi8DO25lRM_yAa7Q&usqp=CAU&fbclid=IwAR16g1ONptpUiKuDIt37LRxU3FTZck1cv9HDywe9VWxWSQBwcuGNfB7JUw4"
  });


  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };


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
        "https://api.iudi.xyz/api/register",
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
    <div
      style={
        {
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          // backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }
      }
    >
      <Header />
      <div className="max-w-md w-full mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 shadow-md rounded px-8 pt-3 pb-5 mb-2"
        >
          <h3
            className="text-3xl font-extrabold text-center mb-2 mt-2 "
            style={{
              color: "rgba(44,186,55,0.8127626050420168)",
            }}
          >
            REGISTER
          </h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
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
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
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
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
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

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
              id="avatarLink"
              type="text"
              name="avatarLink"
              value={formData.avatarLink}
              onChange={handleChange}
              required
            />

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
              id="LastLoginIP"
              type="text"
              name="LastLoginIP"
              value={formData.LastLoginIP}
              onChange={handleChange}
              required
            />

          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
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
              className="w-full py-2 px-4 font-bold rounded focus:outline-none text-white"
              type="submit"
            >
              Register
            </button>
          </div>
          <p
            className="text-center text-sm"
            style={{
              color: "rgba(44,186,55,0.8127626050420168)",
            }}
          >
            Already have an account ?{" "}
            <a href="/login" className="text-500">
              <strong>LOG IN</strong>
            </a>
          </p>
        </form>
      </div>

      <Footer />

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
