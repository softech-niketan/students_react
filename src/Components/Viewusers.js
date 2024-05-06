// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

// import Webcam from "react-webcam";
import moment from "moment";
import { Link } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function Attendance() {
  // const [data, setData] = useState({
  //   image: "",

  // });
  // const videoRef = useRef(null);

  // const startWebcam = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     videoRef.current.srcObject = stream;
  //   } catch (error) {
  //     console.error('Error accessing webcam:', error);
  //   }
  // };

  // const webcamRef = useRef(null);

  // // Function to capture an image
  // const capture = (e) => {
  //   e.preventDefault();
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setData({
  //     image: imageSrc,
  //   });
  //   console.log("image", imageSrc); // Use imageSrc as needed, such as saving or displaying the image
  // };

  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(
          "http://localhost:8080/api/v1/student/getusers"
        );
        if (response.data && response.data.data) {
          setData(response.data.data);
          console.log(response.data.data);
        }
        // Access the data from the response object

        // console.log(response.data);

        setLoading(false);
      } catch (error) {
        // Handle errors
        setError(error.message);
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
  //console.log("data", data.data);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    class: "",
    in_time: "",
  });

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update formData state with new input value
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleAttendanceSubmit = (event) => {
    //  event.preventDefault(); // Prevent default form submission behavior
    // Pass formData to another function
    submitFormData(formData);
  };

  // Function to handle form submission data
  const submitFormData = (formData) => {
    // Here, you can perform any action with the form data, such as sending it to an API
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <div class="">
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0 text-dark">Users </h1>
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

        <section class="content">
          <div>
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-4 ml-3"></div>
                </div>

                <div
                  class="modal fade"
                  id="exampleModal"
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
                        <form onSubmit={handleAttendanceSubmit}>
                          <div class="row">
                            <div class="col-lg-6">
                              {/* <!-- Example single danger button --> */}
                              <div class="form-group">
                                <label> Name </label>
                                <input
                                  type="name"
                                  name="name"
                                  required
                                  class="form-control"
                                  id="name"
                                  aria-describedby="emailHelp"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  placeholder="Enter Name"
                                />
                              </div>

                              <div class="form-group">
                                <label> Date </label>
                                <input
                                  type="text"
                                  name="date"
                                  required
                                  class="form-control"
                                  id="date"
                                  aria-describedby="emailHelp"
                                  value={formattedDate}
                                  onChange={handleInputChange}
                                  placeholder=""
                                />
                              </div>
                            </div>

                            <div class="col-lg-6">
                              <div class="form-group">
                                <label> Class </label>
                                <input
                                  type="text"
                                  name="class"
                                  required
                                  class="form-control"
                                  id="class"
                                  aria-describedby="emailHelp"
                                  value={formData.class}
                                  onChange={handleInputChange}
                                  placeholder="Enter Class"
                                />
                              </div>
                              <div class="form-group">
                                <label> In Time </label>
                                <input
                                  type="text"
                                  name="in_time"
                                  required
                                  class="form-control"
                                  id="in_time"
                                  aria-describedby="emailHelp"
                                  value={currentTime}
                                  onChange={handleInputChange}
                                  placeholder=""
                                />
                              </div>
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
                            <button type="submit" class="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
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
                      <thead>
                        <tr>
                          <th>Sr No</th>
                          <th>Name</th>

                          <th>Password</th>
                          <th>Status</th>
                          <th>Email</th>
                          <th>Date</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data &&
                          data.map((user, index) => {
                            // console.log(data);
                            return (
                              <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.user_name}</td>

                                <td>{user.user_password}</td>
                                <td>{user.status}</td>
                                <td>{user.email}</td>
                                <td>{user.date}</td>

                                <td>{user.user_role}</td>
                                {/* <td><button type="button" class="btn btn-primary" >
                                         Edit
                                            </button></td> */}
                                <td>
                                  <Link
                                    class="btn btn-primary"
                                    to={`/updateusers/${user.id}`}
                                  >
                                    {" "}
                                    Edit
                                  </Link>
                                </td>

                                {/* <td>{user.webcam}</td> */}
                              </tr>
                            );
                          })}

                        {/* {
                      data.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.class_name}</td>
                          </tr>
                        );
                      }
                      )
                      } */}

                        {/* {
                        data.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.password}</td>
                              <td>{user.class_name}</td>
                            </tr>
                          );
                        })
                        } */}
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
                                <button type="submit1" class="btn btn-primary">
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
  );
}

export default Attendance;
