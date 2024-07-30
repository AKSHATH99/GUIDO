import axios from "axios";
import React, { useEffect, useState } from "react";
import FeedbackComponent from "./FeedbackComponent";
import HeaderComponent from "../HeaderComponent.js";
import Shimmer from "../Shimmer.js";
import Popup from "reactjs-popup";
import { useParams } from "react-router-dom";

const MentorAccount = () => {
  const [mentorData, setMentorData] = useState("");
  const [bookStatus, setBookStatus] = useState(false);
  const [reviewdata, setReviewData] = useState("");
  const [ReviewSubmited, setReviewSubmited] = useState(true);
  const [reviews, setReviews] = useState("");
  const { id } = useParams();

  //Function to book session
  const bookingHandler = async () => {
    setBookStatus(true);
    console.log(bookStatus);
    console.log(id);

    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8000/api/v1/mentor/updateCount/${id}`,
        {},
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
    sendEmail();
  };

  //Function to handle review input
  const handleChange = (e) => {
    const { value } = e.target;
    setReviewData(value);
    // console.log(value , "from handlechange")
  };

  //Function to submit review
  const HandleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8000/api/v1/student/review/${id}`,
        { review: reviewdata },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setReviewSubmited(true);
        console.log("SUBMITTED REVIEW", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Function to fetch user data
  const fetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");

      const response = await axios.get(
        ` http://localhost:8000/api/v1/mentor/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMentorData(response.data.data);
      // console.log(response.data.data.firstname);
      // console.log(mentorData.education[0].collegeName);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem("token");

    const response = await axios.get(
      ` http://localhost:8000/api/v1/mentor/review/${id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setReviews(response.data.data);
    console.log(reviews[0].student.firstname);
  };

  const sendEmail = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
  
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/student/email`,
        {}, 
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log(response);
  
      if (response) {
        console.log("mail sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchReviews();
  }, []);

  // -------------------------------------------------------------------
  return (
    <>
      <HeaderComponent />
      {mentorData ? (
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
                  <p className="font-bold text-4xl"> {mentorData.firstname}</p>
                  <p className="text-xl mt-5 flex">
                    {mentorData.age} y/o{" "}
                    <img className="ml-4" src="/images/location.png" />{" "}
                    <span className="">{mentorData.place} </span>{" "}
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
                  <p className="text-4xl font-bold"> {mentorData.yearofExp} </p>
                  <p className="text-xl mt-2">
                    Years of Industrial Experiences
                  </p>
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="border w-1/3 ml-[450px] m-5 rounded-3xl bg-green-300 hover:bg-green-500">
                <button
                  className=" p-5 w-full   text-xl font-bold"
                  onClick={bookingHandler}
                >
                  BOOK A SESSION | ₹ {mentorData.fees}
                </button>
              </div>
              {/* Code to display popup to enter review  */}
              {bookStatus && (
                <Popup
                  trigger={
                    <div className="border m-5 flex items-center justify-center ml-56 w-48 font-bold rounded-lg">
                      <img
                        className="w-10 m-3 h-10"
                        src="/images/review2.png"
                      />
                      <p>ADD REVIEW</p>
                    </div>
                  }
                  position="bottom center"
                >
                  <div className="bg-white border shadow-lg">
                    <textarea
                      type="text"
                      cols="45"
                      rows="10"
                      value={reviewdata}
                      onChange={handleChange}
                      name="review"
                      placeholder="Write up your review and experience here to help others "
                      className="m-5 border border-black p-4"
                    />
                    <br />
                    <button
                      className="border m-5 border-green-300 h-10 w-36 ml-28 bg-green-100"
                      onClick={HandleReviewSubmit}
                    >
                      SUBMIT{" "}
                    </button>
                  </div>
                </Popup>
              )}
              <button className="border border-red-600 w-max h-max p-3 flex mt-7 rounded-lg ">
                <img className="m-1 h-5 w-5" src="/images/report.png" />
                <p className="text-red-500 font-semibold mt-[2px]  ">REPORT</p>
              </button>
            </div>
          </div>

          <div className="border flex bg-white m-12">
            <div className=" w-1/3 border-r">
              <p className="text-3xl m-7 font-bold"> About Me </p>
              {/* <hr className="border border-black" /> */}
              <p className="m-5 text-xl leading-loose">
                {/* I am a tech mentor with a strong background in technology and 8
            years of experience. Currently, I work as an SDE 2 at Google. I love
            helping others understand and succeed in the tech industry. Whether
            you're new to tech or looking to advance, I'm here to guide and
            support you with practical advice and encouragement. Let's work
            together to achieve your goals and grow your skills. */}
                {mentorData.bio}
              </p>
              {/* <hr className="border border-gray-200" /> */}
              {/* <p className="text-3xl m-7 font-bold">PROFESSIONAL DETAILS</p> */}
              <div className="m-7">
                <p className="text-xl ">Works At : </p>
                <p className="text-4xl font-semibold">
                  {mentorData.company} .{" "}
                </p>
              </div>

              <div className="m-7">
                <p className="text-xl ">Working As : </p>
                <p className="text-4xl font-semibold">{mentorData.role} </p>
              </div>

              <div className="m-7">
                <p className="text-xl ">Field of Expertise : </p>
                <p className="text-4xl font-semibold">{mentorData.field} </p>
              </div>

              <div className="m-7">
                <p className="text-xl ">Skills : </p>
                <p className="text-4xl font-semibold">{mentorData.skills} </p>
              </div>

              <div className="m-7 mt-28">
                <p className="text-xl ">Languages I speak : </p>
                <p className="text-4xl font-semibold">
                  {mentorData.language_spoken}{" "}
                </p>
              </div>

              <div className="m-7 mt-28">
                <p className="text-xl "> Graduated From : </p>
                <p className="text-4xl font-semibold">
                  {mentorData?.education[0]?.collegeName} ,{" "}
                  {mentorData?.education[0]?.passoutYear}{" "}
                </p>
                <p className="text-xl font-semibold">
                  {mentorData?.education[0]?.degreeName}
                </p>
              </div>
              {/* <hr className="border border-gray-200"/> */}
            </div>

            <div className="w-1/2">
              {reviews && reviews.length > 0 ? (
                <div>
                  <p className="text-3xl m-7 font-bold">REVIEWS & FEEDBACKS </p>
                  {reviews.map((review, index) => (
                    <FeedbackComponent key={index} data={review} />
                  ))}
                </div>
              ) : (
                "LOADING...................."
              )}
            </div>
          </div>
          {/* <button onClick={fetchData} className="border border-black">FETCH DATA</button> */}
        </div>
      ) : (
        <Shimmer />
      )}
    </>
  );
};

export default MentorAccount;
