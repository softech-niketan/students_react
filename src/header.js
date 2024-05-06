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
        class=" main-header navbar navbar-expand-md navbar-light navbar-dark text-right "
        //  style={'margin-left: -10%'}
      >
        {/* <!-- <nav class="main-header navbar navbar-expand-md navbar-light navbar-dark text-right"> --> */}
        <div class="container ">
          {/* <!-- <h1></h1> --> */}
          <a href="<?php echo base_url('dashboard'); ?>" class="navbar-brand ">
            {/* <!-- <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8"> --> */}
            {/* <img width="40px" height="40px" src="<?php echo base_url('logo.jpg'); ?>" */}
            {/* class="img-circle elevation-2" alt="User Image"> */}

            {/* <!-- <span class="brand-text font-weight-light">AdminLTE 3</span> --> */}
          </a>

          <button
            class="navbar-toggler order-1"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class=" row collapse navbar-collapse order-3"
            id="navbarCollapse"
          >
            <ul class="navbar-nav">
              <li class="nav-item ">
                <Link to="/dashbord" class="nav-link text-white">
                  Home{" "}
                </Link>
              </li>
              {/* <li class="nav-item"><Link class="nav-link px-lg-3 py-3 py-lg-4" to="/Home">Home</Link></li> */}

              <li class="nav-item">
                <a href="" class="nav-link text-white">
                  Name : {retrievedArray.user_name}
                </a>
              </li>
              <li class="nav-item">
                <a href="" class="nav-link text-white">
                  Role : {retrievedArray.user_role}
                </a>
              </li>

              {/* <li class="dropdown-submenu dropdown-hover">
                            <Link id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" class="nav-link dropdown-toggle">Master</Link>
                            <ul aria-labelledby="dropdownSubMenu1" class="dropdown-menu border-0 shadow">

                                <li><Link to="/employee_type" class="dropdown-item">
                                       Employee Type</Link></li>
                             
                        

                            </ul>
                        </li> */}
              <li class="nav-item">
                <Link to="/addAttendance" class="nav-link">
                  <p>Attendance</p>
                </Link>
              </li>

              {retrievedArray.user_role === "admin" && (
                <li id="user" class="nav-item">
                  <Link to="/addusers" class="nav-link">
                    <p>Users</p>
                  </Link>
                </li>
              )}
              {(retrievedArray.user_role === "admin" ||
                retrievedArray.user_role === "trainer") && (
                <li class="nav-item">
                  <Link to="/addbatches" class="nav-link">
                    <p>Batches</p>
                  </Link>
                </li>
              )}
              {(retrievedArray.user_role === "admin" ||
                retrievedArray.user_role === "trainer") && (
                <li class="nav-item">
                  <Link to="/addassignment" class="nav-link">
                    <p>Assignment</p>
                  </Link>
                </li>
              )}
              {retrievedArray.user_role === "student" && (
                <li class="nav-item">
                  <Link to="/ViewMyAssignment" class="nav-link">
                    <p>My Assignment</p>
                  </Link>
                </li>
              )}
              {(retrievedArray.user_role === "admin" ||
                retrievedArray.user_role === "trainer") && (
                <li class="nav-item">
                  <Link to="/ViewStudentAssign" class="nav-link">
                    <p>Student Submissions</p>
                  </Link>
                </li>
              )}
              {/* <li class="nav-item">
                <Link to="/registerstudent" class="nav-link">
                  <p>Register Student</p>
                </Link>
              </li> */}
              <li class="nav-item">
                <Link to="/" class="nav-link">
                  <p>Log out</p>
                </Link>
              </li>

              {/* <!-- <li class="nav-item">
                            <a href="<?php echo base_url('open_task'); ?>" class="nav-link">

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
                            <a href="<?php echo base_url('logout'); ?>" class="nav-link">Logout </a>

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
