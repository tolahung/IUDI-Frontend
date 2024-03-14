import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

function FormPost() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [imagePost, setImagePost] = useState(null);

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
        console.log('profile', response.data);
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
        setImagePost(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [avatarUrl, setAvatarUrl] = useState(() => {
    // Lấy data URL từ localStorage nếu có
    return localStorage.getItem('avatarUrl') || profileData?.Users[0].avatarLink;
  });
  useEffect(() => {
    // Đọc URL ảnh từ localStorage khi component được render
    const savedAvatarUrl = localStorage.getItem('avatarUrl');
    if (savedAvatarUrl) {
      setAvatarUrl(savedAvatarUrl);
    }
  }, [])
  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <div className="flex justify-center items-center">
          <div>
            <div className="flex items-center my-4">
              <img
                src={avatarUrl}
                alt=""
                className="w-10 h-10 rounded-full mr-2"
              />
              <input
                type="text"
                placeholder="Bạn đang nghĩ gì ?"
                className="border border-gray-300 px-4 py-2 rounded-md flex-grow mr-2 focus:outline-none"
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
              >
                Đăng bài
              </button>
            </div>
            {imagePost && (
              <div className="flex justify-center">
                <img
                  src={imagePost}
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
