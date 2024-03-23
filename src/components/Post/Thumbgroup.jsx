import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from "react-router-dom";

const Thumbgroup = ({ thumbpost }) => {
    const { groupId } = useParams()
    const [isLogin, setIsLogin] = useState(false);
    const [isJoin, setIsJoin] = useState(false);

    useEffect(() => {
        const dataStorage = localStorage.getItem("IuDiToken")
        if (dataStorage) {
            setIsLogin(true)
        }
    }, [])


    const handleJoinGroup = async () => {
        if (!isLogin) {
            toast.error('Bạn cần đăng nhập để Tham gia group', { closeOnClick: true });
        } else {
            setIsJoin(true);
        }
    }
    const handleOutGroup = () => {
        alert('Bạn có chắc muốn rời nhóm ?')
        setIsJoin(false)
    }

    console.log(isJoin);

    return (
        <div>
            <div className='w-[180%] h-[470px] shadow-md p-4  text-white border-2 border-[#4caf50]'>
                <div key={thumbpost?.GroupID}>
                    <div className='thumbnail h-[370px] overflow-hidden '>
                        <img className='w-[100%] h-[100%] rounded-[6px]' src={thumbpost?.avatarLink} alt='thumb' />
                    </div>

                    <div className='content w-[100%] h-[30%] flex justify-between items-center p-[15px]'>
                        <div>
                            <p>Nhóm: {thumbpost?.GroupName}</p>
                            <p>Thành viên: {thumbpost?.userNumber}</p>
                        </div>

                        <div>
                            {isJoin ? (
                                <button className='p-[10px] bg-red-400 text-white rounded-[10px] ml-[20px]' onClick={handleOutGroup}>Rời nhóm</button>
                            ) : (
                                <button className='p-[10px] bg-green-500 text-white rounded-[10px] hover:bg-[#a3ffa3] hover:text-black' onClick={handleJoinGroup}>Tham gia group</button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Thumbgroup;