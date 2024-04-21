// import React,{useState,useEffect} from 'react'
// import { Link } from 'react-router-dom'
// import './Navbar.css'
// import pic from '../Images/j&a.png'
// import Axios from 'axios';
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   // State to track user login status
//   const [loggedIn, setLoggedIn] = useState(false);
//   // State to store user data
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   // Function to check if user is logged in
//   const checkLoginStatus = async () => {
//     try {
//       const number = window.localStorage.getItem('number');
//       const response = await Axios.get(`http://localhost:8000/profile?number=${number}`);
//       console.log(response);
//       if (response.data.loggedIn) {
//         setLoggedIn(true);
//         setUserData(response.data.user);
//         console.log(userData);
//         navigate("/");    
//         // window. location. reload();
//       }
//     } catch (error) {
//       console.error("Error checking login status:", error);
//     }
//   };
  
//   // useEffect(() => {
//   //   // Check if user is logged in when component mounts
//   //   checkLoginStatus();
//   // }, []); // Empty dependency array ensures useEffect runs only once after initial render


//   // Function to handle logout
//   const handleLogout = async () => {
//     try {
//       const userId = window.localStorage.getItem('number'); // Correcting the property name
//       if (!userId) {
//         console.error('User ID not found in localStorage');
//         return;
//       }
//       console.log(`http://localhost:8000/logout/${userId}`);
//       const response = await Axios.delete(`http://localhost:8000/logout/${userId}`);
//       if (response.data.success) {
//         setLoggedIn(false);
//         setUserData(null);
//         window.localStorage.clear();
//         console.log("loggedIn",loggedIn);
//         // Redirect to login page
//         window.location.href = '/login';
//       } else {
//         console.error('Logout failed:', response.data.error);
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };


//   console.log("loggedIn out",loggedIn);

//   return (
    
//     <div className='sticky-top bg-primary-subtle  '>
//     <nav className="navbar navigation-wrap navbar-expand-lg ">

//     {/* <nav className="navbar navbar-expand-lg  navigation-wrap bg-info"  > */}
//       <div className="container-fluid ">
        
//       <Link  className="navbar-brand mb-30" to="/">
//         {/* <img src={logo} alt="logo" width="140" height="86"/> */}
//       <img className='ms-5 ' decoding="async" src= {pic} alt="logo" width="120" height="70"/>
            
//           <h3>JAIN AND ASSOCIATES</h3> 
//         </Link>
//         <button className="navbar-toggler bg-info-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//       {/* <a class="navbar-brand" href="#"><img decoding="async" src= {pic} width="140" height="86"/></a> */}
//         {/* <Link className="navbar-brand" to="/"><h2>Jain And Associates</h2></Link> */}
//         {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button> */}
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto  mb-lg-0 ms-5     ">
//             <li className="nav-item m-2  ">
//                <Link className="nav-link active fs-5 " data-bs-toggle="tooltip" aria-current="page" to="/slab"> SLAB</Link> 
//             </li>
//             <li className="nav-item m-2 ">
//               <Link className="nav-link active fs-5" aria-current="page" to="/beam">BEAM</Link>
//             </li>
//             <li className="nav-item m-2">
//               <Link className="nav-link active fs-5" aria-current="page" to="/column">COLUMN</Link>
//             </li>
//             <li className="nav-item m-2">
//               <Link className="nav-link active fs-5" aria-current="page" to="/wall">WALL</Link>
//             </li>
//             <li className="nav-item m-2">
//               <Link className="nav-link active fs-5" aria-current="page" to="/footing">FOOTING</Link>
//             </li>
//             <li className="nav-item m-2">
//               <Link className="nav-link active fs-5" aria-current="page" to="/stair">STAIRCASE</Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link className="nav-link" to="/">Link</Link>
//             </li>
//             <li className="nav-item dropdown">
//               <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 Dropdown
//               </Link>
//               <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
//                 <li><a className="dropdown-item" href="/">Action</a></li>
//             <li><a className="dropdown-item" href="/">Another action</a></li>
//             <li><hr className="dropdown-divider"/></li>
//             <li><a className="dropdown-item" href="/">Something else here</a></li>
//               </ul>
//             </li>
//             <li className="nav-item">
//           <a className="nav-link disabled" href="/" tabindex="-1" aria-disabled="true">Disabled</a>
//         </li> */}
//           </ul>
//           <div className="d-flex">
//             <Link className='m-2 fs-5' to="/login">Login</Link>
//             <p className='m-2 fs-5'> / </p>
//             <Link className='m-2 fs-5' to="/register">New User</Link>
//             {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//             <button className="btn btn-outline-info" type="submit">Search</button> */}
//           </div>

