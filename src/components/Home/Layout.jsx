import React from "react";
import Logo from "../../images/logoApp.png";

function LayoutHome() {
    return (
            <div className="flex flex-col justify-center items-center mt-[100px]">
                <img src= {Logo} alt="Your" className="w-[400px]" />
                <h1 className = "text-white text-7xl font-bold">Kết Nối Yêu Thương</h1>
            </div>
    )
}

export default LayoutHome;