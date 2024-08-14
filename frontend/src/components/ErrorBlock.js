import React from "react";

const ErrorBlock = ({errortext}) => {
  return (
    <div className="">
      <div className="p-4 flex">
        <img src="/images/warning.png" />
        <p className="ml-1 p-3 text-red-400 text-xl font-bold">ERROR : {errortext}</p>
      </div>
    </div>
  );
};

export default ErrorBlock;




