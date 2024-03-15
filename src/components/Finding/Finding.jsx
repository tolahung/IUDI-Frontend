import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import bg from "../../images/bg3.jpg"
import UserList from "./UserList";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

function Finding() {
  const dataUser = JSON.parse(localStorage.getItem('InforCurrentUser'))
  const [users, setUsers] = useState([])
  const fetchUsers = async (radius) =>{
    try {
      const res = await axios.get(`https://api.iudi.xyz/api/location/${dataUser.UserID}/${radius}`)
      return res.data.Distances
    } catch (error) {
      console.log(error)
    }
  }
  const setting = JSON.parse(localStorage.getItem('findingSetting'))
  useEffect(()=>{
    const fetchData = async () => {
      if (!setting) {
        const res = await fetchUsers(5000000);
        setUsers(res.filter((item)=>item.Gender!=setting.Gender));
      } else {
        const res = await fetchUsers(setting.radius);
        setUsers(res.filter((item)=>item.Gender!=setting.Gender));
      }
    }
    fetchData()
  },[])
  const background = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }
  const currentUser = JSON.parse(localStorage.getItem('InforCurrentUser'))
  return (
    <>
        <div style={background} className="">
          <Header />
              <div className="relative">
                <div className="fixed top-0 left-0 w-[500px] border-r-2 border-white min-h-[100vh]">
                </div>
                <div className=" border-t-2 border-white">
                <div className="">
                  <UserList users={users}/>
                </div>
                </div>
              </div>
          <Footer />
        </div>
    </>
  );
}

export default Finding;
