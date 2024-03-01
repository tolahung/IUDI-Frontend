import React, { useState } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import background from "../../images/background.jpg";

function ForgotPassword() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.iudi.xyz/api/forgotPassword", {
        Email: email,
      });
      setShowModal(true);
      if (response.status === 200) {
        setMessage("Please check your email.");
        setIsSuccess(true);
        setEmail("");
      }
    } catch (error) {
      setShowModal(true);
      setIsSuccess(false);
      setMessage("Something went wrong");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
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
      <div className="mt-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-8 bg-zinc-900 rounded-md shadow-lg mt-10">
          <h3
            className="text-3xl font-extrabold text-gray-900 text-center mb-6"
            style={{
              color: "rgba(44,186,55,0.8127626050420168)",
            }}
          >
            Forgot Your Password ?
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email-address"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{
                  color: "rgba(44,186,55,0.8127626050420168)",
                }}
              ></label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email address"
              />
            </div>
            <div className="flex justify-center">
              <button
                style={{
                  background: "rgba(44,186,55,0.8127626050420168)",
                }}
                type="submit"
                className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <Modal
          isSuccess={isSuccess}
          title="Forgot Password"
          message={message}
          onClose={closeModal}
        />
      )}
      <Footer />
    </div>
  );
}

export default ForgotPassword;
