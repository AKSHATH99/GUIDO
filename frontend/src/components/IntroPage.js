import React from "react";
import HeaderComponent from "./HeaderComponent";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const IntroPage = () => {
  const navigate = useNavigate();

  const mentors = [
    {
      name: "Sarah Johnson",
      Company: "Google",
      bio: "I am a tech mentor with a strong background in technology and 8 years of experience. Currently, I work as an SDE 2 at Google. I love helping others understand and succeed in the tech industry. Whether you're new to tech or looking to advance, I'm here to guide and support you with practical advice and encouragement.",
      level: "SDE-2",
      image: "/images/trainer-2.jpg",
    },
    {
      name: "Alex Benjamin",
      Company: "Apple",
      bio: "I am a tech mentor with a strong background in technology and 8 years of experience. Currently, I work as an SDE 2 at Apple. I love helping others understand and succeed in the tech industry. Whether you're new to tech or looking to advance, I'm here to guide and support you with practical advice and encouragement.",
      level: "SDE-2",
      image: "/images/trainer-3.jpg",
    },
    {
      name: "Mitchele Wayne ",
      Company: "Microsoft",
      bio: "I am a tech mentor with a strong background in technology and 8 years of experience. Currently, I work as an SDE 2 at Microsoft. I love helping others understand and succeed in the tech industry. Whether you're new to tech or looking to advance, I'm here to guide and support you with practical advice and encouragement.",
      level: "SDE-2",
      image: "/images/trainer-1.jpg",
    },
  ];

  const testimonials= [
    {
      name: "Emily Carter",
      feedback:
        "Guidance from my mentor helped me land a dream role at Amazon. The experience was transformative!",
      role: "Software Engineer at Amazon",
      image: "/images/student1.jpg",
    },
    {
      name: "Daniel Thompson",
      feedback:
        "I was struggling with my career path, but GUIDO's mentorship gave me clarity and confidence to excel.",
      role: "Frontend Developer at Spotify",
      image: "/images/student2.jpg",
    },
    {
      name: "Sophia Patel",
      feedback:
        "The personalized learning paths and 1:1 mentoring made a huge difference in my tech journey.",
      role: "Data Scientist at Facebook",
      image: "/images/student3.jpg",
    },
    {
      name: "Michael Lee",
      feedback:
        "Joining GUIDO was the best decision of my career. My mentor provided invaluable insights!",
      role: "DevOps Engineer at Netflix",
      image: "/images/student4.jpg",
    },
  ]
  return (
    <div className="">
      {/* <HeaderComponent/> */}
      {/* HEADER */}

      <div className="p-3 flex">
        <h1 className="lg:text-6xl text-3xl lg:p-10 lg:pl-20  font-roboto lg:ml-36 ml-5">
          GUIDO
        </h1>

        {/* <div className="flex  ml-[300px] p-10 mt-5 text-2xl font-bold ">
          <motion.p
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            className="ml-5 hover:cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text"
            onClick={() => {
              navigate("/studentLogin");
            }}
          >
            EXPLORE
          </motion.p>

          <motion.p
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            className="ml-16 hover:cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text"
            onClick={() => {
              navigate("/studentLogin");
            }}
          >
            ABOUT US{" "}
          </motion.p>

          <motion.p
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            className="ml-16 hover:cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text"
            onClick={() => {
              navigate("/MentorLogin");
            }}
          >
            BECOME A MENTOR{" "}
          </motion.p>

          <motion.div
            className="text-white border border-rose-500 ml-16 bg-rose-500 px-8 py-2 rounded-xl -mt-3 hover:cursor-pointer  "
            onClick={() => {
              navigate("/studentLogin");
            }}
            whileHover={{ scale: 1.05, opacity: 0.9 }} // Scale up and reduce opacity on hover
            transition={{ duration: 0.3 }} // Duration of the transition
          >
            LOGIN / SIGN-UP
          </motion.div>
        </div> */}
      </div>

      {/* BODY SECTIONS */}
      <div className="p-3">
        <div className="lg:ml-56 ml-5 md:flex   pb-0  lg:mt-36 mt-20 ">
          <div className="lg:text-7xl text-3xl w-1/2">
            Your{" "}
            <span className=" text-rose-500  font-roboto font-bold">
              Future
            </span>{" "}
            in Tech Starts with the Right{" "}
            <span className=" text-rose-500  font-roboto font-bold ">
              Mentor
            </span>
          </div>
          <motion.img
            className="hidden lg:block  w-[450px] p-3 -mt-20 ml-10"
            src="/images/hero-image.png"
          />
        </div>

        <div className="p-3 lg:-mt-48">
          <div className="lg:ml-56 lg:  text-2xl my-10 text-gray-600 ">
            <p>Feeling lost ? Dont know how to build your career? </p>
            <p>
              Dont worry . Join GUIDO and find suitable mentor to guide your way
              to success{" "}
            </p>
          </div>

          <div className="flex  w-max lg:ml-60 sm:ml-10 lg:mt-24 sm: ">
            <motion.img
              className="h-5 w-5 mt-1"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              src="/images/explore-down.png"
            />
            <motion.div
              className="text-xl ml-1 text-slate-500"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
              Scroll down to explore{" "}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="lg:ml-60 ml-10 lg:mt-60 mt-60 ">
        < h1 className="lg:text-4xl text-xl font-bold  text-rose-500 ">
          MEET OUR TOP MENTORS
        </h1>

        <div className="lg:flex lg:gap-16 mt-16 mb-10 mr-8">
          {mentors.map((mentor) => {
            return (
              <div className="lg:w-1/4    border border-gray-300 shadow-lg text-center text-lg font-semibold p-8 rounded-lg hover:shadow-2xl transition duration-300 ease-in-out">
                <img src={mentor.image} />
                <p className="text-bold text-rose-500  mt-10 text-2xl"> {mentor.name}</p>
                <p>{mentor.Company}</p>
                <p>{mentor.level}</p>
                <p className="italic">{mentor.bio}</p>

                <div className="flex p-4 ml-28">
                  <img src="/images/star.png" />
                  <img src="/images/star.png" />
                  <img src="/images/star.png" />
                  <img src="/images/star.png" />
                </div>
              </div>
            );
          })}
          <motion.p
            initial={{ x: 0 }}
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            className="text-xl lg:mt-80 mt-28 ml-20 text-red-500 w-max hover:cursor-pointer "
            onClick={() => {
              navigate("/studentLogin");
            }}
          >
            <motion.img src="/images/explore-arrow.png" />
            Find More{" "}
          </motion.p>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="mt-52 flex flex-col items-start lg:ml-60 ml-10">
        {/* Section Title - Left Aligned */}
        <p className="text-5xl text-rose-500 font-bold  text-left">
          Why Choose GUIDO?
        </p>

        {/* Offerings Section */}
        <div className="flex flex-wrap justify-start gap-20 w-full mt-12">
          <div className="w-72 border border-gray-200 shadow-xl rounded-lg p-8 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-50">
            <img
              className="w-20 mx-auto mb-6"
              src="/images/1on1.png"
              alt="1-on-1 Guidance"
            />
            <p className="text-2xl font-semibold text-rose-500 mb-4">
              1:1 Guidance
            </p>
            <p className="text-gray-600">
              Exclusive guidance from industry-leading mentors.
            </p>
          </div>

          <div className="w-72 border border-gray-200 shadow-xl rounded-lg p-8 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-50">
            <img
              className="w-20 mx-auto mb-6"
              src="/images/faang.png"
              alt="FAANG Mentors"
            />
            <p className="text-2xl font-semibold text-rose-500 mb-4">
              FAANG Experts
            </p>
            <p className="text-gray-600">
              Learn from mentors with real experience at top-tier companies.
            </p>
          </div>

          <div className="w-72 border border-gray-200 shadow-xl rounded-lg p-8 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-50">
            <img
              className="w-20 mx-auto mb-6"
              src="/images/cs.jpg"
              alt="Domain Expertise"
            />
            <p className="text-2xl font-semibold text-rose-500 mb-4">
              Diverse Domains
            </p>
            <p className="text-gray-600">
              Find mentors in every tech domain, all in one place.
            </p>
          </div>

          <div className="w-72 border border-gray-200 shadow-xl rounded-lg p-8 text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-50">
            <img
              className="w-20 mx-auto mb-6"
              src="/images/learning-path.png"
              alt="Custom Learning Paths"
            />
            <p className="text-2xl font-semibold text-rose-500 mb-4">
              Personalized Learning Paths
            </p>
            <p className="text-gray-600">
              Get tailored learning paths based on your goals, skills, and
              interests.
            </p>
          </div>
        </div>

        {/* CTA Button - Left Aligned */}
        <div className="mt-20 mb-16 text-left bg-gray-300  ">
          <button
            onClick={() => {
              navigate("/studentLogin");
            }}
            className="text-white bg-rose-500 hover:bg-rose-400 border border-rose-500 rounded-md px-12 py-4 text-2xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            FIND YOUR MENTOR
          </button>
        </div>
      </div>

      <div className="lg:ml-60 ml-5 mt-40">
  <h1 className="lg:text-4xl text-xl font-bold text-rose-500 ml-5">SUCCESS STORIES</h1>
  <div className="lg:flex flex-wrap gap-12 mt-12 p-3">
    {testimonials.map((student, index) => (
      <div
        key={index}
        className="lg:w-1/4  p-6 mb-10 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
      >
        <div className="text-left">
          <p className="text-2xl font-bold text-rose-500 mb-2">
            {student.name}
          </p>
          <p className="text-sm text-gray-500 mb-4">{student.role}</p>
          <p className="italic text-gray-700">{`"${student.feedback}"`}</p>
        </div>
        <div className="border-t border-gray-200 mt-6 pt-4">
          <p className="text-sm text-gray-600">Inspired by {student.name}'s journey? Join GUIDO today!</p>
        </div>
      </div>
    ))}
  </div>
</div>

      <Footer />
    </div>
  );
};

export default IntroPage;
