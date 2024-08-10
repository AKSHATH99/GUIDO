import axios from "axios";
import React, { useState, useEffect } from "react";
import HeaderComponent from "../HeaderComponent.js";
import Footer from "../Footer.js";

const StudentAcount = () => {
  const [studentData, setStudentData] = useState("");
  const [student, setStudent] = useState({});

  
  const fetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const token = localStorage.getItem("token");
      const response = await axios.get(
        " http://localhost:8000/api/v1/student/fetch",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentData(response.data.data);
      console.log(response)
      console.log(studentData.education[0].collegeName);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchData();  
  },[])
  return (
    <>
      <HeaderComponent />
      {studentData?
      <div>
        <div className="bg-rose-300 border h-56 text-rose-400">ss</div>
        <div className="flex m-20 border -mt-20 bg-white rounded-lg shadow-lg ml-60   w-max">
          <div className="p-5 pr-32">
            <img
              className="rounded-xl m-3 w-72 h-full p-2"
              // src="https://media.istockphoto.com/id/597958694/photo/young-adult-male-student-in-the-lobby-of-a-university.jpg?s=612x612&w=0&k=20&c=QaNEzmcKrLJzmwOcu2lgwm1B7rm3Ouq2McYYdmoMGpU="
              src={studentData.picure}
            />
          </div>
          <div className="mt-20 -ml-10 m-5 ">
            <p className="font-bold text-5xl"> {studentData.firstname} {studentData.lastname}</p>
              <p className=" text-xl mt-4"> Speaks  : {studentData.language_spoken  }</p>
            <p className="text-xl mt-4  p-2 pl-0">
              {studentData.education[0].degreeName}
              <div className="flex mt-4 -ml-5">
                <img className="ml-4" src="/images/location.png" />{" "}
                <p className="">{studentData.place}</p>{" "}
              </div>
            </p>
          </div>
          <div className="ml- mt-16">
            <div className="flex m-3 p-3">
              {" "}
              <img className="mx-3" src="/images/email.png" />
              akshathpkk@gmail.com
            </div>
            <div className="flex m-3 p-3">
              {" "}
              <img className="mx-3" src="/images/call.png" />
              8590518257
            </div>
            <div className="flex m-3 p-3">
              {" "}
              <img className="mx-3" src="/images/linkedin.png" />
              Lindekin
            </div>
            <div className="flex m-3 p-3">
              {" "}
              <img className="mx-3" src="/images/Xlogo.png" />
              Twitter
            </div>
          </div>
        </div>

        <div className="m-20 border  bg-white rounded-lg shadow-lg ml-32 w-3/4 ">
          <p className="p-5 text-4xl ml-20 font-bold">About</p>
          <p className="p-10">
            I am a dedicated and motivated college student, set to graduate in
            May 2025, with a strong passion for academic excellence and personal
            growth. My academic journey has been marked by a commitment to
            learning, with a particular focus on developing both technical and
            soft skills. I thrive in collaborative environments, often taking
            the lead in team projects and actively participating in
            extracurricular activities. My adaptability and critical thinking
            abilities have been honed through diverse coursework and hands-on
            experiences. I am passionate about leveraging my knowledge to drive
            meaningful change and make a positive impact in my chosen field.
            With a keen interest in continuous learning, I am eager to embrace
            new challenges and opportunities that will further shape my
            professional and personal development.
          </p>
        </div>

        
        <div className="m-20 border  bg-white rounded-lg shadow-lg ml-32 w-3/4 flex ">

        <div>
        <p className="p-5 text-4xl ml-20 font-bold">EDUCATION</p>
        <div className="p-5 ml-16">
        <div className="flex m-5">   <span className="text-xl ml-3 font-bold "> AT :</span>  <p className="ml-10 text-xl ">  {studentData.education[0].collegeName} </p></div>
        <div className="flex m-5">   <span className="text-xl ml-3 font-bold "> DOING :</span> <p className="ml-10 text-xl">  {studentData.education[0].degreeName} </p></div>
        <div className="flex m-5">   <span className="text-xl ml-3 font-bold "> CURRENTLY IN :</span> <p className="ml-10 text-xl"> {studentData.education[0].currentYear}r</p></div>
        <div className="flex m-5">   <span className="text-xl ml-3 font-bold "> GRADUATING IN : </span> <p className="ml-10 text-xl"> {studentData.education[0].passoutYear}  </p></div>
        </div>
        </div>

        <div className=" w-1/2 ml-20">
        <p className="p-5 text-4xl ml-20 font-bold">SKILLS</p>
        <div className="p-5 ml-16 flex flex-wrap">
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> Java</span>  </div>
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> SpringBoot</span> </div>
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> MySQL</span> </div>
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> C++ </span> </div>
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> Github </span> </div>
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> Python </span> </div>
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> RestApi </span> </div>
        <div className=" m-5 border p-3 shadow-lg">   <span className="text-xl  font-bold "> MongoDb </span> </div>
        </div>` `
        </div>

        </div>

        <button className="border border-black" onClick={fetchData}>
          FETCH DATA
        </button>
      </div>
      : "loading"}
      <Footer/>
    </>
  );
};

export default StudentAcount;
