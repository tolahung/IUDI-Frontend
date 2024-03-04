import React from "react";
import Logo from "../../images/logoApp.png";

function LayoutHome() {
    return (
        <div className="">
            <div className="flex flex-col  justify-center items-center h-screen mt-[-117px]">
                <img src= {Logo} alt="Your Image" className="max-w-full max-h-full w-68 h-48 min-w-200" />
                <h1 className = "text-white text-7xl font-bold">Kết Nối Yêu Thương</h1>
            </div>
        </div>
    )
}

export default LayoutHome;