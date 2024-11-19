import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import AccountBox from "./AccountBox";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import HomeShimmer from "./Shimmer/HomeShimmer";
import SearchResultComponent from "./SearchResultComponent";

const Home = () => {
  const [mentorsData, setMentorsData] = useState([]);
  const [loginStudentData, setLoginStudentData] = useState({});
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filterField, setFilterField] = useState("All");
  const [noFilter, setNoFilter] = useState(false);

  // Fetch all mentors from the database
  const fetchAllMentors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/v1/mentor/fetchAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMentorsData(response.data.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  // Fetch logged-in student data
  const fetchLoggedInStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/v1/student/fetch`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoginStudentData(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // Fetch mentors based on the search input
  const searchMentor = async () => {
    if (!searchInput.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/v1/mentor/find/${searchInput}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResult(response.data.data);
    } catch (error) {
      console.error("Error searching mentors:", error);
    }
  };

  // Filter mentors based on the selected filter field
  const filterMentors = async () => {
    try {
      setNoFilter(false);
      if (filterField === "All") {
        fetchAllMentors();
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/v1/mentor/filter?filterfield=${filterField}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.data.length === 0) {
        setNoFilter(true);
      } else {
        setMentorsData(response.data.data);
      }
    } catch (err) {
      setNoFilter(true);
      console.error("Error filtering mentors:", err);
    }
  };

  useEffect(() => {
    fetchLoggedInStudent();
    fetchAllMentors();
  }, []);

  useEffect(() => {
    searchMentor();
  }, [searchInput]);

  useEffect(() => {
    filterMentors();
  }, [filterField]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <HeaderComponent picture={loginStudentData.picure} />

      {/* Hero Section */}
      <div className="text-center mt-12 mb-8">
        <h1 className="lg:text-5xl text-xl font-bold text-gray-800">
          Find your <span className="text-rose-500">Mentor</span> from the{" "}
          <span className="text-rose-500">1000s</span>!
        </h1>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="lg:w-1/2 h-12 border rounded-l-xl p-4 text-lg"
          placeholder="Search for a Mentor..."
        />
        <button
          onClick={() => {setSearchInput(""); setSearchResult("")}} 
          className="h-12 w-12 bg-gray-200 rounded-r-xl flex items-center justify-center"
        >
          <img src="/images/close.png" alt="Close" className="h-6" />
        </button>
      </div>

      {/* Search Results */}
      {searchResult.length > 0 && (
        <div className="absolute ml-[450px] -mt-8 h-max w-[1000px]  shadow-md bg-white z-50">
          {searchResult.map((result, index) => (
            <Link key={index} to={`/MentorAccount/${result?._id}`}>
              <SearchResultComponent data={result} />
            </Link>
          ))}
        </div>
      )}

      {/* Filter Dropdown */}
      <div className="lg:flex justify-center items-center mb-12 lg:ml-0 ml-20">
        <p className="text-2xl font-semibold text-rose-500 mr-4">Filter Mentors</p>
        <select
          onChange={(e) => setFilterField(e.target.value)}
          className="border p-3 text-lg rounded shadow"
        >
          <option value="All">All</option>
          <option value="Web development (Frontend / Backend / Full Stack)">
            Web Development
          </option>
          <option value="AI / ML">AI / ML</option>
          <option value="Data Science">Data Science</option>
          <option value="Software Development">Software Development</option>
        </select>
      </div>

      <div className="lg:ml-64 ml-20 lg:text-3xl  text-red-300 font-bold lg:mt-24 mt-10">BASED ON YOUR PREFERENCES </div>
      {/* Mentor List */}
      <div className="container mx-auto px-6">
        {noFilter ? (
          <div className="flex  flex-col">
            <img src="/images/notfound.png" alt="Not Found" className="w-32 mb-4" />
            <p className="text-xl text-orange-400">Oops! No mentors available for this field.</p>
          </div>
        ) : mentorsData.length > 0 ? (
          <div className="flex flex-wrap ">
            {mentorsData.map((mentor, index) => (
              <AccountBox key={index} data={mentor} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            <HomeShimmer />
            <HomeShimmer />
            <HomeShimmer />
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
