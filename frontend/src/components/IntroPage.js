import React from "react";
import HeaderComponent from "./HeaderComponent";

const IntroPage = () => {
  return (
    <div className="">
      {/* <HeaderComponent/> */}
      {/* HEADER */}

      <div className="p-3 flex">
        <h1 className="text-6xl text-rose-500 p-10 pl-20 font-roboto ml-36">
          GUIDO
        </h1>

        <div className="flex  ml-[300px] p-10 mt-5 text-2xl font-bold ">
          <p className="ml-5">EXPLORE</p>
          <p className="ml-16">ABOUT US </p>
          <p className="ml-16 text-rose-400">BECOME A MENTOR </p>

          <div className="text-white border border-rose-500 ml-16 bg-rose-500 px-8 py-2 rounded-xl -mt-3">
            LOGIN / SIGN-UP
          </div>
        </div>
      </div>

      {/* BODY SECTIONS */}
      <div className="p-3">
        <div className="ml-56 flex  pb-0  mt-36">
          <div className="text-7xl w-1/2">
            Your{" "}
            <span className=" text-rose-500  font-roboto font-bold">
              Future
            </span>{" "}
            in Tech Starts with the Right{" "}
            <span className=" text-rose-500  font-roboto font-bold ">
              Mentor
            </span>
          </div>
          <img
            className="ml-  w-[500px] p-3 -mt-20 ml-10"
            src="/images/hero-image.png"
          />
        </div>

        <div className="p-3 -mt-64">
          <div className="ml-56 text-2xl my-3 text-gray-600 ">
            <p>Feeling lost ? Dont know how to build your career? </p>
            <p>
              Dont worry . Join GUIDO and find suitable mentor to guide your way
              to success{" "}
            </p>
          </div>
          <div className="flex  w-max ml-60  mt-24  ">
            <img  className="h-5 w-5 mt-1" src="/images/explore-down.png"/>
            <div className="text-xl   ml-1  text-slate-500  ">
              Scroll down to explore {" "}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="mt-60">
        <p className="text-7xl text-rose-500 font-bold ml-60">WHY GUIDO ?</p>
        <div className="flex">
        <p className="w-1/2 text-3xl text-gray-600 ml-60 mt-20 leading-relaxed  ">
          GUIDO is designed to bridge the gap between tech students and industry
          professionals, offering a platform for personalized mentorship. By
          connecting learners with experienced mentors, it provides targeted
          guidance to help navigate the complexities of the tech world.Our goal is to empower
          the next generation of tech talent by making mentorship accessible,
          impactful, and tailored to individual aspirations. With GUIDO,
          students can accelerate their learning journey and unlock their full
          potential.
        </p>
        <img
            className="ml-  w-[500px] p-3  ml-10"
            src="/images/software.png"
          />
        </div>
        <div className="ml-60 border rounded-md shadow-2xl bg-rose-600 border-rose-500 w-max px-10 py-5 mb-10 text-xl font-bold  text-white hover:bg-rose-300 hover:cursor-pointer">
          EXPLORE GUIDO 
        </div>

        <div className="flex ml-60">
            <div className="w-max border border-rose-400 m-10 p-10">1</div>
            <div className="w-max border border-rose-400 m-10 p-10">2</div>
            <div className="w-max border border-rose-400 m-10 p-10">3</div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
