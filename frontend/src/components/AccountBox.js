import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AccountBox = ({ data }) => {
  const navigate = useNavigate();
  const mentor = data;

  const navigateToProfile = () => {
    navigate(`/MentorAccount/${mentor?._id}`);
  };

  return (
    <div
      onClick={navigateToProfile}
      className="border shadow-lg rounded-xl p-6 m-8 hover:cursor-pointer hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out bg-white max-w-2xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Left Section: Mentor Image */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={mentor?.picture}
            alt={`${mentor?.firstname} ${mentor?.lastname}`}
            className="rounded-lg object-cover w-full md:w-32 h-32 mb-4"
          />
          
          {/* Call to Action Button */}
          <Link to={`/MentorAccount/${mentor?._id}`}>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation on button click
                navigateToProfile();
              }}
              className="w-full md:w-40 bg-green-500 text-white font-semibold px-6 py-3 lg:my-0 my-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out mt-4"
            >
              BOOK  SESSION ${mentor?.fees}
            </button>
          </Link>
        </div>

        {/* Right Section: Mentor Details */}
        <div className="flex flex-col justify-between flex-1 md:ml-6">
          {/* Mentor Name */}
          <p className="text-3xl font-bold text-gray-800">
            {mentor?.firstname} {mentor?.lastname} 
          </p>

          {/* Mentor Info */}
          <div className="flex flex-wrap gap-2 mt-3">
            {mentor?.company && (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm shadow-md">
                {mentor?.company}
              </span>
            )}
            {mentor?.role && (
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm shadow-md">
                {mentor?.role}
              </span>
            )}
            <br/>
            
          </div>
          {mentor?.skills && (
              <p className="bg-green-100 text-green-600 px-3 py-1 mt-5 rounded-full text-sm shadow-md">
                {mentor?.skills}
              </p>
            )}

          {/* Mentor Description */}
          <p className="text-gray-700 text-sm mt-4 w-56">
            I am a tech mentor with a strong background in technology and 8
            years of experience. Currently, I work as an SDE 2 at Google. I love
            helping others understand and succeed in the tech industry. Whether
            you're new to tech or looking to advance, I'm here to guide and
            support you with practical advice and encouragement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountBox;
