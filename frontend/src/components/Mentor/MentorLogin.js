import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MentorLogin = () => {
  const navigate = useNavigate();
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
        " http://localhost:8000/api/v1/mentor/login",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data.data.accessToken);
      localStorage.setItem("token", response.data.data.accessToken);
      if (response) {
        navigate("/MentorAccount");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex bg-gray-200">
      <div className="m-48">
        <p className="text-4xl">LOGIN TO YOUR <span className="underline text-rose-500 font-bold mr-3 ">GUIDO </span> ACCOUNT  </p>

        <form className="m-10" onSubmit={submitData}>
          <label>
            <p className="text-2xl font-semibold">Email</p>
            <br />
            <input
              className="border    m-7 h-12 w-96   mt-0 ml-0 rounded-md p-3"
              type="email"
              name="gmail"
              value={formdata.gmail}
              onChange={handleChange}
              placeholder="abc@gmail.com"
              required
            />
          </label>
          <br />
          <label>
            <p className="text-2xl mt- font-semibold"> Password</p>
            <br />
            <input
              className="border  m-7 h-12 w-96   mt-0 ml-0 rounded-md p-3"
              type="password"
              name="password" 
              value={formdata.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </label>
          <br />
          <button className="border border-green-100 bg-green-100  w-96 ml-0  h-12 rounded-md m-5 text-2xl hover:bg-green-300" type="submit">

            LOGIN
          </button>
          <p className="text-xl mt-10">Don't have a account ? <Link className="text-rose-500 hover:text-rose-700" to = "/MentorReg">Create your Account</Link> </p>
        </form>
      </div>
      <div className="mt-40">
        <img className="h-[600px] w-[600px]" src="/images/mentor2.png" />
      </div>
    </div>
  );
};

export default MentorLogin;
