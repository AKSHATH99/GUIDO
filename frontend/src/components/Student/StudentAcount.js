import axios from "axios";
import React, { useState, useEffect } from "react";
import HeaderComponent from "../HeaderComponent.js";
import Footer from "../Footer.js";
import StudentAccountShimmer from "../Shimmer/StudentAccountShimmer.js";

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
      console.log(response);
      console.log(studentData.education[0].collegeName);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <HeaderComponent />
      <div className="bg-gray-50 p-3 pt-5">
      <div className="ml-[400px]  mt-16 text-4xl flex border-b-2 w-max pb-10 ">
        <p className="mt-4">My Account </p>
        <button className="ml-[700px] text-2xl border p-3 px-9 rounded-xl bg-orange-300 font-semibold">
          Sign Out{" "}
        </button>
      </div>

    <p className="ml-96 m-10 text-2xl text-gray-400">
      Manage your account and edit your details   
    </p>
      {studentData ? (
        <div className="">
          <div className="flex">
            <div className=" m-20   -mt-5   ml-60   w-max">
              {/* <p>PERSONAL DETAILS</p> */}
              
              <div className="p-5 pr-32 flex">
                <img
                  className="rounded-full m-3 ml-24 w-40 h-40 p-2"
                  // src="https://media.istockphoto.com/id/597958694/photo/young-adult-male-student-in-the-lobby-of-a-university.jpg?s=612x612&w=0&k=20&c=QaNEzmcKrLJzmwOcu2lgwm1B7rm3Ouq2McYYdmoMGpU="
                  src={studentData.picure}
                />
            <img className="w-10 h-10 ml mt-5 hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out" src="/images/edit.png"/>

              </div>

              <div className=" ml-14 m-5 p-3">
                <p className="font-bold text-5xl ml-10">
                  {" "}
                  {studentData.firstname} {studentData.lastname}
                </p>
                <div className="flex m-3 p-3 ml-5">
                  {" "}
                  <img className="mx-3" src="/images/email.png" />
                  <p className="text-xl">akshathpkk@gmail.com</p>
                </div>
                <div className="flex m-3 p-3 ml-5">
                  {" "}
                  <img className="mx-3 h-5" src="/images/call.png" />
                  <img className="mx-3" src="/images/linkedin.png" />
                  <img className="mx-3" src="/images/Xlogo.png" />
                  {/* 8590518257 */}
                </div>
                {/* <div className="flex m-3 p-3 ml-5">
                  {" "}
                  <img className="mx-3" src="/images/linkedin.png" />
                  <img className="mx-3" src="/images/Xlogo.png" />
                </div> */}

                {/* <p className=" text-xl mt-4"> Speaks  : {studentData.language_spoken  }</p> */}
                <p className="text-xl mt-4  p-2 pl-0">
                  {/* {studentData.education[0].degreeName} */}
                  <div className="flex mt-4 -ml-5">
                    {/* <img className="ml-4" src="/images/location.png" />{" "}
                <p className="">{studentData.place}</p>{" "} */}
                  </div>
                </p>
              </div>
            </div>
            <div>
            {/* <h1 className=" text-3xl mt-10 font-bold "> PERSONAL DETAILS </h1> */}
            <div className="m-20 mt-10 ml-0   rounded-lg shadow-lg  w-3/4  h-max ">
            <div className="flex">
            <p className="p-5 text-4xl ml-5 font-bold">About</p>
            <img className="w-10 h-10 ml-96 mt-5 hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out" src="/images/edit.png"/>
            </div>  
              <p className="p-10">
                I am a dedicated and motivated college student, set to graduate
                in May 2025, with a strong passion for academic excellence and
                personal growth. My academic journey has been marked by a
                commitment to learning, with a particular focus on developing
                both technical and soft skills. I thrive in collaborative
                environments, often taking the lead in team projects and
                actively participating in extracurricular activities. My
                adaptability and critical thinking abilities have been honed
                through diverse coursework and hands-on experiences. I am
                passionate about leveraging my knowledge to drive meaningful
                change and make a positive impact in my chosen field. With a
                keen interest in continuous learning, I am eager to embrace new
                challenges and opportunities that will further shape my
                professional and personal development.
              </p>
            </div>
            </div>
          </div>

          

          <div className="m-20  -mt-20 rounded-lg  ml-64   w-3/4 flex ">
          <div className="shadow-lg p-8 ml-10 bg-white rounded-lg">
  <div className="flex justify-between items-center mb-6">
    <p className="text-4xl font-bold">EDUCATION</p>
    <img 
      className="w-10 h-10 cursor-pointer transform hover:scale-110 transition-transform duration-200 ease-in-out" 
      src="/images/edit.png" 
      alt="Edit icon"
    />
  </div>

  <div className="ml-8">
    <div className="flex items-center mb-4">
      <span className="text-xl font-bold mr-3">AT:</span>
      <p className="text-xl">{studentData.education[0].collegeName}</p>
    </div>

    <div className="flex items-center mb-4">
      <span className="text-xl font-bold mr-3">DOING:</span>
      <p className="text-xl">{studentData.education[0].degreeName}</p>
    </div>

    <div className="flex items-center mb-4">
      <span className="text-xl font-bold mr-3">CURRENTLY IN:</span>
      <p className="text-xl">{studentData.education[0].currentYear}</p>
    </div>

    <div className="flex items-center">
      <span className="text-xl font-bold mr-3">GRADUATING IN:</span>
      <p className="text-xl">{studentData.education[0].passoutYear}</p>
    </div>
  </div>
</div>


            <div className=" w-1/2 ml-20 border">
            <div className="flex">
              <p className="p-5 text-4xl ml-20 font-bold">SKILLS</p>
            <img className="w-10 h-10 ml-52 mt-5 hover:cursor-pointer  transform hover:scale-110 transition duration-200 ease-in-out" src="/images/edit.png"/>
            </div>
              <div className="p-5 ml-16 flex flex-wrap">
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> Java</span>{" "}
                </div>
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> SpringBoot</span>{" "}
                </div>
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> MySQL</span>{" "}
                </div>
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> C++ </span>{" "}
                </div>
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> Github </span>{" "}
                </div>
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> Python </span>{" "}
                </div>
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> RestApi </span>{" "}
                </div>
                <div className=" m-5 border p-3 shadow-lg">
                  {" "}
                  <span className="text-xl  font-bold "> MongoDb </span>{" "}
                </div>
              </div>
              ` `
            </div>
          </div>

          <button className="border border-black" onClick={fetchData}>
            FETCH DATA
          </button>
        </div>
      ) : (
        <StudentAccountShimmer/>
      )}
      </div>
      <Footer />
    </>
  );
};

export default StudentAcount;
