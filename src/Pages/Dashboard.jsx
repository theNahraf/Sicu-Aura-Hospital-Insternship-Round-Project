import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import '../App.css'

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/getallhospitaldetails');
        console.log("response from backend for data -> ", response);
        
       // Filter only hospital data by checking the accessCode field
       const hospitalData = response.data.hospitalDetails.filter(
        (user) => user.accessCode === "Hospital"
      );

      // Set the filtered hospital data to the state
      setUsers(hospitalData);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-2 bg-gray-100 min-h-screen overflow-auto ">
        <h2 className="text-3xl font-bold text-center mb-8">Hospital Registrations</h2>
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white ">
            <thead className=' '>
              <tr className="w-full border border-gray-300 bg-teal-400 rounded-full text-white text-left ">
                <th className="p-4">No.</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Hospital Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Address</th>
                <th className="p-4">Phone No.</th>
                <th className="p-4">City</th>
                <th className="p-4">State</th>
                <th className="p-4">Pincode</th>
                <th className="p-4">Hospital Registration Date</th>
                <th className="p-4">Hospital Registration Number</th>
                <th className="p-4 " >Hospital Registration Photo</th>
                <th className="p-4">Emergency-Ward Number</th>
                <th className="p-4">Number Of Ambulance</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.createdAt}</td>
                  <td className="p-4">{user.hospitalName}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.address}</td>
                  <td className="p-4">{user.phoneNumber}</td>
                  <td className="p-4">{user.city}</td>
                  <td className="p-4">{user.state}</td>
                  <td className="p-4">{user.pincode}</td>
                  <td className="p-4">{user.registrationDate}</td>
                  <td className="p-4">{user.registrationNumber}</td>
                  <td className="p-4">{user.registrationCertificate}</td>
                  <td className="p-4">{user.wardNumber}</td>
                  <td className="p-4">{user.ambulanceNumber}</td>
                  <td className="p-4">{user.status}</td>

                </tr>
              ))}
            </tbody>
          </table>
            
        </div>
      </div>
    </>
  );
};

export default Dashboard;
