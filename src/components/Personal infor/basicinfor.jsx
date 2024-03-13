
import { React, useState, useEffect } from "react";
import background from '../../images/bg3.jpg'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Personal() {
    //Logic right here

    const backgroundImage = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        // backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    }


    // Xử lý ngày tháng năm
    const [opencal, setOpencal] = useState(false);
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    function openCal() {
        setOpencal(!opencal)
    }

    // Xử lý ảnh
    const [avatarUrl, setAvatarUrl] = useState(() => {
        return localStorage.getItem('avatarUrl')  ;
      });
    
      const handleAvatarChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
        
          const dataUrl = reader.result;
          setAvatarUrl(dataUrl);
             localStorage.setItem('avatarUrl', dataUrl);
        };
    
        if (selectedFile) {
          reader.readAsDataURL(selectedFile); 
        }
      };
    
      useEffect(() => {
        const savedAvatarUrl = localStorage.getItem('avatarUrl');
        if (savedAvatarUrl) {
          setAvatarUrl(savedAvatarUrl);
        }
      }, []); 


    return (

        <div style={backgroundImage} className="" >
            <Header />
            <div class="bg-[#252525] p-[15px]  mx-auto h-auto w-[490px] border-2 border-green-500 rounded-lg shadow-lg mt-[50px]">
                <div className="my-[15px] flex flex-col items-center ">
                    <h1 className="text-3xl font-semibold text-green-600">Thông tin cá nhân</h1>
                    <p className="text-gray-300"> hãy điền thông tin cá nhân để chúng ta hiểu nhau hơn</p>
                </div>

                <div className="flex items-end justify-center">
                    <img
                        src={avatarUrl}
                        alt="personal"
                        className="w-[100px] h-[100px] rounded-[10px] mr-[5px]"
                    />
                    <label htmlFor="upava">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 bg-[#3d773d] text-white p-[3px] rounded-[5px] hover:cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        <input type="file" id="upava" onChange={handleAvatarChange} hidden/>
                    </label>

                </div>
                <form>
                    <div className="flex flex-col mt-[20px] p-[5px] border-2 border-green-500 rounded-lg shadow-lg" >
                        <label className="mb-[5px] font-bold ml-[12px] text-white" htmlFor="bio">Bio</label>
                        <textarea
                            className=" appearance-none rounded ml-[11px] w-auto  text-gray-300 leading-tight focus:outline-none bg-[#252525]"
                            id="bio"
                            type="text"
                            placeholder="Nhập Bio (Tối đa 200 kí tự)"
                        />
                    </div>
                    <div className="flex flex-col mt-[20px] p-[5px] border-2 border-green-500 rounded-lg shadow-lg" >
                        <label className="mb-[5px] font-bold ml-[12px] text-white" htmlFor="name">Họ và tên</label>
                        <input
                            className=" appearance-none rounded ml-[11px] w-auto  text-gray-300 leading-tight focus:outline-none bg-[#252525]"
                            id="name"
                            type="text"
                            placeholder="Nhập Họ và tên"
                        />
                    </div>
                    <div className="flex flex-col mt-[20px] p-[5px] border-2 border-green-500 rounded-lg shadow-lg" >
                        <label className="mb-[5px] font-bold ml-[12px] text-white" htmlFor="country">Quê quán</label>
                        <input
                            className=" appearance-none rounded ml-[11px] w-auto  text-gray-300 leading-tight focus:outline-none bg-[#252525]"
                            id="country"
                            type="text"
                            placeholder="Nhập Quê quán"
                        />
                    </div>
                    <div className="flex flex-col mt-[20px] p-[5px] border-2 border-green-500 rounded-lg shadow-lg relative" >
                        <label className="mb-[5px] font-bold ml-[12px] text-white" htmlFor="birthday">Ngày sinh</label>
                        <div className="flex justify-between">
                            <input
                                className=" appearance-none rounded ml-[11px] w-[130px]  text-gray-300 leading-tight focus:outline-none bg-[#252525]"
                                id="birthday"
                                type="text"
                                placeholder="Nhập Ngày sinh"
                                value={date}

                            />

                            <div onClick={openCal}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white box-border relative bottom-3 right-2 hover:cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                </svg>
                            </div>
                        </div>
                        {opencal &&
                            <Calendar
                                onChange={onChange}
                                value={date}
                                className="absolute right-0 top-20"

                            />
                        }
                    </div>
                    <div className="flex flex-col mt-[20px] p-[5px] border-2 border-green-500 rounded-lg shadow-lg" >
                        <label className="mb-[5px] font-bold ml-[12px] text-white" htmlFor="phone">Số điện thoại</label>
                        <input
                            className=" appearance-none rounded ml-[11px] w-auto  text-gray-300 leading-tight focus:outline-none bg-[#252525]"
                            id="phone"
                            type="text"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div className="flex flex-col mt-[20px] p-[5px] border-2 border-green-500 rounded-lg shadow-lg" >
                        <label className="mb-[5px] font-bold ml-[12px] text-white" htmlFor="address">Địa Chỉ</label>
                        <input
                            className=" appearance-none rounded ml-[11px] w-[430px]  text-gray-300 leading-tight focus:outline-none bg-[#252525]"
                            id="address"
                            type="text"
                            placeholder="Nhập địa Chỉ"
                        />
                    </div>



                    <button className="font-semibold text-[20px] text-white mt-[15px] hover:bg-white hover:text-black rounded-[6px] h-[60px] w-full bg-green-600 my-[20px]" >Lưu</button>
                </form>

            </div>

            <div  className="">
            <Footer/>
            </div>
        </div>
    )
}

export default Personal;