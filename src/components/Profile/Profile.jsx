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
  FaUser,
  FaMale,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import ModalMyGroups from "../Modal/ModalMyGroups";
import bg from "../../images/bg3.jpg"


function Profile() {

  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isModalOpenChangePass, setIsModalOpenChangePass] = useState(false);
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("IuDiToken");
    const userNameIuDi = localStorage.getItem("UserNameIuDi");
    setUserName(userNameIuDi);
    if (storedData) {
      setIsLogin(true);
    }
  }, []);

  const background = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://api.iudi.xyz/api/profile/${userName}`
        );
        setProfileData(response.data);
        console.log(response.data);
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

  const openModalGroup = () => {
    setIsModalOpenGroup(true);
  };

  const closeModalGroup = () => {
    setIsModalOpenGroup(false);
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
            <Card className="rounded-md w-96 h-120 border-2 border-green-500">
              <CardHeader
                floated={false}
                className="h-33 flex justify-center items-center pb-4 z-1"
              >
                <label htmlFor="avata" className="rounded-full h-28 w-28">
                  <img
                    src={avatarUrl}
                    alt="profile"
                    className="rounded-full h-28 w-28 hover:cursor-pointer"
                  />
                  <input id="avata" type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                </label>

              </CardHeader>
              <CardBody className="text-center flex flex-col justify-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {profileData?.Users[0].FullName}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaUser className="mr-3" /> {profileData?.Users[0].Username}
                </Typography>

                {/* <Typography */}
                {/* color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                > */}
                {/* <FaPhone className="mr-3" />
                  {profileData?.Users[0].Phone
                    ? profileData?.Users[0].Phone
                    : "null"} */}
                {/* </Typography> */}

                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaEnvelope className="mr-3" />
                  {profileData?.Users[0].Email}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaMale className="mr-3" />
                  {profileData?.Users[0].Gender
                    ? profileData?.Users[0].Gender
                    : "null"}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-center w-max"
                  textGradient
                >
                  <FaCalendarAlt className="mr-3" />
                  {profileData?.Users[0].LastActivityTime}
                </Typography>
              </CardBody>

              <CardFooter className="flex justify-center gap-7 pt-2">
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openModal}
                >
                  Change Password
                </button>
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openModalGroup}
                >
                  Groups
                </button>
              </CardFooter>
            </Card>
          </div>

          <ModalChangePassWord
            userId={profileData?.Users[0].UserID}
            isOpen={isModalOpenChangePass}
            onClose={closeModal}
          />

          <ModalMyGroups
            userId={profileData?.Users[0].UserID}
            isOpen={isModalOpenGroup}
            onClose={closeModalGroup}
          />

          <Footer />
        </div>
      )}
    </>
  );
}

export default Profile;
