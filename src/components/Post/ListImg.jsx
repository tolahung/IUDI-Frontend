
import { React, useState } from 'react';

const ListImg = ({ listImg }) => {
    const maxITem = 9;
    return (
        <div>
            <div className='grid grid-rows-3 grid-cols-3 gap-2 p-[10px] border-2 border-[green] rounded-[6px]'>
                {listImg.map((crItem, index) => {
                    return (
                        (index < maxITem ) && (
                            <div div key={index} className='bg-green w-[100%] h-[100px] overflow-hidden rounded-[6px]' >
                                <img
                                    className='w-[100%] h-[100%] cursor-pointer'
                                    src={crItem?.Photo}
                                    alt='group img'

                                />
                            </div>
                        )
                    )
                })}
            </div>
                <button className='p-[10px] bg-[green] mt-[10px] rounded-[6px] text-white hover:bg-[#54a554]'>Xem tất cả ảnh</button>
        </div>
    );
};

export default ListImg;