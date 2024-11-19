import React from "react";

const Footer = () => {
  return (
    <div className="mt-20 border shadow-2xl border-red-200 p-10 pt-8 pb-12">
      <div className="flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="flex-1 mb-10 lg:mb-0">
          <p className="text-4xl lg:text-6xl text-rose-500 font-bold">GUIDO</p>
          <p className="mt-5 text-sm lg:text-base w-full lg:w-80">
            At Guido, students find tech industry mentors for support and career
            advice. Connect with experienced professionals for personalized
            guidance in your educational and professional journey. Learn new
            skills, get career advice, and network with industry experts. Guido
            is here to help you achieve your tech career goals.
          </p>
          <div className="mt-5 flex justify-start">
            <img className="mx-2 h-6 w-6 lg:h-7 lg:w-7" src="/images/Xlogo.png" alt="X Logo" />
            <img className="mx-2 h-6 w-6 lg:h-7 lg:w-7" src="/images/email.png" alt="Email" />
            <img className="mx-2 h-6 w-6 lg:h-7 lg:w-7" src="/images/linkedin.png" alt="LinkedIn" />
            <img className="mx-2 h-6 w-6 lg:h-7 lg:w-7" src="/images/call.png" alt="Call" />
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 mb-10 lg:mb-0">
          <p className="mb-4 text-lg lg:text-xl font-semibold">Quick Links</p>
          <div className="grid grid-cols-2 gap-2 lg:gap-4 text-sm lg:text-base">
            <p className="hover:underline cursor-pointer">FAQs</p>
            <p className="hover:underline cursor-pointer">Help Centre</p>
            <p className="hover:underline cursor-pointer">Careers</p>
            <p className="hover:underline cursor-pointer">Privacy</p>
            <p className="hover:underline cursor-pointer">Terms & Conditions</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <p className="text-2xl lg:text-4xl text-rose-600 font-bold mb-4">Reach Out To Us!</p>
          <p className="text-sm lg:text-base mb-5">
            Report any inconvenience or share your feedback.
          </p>
          <input
            className="border w-full h-10 px-4 py-2 rounded-lg mb-4 text-sm lg:text-base"
            placeholder="Enter your email"
            type="email"
          />
          <textarea
            className="border w-full h-24 lg:h-32 px-4 py-2 rounded-lg text-sm lg:text-base"
            placeholder="Your review or inconvenience"
          />
          <button className="w-full mt-5 border py-2 lg:py-3 rounded-lg font-bold bg-green-300 text-sm lg:text-base">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
