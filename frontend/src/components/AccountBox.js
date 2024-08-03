import React from "react";
import { Link ,useNavigate } from "react-router-dom";

const AccountBox = ({ data }) => {
  const navigate = useNavigate();
  const mentor = data;
  console.log(data);
  console.log(mentor.picture);

  const navigatefunc=()=>{
    navigate(`/MentorAccount/${mentor._id}`)
  }
  return (
    <div className="border shadow-xl w-max h-max m-10 ">
      <div className="flex m-5">
        <div>
          <img
            className="m-3    h-1/2 w-44 rounded-lg"
            src={`${mentor.picture}`}
          />
          <button className="border rounded-lg p-4 m-3 bg-green-300 hover:bg-green-500">
            BOOK A SESSION | ${mentor?.fees}
          </button>
          <br />
          
            {" "}
            <Link to={`/MentorAccount/${mentor?._id}`}>
            <button onClick={navigatefunc} className="border rounded-lg p-4 m-3 bg-slate-400 text-white hover:bg-slate-500">
             VIEW PROFILE
            </button>
            </Link>
          
        </div>
        <div className="m-3">
          <p className=" mt-5 font-bold text-4xl ">
            {mentor?.firstname} {mentor?.lastname}{" "}
          </p>
          <div className="flex">
            <p className="border w-max m-3 p-2 shadow-lg">{mentor?.company} </p>
            <p className="border w-max m-3 p-2 shadow-lg">{mentor?.role} </p>
          </div>
          <p className="border w-max m-3 p-2 shadow-lg">{mentor?.skills}</p>

          <p className="w-96 m-2">
            I am a tech mentor with a strong background in technology and 8
            years of experience. Currently, I work as an SDE 2 at Google. I love
            helping others understand and succeed in the tech industry. Whether
            you're new to tech or looking to advance, I'm here to guide and
            support you with practical advice and encouragement. Let's work
            together to achieve your goals and grow your skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountBox;
