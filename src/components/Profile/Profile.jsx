import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";
import ModalChangePassWord from "../Modal/ModalChangePassWord";

function Profile() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false);
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

  const openModal = () => {
    setIsModalOpenChangePass(true);
  };

  const closeModal = () => {
    setIsModalOpenChangePass(false);
  };

  return (
    <>
      {!isLogin ? (
        <NotFound />
      ) : (
        // <div className="min-h-screen bg-gradient-to-b from-green-500 via-green-400 to-green-300">
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(29,120,36,1) 0%, rgba(44,186,55,0.8127626050420168) 90%, rgba(0,255,68,1) 100%)",
            minHeight: "100vh",
          }}
        >
          <Header />
          <div>
            <p>
              Email: <strong>{profileData?.Users[0].Email}</strong>
            </p>
            <p>
              Username: <strong>{profileData?.Users[0].Username}</strong>
            </p>
            <p>
              Fullname: <strong>{profileData?.Users[0].FullName}</strong>
            </p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={openModal}
          >
            Change Password
          </button>
          <ModalChangePassWord
            userId={8}
            isOpen={isModalOpenChangePass}
            onClose={closeModal}
          />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Profile;
