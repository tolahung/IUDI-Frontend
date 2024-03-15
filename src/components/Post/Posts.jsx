import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PostUser from "./PostUser";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
// import FormPost from "./FormPost";
// import { Tooltip } from "@material-tailwind/react";
import background from '../../images/bg3.jpg'

const posts = [
  {
    avatar:
      "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
    username: "huukien02",
    time: "19/5/2024 6:50 am",
    status: "Hello",
    image:
      "https://thanhnien.mediacdn.vn/Uploaded/dotuan/2022_09_23/2-2190.jpg",
  },
  {
    avatar:
      "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
    username: "huukien02",
    time: "20/5/2022 18:10 pm",
    status: "Hello body",
    image:
      "https://thanhnien.mediacdn.vn/Uploaded/dotuan/2022_09_23/2-2190.jpg",
  },
  {
    avatar:
      "https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg",
    username: "huukien02",
    time: "1/5/2023 16 pm",
    status: "Hi Guy",
    image:
      "https://thanhnien.mediacdn.vn/Uploaded/dotuan/2022_09_23/2-2190.jpg",
  },
];
function Posts() {
  const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: 'screen',
  };

  const [group, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "https://api.iudi.xyz/api/forum/group/all_group"
        );
        setGroups(response.data.data);
        console.log('response', response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGroups();
  }, []);

  console.log(group);
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

  return (
    <div className="" style={backgroundImageStyle}>
    <Header/>
      <div className="grid grid-cols-3 ">
        <div>
          <div className="flex flex-col fixed">
            <h1 className="text-white ml-[30px] mb-[30px] font-bold text-[25px]">GROUPS</h1>
            {group.map((groups) => {
              return (
                <>
                  <div className="rounded-lg cursor-pointer flex ml-[30px]">
                    <img
                      src={groups?.avatarLink}
                      alt={groups?.GroupName}
                      className="w-[60px] h-[60px] rounded-full mb-[20px] border-2 border-gray-50"
                    />
                    <p className="ml-[10px] w-[400px] text-white mt-[17px]">{groups.GroupName}</p>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <div>
          <h1>Row 1</h1>
          <PostUser
            listPost={posts}
          />

          <div className="bd-white flex justify-center pb-5">
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <IconButton {...getItemProps(1)}>1</IconButton>
                <IconButton {...getItemProps(2)}>2</IconButton>
                <IconButton {...getItemProps(3)}>3</IconButton>
                <IconButton {...getItemProps(4)}>4</IconButton>
                <IconButton {...getItemProps(5)}>5</IconButton>
              </div>
              <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
              >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h1>Row 2</h1>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Posts;
