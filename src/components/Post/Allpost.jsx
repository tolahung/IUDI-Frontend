import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const Allpost = () => {
    const { groupId } = useParams()
    const [allimg, setAllImg] = useState([])
    useEffect(() => {
        axios.get(`https://api.iudi.xyz/api/forum/group/${groupId}/1/1000`)
            .then(res => {
                setAllImg(res.data.list_posts.reverse())
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Header />
            <div className='flex justify-center my-[50px]'>
                <p className='text-white font-bold text-3xl'>All Post</p>
            </div>

            <div className='w-[1200px] mx-auto'>
                <div class="grid grid-cols-5 gap-4">
                    {allimg.map((critem, index) => {
                        return (
                            <div key={index} class="col-span-1 h-[200px] bg-gray-200 overflow-hidden bg-[#1d232a]">
                                <img
                                    className='object-cover h-[100%] w-[100%] cursor-pointer hover:scale-[130%] transition duration-300'
                                    alt='postImg'
                                    src={critem?.Photo}
                                />
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default Allpost;