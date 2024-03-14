import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import bg from "../../images/bg3.jpg"
import UserList from "./UserList";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

function Finding() {

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
                  <UserList/>
                </div>
              </div>
          <Footer />
        </div>
    </>
  );
}

export default Finding;
