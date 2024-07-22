import React , {useState} from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";

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
      if(response){
        navigate("/MentorAccount")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>LOGIN FORM FOR MENTOR</p>

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
        <button className="border border-black" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default MentorLogin;
