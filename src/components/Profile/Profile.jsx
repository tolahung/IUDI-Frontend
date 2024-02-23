import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";

function Profile() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profileData, setProfileData] = useState(null);
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
          `https://api.iudi.xyz/profile/${userName}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [userName]);

  return (
    <>
      {!isLogin ? (
        <NotFound />
      ) : (
        <>
          <Header />
          <h1>This is Profile Pages</h1>
          <p>
            Email: <strong>{profileData?.Users[0].Email}</strong>
          </p>
          <p>
            Username: <strong>{profileData?.Users[0].Username}</strong>
          </p>
          <p>
            Fullname: <strong>{profileData?.Users[0].FullName}</strong>
          </p>
        </>
      )}
    </>
  );
}

export default Profile;
