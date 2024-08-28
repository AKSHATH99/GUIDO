import React from 'react'

const StudentAccountShimmer = () => {
    return (
        <div className="animate-pulse">
            
        <div className='flex'>
          <div className="bg-slate-200 h-96  w-96 ml-96  m-12 rounded-lg flex justify-center items-center animate-pulse">
          <p className="text-5xl text-gray-400"> </p>
          <p className="text-5xl text-gray-400"> </p>
          </div>
          <div className="bg-slate-200 h-72  w-[600px] ml-10 m-12 rounded-lg flex justify-center items-center animate-pulse">
          <p className="text-5xl text-gray-400"> </p>
          <p className="text-5xl text-gray-400"> </p>
          </div>
          </div>

            <div className="flex">
          <div className="bg-slate-200 h-96  w-96 ml-96 m-12 rounded-lg flex justify-center items-center">
          <p className="text-5xl text-gray-400"> </p>
          </div>
          <div className="bg-slate-200 h-96 w-[700px] ml-10 m-12 rounded-lg flex justify-center items-center">
          <p className="text-5xl text-gray-400"> </p>
          </div>
          </div>
    
        </div>
      );
}

export default StudentAccountShimmer
