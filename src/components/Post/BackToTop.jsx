import React, { useEffect, useState } from 'react';

const BackToTop = () => {
    const [backTop, setBackTop] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setBackTop(true)
            }else{
                setBackTop(false)
            }
        })
    }, [])

    function scrollUp(){
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    }

    return (
        <div>
            {backTop && (
                <button
                    className='p-[10px] rounded-[10px] bg-[#8f8f8f] text-white fixed bottom-[50px] right-[50px] hover:text-black hover:bg-[white]'
                    onClick={scrollUp}
                >Back to top ^</button>
            )}
        </div>
    );
};

export default BackToTop;