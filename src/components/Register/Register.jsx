import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import background from "../../images/background.jpg";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import registerSchema from "../../schemas/register";
import { joiResolver } from "@hookform/resolvers/joi";

const RegisterForm = () => {
  const [sta, setSta] = useState(true)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(registerSchema) });

  const getLocation = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus)=>{
        if (permissionStatus.state === 'granted') {
          // Vị trí đã được cho phép
            navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setValue(
              'Latitude', latitude
            );
            setValue(
              'Longitude', longitude
            );
            setValue(
              'avatarLink', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9Zde21fi2AnY9_C17tqYi8DO25lRM_yAa7Q&usqp=CAU&fbclid=IwAR16g1ONptpUiKuDIt37LRxU3FTZck1cv9HDywe9VWxWSQBwcuGNfB7JUw4'
            )
            setValue('LastLoginIP', '1')
          });
          setSta(true)
        } else if (permissionStatus.state === 'prompt') {
          // Hiển thị cửa sổ xác nhận yêu cầu vị trí
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setValue(
              'Latitude', latitude
            );
            setValue(
              'Longitude', longitude
            );
            setValue(
              'avatarLink', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9Zde21fi2AnY9_C17tqYi8DO25lRM_yAa7Q&usqp=CAU&fbclid=IwAR16g1ONptpUiKuDIt37LRxU3FTZck1cv9HDywe9VWxWSQBwcuGNfB7JUw4'
            )
            setValue('LastLoginIP', '1')
            setSta(true)
          }, alert('Vui lòng mở vị trí trước khi tiếp tục!')&&setSta(false));
        } else if (permissionStatus.state === 'denied') {
          // Vị trí bị từ chối
          alert("Vui lòng mở vị trí trước khi tiếp tục!");
          setSta(false)
        }
      })

    } else {
      alert("Trình duyệt không hỗ trợ geolocation hoặc trình duyệt chặn truy cập vị trí, vui lòng kiểm tra!.");
      setSta(false)
    }
  };

  useEffect(() => {
    getLocation();
    window.addEventListener('GeolocationPermissionChangeEvent', getLocation)
  }, []);

  const handleSubmitForm = async (data) => {
    if (isValid) {
      try {
        const response = await axios.post(
          "https://api.iudi.xyz/api/register",
          data
        );
        (response.data.status === 200) && toast.success("Register successfully!") && reset();
      } catch (error) {
        console.error("Error registering:", error);
        toast.error(`Register failed! ${error.response.data.message}`, { closeOnClick: true });
      }
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
      <div className="max-w-md w-full mx-auto mt-10">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="rounded-[20px] px-8 pt-3 pb-5 mb-2 border-2 border-[#49a849]"
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
              className="block text-whitetext-sm font-bold mb-2"
              htmlFor="username"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Username
            </label>
            <input
              className="shadow appearance-none border dark:text-white rounded w-full py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="Username"
              {...register("Username")}
            />
            {errors.Username && (
              <p className="text-red-500 text-sm font-bold mt-2"> {errors.Username.message} </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="fullName"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded dark:text-white w-full py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="Full Name"
              name="FullName"
              {...register("FullName")}
            />
            {errors.FullName && (
              <p className="text-red-500 text-sm font-bold mt-2"> {errors.FullName.message} </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-whitetext-sm font-bold mb-2"
              htmlFor="email"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full dark:text-white py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="Email"
              {...register("Email")}
            />
            {errors.Email && (
              <p className="text-red-500 text-sm font-bold mt-2"> {errors.Email.message} </p>
            )}
            <input
              className="shadow appearance-none border rounded dark:text-white w-full py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline hidden"
              id="avatarLink"
              type="text"
              name="avatarLink"
              {...register("avatarLink")}
            />
            <input
              className="shadow appearance-none border rounded dark:text-white w-full py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline hidden"
              id="LastLoginIP"
              type="text"
              name="LastLoginIP"
              {...register("LastLoginIP")}
            />
                <label
                  className="block text-whitetext-sm font-bold mb-2 mt-3"
                  htmlFor="email"
                  style={{
                    color: "rgba(44,186,55,0.8127626050420168)",
                  }}
                >
                  Gender
                </label>

                <select className="border rounded w-full py-2 px-3" id="gender" {...register("Gender")}>
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Đồng tính Nam</option>
                  <option>Đồng tính nữ</option>
                </select>
                {errors.Gender && (
                  <p className="text-red-500 text-sm font-bold mt-2"> {errors.Gender.message} </p>
                )}


          </div>
          <div className="mb-4">
            <label
              className="block text-whitetext-sm font-bold mb-2"
              htmlFor="password"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full dark:text-white py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="Password"
              {...register("Password")}
            />
          </div>
          {errors.Password && (
            <p className="text-red-500 text-sm font-bold mt-2"> {errors.Password.message} </p>
          )}
          <div className="mb-4">
            <label
              className="block text-whitetext-sm font-bold mb-2"
              htmlFor="password"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full dark:text-white py-2 px-3 text-whiteleading-tight focus:outline-none focus:shadow-outline"
              id="cf_password"
              type="password"
              placeholder="Confirm Password"
              name="Cf_Password"
              {...register("Cf_Password")}
            />
            {errors.Cf_Password && (
              <p className="text-red-500 text-sm font-bold mt-2"> {errors.Cf_Password.message} </p>
            )}
          </div>
          <div className="mb-4">
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(29,120,36,1) 0%, rgba(44,186,55,0.8127626050420168) 90%, rgba(0,255,68,1) 100%)",
              }}
              className={`w-full  py-2 px-4 ${sta?'':'bg-black'} font-bold rounded focus:outline-none text-white`}
              type="submit"
              disabled={!sta}
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
      </div >
      
      <Footer />

    </div >
  );
};

export default RegisterForm;
