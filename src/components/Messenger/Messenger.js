import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import bg from "../../images/bg3.jpg"
import io from 'socket.io-client';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BoxChat from "./BoxChat";
function Messenger() {
    const {id} = useParams()
    const [oldDatas, setOldDatas] = useState([])
    const {UserID} = JSON.parse(localStorage.getItem('InforCurrentUser'))
    const [currentUser, setCurrentUser] = useState(id)
    const [userList, setUserList] = useState([])
    const [content, setContent] = useState()
    const [check, setCheck] = useState(1)
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`https://api.iudi.xyz/api/profile/${id}`)
        setCurrentUser(response.data.Users[0])
      } catch (error) {
        console.log(error)
      }
    }
    const fetchHistory = async () =>{
      try {
        const response = await axios.get(`https://api.iudi.xyz/api/pairmessage/${UserID}?other_userId=${currentUser.UserID}`)
        setOldDatas(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchUserList = async () => {
      try {
        const response = await axios.get(`https://api.iudi.xyz/api/chat/${UserID}`)
        setUserList(response.data.data)
      } catch (error) {
        console.log(error)
      }
    } 
    const containerRef = useRef(null)
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
    useEffect(()=>{
      fetchCurrentUser()
    },[id])
    useEffect(()=>{
      fetchHistory()
      fetchUserList()
    },[currentUser,check])
    const background = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }
    const socket = io('https://api.iudi.xyz');
        socket.emit('userId', { userId: UserID });
        socket.on('check_message', (data) => {
          const newData = data.data
          setOldDatas((oldDatas)=>[newData,...oldDatas])
        })
    const handleSend = async () => {
      const date = new Date()
      const newMessage = {
        "content": content,
        "MessageTime": date,
        "idReceive": currentUser.UserID,
        "idSend": UserID
    }
      socket.emit('send_message',newMessage)
      setContent('')
      const newData = {
        "Content": content,
        "SenderID": UserID
      }
      setOldDatas((oldDatas)=>[newData,...oldDatas])
      }
    const handleChange = async (e) => {
      setContent(e.target.value)
    }
    useEffect(() => {
      if(containerRef.current){
      const contentElement = containerRef.current;
      contentElement.scrollTop = contentElement.scrollHeight;
      }
    }, [oldDatas]);
  return (
    <>
        <div style={background} className="">
          <Header />
              <div className="relative">
                <div className="fixed top-0 left-0 w-[500px] border-r-2 border-white min-h-[100vh]">
                    <div className="mt-[170px] text-white">
                    {
                      userList.map((item, index)=>{
                        return(
                          <div key={index}>
                            <Link to={`/messenger/${item.OtherUsername}`}>
                              <div className="flex mt-11 pl-10">
                                <img src={item.Avatar} className="w-[60px] h-[60px] overflow-hidden rounded-full"/>
                                <p className="text-xl font-bold ml-4 mt-5">{item.OtherUsername}</p>
                              </div>
                              </Link>
                          </div>
                        )
                      })
                    }
                    </div>
                </div>
                {currentUser&&(
                <div className=" border-t-2 border-white">
                <div className="w-[1420px] h-[800px] ml-[550px] mt-[50px] rounded-3xl bg-white">
                    <div className="text-3xl font-bold py-[40px] pl-[40px] border-b-[2px] border-[#817C7C]">{currentUser.FullName?currentUser.FullName:currentUser.Username}</div>
                    <div className="h-[585px] overflow-y-scroll scroll-snap-y-mandatory" ref={containerRef}>
                          <BoxChat oldDatas={oldDatas} UserID={UserID}/>
                    </div>
                    <div className="px-5 py-5">
                    <div className="relative">
                      <label htmlFor="Search" className="sr-only"> Search </label>
                      <input
                        type="text"
                        id="Search"
                        value={content}
                        onChange={handleChange}
                        placeholder="Bạn đang nghĩ gì..."
                        className="w-full rounded-3xl py-4 pl-4 pe-[120px] focus:outline-none border-[2px] border-[#817C7C] shadow-sm sm:text-sm"
                      />

                        <span className="absolute inset-y-0 end-0 w-10 place-content-center pr-6 flex">
                        <button type="button" className="text-gray-600 hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#008748" className="w-8 h-8 mr-[20px]">
                              <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z" clipRule="evenodd" />
                              </svg>

                          </button>
                          <button onClick={handleSend} type="button" className="text-gray-600 hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#008748" className="w-8 h-8 mr-[60px]">
                              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                              </svg>
                          </button>
                        </span>
                      </div>
                    </div>
                </div>
                </div>
                )}
              </div>
        </div>
    </>
  );
}

export default Messenger;
