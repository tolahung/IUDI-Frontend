import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function FormPost() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [imagePost, setImagePost] = useState(null);
  const [displau, setDisplay] = useState(null)
  const [data,setData] = useState('')
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
  const onHandelSubmit = async () => {
    const res = await uploadImage(imagePost)
    const dataForm = {
      GroupID: "1",
      Title: "",
      Content:data,
      PostLatitude:"40",
      PostLongitude:"50",
      PhotoURL:[res]
  }
    console.log(dataForm)
    const respon = await axios.post(`https://api.iudi.xyz/api/forum/add_post/${profileData.Users[0].UserID}`,dataForm)
    console.log(respon)
  }
  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <div className="flex justify-center items-center">
          <div>
            <div className="flex items-center my-4">
              <img
                src={profileData?.Users[0].avatarLink}
                alt=""
                className="w-10 h-10 rounded-full mr-2"
              />
              <input
                type="text"
                placeholder="Bạn đang nghĩ gì ?"
                className="border border-gray-300 px-4 py-2 rounded-md flex-grow mr-2 focus:outline-none"
                onChange={handleTextChange}
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="text-white hover:underline">
                  <FaUpload />
                </span>
              </label>
              <button
                style={{ marginLeft: "10px" }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-1"
                onClick={onHandelSubmit}
              >
                Đăng bài
              </button>
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
