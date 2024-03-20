import React from "react";

const PostUser = ({ listPost }) => {
  return (
    <div className="flex mt-[40px]">
      <div className=" w-full">
        {listPost?.map((item, index) => (
          <form key={index} className="bg-[#292929] shadow-md rounded-md p-4 mb-4 border-2  border-green-500">
            <div className="flex items-center mb-2">
              <img
                src={item?.Avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-white font-medium">
                {item?.Username}
              </span>
            </div>
            <div className="text-white text-sm mb-2">{item?.PostTime}</div>
            <div className="mb-2 text-white">{item?.Content}</div>
            <img
              src={item?.Photo}
              alt="Post"
              className="w-full rounded-md object-cover"
              style={{ maxHeight: "300px" }}
            />
          </form>
        ))}
      </div>
    </div>
  );
};

export default PostUser;
