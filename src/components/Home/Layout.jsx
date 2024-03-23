import React from "react";
import Logo from "../../images/logoApp.png";
import appstore from "../../images/appstore.png";
import chplay from "../../images/chplay.png";

function LayoutHome() {
    return (
        <div className="flex flex-col justify-center items-center mt-[170px] relative top-[-150px]">
            <img src={Logo} alt="Your" className="w-[400px]" />
            <h1 className="text-white text-7xl font-bold">Kết Nối Yêu Thương</h1>
            <div className="flex justify-center items-center mt-[30px]">
                <a href="https://apps.apple.com/us/app/tinder-chat-dating-friends/id547702041" className="">
                    <img
                        src={appstore}
                        alt="appstore"
                        className="w-[200px]"
                    />
                </a>
                <a href="#" className="">        
                    <img
                        src={chplay}
                        alt="chplay"
                        className="w-[230px] h-[100px]"
                    />
                </a>
            </div>
        </div>
    )
}

export default LayoutHome;