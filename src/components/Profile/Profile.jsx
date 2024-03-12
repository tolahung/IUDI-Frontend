import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";
import ModalChangePassWord from "../Modal/ModalChangePassWord";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  FaMale,
  FaEnvelope,
  FaAd,
  FaBirthdayCake,
} from "react-icons/fa";
import bg from "../../images/bg3.jpg"
import { Link, useNavigate, useParams } from "react-router-dom";


function Profile() {

  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false);
  const {username} = useParams()
  useEffect(() => {
    const storedData = localStorage.getItem("IuDiToken");
    const userNameIuDi = localStorage.getItem("UserNameIuDi");
    setUserName(username);
    if (storedData) {
      setIsLogin(true);
    }
  }, [username]);

  const background = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }
  const navi = useNavigate()
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


  const [avatarUrl, setAvatarUrl] = useState(() => {
    // Lấy data URL từ localStorage nếu có
    return localStorage.getItem('avatarUrl') || profileData?.Users[0].avatarLink;
  });

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0]; // Lấy file ảnh từ sự kiện change
    const reader = new FileReader();

    reader.onload = () => {
      // Đọc URL của file ảnh đã chọn và cập nhật trạng thái của ảnh avatar
      const dataUrl = reader.result;
      setAvatarUrl(dataUrl);
        //  // Lưu data URL vào localStorage
         localStorage.setItem('avatarUrl', dataUrl);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile); // Đọc file ảnh dưới dạng URL
    }
  };

  useEffect(() => {
    // Đọc URL ảnh từ localStorage khi component được render
    const savedAvatarUrl = localStorage.getItem('avatarUrl');
    if (savedAvatarUrl) {
      setAvatarUrl(savedAvatarUrl);
    }
  }, []); // Chỉ chạy một lần khi component được render


  return (
    <>
      {!isLogin ? (
        <NotFound />
      ) : (
        <div style={background}>
          <Header />
          <div className="flex justify-center items-center mt-10">
            <Card className="rounded-2xl p-[20px] border-4 bg-black border-green-500">
              <CardHeader
                floated={false}
                className="flex justify-center items-center bg-black"
              >
                
                  <img
                    src={profileData?.Users[0].avatarLink}
                    alt="profile"
                    className="rounded-full h-[150px] w-[150px] hover:cursor-pointer object-cover  border-4 bg-black border-green-500"
                  />
                  <input id="avata" type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                

              </CardHeader>
              <CardBody className="text-center flex flex-col justify-center">
                <Typography variant="h4" className="mb-2 text-white mx-auto">
                  {profileData?.Users[0].FullName}
                </Typography>
                <Typography variant="p" className="mb-2 text-lg italic text-white">
                  {profileData?.Users[0].Bio}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center mt-2 text-white justify-center w-max"
                  textGradient
                >
                  <FaEnvelope className="mr-3" />
                  {profileData?.Users[0].Email}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center mt-2 text-white justify-center w-max"
                  textGradient
                >
                  <FaBirthdayCake className="mr-3" />
                  {profileData?.Users[0].BirthDate}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center text-white mt-2 justify-center w-max"
                  textGradient
                >
                  <FaMale className="mr-3" />
                  {profileData?.Users[0].Gender
                    ? profileData?.Users[0].Gender
                    : "null"}
                </Typography>
                <Typography
                  color="white"
                  className="flex items-center mt-2 text-white justify-center w-max"
                  textGradient
                >
                  <FaAd className="mr-3" />
                  {profileData?.Users[0].CurrentAdd}
                </Typography>
              </CardBody>

              <CardFooter className="flex justify-center gap-7 pt-2">
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-black"
                  onClick={openModal}
                >
                  Change Password
                </button>
                <button
                  className="mt-4 flex bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-black"
                onClick={()=>navi('/personal')} >
                  Edit Profile
                </button>
              </CardFooter>
            </Card>
          </div>

          <ModalChangePassWord
            userId={profileData?.Users[0].UserID}
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
