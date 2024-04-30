// import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/images/logo.jpg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import { Navigate } from "react-router-dom";
function Login(onLogin) {
  const navigate = useNavigate();

  // const [email, setemail] = useState('');
  // const [password, setPassword] = useState('');
  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    class_name: "",
    in_time: currentTime,
    date: formattedDate,
  });

  const handleChange = (e) => {
    // Update form data state as user types
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [data, setData] = useState([]);
  const [option, setoption] = useState("");
  const [decodedData, setDecodedData] = useState([]);
  console.log("211111111", option.data);

  // Function to handle form submission
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://localhost:8080/api/v1/student/register_student_getall",
          { formData }
        );

        if (response1.data && response1.data.data) {
          setoption(response1.data.data);
          console.log("reasponce123", response1.data.data);
        }
        const trainerData = response1.data.data.filter(
          (students) => students.email === formData.email
        );
        // console.log("trainerData",trainerData);

        setoption(trainerData);

        //  setOptions(response1.data.data); // Assuming the response is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //   const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/register",
        formData
      );
      console.log("Record inserted successfully:", response.data);
      // Optionally, reset the form fields after successful insertion
      // setFormData({ name: '', class_name:'', date:'',in_time:'' });
    } catch (error) {
      console.error("Error inserting record:", error);
      // Handle error (e.g., display error message to user)
    }

    // Pass formData to another function
    submitFormData(formData);
    navigate("/dashbord");
  };

  // Function to handle form submission data
  const submitFormData = (formData) => {
    // Here, you can perform any action with the form data, such as sending it to an API
    console.log("Form data submitted:", formData);
  };

  const divStyle = {
    backgroundColor: "#D2D6DE",
  };

  return (
    <>
      <body class="hold-transition login-page" style={divStyle}>
        <div class="login-box">
          <div class="login-logo">
            <Link href="">
              <img
                width="200px"
                height="200px"
                src={logo}
                class="mx-auto d-block rounded-circle"
                alt=""
              />
            </Link>
          </div>

          <div class="card">
            <div class="card-header text-center">
              <h3>Students</h3>
            </div>

            <div class="card-body login-card-body">
              <h5 class=" text-center">Student Registration</h5>
              <br />

              <form onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Name"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Email"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      class="form-control"
                      placeholder="Password"
                    />
                    <div class="input-group-append">
                      {/* <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div> */}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <input
                      type="text"
                      required
                      name="class_name"
                      value={formData.class}
                      onChange={handleChange}
                      class="form-control"
                      placeholder="Class"
                    />
                    <input
                      type="hidden"
                      required
                      name="created_date"
                      value={formData.date}
                      onChange={handleChange}
                      class="form-control"
                      placeholder="Class"
                    />
                    <input
                      type="hidden"
                      required
                      name="created_time"
                      value={formData.in_time}
                      onChange={handleChange}
                      class="form-control"
                      placeholder="Class"
                    />
                    <div class="input-group-append">
                      {/* <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div> */}
                    </div>
                  </div>
                </div>
                <br></br>
                {/* <div class="input-group mb-3">
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} class="form-control" placeholder="Password"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                      
                    </div> */}
                <div class="row text-center">
                  <div class="col-lg-12 text-center">
                    <button type="submit" class="btn btn-primary btn-block">
                      Log In
                    </button>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-6 "></div>
                  <div class="col-lg-6 ">
                    {" "}
                    <p class="small fw-bold mt-2 pt-1 mb-0">
                      {" "}
                      Have an account?{" "}
                      <Link to="/" class="link-danger">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>

                {/* <div class="login-details text-left mb-1">
                        <div class='alert alert-danger'>
                      
                        </div>
                    </div> */}
              </form>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Login;
