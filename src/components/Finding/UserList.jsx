import { Carousel, Typography, Button, CardHeader, CardBody, CardFooter, Card } from "@material-tailwind/react";
import {
    FaMale,
    FaEnvelope,
    FaAd,
    FaBirthdayCake,
  } from "react-icons/fa";
const UserList = ({users}) => {
    return(
        <div className="">
        <Carousel className="">
            {
                users.map((user,index)=>{
                    return(
                        <div className="w-[500px] h-[700px] mx-auto" key={index}>
                        <Card className=" rounded-2xl p-[20px] border-4 bg-black border-green-500">
                            <CardHeader
                                floated={false}
                                className="flex justify-center items-center bg-black"
                            >
                                
                                <img
                                    src={user.avatarLink}
                                    alt="profile"
                                    className="rounded-full h-[150px] w-[150px] hover:cursor-pointer object-cover  border-4 bg-black border-green-500"
                                />
                                

                            </CardHeader>
                            <CardBody className="text-center flex flex-col justify-center">
                                <Typography variant="h4" className="mb-2 text-white mx-auto">
                                {user.FullName}
                                </Typography>
                                <Typography variant="p" className="mb-2 text-lg italic text-white">
                                {user.Bio}
                                </Typography>
                                <Typography
                                color="white"
                                className="flex items-center mt-2 text-white justify-center w-max"
                                textGradient
                                >
                                <FaEnvelope className="mr-3" />
                                {user.Email}
                                </Typography>
                                <Typography
                                color="white"
                                className="flex items-center mt-2 text-white justify-center w-max"
                                textGradient
                                >
                                <FaBirthdayCake className="mr-3" />
                                {user.BirthDate}
                                </Typography>
                                <Typography
                                color="white"
                                className="flex items-center text-white mt-2 justify-center w-max"
                                textGradient
                                >
                                <FaMale className="mr-3" />
                                {user.Gender
                                    ? user.Gender
                                    : "null"}
                                </Typography>
                                <Typography
                                color="white"
                                className="flex items-center mt-2 text-white justify-center w-max"
                                textGradient
                                >
                                <FaAd className="mr-3" />
                                {user.CurrentAdd}
                                </Typography>
                            </CardBody>

                            <CardFooter className="flex justify-center gap-7 pt-2">
                                <button
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-black"
                                >
                                Change Password
                                </button>
                                <button
                                className="mt-4 flex bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-black"
                                 >
                                Edit Profile
                                </button>
                            </CardFooter>
                        </Card>
                        </div>
                    )
                })
            }
        </Carousel>
        </div>
    )
}
export default UserList