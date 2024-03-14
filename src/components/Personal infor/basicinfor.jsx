
import { React, useState } from "react";
import background from '../../images/bg3.jpg'
import Footer from "../Footer/Footer";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../Header/Header'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import profileSchema from "../../schemas/profile";

function Personal() {
    //Logic right here
    const [imagePost, setImagePost] = useState(null);
    const backgroundImage = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        // backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    }
    const uploadImage = async (imgData) =>{
        const formData = new FormData()
        formData.append('image',imgData)
        formData.set('key','84f6d6a0f9728361a9fbfee270175801')
        const response = await axios({
          method: 'post',
          url: 'https://api.imgbb.com/1/upload',
          data: formData
        })
        return response.data.data.display_url
      }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
          setDisplay(reader.result)
          setImagePost(reader.result.split(',')[1]);
          };
          reader.readAsDataURL(file);
        }
      };
        const {
          register,
          handleSubmit,
          reset,
          formState: { errors, isValid },
        } = useForm();
        const dataUser = JSON.parse(localStorage.getItem("InforCurrentUser"))
        const [display, setDisplay] = useState(dataUser.avatarLink)
        const handleChangePassword = async (data) => {
        const res = await uploadImage(imagePost)
        data['avatarLink'] = res
        console.log(data)
          try {
            const response = await axios.put(
              `https://api.iudi.xyz/api/profile/change_profile/${dataUser.UserID}`,data
            );
            if (response.status === 200) {
              localStorage.setItem("InforCurrentUser", JSON.stringify(response.data.data))
              toast.success("Change data successfully!")
            } else {
              toast.warning("An error occur!")
            }
          } catch (error) {
            toast.error("ERROR:",error)
            console.log(error)
          }
        };
    return (
        <div style={backgroundImage} className="" >
            <Header/>
            <div class="bg-[#252525] p-[20px] px-[50px] mx-auto w-[490px] border-2 border-green-500 rounded-lg shadow-lg">
                <div className="my-[15px] flex flex-col items-center ">
                    <h1 className="text-3xl font-semibold text-green-600">Thông tin cá nhân</h1>
                </div>

                <div className="flex items-end justify-center">
                    <img
                        src={display}
                        alt="personal"
                        className="w-[100px] h-[100px] rounded-[10px] mr-[5px]"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                    <input 
                        type="file" 
                        id="imageUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 bg-[#3d773d] text-white p-[3px] rounded-[5px] hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    </label>
                </div>
                <form onSubmit={handleSubmit(handleChangePassword)}>
                    <div className="mb-8 mt-3">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 mt-8"
                        htmlFor="fullname"
                        style={{
                            color: "rgba(44,186,55,0.8127626050420168)",
                        }}
                        >
                        Tên tài khoản
                        </label>
                    <input
                        type="text"
                        name="FullName"
                        id="fullname"
                        defaultValue={dataUser.FullName}
                        placeholder="Tên của bạn"
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
                        errors.FullName ? "border-red-400" : "border-green-400"
                        }`}
                        {...register("FullName")}
                    />
                    {errors.FullName&& (
                        <p className="text-red-500 text-sm font-bold mt-2"> {errors.FullName.message} </p>
                        )}
                    </div>
                    <label
                  className="block text-gray-700 text-sm font-bold mb-2 mt-3"
                  htmlFor="gender"
                  style={{
                    color: "rgba(44,186,55,0.8127626050420168)",
                  }}
                >
                  Xu hướng
                </label>

                <select className="border rounded w-full py-2 px-3 bg-transparent focus:outline-none text-green-600 border-green-500" defaultValue={dataUser.Gender} id="gender" {...register("Gender")}>
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Đồng tính Nam</option>
                  <option>Đồng tính nữ</option>
                </select>
                <div className="mb-8">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 mt-3"
                        htmlFor="birthdate"
                        style={{
                            color: "rgba(44,186,55,0.8127626050420168)",
                        }}
                        >
                        Ngày sinh
                        </label>
                    <input
                        type="date"
                        name="birthdate"
                        id="birthdate"
                        placeholder=""
                        defaultValue={dataUser.BirthDate}
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
                        errors.BirthDate ? "border-red-400" : "border-green-400"
                        }`}
                        {...register("BirthDate")}
                    />
                    {errors.BirthDate&&(
                        <p className="text-red-500 text-sm font-bold mt-2"> {errors.BirthDate.message} </p>
                        )}
                    </div>
                    <div className="mb-8 mt-3">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 mt-8"
                        htmlFor="phone"
                        style={{
                            color: "rgba(44,186,55,0.8127626050420168)",
                        }}
                        >
                        Số điện thoại
                        </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        defaultValue={dataUser.Phone}
                        placeholder="Số điện thoại"
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
                        errors.Phone ? "border-red-400" : "border-green-400"
                        }`}
                        {...register("Phone")}
                    />
                    {errors.Phone&& (
                        <p className="text-red-500 text-sm font-bold mt-2"> {errors.Phone.message} </p>
                        )}
                    </div>
                    <div className="mb-8 mt-3">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 mt-8"
                        htmlFor="email"
                        style={{
                            color: "rgba(44,186,55,0.8127626050420168)",
                        }}
                        >
                        Email
                        </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={dataUser.Email}
                        placeholder="Email"
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
                        errors.Email ? "border-red-400" : "border-green-400"
                        }`}
                        {...register("Email")}
                    />
                    {errors.Email&& (
                        <p className="text-red-500 text-sm font-bold mt-2"> {errors.Email.message} </p>
                        )}
                    </div>
                    <div className="mb-8 mt-3">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 mt-8"
                        htmlFor="birthplace"
                        style={{
                            color: "rgba(44,186,55,0.8127626050420168)",
                        }}
                        >
                        Quê quán
                        </label>
                    <input
                        type="text"
                        name="birthplace"
                        id="birthplace"
                        defaultValue={dataUser.BirthPlace}
                        placeholder="Quê quán"
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
                        errors.BirthPlace ? "border-red-400" : "border-green-400"
                        }`}
                        {...register("BirthPlace")}
                    />
                    {errors.BirthPlace&& (
                        <p className="text-red-500 text-sm font-bold mt-2"> {errors.BirthPlace.message} </p>
                        )}
                    </div>
                    <div className="mb-8 mt-3">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 mt-8"
                        htmlFor="currentadd"
                        style={{
                            color: "rgba(44,186,55,0.8127626050420168)",
                        }}
                        >
                        Địa chỉ
                        </label>
                    <input
                        type="text"
                        name="currentadd"
                        id="currentadd"
                        defaultValue={dataUser.CurrentAdd}
                        placeholder="Địa chỉ của bạn"
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
                        errors.CurrentAdd ? "border-red-400" : "border-green-400"
                        }`}
                        {...register("CurrentAdd")}
                    />
                    {errors.CurrentAdd&& (
                        <p className="text-red-500 text-sm font-bold mt-2"> {errors.CurrentAdd.message} </p>
                        )}
                    </div>
                    <div className="mb-8">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2 mt-3"
                        htmlFor="bio"
                        style={{
                            color: "rgba(44,186,55,0.8127626050420168)",
                        }}
                        >
                        Mô tả
                        </label>
                    <textarea
                        type="text"
                        name="Bio"
                        id="bio"
                        placeholder="Thêm mô tả về bạn"
                        defaultValue={dataUser.Bio}
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-green-200 focus:bg-green-600 placeholder-green-500 ${
                        errors.Bio ? "border-red-400" : "border-green-400"
                        }`}
                        {...register("Bio")}
                    />
                    {errors.Bio&&(
                        <p className="text-red-500 text-sm font-bold mt-2"> {errors.Bio.message} </p>
                        ) }
                    </div>
                    <button className="inline-block bg-green-600 text-white rounded shadow py-2 px-11 text-sm mt-8 w-full" type="submit">
                    Submit
                    </button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

export default Personal;