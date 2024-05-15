import { Link, useNavigate } from "react-router-dom";
import Dashbord from "./Components/dashbord";
import axios from "axios";
import "./App.css";

import logo from "./assets/images/logo.jpg";
import React, { useState } from "react";

function Login(onLogin) {
  // const [email, setemail] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();
  var storedStudent = localStorage.getItem("student");

  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });
  const handleChange = (e) => {
    // Update form data state as user types
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log("Studentssss", storedStudent);
  const [option, setoption] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(
      "http://localhost:8080/api/v1/student/getusersbyemail",
      {
        params: {
          email: formData.user_email, // Assuming 'email' is the parameter you want to send
          password: formData.user_password,
        },
      }
    );
    if (response.data && response.data.data) {
      setoption(response.data.data);
    }
    const user_data = response.data.data[0];
    //localStorage.setItem('user_data', user_data);
    localStorage.setItem("user_data", JSON.stringify(user_data));

    //console.log(user_data);

    // if (user_data) {
    //   submitFormData(formData);
    //   navigate("/dashbord");
    // } else {
    //   alert("Your Email Password Worng");
    //   //navigate("/dashbord");
    // }

    //console.log("responseee", user_data.status);
    // Perform authentication logic here (e.g., API call or simple validation)
    if (
      !user_data
      // formData.user_email === formData.user_email &&
      // formData.user_password === formData.user_password
    ) {
      document.getElementById("myAlert").style.display = "block";
    } else if (user_data.status === "inactive") {
      document.getElementById("myAlert1").style.display = "block";
    } else {
      navigate("/dashbord");
      submitFormData(formData);
    }
  };
  const submitFormData = (formData) => {
    // Here, you can perform any action with the form data, such as sending it to an API
    console.log("Form data submitted:", formData);
  };

  const divStyle = {
    backgroundColor: "#D2D6DE",
  };
  return (
    <>
      {/* <Dashbord /> */}

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
          <div class="alert alert-danger col-12  " id="myAlert" role="alert">
            Invalid Username & Password!
          </div>
          <div class="alert alert-danger col-12  " id="myAlert1" role="alert">
            Please Contact Admin!
          </div>
          <div class="card">
            <div class="card-header text-center">
              <h3>Students</h3>
            </div>

            <div class="card-body login-card-body">
              <h5 class=" text-center">Log In</h5>
              <br />

              <form onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    //  onChange={(e) => setemail(e.target.value)}
                    class="form-control"
                    placeholder="Email"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <input
                    type="password"
                    name="user_password"
                    value={formData.user_password}
                    onChange={handleChange}
                    //   onChange={(e) => setPassword(e.target.value)}
                    class="form-control"
                    placeholder="Password"
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <span class="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div class="row text-center">
                  <div class="col-lg-12 text-center">
                    <button type="submit" class="btn btn-primary btn-block">
                      Log In
                    </button>
                  </div>
                </div>
                <br></br>
                <div class="row">
                  <div class="col-lg-5 "></div>
                  <div class="col-lg-7 ">
                    {" "}
                    <p class="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" class="link-danger">
                        Register
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
