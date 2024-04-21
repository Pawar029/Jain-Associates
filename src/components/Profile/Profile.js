import React, { useState, useEffect } from 'react';
import './Profile.css';
import Axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userNumber = window.localStorage.getItem('number');
      const response = await Axios.get(`http://localhost:8000/oneregister?number=${userNumber}`);
      // console.log(response.data);
      // const { name, location, number, email } = response.data;
      // console.log("name ",response.data.user.name);
      setUserData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("userData",userData);

  return (
    <div>
      <div className="container">
        <div className="user-info">
          <h2>Client Information</h2>
          {userData && (
            <div>
              <div className="info-item">
                <strong>Name:</strong>
                <span>{userData.name}</span>
              </div>
              <div className="info-item">
                <strong>Location:</strong>
                <span>{userData.location}</span>
              </div>
              <div className="info-item">
                <strong>Mobile Number:</strong>
                <span>{userData.number}</span>
              </div>
              <div className="info-item">
                <strong>Email:</strong>
                <span>{userData.email}</span>
              </div>
            </div>
          )}
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;