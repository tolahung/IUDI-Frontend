import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(29,120,36,1) 0%, rgba(44,186,55,0.8127626050420168) 90%, rgba(0,255,68,1) 100%)",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Footer />
      </div>
    </>
  );
}

export default Home;
