import React, { useState } from "react";
import axios from "axios";

const StudentRegister = () => {
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    password: "",
    age: 0,
    phone: "",
    gmail: "",
    place: "",
    language_spoken: "",
    gender: "",
    education: [
      {
        collegeName: "",
        degreeName: "",
        passoutYear: "",
        currentYear: "",
      },
    ],
    skills: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split(".");

    if (index) {
      const updatedEducation = [...formdata.education];
      updatedEducation[0][field] = value;

      setFormdata({
        ...formdata,
        education: updatedEducation,
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value,
      });
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    try {   
      const response = await axios.post(
        "http://localhost:8000/api/v1/student/register",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <label>
          firstname:
          <input
            className="border border-black"
            type="text"
            name="firstname"
            value={formdata.firstname}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          lastname:
          <input
            className="border border-black"
            type="text"
            name="lastname"
            value={formdata.lastname}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          password:
          <input
            className="border border-black"
            type="password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          Age:
          <input
            className="border border-black"
            type="number"
            name="age"
            value={formdata.age}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          Phone:
          <input
            className="border border-black"
            type="text"
            name="phone"
            value={formdata.phone}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          Gmail:
          <input
            className="border border-black"
            type="email"
            name="gmail"
            value={formdata.gmail}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          place:
          <input
            className="border border-black"
            type="text"
            name="place"
            value={formdata.place}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          language_spoken:
          <input
            className="border border-black"
            type="text"
            name="language_spoken"
            value={formdata.language_spoken}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          gender:
          <input
            className="border border-black"
            type="text"
            name="gender"
            value={formdata.gender}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          skills:
          <input
            className="border border-black"
            type="text"
            name="skills"
            value={formdata.skills}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <h3>Education:</h3>
        <label>
          College Name:
          <input
            className="border border-black"
            type="text"
            name="collegeName.0"
            value={formdata.education[0].collegeName}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          Degree Name:
          <input
            className="border border-black"
            type="text"
            name="degreeName.0"
            value={formdata.education[0].degreeName}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          Passout Year:
          <input
            className="border border-black"
            type="number"
            name="passoutYear.0"
            value={formdata.education[0].passoutYear}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <label>
          Current Year:
          <input
            className="border border-black"
            type="number"
            name="currentYear.0"
            value={formdata.education[0].currentYear}
            onChange={handlechange}
            required
          />
        </label>
        <br />

        <button className="border border-black" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;
      