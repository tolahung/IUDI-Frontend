import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function FormPost() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [imagePost, setImagePost] = useState(null);
  const [displau, setDisplay] = useState(null)
  const [data, setData] = useState('')
  useEffect(() => {
    const storedData = localStorage.getItem("IuDiToken");
    const userNameIuDi = localStorage.getItem("UserNameIuDi");
    setUserName(userNameIuDi);
    if (storedData) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://api.iudi.xyz/api/profile/${userName}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userName]);

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
  const handleTextChange = (e) => {
    setData(e.target.value)
  }
  const uploadImage = async (imgData) => {
    const formData = new FormData()
    formData.append('image', imgData)
    formData.set('key', '84f6d6a0f9728361a9fbfee270175801')
    const response = await axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: formData
    })
    return response.data.data.display_url
  }
  const onHandelSubmit = async () => {
    const res = await uploadImage(imagePost)
    const dataForm = {
      GroupID: "1",
      Title: "",
      Content: data,
      PostLatitude: "40",
      PostLongitude: "50",
      PhotoURL: [res]
    }
    console.log(dataForm)
    const respon = await axios.post(`https://api.iudi.xyz/api/forum/add_post/${profileData.Users[0].UserID}`, dataForm)
    console.log(respon)
  }
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="">
          <div >
            <div className=" shadow-md p-8 bg-[#292929] rounded-[10px] border-2  border-green-500 ">
              <div className="flex items-center mb-[10px]">
                <img
                  src={profileData?.Users[0].avatarLink}
                  alt="avatar"
                  className="w-[40px] h-[40px] rounded-[100%] mr-[10px]"
                />
                <input
                  type="text"
                  placeholder="Bạn đang nghĩ gi ?"
                  className="p-[10px] bg-[#292929] text-white w-full"
                  onChange={handleTextChange}
                />
              </div>

              <div className="flex justify-between items-center">
                <label htmlFor="imageupload">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[30px] h-[30px] text-white mt-[10px] hover:cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>

                  <input
                  type="file"
                  id="imageupload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                </label>
              
                <button
                  className="w-[80px] h-[35px] text-white bg-green-500 rounded-[20px]"
                  onClick={onHandelSubmit}
                >
                  Đăng
                </button>
              </div>
            </div>
            {imagePost && (
              <div className="flex justify-center">
                <img
                  src={displau}
                  alt="Preview"
                  className="max-w-xs mt-2 cursor-pointer"
                  onClick={() => {
                    setImagePost(null);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPost;
