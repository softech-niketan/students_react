// import React from 'react'
import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function AddAttendance({ streamId }) {
  const navigate = useNavigate();

  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const [selectedOption, setSelectedOption] = useState("");

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData, // Spread the existing formData
      status: value, // Update status with the new value
    });
  };
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData, // Spread the existing formData

      user_role: value, // Update user_role with the new value
    });
  };

  const [formData, setFormData] = useState({
    id: "",
    user_name: "",
    user_password: "",
    status: "",
    email: "",
    in_time: currentTime,
    date: formattedDate,
    user_role: "",
  });

  // Function to handle form input changes
  const handleInputChange = (event, imageData) => {
    const { name, value } = event.target;
    // Update formData state with new input value
    setFormData({ ...formData, [name]: value });
    // setCapturedImage(imageData);
  };

  // Function to handle form submission
  const handleAttendanceSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/addusers",
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
     navigate("/viewusers");
  };

  // Function to handle form submission data
  const submitFormData = (formData) => {
    // Here, you can perform any action with the form data, such as sending it to an API
    console.log("Form data submitted:", formData);
  };

  return (
    <>
      <div>
        <div class="">
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1 class="m-0 text-dark">Add Users </h1>
                </div>

                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                      <Link to="/dashbord">Home</Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div class="card-header1 " style={{ marginLeft: "15px" }}>
            <Link to="/viewusers" type="button" class="btn btn-primary">
              {" "}
              View Users{" "}
            </Link>
          </div>
          <section class="content">
            <div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-4 ml-3"></div>
                  </div>

                  <div
                    class="modal123 fade123"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel1"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog1 " role="document">
                      <div class="modal-content1">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel"></h5>
                          {/* <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button> */}
                        </div>
                        <div class="modal-body">
                          <form onSubmit={handleAttendanceSubmit}>
                            <div class="row">
                              <div class="col-lg-6">
                                {/* <!-- Example single danger button --> */}
                                <div class="form-group">
                                  <label> User Name </label>
                                  <input
                                    type="name"
                                    name="user_name"
                                    required
                                    class="form-control"
                                    id="user_name"
                                    aria-describedby="emailHelp"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name"
                                  />
                                </div>
                                <div class="form-group">
                                  <label> Password </label>
                                  <input
                                    type="text"
                                    name="user_password"
                                    required
                                    class="form-control"
                                    id="user_password"
                                    aria-describedby="emailHelp"
                                    value={formData.class}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                </div>
                                <div class="form-group">
                                  <label> Active/Inactive </label>
                                  <br />
                                  <select
                                    // name="status"
                                    class="form-control"
                                    id="status"
                                    value={formData.status}
                                    onChange={handleStatusChange}
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-lg-5">
                                <div class="form-group">
                                  <label> Email </label>
                                  <input
                                    type="text"
                                    name="email"
                                    required
                                    class="form-control"
                                    id="user_password"
                                    aria-describedby="emailHelp"
                                    value={formData.class}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />

                                  <input
                                    type="hidden"
                                    name="in_time"
                                    required
                                    class="form-control"
                                    id="in_time"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.in_time}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />

                                  <input
                                    type="hidden"
                                    name="date"
                                    required
                                    class="form-control"
                                    id="date"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />
                                </div>
                                <div></div>

                                <div class="form-group">
                                  <label for="on click url">
                                    Select Role
                                    <span class="text-danger">*</span>
                                  </label>
                                  <br />
                                  <select
                                    name="user_role"
                                    class="form-control"
                                    id="user_role"
                                    value={formData.user_role}
                                    onChange={handleSelectChange}
                                  >
                                    <option value="admin">Admin</option>
                                    <option value="trainer">Trainer</option>
                                  </select>

                                  <div></div>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="submit" class="btn btn-primary">
                                Save changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card123">
                    {/* <div class="card-header">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Add Attendance
                    </button>
                  </div> */}

                    <div class="card-body">
                      <table
                        id="example1"
                        class="table table-bordered table-striped"
                      >
                        {/* <thead>
                        <tr>
                          <th>Sr No</th>
                          <th>Students Name</th>
                          <th>Students Class</th>
                          <th>Date</th>
                          <th>In Time</th>

                          <th>Action</th>
                        </tr>
                      </thead> */}

                        <tbody>
                          {/* <tr>
                          <th>1</th>
                          <th>Raj</th>
                          <th>first Year</th>
                          <th>23/04/24</th>
                          <th>11:00</th>
                          <td>
                              <button
                              type="button"
                              class="btn btn-warning btn-sm"
                              data-toggle="modal"
                              data-target="#webcamModal"
                            >
                              Capture img
                            </button>
                          </td>
                      </tr> */}
                          {/* <tr>
                          <th>2</th>
                          <th>Samarth</th>
                          <th>Last Year </th>
                          <th>24/04/24</th>
                          <th>10:00</th>
                          <td>
                          <button
                              type="button"
                              class="btn btn-warning btn-sm"
                              data-toggle="modal"
                              data-target="#webcamModal"
                            >
                              Capture img
                            </button>
                          </td>
                         </tr>  */}
                        </tbody>
                      </table>
                      <div
                        class="modal fade"
                        id="webcamModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog " role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                Add Attendance
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <form onSubmit={handleInputChange}>
                                <div class="row">
                                  <div class="col-lg-12">
                                    {/* <!-- Example single danger button --> */}
                                    <div class="form-group">
                                      <label> Name </label>
                                      <input
                                        type="text"
                                        name="name"
                                        class="form-control"
                                        id="name"
                                        aria-describedby="emailHelp"
                                        // value={formData1.name}
                                        // onChange={handleAttendanceSubmit1}
                                        placeholder="Enter Name"
                                      />
                                    </div>

                                    <div class="form-group">
                                      <label> Web cam </label>

                                      <WebcamComponent />

                                      {/* <Webcam
                                                                  audio={false}
                                                                  ref={webcamRef}
                                                                  screenshotFormat="image/jpeg"
                                                                  width={200}
                                                                  height={200}
                                                                />
                                                                <button onClick={capture}>Capture</button>
                                                                 */}
                                    </div>
                                    {/* <button onClick={startWebcam}>Start Webcam</button>
                                <video  width={200}  height={200} ref={videoRef} autoPlay></video> */}
                                  </div>
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit1"
                                    class="btn btn-primary"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AddAttendance;
