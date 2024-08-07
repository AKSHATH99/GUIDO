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

  const [selectedFile , setSelectedFile]  = useState(null)

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

  const handleFileChange = (e)=>{
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile)
  }

  const submitData = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(formdata).forEach((key) => {
      if (key === "education") {
        formData.append(key, JSON.stringify(formdata[key]));
      } else {
        formData.append(key, formdata[key]);
      }
    });
    // If an image file is selected, append it to the form data
    if (selectedFile) {
      formData.append("picture", selectedFile); // Replace "image" with the actual field name in your backend API
    }

    console.log(selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/student/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" border bg-gradient-to-r from-gray-100 to-gray-300">
        <h1 className="text-4xl text-center mt-32   h-20 flex items-center justify-center ">
          {" "}
          FIND YOURSELF THE RIGHT{" "}
          <span className="text-rose-500 mx-3 font-bold underline">
            {" "}
            MENTOR{" "}
          </span>{" "}
          {/* YOU NEVER HAD{" "} */}
        </h1>
        <h1 className="text-4xl text-center mt-3     h-20 flex items-center justify-center ">
          {" "}
          REGISTER YOURSELF AS A STUDENT AT{" "}
          <span className="text-rose-500 ml-3 font-bold underline">
            {" "}
            GUIDO{" "}
          </span>{" "}
        </h1>
        <div className="m-96 mt-24 border rounded-xl shadow-2xl bg-white ">
          <form onSubmit={submitData}>
            <h1 className="m-10 mb-0 text-xl ">PERSONAL INFORMATION</h1>
            <label className="m-10  text-xl">
              Name
              <input
                className="border  m-10 h-10 w-1/3 rounded-md  border-gray-200 bg-gray-200 p-3"
                placeholder="Firstname"
                type="text"
                name="firstname"
                value={formdata.firstname}
                onChange={handlechange}
                required
              />
            </label>
            <label className=" text-xl">
              <input
                className="border border-gray-200 bg-gray-200 m-10 -ml-5 mb-0 h-10 w-1/3  rounded-md p-3"
                type="text"
                placeholder="Lastname"
                name="lastname"
                value={formdata.lastname}
                onChange={handlechange}
                required
              />
            </label>
            <br />

            <label className=" m-8 ml-10 text-xl">
              Gmail
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0 ml-10 rounded-md p-3"
                type="email"
                name="gmail"
                value={formdata.gmail}
                onChange={handlechange}
                placeholder="abc@gmail.com"
                required
              />
            </label>
            <br />

            <label className=" m-8 ml-10 text-xl">
              Phone:
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0  rounded-md p-3"
                type="text"
                name="phone"
                value={formdata.phone}
                onChange={handlechange}
                placeholder="91 00000 00000 "
                required
              />
            </label>
            <br />

            <div className="-mt-5">
              <label className=" m-8 ml-11  text-xl">
                Age
                <input
                  className="border border-gray-200 bg-gray-200 m-7 ml-12 h-10 w-1/4 rounded-md p-3"
                  type="number"
                  name="age"
                  value={formdata.age}
                  onChange={handlechange}
                  placeholder="0"
                  required
                />
              </label>

              <label className="m-8 text-xl">
                Gender
                <input
                  className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/4  rounded-md p-3"
                  type="text"
                  name="gender"
                  value={formdata.gender}
                  placeholder="Male / Female "
                  onChange={handlechange}
                  required
                />
              </label>
            </div>
            <br />

            <label className="m-8 ml-10 -mt-10 text-xl">
              Place
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0 ml-10  rounded-md p-3"
                type="text"
                name="place"
                value={formdata.place}
                onChange={handlechange}
                placeholder="Place"
                required
              />
            </label>
            <br />

            <label className=" m-8 ml-10 text-xl">
              Languages You Speak
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0  rounded-md p-3"
                type="text"
                name="language_spoken"
                value={formdata.language_spoken}
                onChange={handlechange}
                placeholder="Hindi , English , Spanish"
                required
              />
            </label>
            <br />

            {/* ---------------------------------------------------- */}

            <h1 className="m-10 mb-3 text-xl">EDUCATIONAL INFORMATION</h1>

            <label className=" m-8 ml-10 text-xl ">
              Skills
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0 ml-28 rounded-md p-3"
                type="text"
                name="skills"
                value={formdata.skills}
                onChange={handlechange}
                placeholder="PYTHON , JAVA , GO "
                required
              />
            </label>
            <br />

            {/* <h3>Education:</h3> */}
            <label className=" m-8 ml-10 text-xl ">
              College Name:
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0  rounded-md p-3"
                type="text"
                name="collegeName.0"
                value={formdata.education[0].collegeName}
                onChange={handlechange}
                placeholder="ABC University"
                required
              />
            </label>
            <br />

            <label className=" m-8 ml-10 text-xl ">
              Degree Name:
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0  rounded-md p-3"
                type="text"
                name="degreeName.0"
                value={formdata.education[0].degreeName}
                onChange={handlechange}
                placeholder="Bachelors of Computer Science"
                required
              />
            </label>
            <br />

            <label className=" m-8 ml-10 text-xl ">
              Passout Year:
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0 ml-10 rounded-md p-3"
                type="number"
                name="passoutYear.0"
                value={formdata.education[0].passoutYear}
                onChange={handlechange}
                placeholder="2025"
                required
              />
            </label>
            <br />

            <label className=" m-8 ml-10 text-xl ">
              Current Year:
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0 ml-10 rounded-md p-3"
                type="number"
                name="currentYear.0"
                value={formdata.education[0].currentYear}
                onChange={handlechange}
                placeholder="2"
                required
              />
            </label>
            <br />

            <h1 className="m-10 mb-3 text-xl">CREATE A PASSWORD</h1>

            <label className=" m-8 ml-10 text-xl">
              {/* Password */}
              <input
                className="border border-gray-200 bg-gray-200 m-7 h-10 w-1/2 mt-0 ml-1  rounded-md p-3"
                type="password"
                name="password"
                placeholder="Password"
                value={formdata.password}
                onChange={handlechange}
                required
              />
            </label>
            <br />

            <h1 className="m-10 mb-3 text-xl">UPLOAD IMAGE </h1>
            <p className="w-96 text-sm ml-10 ">
                Make sure to upload a professional photo for a better impression {" "}
              </p>
            <input type="file" onChange={handleFileChange}
              className=" m-7 h-10 w-1/2 mt-4 ml-10 rounded-md  text-xl "
            />

            <button
              className="border border-green-100 bg-green-100  w-3/4 ml-28 h-12 rounded-2xl m-5 text-2xl hover:bg-green-300"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
