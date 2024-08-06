import React from "react";

const Footer = () => {
  return (
    <div className="mt-52 border shadow-2xl border-red-200 p-24 pt-11 pb-20 mb-0   ">
      <div className="flex">
        <div>
          <p className="text-6xl  font-bold">GUIDO</p>
          <p className="mt-5 w-80">
            At Guido students find tech industry mentors for support and career
            advice. Connect with experienced professionals for personalized
            guidance in your educational and professional journey. Learn new
            skills, get career advice, and network with industry experts.
            Guido is here to help you achieve your tech career goals.
          </p>
          <div className="m-5 ml-1 flex">
            <img className="m-4 h-7 w-7" src="/images/Xlogo.png" />
            <img className="m-4 h-7 w-7" src="/images/email.png" />
            <img className="m-4 h-7 w-7" src="/images/linkedin.png" />
            <img className="m-4 h-7 w-7" src="/images/call.png" />
          </div>
        </div>

        <div className="m-4 ml-32 m text-xl">
          <p className="m-2 mt-10"> FAQS</p>
          <p className="m-2 mt-10">HELP CENTRE</p>
          <p className="m-2 mt-10">CAREERS</p>  
          <p className="m-2 mt-10">PRIVACY</p>  
          <p className="m-2 mt-10">TERMS & CONDITIONS</p>  
        </div>

        <div className="m-10 mt-0 ml-40 mb-0 ">
          <p className="text-4xl  text-rose-600 font-bold">Reach Out To Us !</p>
          <p className="mt-3 text-xl ">
            Report any inconvinience or do let us know your to experience
          </p>

          <input
            className="border m-3 w-full h-10 p-7 rounded-lg mt-10 text-xl "
            placeholder="Enter your email"
            type="email"
          />
          <br />
          <textarea
            className="border m-3 w-full h-32  p-5 rounded-lg text-xl"
            placeholder="Your review or inconvinience"
            rows="10"
            cols="20"
            type="text"
          />
          <button className="w-full border p-4 mt-10 rounded-xl font-bold bg-green-300">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
