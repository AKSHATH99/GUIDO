import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorBlock from "../ErrorBlock";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    gmail: "",
    password: "",
  });
  const [errormsg , setErrormsg] = useState("")

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
        " https://guido-backend.vercel.app/api/v1/student/login",
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
      navigate("/home");
    } catch (error) {
      console.log(error.response.statusText);
      setErrormsg(error.response.statusText)
    }
  };

  return (
    <div className="lg:flex bg-gray-200 min-h-screen h-screen">
  <div className="lg:m-48 lg:pb-5 lg:pt-0 p-10 pt-40 lg:mb-48 mb-0">
    <p className="text-xl lg:text-4xl">
      LOGIN TO YOUR <span className="underline text-rose-500 font-bold mr-3">GUIDO</span> ACCOUNT
    </p>

    <form className="lg:m-10 mt-10" onSubmit={submitData}>
      <label>
        <p className="text-2xl font-semibold">Email</p>
        <br />
        <input
          className="border m-7 h-12 lg:w-96 w-72 mt-0 ml-0 rounded-md p-3"
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
        <p className="text-2xl mt- font-semibold">Password</p>
        <br />
        <input
          className="border m-7 h-12 lg:w-96 w-72 mt-0 ml-0 rounded-md p-3"
          type="password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <br />
      {errormsg ? <ErrorBlock errortext={errormsg} /> : null}

      <button className="border border-green-100 bg-green-100 lg:w-96 w-72 ml-0 h-12 rounded-md m-5 text-2xl hover:bg-green-300" type="submit">
        LOGIN
      </button>
      <p className="text-xl mt-10">Don't have an account? <Link className="text-rose-500 hover:text-rose-700" to="/MentorReg">Create your Account</Link></p>
    </form>
  </div>
  <div className="mt-40 hidden lg:block">
    <img className="h-[600px] w-[600px]" src="/images/mentor2.png" />
  </div>
</div>

  );
};

export default StudentLogin;
