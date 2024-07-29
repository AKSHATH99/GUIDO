import React from "react";

const FeedbackComponent = ({data}) => {
  console.log(data.student.firstname)
  return (
    <div className="m-10 border rounded-3xl">
      <div className="m-4">
        <span className="m-3">
        <img src="/images/qoute2.png"/> <p className="leading-8 text-xl "> 
          {/* His insight and expertise have been transformative, offering
          clear direction and fostering my confidence. Their approachable and
          encouraging nature makes every interaction a learning opportunity. I'm
          deeply appreciative of their commitment to my personal and
          professional development. " */}
          {data.review}
          </p><img src="/images/qoute1.png"/>
        </span>
      </div>
      <div className="flex m-4">
        <div>
          <img
            className="h-16 w-16 rounded-full"
            src="https://media.istockphoto.com/id/597958694/photo/young-adult-male-student-in-the-lobby-of-a-university.jpg?s=612x612&w=0&k=20&c=QaNEzmcKrLJzmwOcu2lgwm1B7rm3Ouq2McYYdmoMGpU="
          />
        </div>
        <div className="text-xl m-2 ">{data.student.firstname} {data.student.lastname}</div>
      </div>
    </div>
  );
};

export default FeedbackComponent;
