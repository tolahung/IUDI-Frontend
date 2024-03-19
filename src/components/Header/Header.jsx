import React, { useEffect, useState } from "react";
import {
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Logo from "../../images/logoApp.png";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const username = localStorage.getItem("UserNameIuDi")
  useEffect(() => {
    const storedData = localStorage.getItem("IuDiToken");
    if (storedData) {
      setIsLogin(true);
    }
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="text-white"
        className="p-1 font-normal"
      >
        <a href="/" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="text-white"
        className="p-1 font-normal"
      >
        <a href="/finding" className="flex items-center">
          Finding
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="text-white"
        className="p-1 font-normal"
      >
        <a href="posts/1" className="flex items-center">
          Post
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="text-white"
        className="p-1 font-normal"
      >
        <a href={`profile/${username}`} className="flex items-center">
          Profile
        </a>
      </Typography>

      {isLogin ? (
        <Typography>
          <p>Chào mừng {username}</p>
        </Typography>
      ) : ('')}


    </ul>
  );

  const handleLogin = () => {
    window.location.href = "/login";
  };
  const handleRegister = () => {
    window.location.href = "/register";
  };
  const handleLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure ? ")) {
      localStorage.removeItem("IuDiToken");
      window.location.href = "/";
    }
  };
  return (
    <div className=""> 
      <div className="text-white pb-[100px]" >
        <div
        className="flex items-center justify-between text-white fixed left-0 right-0 z-10"> 
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 px-3 font-medium"
          >
            <img src={Logo} alt="Example" />
          </Typography>
          <div className="flex items-center gap-4 ">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {!isLogin ? (
                <Button
                  variant="text-white"
                  size="sm"
                  className="hidden lg:inline-block mr-4"
                  onClick={handleLogin}
                >
                  <span>Log In</span>
                </Button>
              ) : (
                // eslint-disable-next-line no-restricted-globals
                <Button
                  variant="text-white"
                  size="sm"
                  className="hidden lg:inline-block mr-4"
                  onClick={handleLogout}
                >
                  <span>Log Out</span>
                </Button>
              )}

              {
                isLogin ? ('') : (
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block mr-4"
                    onClick={handleRegister}
                  >
                    <span>Sign in</span>
                  </Button>
                )
              }
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        {/* <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {isLogin ? (
              <Button
                fullWidth
                variant="text-white"
                size="sm"
                className=""
                onClick={handleLogout}
              >
                <span>Log Out</span>
              </Button>
            ) : (
              <Button
                fullWidth
                variant="text-white"
                size="sm"
                className=""
                onClick={handleLogin}
              >
                <span>Log In</span>
              </Button>
            )}
          </div>
        </MobileNav> */}
      </div>
    </div>
  );
};
export default Header;
