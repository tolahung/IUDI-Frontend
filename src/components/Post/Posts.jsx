import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import PostUser from "./PostUser";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import FormPost from "./FormPost";
import { useNavigate, useParams } from "react-router-dom";
import Thumbgroup from "./Thumbgroup";
import ListImg from "./ListImg";

function Posts() {

  const [group, setGroups] = useState([]);
  const [grcontent, setGrcontent] = useState([]);
  const { groupId } = useParams()
  //all group
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://api.iudi.xyz/api/forum/group/all_group"
        );
        setGroups(response.data.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGroups();
  }, []);
  const fetchcontent = async () => {
    try {
      const res = await axios.get(`https://api.iudi.xyz/api/forum/group/${groupId}/1/1000`);
      setGrcontent(res.data.list_posts.reverse()); 
    } catch (error) {
      console.log(error);
    }
  }
  //each group post
  useEffect(() => {
    fetchcontent();
  }, [groupId])
  // pagination
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  const navi = useNavigate()

  //Lấy ra index của group
  let index = group.findIndex((user) => {
    return user.GroupID == groupId
  })


  //Xử lý đăng bài
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("IuDiToken");
    if (storedData) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="w-[1500px] mx-auto">
        <div className="grid grid-cols-4 gap-[30px] mt-[30px]">
          {/* Phần 1 */}
          <div className="col-span-1">
            <div className="flex flex-col fixed">
              <h1 className="text-white ml-[30px] mb-[30px] font-bold text-[25px]">GROUPS</h1>
              {group.map((groups) => {
                return (
                  <>
                    <div
                      key={groups.GroupID}
                      className=" flex rounded-lg cursor-pointer p-[10px] ml-[30px] hover:bg-green-400"
                      onClick={() => { navi(`/posts/${groups.GroupID}`) }}
                    >
                      <img
                        src={groups?.avatarLink}
                        alt={groups?.GroupName}
                        className="w-[60px] h-[60px] rounded-full border-2 border-gray-50"
                      />
                     <div className="flex flex-col">
                     <p className="ml-[10px] text-white mt-[5px] font-bold">{groups.GroupName}</p>
                      <p className="ml-[10px] text-gray-700">Thành viên: {groups.GroupID}</p>
                     </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>

          {/* Phần 2 */}
          <div className="col-span-2 w-[650px]">
            {isLogin ? (
              <>
              <Thumbgroup
              thumbpost={group[index]}
            />
            <FormPost fetchContent={fetchcontent} />
            <PostUser
              listPost={grcontent}
            />
            <div className="bd-white flex justify-center pb-5 text-white">
              <div className="flex items-center gap-4">
                <Button
                  variant="text"
                  className="flex items-center gap-2 text-white"
                  onClick={prev}
                  disabled={active === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <IconButton {...getItemProps(1)} className="text-white">1</IconButton>
                  <IconButton {...getItemProps(2)} className="text-white">2</IconButton>
                  <IconButton {...getItemProps(3)} className="text-white">3</IconButton>
                  <IconButton {...getItemProps(4)} className="text-white">4</IconButton>
                  <IconButton {...getItemProps(5)} className="text-white">5</IconButton>
                </div>
                <Button
                  variant="text"
                  className="flex items-center gap-2 text-white"
                  onClick={next}
                  disabled={active === 5}
                >
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </div>
            </div>
              </>
            ) : (
              <>
              <Thumbgroup
              thumbpost={group[index]}
            />
            <PostUser
              listPost={grcontent}
            />
            <div className="bd-white flex justify-center pb-5 text-white">
              <div className="flex items-center gap-4">
                <Button
                  variant="text"
                  className="flex items-center gap-2 text-white"
                  onClick={prev}
                  disabled={active === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <IconButton {...getItemProps(1)} className="text-white">1</IconButton>
                  <IconButton {...getItemProps(2)} className="text-white">2</IconButton>
                  <IconButton {...getItemProps(3)} className="text-white">3</IconButton>
                  <IconButton {...getItemProps(4)} className="text-white">4</IconButton>
                  <IconButton {...getItemProps(5)} className="text-white">5</IconButton>
                </div>
                <Button
                  variant="text"
                  className="flex items-center gap-2 text-white"
                  onClick={next}
                  disabled={active === 5}
                >
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </div>
            </div>
              </>
            )}
          </div>

          {/* Phần 3 */}
          <div className="col-span-1 pt-[510px]">
            <div className="flex flex-col sticky top-[125px]">
              <h1 className="text-white mb-[10px] font-bold text-[25px]">Ảnh nhóm</h1>
              <ListImg 
                listImg={grcontent}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Posts;
