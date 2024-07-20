import axios from "axios";
import React, { useState } from "react";
import FeedbackComponent from "./FeedbackComponent";

const MentorAccount = () => {
  const [mentorData, setMentorData] = useState("");
  // const [st]

  const fetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");

      const response = await axios.get(
        " http://localhost:8000/api/v1/mentor/fetch",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------------------------------------------------
  return (
    <div className="bg-slate-100">
      <div className="border bg-white m-12  ">
        <div className="  flex ">
          <div className="flex m-10">
            <div>
              <img
                className="rounded-full w-36 h-36"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3mr0rOaAemqvSNKmzBD-I6mcpod9HFQuCw&usqp=CAU"
              />
            </div>
            <div className="mt-10 m-5 ">
              <p className="font-bold text-4xl"> JOE BIDEN </p>
              <p className="text-xl mt-5 flex">
                20 y/o <img className="ml-4" src="/images/location.png" />{" "}
                <span className="">India </span>{" "}
              </p>
            </div>
          </div>

          <div className="ml-36 mt-24 flex">
            <div>
              <img className="h-10 mr-3 mt-6" src="/images/grag.png" />
            </div>
            <div>
              <p className="text-4xl font-bold"> 1000 + </p>
              <p className="text-xl mt-2">Students Mentored</p>
            </div>
          </div>

          <div className="ml-52 mt-24 flex">
            <div>
              <img className="h-12 mr-3 mt-2" src="/images/org.png" />
            </div>
            <div>
              <p className="text-4xl font-bold"> 8+ </p>
              <p className="text-xl mt-2">Years of Industrial Experience</p>
            </div>
          </div>
        </div>

        <div className="border w-1/3 ml-[450px] m-5 rounded-3xl bg-green-300 hover:bg-green-500">
          <button className=" p-5 w-full   text-xl font-bold">BOOK A SESSION</ button>
        </div>
      </div>

      <div className="border flex bg-white m-12">
        <div className=" w-1/3 border-r">
          <p className="text-3xl m-7 font-bold"> About Me </p>
          {/* <hr className="border border-black" /> */}
          <p className="m-5 text-xl leading-loose">
            I am a tech mentor with a strong background in technology and 8
            years of experience. Currently, I work as an SDE 2 at Google. I love
            helping others understand and succeed in the tech industry. Whether
            you're new to tech or looking to advance, I'm here to guide and
            support you with practical advice and encouragement. Let's work
            together to achieve your goals and grow your skills.
          </p>
          {/* <hr className="border border-gray-200" /> */}
          {/* <p className="text-3xl m-7 font-bold">PROFESSIONAL DETAILS</p> */}
          <div className="m-7">
          <p className="text-xl ">Works At : </p>
          <p className="text-4xl font-semibold">GOOGLE </p>
          </div>

          <div className="m-7">
          <p className="text-xl ">Working As : </p>
          <p className="text-4xl font-semibold">Java Developer  </p>
          </div>

          <div className="m-7">
          <p className="text-xl ">Field of Expertise : </p>
          <p className="text-4xl font-semibold">Java Development  </p>
          </div>

          <div className="m-7">
          <p className="text-xl ">Skills : </p>
          <p className="text-4xl font-semibold">Java ,Springboot  </p>
          </div>

          <div className="m-7 mt-28">
          <p className="text-xl ">Languages I speak  : </p>
          <p className="text-4xl font-semibold">English ,Hindi  </p>
          </div>

          <div className="m-7 mt-28">
          <p className="text-xl "> Graduated From  : </p>
          <p className="text-4xl font-semibold">Cambridge University , 2018 </p>
          <p className="text-xl font-semibold">Bachelors Of Computer Technology</p>
          </div>
          {/* <hr className="border border-gray-200"/> */}
        </div>

        <div className="w-1/2">
          <p className="text-3xl m-7 font-bold">REVIEWS & FEEDBACKS </p>
          <FeedbackComponent />
          <FeedbackComponent />
          <FeedbackComponent />
          <FeedbackComponent />
        </div>
      </div>
      {/* <button onClick={fetchData} className="border border-black">FETCH DATA</button> */}
    </div>
  );
};

export default MentorAccount;
