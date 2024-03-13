import React, { useEffect } from "react";
import axios from "axios";
// import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import background from "../../images/background.jpg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import loginSchema from "../../schemas/login";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  const { register,
    handleSubmit,
    // reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(loginSchema) })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json/");
        setValue('Latitude', response.data.lat)
        setValue('Longitude', response.data.lon)
        setValue('LastLoginIP', response.data.query)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate()
  const handleLogin = async (data) => {
    if (isValid) {
      try {
        const response = await axios.post("https://api.iudi.xyz/api/login", data);

        console.log("Phản hồi từ API:", response?.data);
        localStorage.setItem("IuDiToken", response?.data?.jwt);
        localStorage.setItem(
          "UserNameIuDi",
          response?.data.user.Users[0].Username
        );
        localStorage.setItem("InforCurrentUser", JSON.stringify(response?.data?.user.Users[0]));
        toast.success('Login successfully!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: "light",
        });
        setTimeout(navigate('/personal', 5000))
      } catch (error) {
        console.error("Error registering:", error);
        toast.error(`Register failed! ${error.response.data.message}`, { closeOnClick: true });
      }
    }
    else toast.warning("An error occur...")
  };

  return (

    <div
      style={backgroundImageStyle}
    >
      <Header />

      <div className="flex items-center justify-center mt-20">
        <div className="max-w-md w-full mx-auto">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="bg-zinc-900 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* <ToastContainer/> */}
            <h3
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
              className="text-white text-3xl font-extrabold text-center mb-2 mt-2"
            >
              LOGIN
            </h3>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Username"
                style={{
                  color: "rgba(44,186,55,0.8127626050420168)",
                }}
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Username"
                type="text"
                placeholder="Username"
                name="Username"
                {...register('Username')}
              />

              {errors.Username && (
                <p className="text-red-500 text-sm font-bold mt-2"> {errors.Username.message} </p>
              )}

            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Password"
                style={{
                  color: "rgba(44,186,55,0.8127626050420168)",
                }}
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Password"
                type="password"
                placeholder="Password"
                name="Password"
                {...register('Password')}
              />
              {errors.Password && (
                <p className="text-red-500 text-sm font-bold mt-2"> {errors.Password.message} </p>
              )}
            </div>
            <div className="mb-4">
              <button
                style={{
                  background: "rgba(44,186,55,0.8127626050420168)",
                }}
                className="w-full mt-2 py-2 px-4 font-bold rounded text-white focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
            <p
              className="text-white text-center  text-sm"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Don't have an account ?{" "}
              <a href="/register" className="text-500">
                <strong>REGISTER</strong>
              </a>
            </p>
            <p className="text-green-600 mt-2 text-center">
              <a href="/forgot-password" className="text-200">
                <strong>Forgot password ?</strong>
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />

    </div>
  );
}
export default LoginForm;
