
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Header from "../../component/Header";
import '../../style/adminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin

  useEffect(() => {
    fetchUsers();
    checkAdminStatus(); // Call checkAdminStatus to determine admin status
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const approveExpert = async (userId) => {
    try {
      await axios.get(`/api/users/approve/${userId}`);
      fetchUsers(); // Refresh user list after approval
    } catch (error) {
      console.error("Error approving expert:", error);
    }
  };

  const removeExpert = async (userId) => {
    try {
      await axios.get(`/api/users/remove/${userId}`);
      fetchUsers(); // Refresh user list after approval
    } catch (error) {
      console.error("Error removing expert:", error);
    }
  };

  const increaseRating = async (userId) => {
    try {


      await axios.get(`/api/users/increaseRating/${userId}`);
      fetchUsers();


    } catch (error) {
      console.error("Error increasing Expert Rating ");
    }
  };
  const decreaseRating = async (userId) => {
    try {


      await axios.get(`/api/users/decreaseRating/${userId}`);
      fetchUsers();


    } catch (error) {
      console.error("Error increasing Expert Rating ");
    }
  };

  const checkAdminStatus = async () => {
    try {
      const response = await axios.get('/api/getme');
      setIsAdmin(response.data.user.role === 1); // Set isAdmin to true if user role is 1 (admin)
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsAdmin(false); // Set isAdmin to false if there's an error or user is not admin
    }
  };

  // Call checkAdminStatus whenever you want to update isAdmin, e.g., on initial render

  return (
    <>
      <Header />
      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>
        <hr />
        <br />

        {/* Conditional rendering based on isAdmin */}
        {isAdmin ? (
          <>
            {/* EXPERT LIST */}
            <h2>Expert List Approval Pending </h2>
            <ul>
              {users.map((user) => (
                user.role === 2 && !user.approved && (
                  <li key={user._id}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <img style={{ width: '100px' }} src={user.pic} alt="Description of the image" />
                      <span>{"Name: " + user.name}</span>
                      <span>{"Phone: " + user.phone}</span>
                      <span>{"Expertise: " + user.expertise}</span>
                      <span>{"Category: " + user.category}</span>
                      <span>{"Hourly Rate: " + user.hourlyRate}</span>

                      <span>{"Tell me About Yourself: " + user.Tell_About_Yourself}</span>
                      <span>{user.email}</span>
                      <span>Rank: {user.rank}</span>
                    </div>
                    <div><button className="approve-button" onClick={() => approveExpert(user._id)}>
                      <FaCheckCircle className="icon approve" />
                      Approve Expert
                    </button>
                      <hr></hr>
                      <button className="remove-button" onClick={() => removeExpert(user._id)}>
                        <FaTimesCircle className="icon remove" />
                        Remove Expert
                      </button></div>

                  </li>
                )
              ))}
            </ul>
            <hr />

            {/* APPROVED EXPERTS LIST */}
            <h2>Approved Experts List</h2>
            <ul>
              {users.map((user) => (
                user.role === 2 && user.approved && (
                  <li key={user._id}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <img style={{ width: '100px' }} src={user.pic} alt="Description of the image" />
                      <span>{"Name: " + user.name}</span>
                      <span>{"Phone: " + user.phone}</span>
                      <span>{"Expertise: " + user.expertise}</span>
                      <span>{"Category: " + user.category}</span>
                      <span> {user.email}</span>
                      <span style={{ color: 'green', fontSize: 'large', border: '2px solid red ' }}> Rank: {user.rank}</span>
                    </div>
                    <div>

                      <hr></hr>
                      <button style={{ backgroundColor: 'green', color: 'white' }} className="remove-button" onClick={() => increaseRating(user._id)}>
                        <FaTimesCircle className="icon remove" />
                        Increase Rating
                      </button>
                      <br></br>
                      <button style={{ backgroundColor: 'black', color: 'white' }} className="remove-button" onClick={() => decreaseRating(user._id)}>
                        <FaTimesCircle className="icon remove" />
                        Decrease Rating
                      </button>
                      <hr></hr>
                      <button className="remove-button" onClick={() => removeExpert(user._id)}>
                        <FaTimesCircle className="icon remove" />
                        Remove Expert
                      </button>
                    </div>
                  </li>
                )
              ))}
            </ul>
            <hr />

            {/* USER LIST */}
            <h2>User List</h2>
            <ul>
              {users.map((user) => (
                user.role === 0 && (
                  <li key={user._id}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                      <span>{user.details}</span>
                    </div>

                    <button className="remove-button" onClick={() => removeExpert(user._id)}>
                      <FaTimesCircle className="icon remove" />
                      Remove User
                    </button>
                  </li>
                )
              ))}
            </ul>
          </>
        ) : (
          <div className="container">
            <h3 >You are not authorized to access this page.</h3>
            {/* Redirect or handle unauthorized access */}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
