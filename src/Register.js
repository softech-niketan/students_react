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
    user_name: "",
    email: "",
    user_password: "",
    class_name: "",
    status: "inactive",
    user_role: "student",
    in_time: currentTime,
    date: formattedDate,
    total_fees: "0",
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
  // console.log("211111111", option.data);

  // Function to handle form submission
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://localhost:8080/api/v1/student/getusersbyemailregister123",
          {
            params: {
              email: formData.email, // Assuming 'email' is the parameter you want to send
            },
          }
        );

        if (response1.data && response1.data.data) {
          setoption(response1.data.data);
        }
        const email_already_data = response1.data.data[0];

        console.log("email_already_data", email_already_data);

        if (email_already_data) {
          alert("wrong");
        } else {
        }

        // localStorage.setItem("student", response1.data.data);

        // console.log(" response1.data.data", response1.data.data);
        // const trainerData = response1.data.data.filter(
        //   (students) => students.email === formData.email
        // );
        // console.log("trainerData",trainerData);

        // setoption(trainerData);

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
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/register",
        formData
      );
      console.log("Record inserted successfully999", response.data);
      submitFormData(formData);
      navigate("/dashbord");
    } catch (error) {
      console.error("Error inserting record:", error);
      // Handle error (e.g., display error message to user)
      document.getElementById("myAlert").style.display = "block";
    }
    console.log("formData", formData);
    // Pass formData to another function
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
      <body className="hold-transition login-page" style={divStyle}>
        <div className="login-box">
          <div className="login-logo">
            <Link href="">
              <img
                width="200px"
                height="200px"
                src={logo}
                className="mx-auto d-block rounded-circle"
                alt=""
              />
            </Link>
          </div>
          <div className="alert alert-danger col-12  " id="myAlert" role="alert">
            Email Id Already Present!!
          </div>
          <div className="card">
            <div className="card-header text-center">
              <h3>Students</h3>
            </div>

            <div className="card-body login-card-body">
              <h5 className=" text-center">Student Registration</h5>
              <br />

              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    required
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Email"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="password"
                      name="user_password"
                      value={formData.user_password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                    />
                    <div className="input-group-append">
                      {/* <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div> */}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      required
                      name="class_name"
                      value={formData.class_name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Class"
                    />
                    <input
                      type="hidden"
                      required
                      name="created_date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Class"
                    />
                    <input
                      type="hidden"
                      required
                      name="created_time"
                      value={formData.in_time}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Class"
                    />
                    <input
                      type="hidden"
                      id="total_fees"
                      required
                      name="total_fees"
                      value={formData.total_fees}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Class"
                    />
                    <div className="input-group-append">
                      {/* <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div> */}
                    </div>
                  </div>
                </div>
                <br></br>
                {/* <div className="input-group mb-3">
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password"/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                        </div>
                      
                    </div> */}
                <div className="row text-center">
                  <div className="col-lg-12 text-center">
                    <button type="submit" className="btn btn-primary btn-block">
                      Log In
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 "></div>
                  <div className="col-lg-6 ">
                    {" "}
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      {" "}
                      Have an account?{" "}
                      <Link to="/" className="link-danger">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>

                {/* <div className="login-details text-left mb-1">
                        <div className='alert alert-danger'>
                      
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
