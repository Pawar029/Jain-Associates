import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import pic from '../Images/j&a.png'
// import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    // <div className='sggs2'>
    //     <nav>
    //   <input type="checkbox" id="check"/>
    //   <label for="check" className="checkbtn">
    //     <i className="fas fa-bars"></i>
    //   </label>
    //   <label className="logo">Jain and Associates</label>
    //   <ul>
    //     <li><a href="/">Bricks</a></li>
    //     <li><a href="/">Sand</a></li>
    //     <li><a href="/">Cement</a></li>
    //     <li><a href="/">Contact</a></li>
    //     <li><a href="/">Feedback</a></li>
    //   </ul>
    // </nav>
    // <section></section>
    // </div>
    <div>
    <nav className="navbar navigation-wrap navbar-expand-lg navbar-light    ">

    {/* <nav className="navbar navbar-expand-lg  navigation-wrap bg-info"  > */}
      <div className="container-fluid ">
        
      <Link  className="navbar-brand mb-30" to="/">
        {/* <img src={logo} alt="logo" width="140" height="86"/> */}
      <img className='ms-5 ' decoding="async" src= {pic} alt="logo" width="120" height="70"/>
            
          <h3>JAIN AND ASSOCIATES</h3> 
        </Link>
        <button className="navbar-toggler bg-info-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      {/* <a class="navbar-brand" href="#"><img decoding="async" src= {pic} width="140" height="86"/></a> */}
        {/* <Link className="navbar-brand" to="/"><h2>Jain And Associates</h2></Link> */}
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto  mb-lg-0 ms-5     ">
            <li className="nav-item m-2  ">
               <Link className="nav-link active fs-5 " data-bs-toggle="tooltip" aria-current="page" to="/slab"> SLAB</Link> 
            </li>
            <li className="nav-item m-2">
              <Link className="nav-link active fs-5" aria-current="page" to="/wall">WALL</Link>
            </li>
            <li className="nav-item m-2">
              <Link className="nav-link active fs-5" aria-current="page" to="/beam">BEAM</Link>
            </li>
            <li className="nav-item m-2">
              <Link className="nav-link active fs-5" aria-current="page" to="/column">COLUMN</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">Link</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/">Action</a></li>
            <li><a className="dropdown-item" href="/">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
          <a className="nav-link disabled" href="/" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> */}
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-info" type="submit">Search</button>
          </form>
        </div>
        
      </div>
    </nav>
    </div>
  )
}

