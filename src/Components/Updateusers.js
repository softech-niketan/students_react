// import React from 'react'
import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function Updateusers() {
  const navigate = useNavigate();
  const { id } = useParams();

  //   const currentTime = moment().format("HH:mm:ss");
  //   const currentDate = new Date();
  //   const formattedDate = moment(currentDate).format("DD/MM/YYYY");

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
  const [option, setoption] = useState([]);
  // const password = option[0];
  //   const password1 = password.email;
  //   console.log("password", password1);
  //   const [formData, setFormData] = useState([])
  //console.log(password.email);
  const [formData, setFormData] = useState({
    id: "",
    user_name: "",
    user_password: "",
    status: "",
    email: "",
    in_time: "",
    date: "",
    user_role: "",
    total_fees: "",
  });
  //console.log("d",formData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:8080/api/v1/student/getusers_byid/${id}`,
          {
            params: {
              id: id, // Assuming 'email' is the parameter you want to send
            },
          }
        );

        if (response1.data && response1.data.data) {
          setoption(response1.data.data);
        }
        const record_data = response1.data.data[0];
        setFormData({
          ...formData,
          id: record_data.id,
          user_name: record_data.user_name,
          user_password: record_data.user_password,
          status: record_data.status,
          email: record_data.email,
          in_time: record_data.in_time,
          date: record_data.date,
          user_role: record_data.user_role,
          total_fees: record_data.total_fees,
        });
        //console.log("record_data",record_data);
        //  setOptions(response1.data.data); // Assuming the response is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      const response = await axios.put(
        `http://localhost:8080/api/v1/student/update/${id}`,
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
    console.log("formData24", formData);
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
        <div className="">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Add Users </h1>
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
          {/* <div className="card-header1 " style={{ marginLeft: "15px" }}>
            <Link to="/viewusers" type="button" className="btn btn-primary">
              {" "}
              View Users{" "}
            </Link>
          </div> */}
          <section className="content">
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-4 ml-3"></div>
                  </div>

                  <div
                    className="modal123 fade123"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog1 " role="document">
                      <div className="modal-content1">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel"></h5>
                          {/* <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button> */}
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleAttendanceSubmit}>
                            <div className="row">
                              <div className="col-lg-6">
                                {/* <!-- Example single danger button --> */}
                                <div className="form-group">
                                  <label> User Name </label>
                                  <input
                                    type="name"
                                    name="user_name"
                                    required
                                    className="form-control"
                                    id="user_name"
                                    aria-describedby="emailHelp"
                                    value={formData.user_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name"
                                  />
                                </div>
                                <div className="form-group">
                                  <label> Password </label>
                                  <input
                                    type="text"
                                    name="user_password"
                                    required
                                    className="form-control"
                                    id="user_password"
                                    aria-describedby="emailHelp"
                                    value={formData.user_password}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                </div>
                                <div className="form-group">
                                  <label> Active/Inactive </label>
                                  <br />
                                  <select
                                    // name="status"
                                    className="form-control"
                                    id="status"
                                    value={formData.status}
                                    onChange={handleStatusChange}
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label> Email </label>
                                  <input
                                    type="text"
                                    name="email"
                                    required
                                    className="form-control"
                                    id="user_password"
                                    aria-describedby="emailHelp"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />

                                  <input
                                    type="hidden"
                                    name="in_time"
                                    required
                                    className="form-control"
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
                                    className="form-control"
                                    id="date"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />
                                </div>
                                <div></div>

                                <div className="form-group">
                                  <label for="on click url">
                                    Select Role
                                    <span className="text-danger">*</span>
                                  </label>
                                  <br />
                                  <select
                                    name="user_role"
                                    className="form-control"
                                    id="user_role"
                                    value={formData.user_role}
                                    onChange={handleSelectChange}
                                  >
                                    <option value="admin">Admin</option>
                                    <option value="trainer">Trainer</option>
                                  </select>
                                </div>
                                <div>
                                  {" "}
                                  <label for="on click url">
                                    Total Fees
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="total_fees"
                                    required
                                    className="form-control"
                                    id="total_fees"
                                    aria-describedby="emailHelp"
                                    value={formData.total_fees}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="submit" className="btn btn-primary">
                                Save changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card123">
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
                              className="btn btn-warning btn-sm"
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
                              className="btn btn-warning btn-sm"
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
                                  <button
                                    type="submit1"
                                    className="btn btn-primary"
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

export default Updateusers;
