import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [mentorsData, setMentorsData] = useState([]);

  // Fetch all mentors
  const fetchAllMentors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/v1/admin/fetchDB`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMentorsData(response.data.data); // Assuming `data` contains mentors data
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  // Toggle status of a mentor by ID
  const toggleStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/api/v1/admin/toggleStatus/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);

      // Refetch the mentors data to reflect the updated status
      fetchAllMentors();
    } catch (error) {
      console.error("Error toggling mentor status:", error);
    }
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  return (
    <div>
      <h1 className="my-10 ml-48 text-6xl mb-56">Admin Page</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }} className="ml-20">
        <thead>
          <tr>
            <th>Mentor ID</th>
            <th>Approval Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentorsData.map((mentor) => (
            <tr key={mentor.MentorID}>
              <td>{mentor.MentorID}</td>
              <td>{mentor.isApproved ? "Approved" : "Not Approved"}</td>
              <td>
                <button
                  onClick={() => toggleStatus(mentor.MentorID)}
                  disabled={mentor.isApproved}
                >
                  {mentor.isApproved ? "Approved" : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
