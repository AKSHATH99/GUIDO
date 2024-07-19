import axios from "axios";
import React, { useState } from "react";

const StudentLogin = () => {
  const [formdata, setFormdata] = useState({
    gmail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        " http://localhost:8000/api/v1/student/login",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      console.log(response.data.data.accessToken)
      localStorage.setItem("token", response.data.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>LOGIN FORM FOR STUDENT</p>

      <form onSubmit={submitData}>
        <label>
          email
          <input
            className="border border-black"
            type="email"
            name="gmail"
            value={formdata.gmail}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          password
          <input
            className="border border-black"
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="border border-black" type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default StudentLogin;
