import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import background from "../../images/background.jpg";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import profileSchema from "../../schemas/profile";
import { joiResolver } from "@hookform/resolvers/joi";
import { useLocation, useParams } from "react-router-dom";

const EditProfile = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: joiResolver(profileSchema) });
  const [user,setUser] = useState([])
  const [userName, setUserName] = useState('');
const username = localStorage.getItem("UserNameIuDi")
useEffect(() => {
  setUserName(username);
}, [!userName]);
useEffect(() => {
  const fetchProfileData = async () => {
    if(userName){
    try {
      const response = await axios.get(
        `https://api.iudi.xyz/api/profile/${userName}`
      );
      setUser(response.data.Users)
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }}
  };
  fetchProfileData();
}, [!userName]);
  const handleSubmitForm = async (data) => {
    console.log('aaa')
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
          className="bg-zinc-900 shadow-md rounded px-8 pt-3 pb-5 mb-2"
        >
          <h3
            className="text-3xl font-extrabold text-center mb-2 mt-2 "
            style={{
              color: "rgba(44,186,55,0.8127626050420168)",
            }}
          >
            EditProfile
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
              disabled
              value={user[0]?.Username}
              {...register("Username")}
            />
            {errors.Username && (
              <p className="text-red-500 text-sm font-bold mt-2"> {errors.Username.message} </p>
            )}
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
              defaultValue={user[0]?.FullName}
              {...register("FullName")}
            />
            {errors.FullName && (
              <p className="text-red-500 text-sm font-bold mt-2"> {errors.FullName.message} </p>
            )}
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
              disabled
              defaultValue={user[0]?.Email}
              {...register("Email")}
            />
            {errors.Email && (
              <p className="text-red-500 text-sm font-bold mt-2"> {errors.Email.message} </p>
            )}
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 mt-3"
                  htmlFor="email"
                  style={{
                    color: "rgba(44,186,55,0.8127626050420168)",
                  }}
                >
                  Gender
                </label>
                <select className="border rounded w-full py-2 px-3" id="gender" defaultValue={user[0]?.Gender} {...register("Gender")}>
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
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthPlace"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              BirthPlace
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthPlace"
              type="text"
              placeholder="Birth Place"
              name="BirthPlace"
              defaultValue={user[0]?.BirthPlace}
              {...register("BirthPlace")}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="currentAdd"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Current Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="currentAdd"
              type="text"
              placeholder="Current Address"
              name="CurrentAdd"
              defaultValue={user[0]?.CurrentAdd}
              {...register("CurrentAdd")}
            />
          </div>   
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bio"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Biography
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 h-[100px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bio"
              type="text"
              placeholder="The character limit is 200"
              name="Bio"
              maxLength={200}
              defaultValue={user[0]?.Bio}
              {...register("Bio")}
            />
            <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthDate"
              style={{
                color: "rgba(44,186,55,0.8127626050420168)",
              }}
            >
              Date Of Birth
            </label>
            <input type="date" {...register("BirthDate")}/>
            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthDate"
              type="text"
              name="BirthDate"
              defaultValue={`${yea}-${mont}-${day}`}
              {...register("BirthDate")}
            /> */}
          </div>
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
              Submit
            </button>
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(29,120,36,1) 0%, rgba(44,186,55,0.8127626050420168) 90%, rgba(0,255,68,1) 100%)",
              }}
              className="w-full py-2 px-4 font-bold rounded focus:outline-none mt-4 text-white"
              type="button"
            >
              Cancel
            </button>
          </div>
          
        </form>
      </div >
      
      <Footer />

    </div >
  );
};

export default EditProfile;
