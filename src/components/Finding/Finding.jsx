import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";
import Footer from "../Footer/Footer";
import bg from "../../images/bg3.jpg"
import UserList from "./UserList";
import { Button, Card, CardBody, CardFooter, Slider, Typography } from "@material-tailwind/react";

function Finding() {

  const background = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }
  const currentUser = JSON.parse(localStorage.getItem('InforCurrentUser'))
  return (
    <>
        <div style={background} className="">
          <Header />
              <div className="relative">
                <div className="fixed top-0 left-0 w-[500px] border-r-4 border-white min-h-[100vh]">
                <Card className="mt-[160px] ml-[30px] w-[430px] rounded-xl">
                  <CardBody>
                    <div>
                      <img src={currentUser.avatarLink} className="h-[70px] w-[70px] rounded-full object-cover"/>
                    </div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      UI/UX Review Check
                    </Typography>
                    <Typography>
                      <Slider defaultValue={50}
                        className="text-[#2ec947]"
                        barClassName="rounded-none bg-[#2ec946]"
                        thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                        trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"/>
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <a href="#" className="inline-block">
                      <Button size="sm" variant="text" className="flex items-center gap-2">
                        Learn More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
                </div>
                <div className=" border-t-4 border-white">
                  <UserList/>
                </div>
              </div>
          <Footer />
        </div>
    </>
  );
}

export default Finding;
