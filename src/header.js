import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function header() {
  // const [user, setUser] = useState(null);

  //var storedEmail = localStorage.getItem("user_data");
  var retrievedArray = JSON.parse(localStorage.getItem("user_data"));
  console.log(retrievedArray.user_role);
  console.log("storedEmail", retrievedArray.email);
  // const [user, setUser] = useState(null);

  // if (retrievedArray.user_rol === "student") {
  //   // If the user is inactive, hide the tab
  //   const roleIsActive = true;
  // }

  return (
    <>
      {/* <!-- Navbar --> */}
      <nav
        className=" main-header navbar navbar-expand-md navbar-light navbar-dark text-right "
        //  style={'margin-left: -10%'}
      >
        {/* <!-- <nav className="main-header navbar navbar-expand-md navbar-light navbar-dark text-right"> --> */}
        <div className="container ">
          {/* <!-- <h1></h1> --> */}
          <a href="<?php echo base_url('dashboard'); ?>" className="navbar-brand ">
            {/* <!-- <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style="opacity: .8"> --> */}
            {/* <img width="40px" height="40px" src="<?php echo base_url('logo.jpg'); ?>" */}
            {/* className="img-circle elevation-2" alt="User Image"> */}

            {/* <!-- <span className="brand-text font-weight-light">AdminLTE 3</span> --> */}
          </a>

          <button
            className="navbar-toggler order-1"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className=" row collapse navbar-collapse order-3"
            id="navbarCollapse"
          >
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link to="/dashbord" className="nav-link text-white">
                  Home{" "}
                </Link>
              </li>
              {/* <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/Home">Home</Link></li> */}

              <li className="nav-item">
                <a href="" className="nav-link text-white">
                  Name : {retrievedArray.user_name}
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link text-white">
                  Role : {retrievedArray.user_role}
                </a>
              </li>

              {/* <li className="dropdown-submenu dropdown-hover">
                            <Link id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" className="nav-link dropdown-toggle">Master</Link>
                            <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">

                                <li><Link to="/employee_type" className="dropdown-item">
                                       Employee Type</Link></li>
                             
                        

                            </ul>
                        </li> */}
              <li className="nav-item">
                <Link to="/addAttendance" className="nav-link">
                  <p>Attendance</p>
                </Link>
              </li>

              {retrievedArray.user_role === "admin" && (
                <li id="user" className="nav-item">
                  <Link to="/addusers" className="nav-link">
                    <p>Users</p>
                  </Link>
                </li>
              )}
               {retrievedArray.user_role === "admin" && (
                <li id="user" className="nav-item">
                  <Link to="/Viewstudents_fees" className="nav-link">
                    <p>Students</p>
                  </Link>
                </li>
              )}
               {retrievedArray.user_role === "admin" && (
                <li id="user" className="nav-item">
                  <Link to="/View_student_installment_fees" className="nav-link">
                    <p>Fees</p>
                  </Link>
                </li>
              )}
              {(retrievedArray.user_role === "admin" ||
                retrievedArray.user_role === "trainer") && (
                <li className="nav-item">
                  <Link to="/addbatches" className="nav-link">
                    <p>Batches</p>
                  </Link>
                </li>
              )}
              {(retrievedArray.user_role === "admin" ||
                retrievedArray.user_role === "trainer") && (
                <li className="nav-item">
                  <Link to="/addassignment" className="nav-link">
                    <p>Assignment</p>
                  </Link>
                </li>
              )}
              {retrievedArray.user_role === "student" && (
                <li className="nav-item">
                  <Link to="/ViewMyAssignment" className="nav-link">
                    <p>My Assignment</p>
                  </Link>
                </li>
              )}
              {retrievedArray.user_role === "student" && (
                <li className="nav-item">
                  <Link to="/ViewUploadedassignment" className="nav-link">
                    <p>Uploaded Assignment</p>
                  </Link>
                </li>
              )}
              {(retrievedArray.user_role === "admin" ||
                retrievedArray.user_role === "trainer") && (
                <li className="nav-item">
                  <Link to="/ViewStudentAssign" className="nav-link">
                    <p>Student Submissions</p>
                  </Link>
                </li>
              )}
              {/* <li className="nav-item">
                <Link to="/registerstudent" className="nav-link">
                  <p>Register Student</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <p>Log out</p>
                </Link>
              </li>

              {/* <!-- <li className="nav-item">
                            <a href="<?php echo base_url('open_task'); ?>" className="nav-link">

                                <p>

                                Open Task

                                </p>
                            </a>
                        </li> -->

 */}

              {/* <?php
                            }
                            ?> */}

              {/* <li>
                            <a href="<?php echo base_url('logout'); ?>" className="nav-link">Logout </a>

                        </li> */}

              {/* 
                    </ul>
                    {/* <!-- </li> --> */}
            </ul>
          </div>

          {/* <!-- Right navbar links --> */}
        </div>
      </nav>
    </>
  );
}
