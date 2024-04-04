import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LayoutHome from "./Layout";
import background from "../../images/background.jpg";


function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    // backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // minHeight: 'screen',
  };

  
  return (
      <div className="w-full h-screen flex flex-col justify-between mt-[-10px]" style={backgroundImageStyle}>
        <Header />
        <LayoutHome/>
        <Footer 
         />
      </div>
  );
}

export default Home;
