import React from 'react'


//--------------------------This table holds student request list-----------------
const RequestsTable = () => {
  const requests = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '456-789-1234' },
  ];

  return (
    <table className='w-3/4 border-collapse border border-gray-300 mt-5 rounded-lg'>
      <thead>
        <tr className='bg-gray-100'>
          <th className='border border-gray-300 p-2'>Student ID</th>
          <th className='border border-gray-300 p-2'>Student Name</th>
          <th className='border border-gray-300 p-2'>Email ID</th>
          <th className='border border-gray-300 p-2'>Phone Number</th>
          <th className='border border-gray-300 p-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id} className='text-center'>
            <td className='border border-gray-300 p-2'>{request.id}</td>
            <td className='border border-gray-300 p-2'>{request.name}</td>
            <td className='border border-gray-300 p-2'>{request.email}</td>
            <td className='border border-gray-300 p-2'>{request.phone}</td>
            <td className='border border-gray-300 p-2'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
                View Account
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};







//-------------------DASHBORD COMPONENT--------------------------------------------------
const Dashboard = () => {
  return (
    <div className=''>
      <h1 className='text-4xl  font-mono border p-10 shadow-lg' >MENTOR DASHBOARD</h1>

      <div className='p-10 text-2xl text-gray-600'>MANAGE YOUR ACCOUNT AND SETTING HERE</div>

      <div className='p-10 shadow-lg m-10 mt-0' >

        <h1 className='text-2xl font-bold'>Student Request Accepting Status </h1>
        <p className='mt-2 text-gray-500 text-xl'>Set this to false if you dont want to accept request from student for temporarily</p>
        <select className='mt-5 w-1/4 p-5 border rounded-lg'>
          <option className=''>ACCEPTING </option>
          <option>NOT ACCEPTING </option>
        </select>

        {/* ---------------STUDENT REQUEST LIST------------------------------------------ */}
      <div className='mt-20  '>
        <h1 className=' text-3xl font-bold'>Requests List</h1>
        <p className='mt-2 text-gray-500 text-xl'>Browse through students currently taking mentorship under you </p>
        <RequestsTable/>
      </div>
      </div>


      
      STUDENT REQUEST FOR MENTORING LIST  , SET IS ACCEPTING REQUEST STATUS , 
    </div>
  )
}

export default Dashboard