//           {loggedIn ? (
//   <div>
//     {/* Display user's name if userData is not null */}
//     {userData && (
//       <span className="me-3">
//         <Link to='/profile' style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
//           {userData.name}
//         </Link>
//       </span>
//     )}
//     {/* Logout button */}
//     <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
//   </div>
// ) : (
//   <button className="btn btn-outline-info" type="submit">
//     <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
//   </button>
// )}
//         </div>
        
//       </div>
//     </nav>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import pic from '../Images/j&a.png';
import Axios from 'axios';
// import { useNavigate } from "react-router-dom";

export default function Navbar() {
  // State to track user login status
  const [loggedIn, setLoggedIn] = useState(false);
  // State to store user data
  const [userData, setUserData] = useState(null);
  // const navigate = useNavigate();
  

  // Function to check if user is logged in
  // const checkLoginStatus = async () => {
  //   try {
  //     const number = window.localStorage.getItem('number');
  //     const response = await Axios.get(`http://localhost:8000/profile?number=${number}`);
  //     console.log(response);
  //     if (response.data.loggedIn) {
  //       setLoggedIn(true);
  //       setUserData(response.data.user);
  //       console.log(userData);
  //       navigate("/");    
  //       // window.location.reload();
  //     }
  //   } catch (error) {
  //     console.error("Error checking login status:", error);
  //   }
  //   // console.log("user   ",userData.name);
  // };

   useEffect( () => {

    const checkLoginStatus = async () => {
      try {
        const number = window.localStorage.getItem('number');
        const response = await Axios.get(`http://localhost:8000/profile?number=${number}`);
        console.log(response);
        if (response.data.loggedIn) {
          setLoggedIn(true);
          setUserData(response.data.user);
          // console.log(userData);
          // navigate("/");    
          // window.location.reload();
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
      // console.log("user   ",userData.name);
    };

     checkLoginStatus();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render


  // Function to handle logout
  const handleLogout = async () => {
    try {
      const userId = window.localStorage.getItem('number'); // Correcting the property name
      if (!userId) {
        console.error('User ID not found in localStorage');
        return; 
      }
      console.log(`http://localhost:8000/logout/${userId}`);
      const response = await Axios.delete(`http://localhost:8000/logout/${userId}`);
      if (response.data.success) {
        setLoggedIn(false);
        setUserData(null);
        window.localStorage.clear();
        console.log("loggedIn",loggedIn);
        // Redirect to login page
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.data.error);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  console.log("loggedIn out",loggedIn);
  

  return (
    <div className='sticky-top bg-primary-subtle'>
      <nav className="navbar navigation-wrap navbar-expand-lg ">
        <div className="container-fluid ">
          <Link className="navbar-brand mb-30" to="/">
            <img className='ms-5 ' decoding="async" src={pic} alt="logo" width="120" height="70" />
            <h3>JAIN AND ASSOCIATES</h3>
          </Link>
          <button className="navbar-toggler bg-info-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto  mb-lg-0 ms-5     ">
              <li className="nav-item m-2  ">
                <Link className="nav-link active fs-5 " data-bs-toggle="tooltip" aria-current="page" to="/slab"> SLAB</Link>
              </li>
              <li className="nav-item m-2 ">
                <Link className="nav-link active fs-5" aria-current="page" to="/beam">BEAM</Link>
              </li>
              <li className="nav-item m-2">
                <Link className="nav-link active fs-5" aria-current="page" to="/column">COLUMN</Link>
              </li>
              <li className="nav-item m-2">
                <Link className="nav-link active fs-5" aria-current="page" to="/wall">WALL</Link>
              </li>
              <li className="nav-item m-2">
                <Link className="nav-link active fs-5" aria-current="page" to="/footing">FOOTING</Link>
              </li>
              <li className="nav-item m-2">
                <Link className="nav-link active fs-5" aria-current="page" to="/stair">STAIRCASE</Link>
              </li>
            </ul>
            {loggedIn ? (
  <div>
    {/* Display user's name if userData is not null */}
    {userData && (
      <span className="me-3">
        <Link to='/profile' style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
          {userData.name}
        </Link>
      </span>
    )}
    {/* Logout button */}
    <button className="btn btn-outline-info" onClick={handleLogout}>Logout</button>
  </div>
) : (
    <div className="d-flex">
  {/* <button className="btn btn-outline-info" type="submit">
    <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
  </button> */}
             <Link className='m-2 fs-5' to="/login">Login</Link>
             <p className='m-2 fs-5'> / </p>
             <Link className='m-2 fs-5' to="/register">New User</Link>
             </div>
)}

          </div>
        </div>
      </nav>
    </div>
  )
}