import React from "react";

const PostUser = ({ listPost }) => {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="max-w-lg w-full">
        {listPost?.map((item, index) => (
          <form key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
            <div className="flex items-center mb-2">
              <img
                src={item?.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-gray-800 font-medium">
                {item?.username}
              </span>
            </div>
            <div className="text-gray-600 text-sm mb-2">{item?.time}</div>
            <div className="mb-2">{item?.status}</div>
            <img
              src={item?.image}
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
