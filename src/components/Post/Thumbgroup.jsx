import React from 'react';


const Thumbgroup = ({ thumbpost}) => {
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
                                    <p>Thành viên: {thumbpost?.GroupID}</p>
                                </div>

                                <div>
                                    <button className='p-[10px] bg-green-500 text-white rounded-[10px]'>Tham gia nhóm</button>
                                    <button className='p-[10px] bg-red-400 text-white rounded-[10px] ml-[20px]'>Rời nhóm</button>
                                </div>
                            </div>
                        </div>
            </div>
            </div>
    );
};

export default Thumbgroup;