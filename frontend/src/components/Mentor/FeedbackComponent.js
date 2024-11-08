import React from "react";

const FeedbackComponent = ({ data }) => {
  return (
    <div className="m-10 border rounded-3xl bg-slate-100 shadow-xl hover:bg-slate-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-300">
      <div className="m-4">
        <span className="m-3">
          <p className="leading-8 text-xl italic">{data.review}</p>
        </span>
      </div>
      <div className=" m-4">
        <div className="flex">
          <img
            className="h-8 w-8 rounded-full"
            src="/images/star.png"
          />
          <img
            className="h-8 w-8 rounded-full"
            src="/images/star.png"
          />
          <img
            className="h-8 w-8 rounded-full"
            src="/images/star.png"
          />
        </div>
        <div className="text-xl m-2  font-bold ">
          {data.student.firstname} {data.student.lastname}{" "}
          <p className="font-normal text-sm">October 2024</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackComponent;
