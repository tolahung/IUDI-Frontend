import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
import PostUser from "./PostUser";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import FormPost from "./FormPost";
import { Tooltip } from "@material-tailwind/react";

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
  const [groups, setGroups] = useState([]);

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

  console.log(groups);

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
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(29,120,36,1) 0%, rgba(44,186,55,0.8127626050420168) 90%, rgba(0,255,68,1) 100%)",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-white font-extrabold font-bold mb-4 mt-5">
          Groups
        </h1>
        <div className="flex">
          {groups.map((group, index) => (
            <Tooltip key={index} content={group.GroupName}>
              <div className="p-4 rounded-lg cursor-pointer">
                <img
                  src={group?.avatarLink}
                  alt={group?.GroupName}
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      <FormPost />
      <PostUser listPost={posts} />
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
  );
}

export default Posts;
