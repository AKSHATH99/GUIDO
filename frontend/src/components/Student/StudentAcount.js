import axios from "axios";
import React, { useState, useEffect } from "react";

const StudentAcount = () => {
  const [studentData, setStudentData] = useState("");
  const [student, setStudent] = useState({});

  // useEffect(()=>{
  const fetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
        const token = localStorage.getItem("token");
      const response = await axios.get(
        " http://localhost:8000/api/v1/student/fetch",
        {
          withCredentials:true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      setStudentData(response);
      console.log(studentData?.data?.data?.firstname);
      const student = studentData?.data?.data
      console.log(student.firstname)
      console.log("done");
    } catch (error) {
      console.log(error);
    }
  };

  // },[])
  return (
    <>
      <div>STUDENT ACCOUNT PAGE</div>
      <button className="border border-black" onClick={fetchData}>
        FETCH DATA
      </button>
      <p>MY ACCOUNT PAGE</p>
      {/* {stu.firstname} */}
    </>
  );
};

export default StudentAcount;
