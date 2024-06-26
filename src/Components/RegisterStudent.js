// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

// import Webcam from "react-webcam";
import moment from "moment";
import { Link } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function DeleteButton({ recordId, onDelete }) {
  const handleDelete = async () => {
    try {
    
      // Make DELETE request to delete the record with recordId
      await axios.delete(
        `http://localhost:8080/api/v1/student/delete/${recordId}`
      );
      // If deletion is successful, trigger the onDelete callback
      onDelete(recordId);
       window.location.reload();
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };


  return <button type="button" onClick={handleDelete} className="btn btn-danger">Delete</button>;
}

function RegisterStudent() {
  const [user, setUser] = useState([]);







  const handleDelete = (deletedRecordId) => {
    // Filter out the deleted record from the records array
    const updatedRecords = user.filter((user) => user.id !== deletedRecordId);
    setUser(updatedRecords);
  };
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
          "http://localhost:8080/api/v1/student/register_student_getall"
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
      <div className="">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark"> Register Students Info </h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashbord">Home</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-4 ml-3"></div>
                </div>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog " role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Attendance
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleAttendanceSubmit}>
                          <div className="row">
                            <div className="col-lg-6">
                              {/* <!-- Example single danger button --> */}
                              <div className="form-group">
                                <label> Name </label>
                                <input
                                  type="name"
                                  name="name"
                                  required
                                  className="form-control"
                                  id="name"
                                  aria-describedby="emailHelp"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  placeholder="Enter Name"
                                />
                              </div>

                              <div className="form-group">
                                <label> Date </label>
                                <input
                                  type="text"
                                  name="date"
                                  required
                                  className="form-control"
                                  id="date"
                                  aria-describedby="emailHelp"
                                  value={formattedDate}
                                  onChange={handleInputChange}
                                  placeholder=""
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label> Class </label>
                                <input
                                  type="text"
                                  name="class"
                                  required
                                  className="form-control"
                                  id="class"
                                  aria-describedby="emailHelp"
                                  value={formData.class}
                                  onChange={handleInputChange}
                                  placeholder="Enter Class"
                                />
                              </div>
                              <div className="form-group">
                                <label> In Time </label>
                                <input
                                  type="text"
                                  name="in_time"
                                  required
                                  className="form-control"
                                  id="in_time"
                                  aria-describedby="emailHelp"
                                  value={currentTime}
                                  onChange={handleInputChange}
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  {/* <div className="card-header">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Add Attendance
                    </button>
                  </div> */}

                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Sr No</th>
                          <th>Students Name</th>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Class</th>
                          <th>Date</th>
                          <th>In Time</th>
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
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.class_name}</td>
                                <td>{user.date}</td>
                                <td>{user.in_time}</td>
                                <td>
                                <DeleteButton recordId={user.id} onDelete={handleDelete} />

                                </td>
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
                      className="modal fade"
                      id="webcamModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog " role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Add Attendance
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleInputChange}>
                              <div className="row">
                                <div className="col-lg-12">
                                  {/* <!-- Example single danger button --> */}
                                  <div className="form-group">
                                    <label> Name </label>
                                    <input
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      id="name"
                                      aria-describedby="emailHelp"
                                      // value={formData1.name}
                                      // onChange={handleAttendanceSubmit1}
                                      placeholder="Enter Name"
                                    />
                                  </div>

                                  <div className="form-group">
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
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="submit1" className="btn btn-primary">
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

export default RegisterStudent;
