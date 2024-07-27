import React from "react";
import HeaderComponent from "./HeaderComponent";
import AccountBox from "./AccountBox";

const Home = () => {
  return (
    <div>
      <HeaderComponent />
      <div className="flex flex-wrap">
        <AccountBox />
        <AccountBox />
        <AccountBox />
        <AccountBox />
        <AccountBox />
      </div>
    </div>
  );
};

export default Home;
