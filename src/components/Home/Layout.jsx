import React from "react";
import Logo from "../../images/logoApp.png";

function LayoutHome() {
    return (
        <div className="transform translate-y-[-120px]">
            <div className="flex flex-col  justify-center items-center h-screen ">
                <img src= {Logo} alt="Your Image" className="max-w-full max-h-full w-68 h-48" />
                <h1 className = "text-white text-7xl">Kết Nối Yêu Thương</h1>
            </div>

        </div>
    )
}

export default LayoutHome;