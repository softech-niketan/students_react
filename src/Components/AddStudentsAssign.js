// import React from 'react'
import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function AddStudentsAssign({ streamId }) {
  const { id } = useParams();
  console.log("idddd", id);
  const navigate = useNavigate();

  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const [selectedOption, setSelectedOption] = useState("");
  const [assign_name, setassign_name] = useState([]);
  const [assignment, setassignment] = useState([]);
  console.log("asssinnnn123", assignment);

  const [options, setOptions] = useState([]);
  // console.log("optionsssss", options);

  const handleStatusChange = (event) => {
    // console.log("batch_type", event);
    const value = event.target.value;
    //console.log("batch_type", value);
    setFormData({
      ...formData, // Spread the existing formData
      batch_type: value, // Update status with the new value
    });
  };
  const handleSelectChange = (event) => {
    //console.log(event);
    const batch_status = event.target.value;
    //console.log("batch_status", batch_status);
    setFormData({
      ...formData, // Spread the existing formData

      batch_status: batch_status, // Update user_role with the new value
    });
  };

  const handleSelectChangeassignment = (event) => {
    //console.log("trainer", event);
    const assignment_name = event.target.value;
    //console.log("assign_name", assignment_name);

    setFormData({
      ...formData, // Spread the existing formData

      assignment_name: assignment_name, // Update user_role with the new value
    });
  };
  const handleSelectChangebatch = (event) => {
    //console.log("trainer", event);
    const batch_name = event.target.value;
    // console.log("assign_name", batch_name);

    setFormData({
      ...formData, // Spread the existing formData

      batch_name: batch_name, // Update user_role with the new value
    });
  };
  const handleSelectChangeTrainer = (event) => {
    //console.log("trainer", event);
    const trainer_name = event.target.value;
    // console.log("trainer", trainer_name);

    setFormData({
      ...formData, // Spread the existing formData

      trainer_name: trainer_name, // Update user_role with the new value
    });
  };
  var retrievedArray = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await axios.get(
          `http://localhost:8080/api/v1/student/getmyassignment/${id}`,
          {
            params: {
              id: id, // Assuming 'email' is the parameter you want to send
            },
          }
        );
        if (response3.data && response3.data.data) {
          setassignment(response3.data.data);
        }

        // console.log("mm123", response3.data.data);
        const record_data = response3.data.data[0];
        console.log("record_data", record_data);
        setFormData({
          ...formData,
          // id: record_data.id,
          assignment_name: record_data.assignment_name,
          batch_name: record_data.batch_name,
          trainer_name: record_data.trainer_name,
        });

        //  setOptions(response1.data.data); // Assuming the response is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response2 = await axios.get(
  //         "http://localhost:8080/api/v1/student/getassignment"
  //       );
  //       if (response2.data && response2.data.data) {
  //         setassign_name(response2.data.data);
  //         //console.log("responce", response2.data.data);
  //       }
  //       const trainerData123 = response2.data.data.filter(
  //         (user) => user.assignment_name
  //       );
  //       // console.log("asssinnnn123", trainerData123);
  //       setassign_name(trainerData123);
  //       //  setOptions(response1.data.data); // Assuming the response is an array of objects
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response1 = await axios.get(
  //         "http://localhost:8080/api/v1/student/getusers"
  //       );
  //       if (response1.data && response1.data.data) {
  //         setOptions(response1.data.data);
  //         // console.log(response1.data.data);
  //       }
  //       const trainerData = response1.data.data.filter(
  //         (user) => user.user_role === "trainer"
  //       );
  //       setOptions(trainerData);
  //       // console.log("trainerData",trainerData)
  //       //  setOptions(response1.data.data); // Assuming the response is an array of objects
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [formData, setFormData] = useState({
    id: "",
    assignment_name: "",
    batch_name: "",
    upload_url: "",
    assignment_description: "",
    create_time: currentTime,
    create_date: formattedDate,
    trainer_name: "",
    student_name: retrievedArray.user_name,
    trainer_remark: "notcheck",
    remark_description: "null",
    user_id: retrievedArray.id,
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
        "http://localhost:8080/api/v1/student/addStudentAssignment1",
        formData
      );
      console.log("Record inserted successfully:", response.data);
      // Optionally, reset the form fields after successful insertion
      // setFormData({ name: '', class_name:'', date:'',in_time:'' });
    } catch (error) {
      console.error("Error inserting record:", error);
      // Handle error (e.g., display error message to user)
    }
    console.log("formData", formData);
    // Pass formData to another function
    submitFormData(formData);
    navigate("/ViewUploadedassignment");
  };

  // Function to handle form submission data
  const submitFormData = (formData) => {
    // Here, you can perform any action with the form data, such as sending it to an API
    console.log("Form data submitted:", formData);
  };
  // const filteredData = options.filter((item) => item.status === "trainer");

  return (
    <>
      <div>
        <div class="">
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1 class="m-0 text-dark">Submission</h1>
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
            <Link to="/ViewStudentAssign" type="button" class="btn btn-primary">
              {" "}
              View Assignment{" "}
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
                                  <label> Assignment Name </label>
                                  <input
                                    type="text"
                                    name="assignment_name"
                                    readOnly
                                    class="form-control"
                                    id="assignment_name"
                                    aria-describedby="emailHelp"
                                    value={formData.assignment_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                  {/* <select
                                    name="assignment_name"
                                    class="form-control"
                                    id="assignment_name"
                                    value={formData.assignment_name}
                                    onChange={handleSelectChangeassignment}
                                   >
                                    <option value="active">
                                      please select
                                    </option>
                                    {assign_name.map((user) => (
                                      <option
                                        key={user.assignment_name}
                                        value={user.assignment_name}
                                      >
                                        {user.assignment_name}
                                      </option>
                                    ))}
                                    {/* <option value="inactive">Inactive</option> */}
                                  {/* </select> */}
                                </div>
                                <div class="form-group">
                                  <label> Batch </label>
                                  <input
                                    type="text"
                                    name="batch_name"
                                    readOnly
                                    class="form-control"
                                    id="batch_name"
                                    aria-describedby="emailHelp"
                                    value={formData.batch_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                  {/* <select
                                    name="batch_name"
                                    class="form-control"
                                    id="batch_name"
                                    value={formData.batch_name}
                                    onChange={handleSelectChangebatch}
                                   >
                                    <option value="active">
                                      please select
                                    </option>
                                    {assign_name.map((user) => (
                                      <option
                                        key={user.batch_name}
                                        value={user.batch_name}
                                      >
                                        {user.batch_name}
                                      </option>
                                    ))}
                                    {/* <option value="inactive">Inactive</option> */}
                                  {/* </select> */}
                                </div>
                                {/* <div class="form-group">
                                  <label> Active/Inactive </label>
                                  <br />
                                  <select
                                    name="batch_status"
                                    class="form-control"
                                    id="batch_status"
                                    value={formData.batch_status}
                                    onChange={handleSelectChange}
                                  >
                                    <option value="">please select</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                </div> */}

                                <div class="form-group">
                                  <label> Upload Assignment URL </label>
                                  <input
                                    type="text"
                                    name="upload_url"
                                    required
                                    class="form-control"
                                    id="upload_url"
                                    aria-describedby="emailHelp"
                                    value={formData.upload_url}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                </div>
                              </div>

                              <div class="col-lg-5">
                                <div class="form-group">
                                  <label> Assignment Description </label>
                                  <input
                                    type="text"
                                    name="assignment_description"
                                    required
                                    class="form-control"
                                    id="description"
                                    aria-describedby="emailHelp"
                                    value={formData.class}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />

                                  <input
                                    type="hidden"
                                    name="create_time"
                                    required
                                    class="form-control"
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
                                    class="form-control"
                                    id="create_date"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />

                                  <input
                                    type="hidden"
                                    name="trainer_remark"
                                    required
                                    class="form-control"
                                    id="trainer_remark"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.trainer_remark}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />

                                  <input
                                    type="hidden"
                                    name="remark_description"
                                    required
                                    class="form-control"
                                    id="remark_description"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.remark_description}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />
                                  <input
                                    type="hidden"
                                    name="user_id"
                                    required
                                    class="form-control"
                                    id="user_id"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.user_id}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />
                                </div>
                                <div></div>

                                <div class="form-group">
                                  <label for="on click url">
                                    Trainer Name
                                    <span class="text-danger">*</span>
                                  </label>
                                  <br />
                                  <input
                                    type="text"
                                    name="trainer_name"
                                    readOnly
                                    class="form-control"
                                    id="trainer_name"
                                    aria-describedby="emailHelp"
                                    value={formData.trainer_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                  {/* <select
                                    name="trainer_name"
                                    class="form-control"
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
                                <div class="form-group">
                                  <label> Student Name </label>
                                  <input
                                    type="text"
                                    name="student_name"
                                    readOnly
                                    class="form-control"
                                    id="student_name"
                                    aria-describedby="emailHelp"
                                    value={formData.student_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
                                  />
                                </div>
                                {/* <div class="row">
                                  <div class="form-group col-lg-6">
                                    <label for="on click url">
                                      Start Date
                                      <span class="text-danger">*</span>
                                    </label>
                                    <br />
                                    <input
                                      type="date"
                                      name="start_date"
                                      required
                                      class="form-control"
                                      id="start_date"
                                      aria-describedby="emailHelp"
                                      value={formData.class}
                                      onChange={handleInputChange}
                                      placeholder="Enter Class"
                                    />
                                  </div>
                                  <div class="form-group col-lg-6">
                                    <label for="on click url">
                                      End Date
                                      <span class="text-danger">*</span>
                                    </label>
                                    <br />
                                    <input
                                      type="date"
                                      name="end_date"
                                      required
                                      class="form-control"
                                      id="end_date"
                                      aria-describedby="emailHelp"
                                      value={formData.class}
                                      onChange={handleInputChange}
                                      placeholder="Enter Class"
                                    />
                                  </div>
                                </div> */}
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

export default AddStudentsAssign;
