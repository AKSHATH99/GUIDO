import axios from "axios";
import React, { useState } from "react";

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
  return <div>
    <button onClick={fetchData} className="border border-black">FETCH DATA</button>
  </div>;
};

export default MentorAccount;
