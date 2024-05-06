// import React from 'react'
import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function AddAssignment({ streamId }) {
  const navigate = useNavigate();
  var retrievedArray = JSON.parse(localStorage.getItem("user_data"));

  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  // console.log("optionsssss", options);
  const [batches, setbatches] = useState([]);
  //console.log("optionsssss", batches);

  const handleStatusChange = (event) => {
    // console.log("batch_type", event);
    const value = event.target.value;
    console.log("batch_type", value);
    setFormData({
      ...formData, // Spread the existing formData
      batch_type: value, // Update status with the new value
    });
  };
  const handleSelectChange = (event) => {
    //console.log(event);
    const batch_status = event.target.value;
    console.log("batch_status", batch_status);
    setFormData({
      ...formData, // Spread the existing formData

      batch_status: batch_status, // Update user_role with the new value
    });
  };
  const handleSelectChangeBatches = (event) => {
    //console.log("trainer", event);
    const batch_name = event.target.value;
    console.log("batches_name", batch_name);

    setFormData({
      ...formData, // Spread the existing formData

      batch_name: batch_name, // Update user_role with the new value
    });
  };
  const handleSelectChangeTrainer = (event) => {
    //console.log("trainer", event);
    const trainer_name = event.target.value;
    console.log("trainer", trainer_name);

    setFormData({
      ...formData, // Spread the existing formData

      trainer_name: trainer_name, // Update user_role with the new value
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/student/getbatches"
        );
        if (response.data && response.data.data) {
          setbatches(response.data.data);
          //console.log(response1.data.data);
        }
        // const trainerData = response.data.data.filter(
        //   (user) => user.user_role === "trainer"
        // );
        // setOptions(trainerData);
        //  setOptions(response1.data.data); // Assuming the response is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "http://localhost:8080/api/v1/student/getusers"
        );
        if (response1.data && response1.data.data) {
          setOptions(response1.data.data);
          //console.log(response1.data.data);
        }
        const trainerData = response1.data.data.filter(
          (user) => user.user_role === "trainer"
        );
        setOptions(trainerData);
        //  setOptions(response1.data.data); // Assuming the response is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    id: "",
    assignment_name: "",
    batch_name: "",
    batch_status: "",
    assignment_description: "",
    create_time: currentTime,
    create_date: formattedDate,
    trainer_name: retrievedArray.user_name,
    start_date: "",
    end_date: "",
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
      // Assuming the response data is an array of options

      // Send POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/addassignment",
        formData
      );
      console.log("Record inserted successfully:", response.data);
      // Optionally, reset the form fields after successful insertion
      // setFormData({ name: '',  className_name:'', date:'',in_time:'' });
    } catch (error) {
      console.error("Error inserting record:", error);
      // Handle error (e.g., display error message to user)
    }
    console.log(formData);
    // Pass formData to another function
    submitFormData(formData);
    navigate("/viewassignment");
  };

  // Function to handle form submission data
  const submitFormData = (formData) => {
    // Here, you can perform any action with the form data, such as sending it to an API
    console.log("Form data submitted:", formData);
  };
  const filteredData = options.filter((item) => item.status === "trainer");

  return (
    <>
      <div>
        <div className="">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Add Assignment </h1>
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
          <div className="card-header1 " style={{ marginLeft: "15px" }}>
            <Link
              to="/viewassignment"
              type="button"
              className="btn btn-primary"
            >
              {" "}
              View Assignment{" "}
            </Link>
          </div>
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
                          <h5
                            className="modal-title"
                            id="exampleModalLabel"
                          ></h5>
                          {/* <button type="button"  className="close" data-dismiss="modal"
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
                                  <label> Assignment Name </label>
                                  <input
                                    type="name"
                                    name="assignment_name"
                                    required
                                    className="form-control"
                                    id="assignment_name"
                                    aria-describedby="emailHelp"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name"
                                  />
                                </div>
                                <div className="form-group">
                                  <label> Batch </label>
                                  <select
                                    name="batch_name"
                                    className="form-control"
                                    id="batch_name"
                                    value={formData.batch_name}
                                    onChange={handleSelectChangeBatches}
                                  >
                                    <option value="active">
                                      please select
                                    </option>
                                    {batches.map((batch_name) => (
                                      <option
                                        key={batch_name.batch_name}
                                        value={batch_name.batch_name}
                                      >
                                        {batch_name.batch_name}
                                      </option>
                                    ))}
                                    {/* <option value="inactive">Inactive</option> */}
                                  </select>
                                  {/* <input
                                    type="text"
                                    name="batch_name"
                                    required
                                     className="form-control"
                                    id="batch_name"
                                    aria-describedby="emailHelp"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name"
                                  /> */}
                                </div>
                                <div className="form-group">
                                  <label> Active/Inactive </label>
                                  <br />
                                  <select
                                    name="batch_status"
                                    className="form-control"
                                    id="batch_status"
                                    value={formData.batch_status}
                                    onChange={handleSelectChange}
                                  >
                                    <option value="">please select</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-lg-5">
                                <div className="form-group">
                                  <label> Assignment Description </label>
                                  <input
                                    type="text"
                                    name="assignment_description"
                                    required
                                    className="form-control"
                                    id="description"
                                    aria-describedby="emailHelp"
                                    value={formData.className}
                                    onChange={handleInputChange}
                                    placeholder="Enter  className"
                                  />

                                  <input
                                    type="hidden"
                                    name="create_time"
                                    required
                                    className="form-control"
                                    id="create_time"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.in_time}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />

                                  <input
                                    type="hidden"
                                    name="create_date"
                                    required
                                    className="form-control"
                                    id="create_date"
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
                                    Trainer Name
                                    <span className="text-danger">*</span>
                                  </label>
                                  <br />
                                  <input
                                    type="text"
                                    name="trainer_name"
                                    readOnly
                                    className="form-control"
                                    id="trainer_name"
                                    aria-describedby="emailHelp"
                                    value={formData.trainer_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter  className"
                                  />
                                  {/* <select
                                    name="trainer_name"
                                     className="form-control"
                                    id="trainer_name"
                                    value={formData.trainer_name}
                                    onChange={handleSelectChangeTrainer}
                                  >
                                    <option value="active">
                                      please select
                                    </option>
                                    {options.map((trainer) => (
                                      <option
                                        key={trainer.user_name}
                                        value={trainer.user_name}
                                      >
                                        {trainer.user_name}
                                      </option>
                                    ))}
                                    {/* <option value="inactive">Inactive</option> */}
                                  {/* </select> */}

                                  <div></div>
                                </div>
                                <div className="row">
                                  <div className="form-group col-lg-6">
                                    <label for="on click url">
                                      Start Date
                                      <span className="text-danger">*</span>
                                    </label>
                                    <br />
                                    <input
                                      type="date"
                                      name="start_date"
                                      required
                                      className="form-control"
                                      id="start_date"
                                      aria-describedby="emailHelp"
                                      value={formData.className}
                                      onChange={handleInputChange}
                                      placeholder="Enter  className"
                                    />
                                  </div>
                                  <div className="form-group col-lg-6">
                                    <label for="on click url">
                                      End Date
                                      <span className="text-danger">*</span>
                                    </label>
                                    <br />
                                    <input
                                      type="date"
                                      name="end_date"
                                      required
                                      className="form-control"
                                      id="end_date"
                                      aria-describedby="emailHelp"
                                      value={formData.className}
                                      onChange={handleInputChange}
                                      placeholder="Enter  className"
                                    />
                                  </div>
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
                    {/* <div  className="card-header">
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
                          <th>Students  className</th>
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
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
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

export default AddAssignment;
