// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

// import Webcam from "react-webcam";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";
function ViewStudentAssign() {
  const { id } = useParams();

  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const [data, setData] = useState([]);
  const [data11, setData11] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [recordCount, setrecordCount] = useState([]);

  //const resultObject = data11;
  // const count = resultObject['COUNT(*)'];

  //console.log("data11", data11[0]);

  const [input, setinput] = useState("");
  if (!input) {
    const input = "5";
    setinput(input);
  }
  console.log("data.total_countdata.total_countdata.total_count", data);
  //console.log("totalCount", data.totalCount);
  // console.log("pagination", data.length);
  //  const record = data11;
  //  record.map((user, index) => {
  //   {user.id}

  //  })

  // console.log("data11", data11);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const search_value = searchTerm;

  const [currentPage, setCurrentPage] = useState(1);

  console.log("currentPage", currentPage);
  // const itemsPerPage = "5";
  const itemsPerPage = input;

  // Calculate the indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const select = async (event) => {
    setinput(event.target.value);
  };

  const handleInputChangesearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make a GET request to the API endpoint
        const response = await axios.get(
          `http://localhost:8080/api/v1/student/search_studentassign`,
          {
            params: {
              id: searchTerm,
              currentPage: currentPage,
              input: input,
            },
          }
        );
        console.log("response", response.data.data);
        if (response.data && response.data.data) {
          setData(response.data.data);

          setTotalCount(response.data.totalCount);
          //console.log(response.data.data);
        }

        setLoading(false);
      } catch (error) {
        // Handle errors
        setError(error.message);
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [currentPage, searchTerm, input]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Make a GET request to the API endpoint
  //       const response = await axios.get(
  //         "http://localhost:8080/api/v1/student/getStudentAssignment1"
  //       );
  //       if (response.data && response.data.data) {
  //         setData(response.data.data);
  //         console.log(response.data.data);
  //       }
  //       // Access the data from the response object

  //       // console.log(response.data);

  //       setLoading(false);
  //     } catch (error) {
  //       // Handle errors
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   // Call the fetchData function when the component mounts
  //   fetchData();
  // }, []);
  //console.log("data", data.data);
  const [option, setoption] = useState([]);

  const [formData, setFormData] = useState({
    // id: "",
    assignment_name: "",
    batch_name: "",
    upload_url: "",
    assignment_description: "",
    create_time: "",
    create_date: "",
    trainer_name: "",
    student_name: "",
    trainer_remark: "",
    remark_description: "",
  });
  //console.log("00110011", formData);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response1 = await axios.get(
  //         `http://localhost:8080/api/v1/student/getstudentassign_byid/${id}`,
  //         {
  //           params: {
  //             id: id, // Assuming 'email' is the parameter you want to send
  //           },
  //         }
  //       );

  //       if (response1.data && response1.data.data) {
  //         setoption(response1.data.data);
  //       }
  //       // console.log(response1.data.data);
  //       const record_data = response1.data.data[0];
  //       console.log("record_datarecord_data", record_data);
  //       setFormData({
  //         ...formData,
  //         // id: record_data.id,
  //         // user_name: record_data.user_name,
  //         // user_password: record_data.user_password,
  //         // status: record_data.status,
  //         // email: record_data.email,
  //         // in_time: record_data.in_time,
  //         // date: record_data.date,
  //         // user_role: record_data.user_role,
  //       });
  //       //console.log("record_data",record_data);
  //       //  setOptions(response1.data.data); // Assuming the response is an array of objects
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
    const id = formData.id;
    //console.log("id", id);
    try {
      // Assuming the response data is an array of options

      // Send POST request to your API endpoint
      const response = await axios.put(
        `http://localhost:8080/api/v1/student/studentsassignment_remark/${id}`,
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
    window.location.reload();
  };

  // Function to handle form submission data
  const submitFormData = (formData) => {
    // Here, you can perform any action with the form data, such as sending it to an API
    console.log("Form data submitted:", formData);
  };
  const completeTask = (id) => {
    // Here, you can perform any action with the form data, such as sending it to an API

    const stid = id;
    console.log("button is clicked:", stid);
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:8080/api/v1/student/getstudentassign_byid/${stid}`,
          {
            params: {
              id: id, // Assuming 'email' is the parameter you want to send
            },
          }
        );

        if (response1.data && response1.data.data) {
          setFormData(response1.data.data);
        }
        // console.log(response1.data.data);
        const record_data = response1.data.data[0];
        console.log("record_datarecord_data", record_data);
        setFormData({
          ...formData,
          id: record_data.id,
          assignment_name: record_data.assignment_name,
          batch_name: record_data.batch_name,
          upload_url: record_data.upload_url,
          assignment_description: record_data.assignment_description,
          create_date: record_data.create_date,
          create_time: record_data.create_time,
          student_name: record_data.student_name,
          trainer_name: record_data.trainer_name,
          trainer_remark: record_data.trainer_remark,

          remark_description: record_data.remark_description,
        });
        //console.log("record_data",record_data);
        //  setOptions(response1.data.data); // Assuming the response is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  return (
    <div>
      <div class="">
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0 text-dark">Students Assignment </h1>
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
                          Update
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
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label> Trainer Remark</label>
                                <select
                                  name="trainer_remark"
                                  class="form-control"
                                  id="trainer_remark"
                                  value={formData.trainer_remark}
                                  onChange={handleInputChange}
                                >
                                  <option value="">please select</option>

                                  <option value="pending">Pending</option>
                                  <option value="complete">Complete</option>
                                </select>
                              </div>
                              <div class="form-group">
                                <label>Remark Description </label>
                                <input
                                  type="text"
                                  name="remark_description"
                                  class="form-control"
                                  id="remark_description"
                                  aria-describedby="emailHelp"
                                  value={formData.remark_description}
                                  onChange={handleInputChange}
                                  placeholder="Enter Class"
                                />
                              </div>

                              {/* <!-- Example single danger button --> */}
                              <div class="form-group">
                                {/* <label> Assignment Name </label> */}
                                <input
                                  type="hidden"
                                  name="assignment_name"
                                  readOnly
                                  class="form-control"
                                  id="assignment_name"
                                  aria-describedby="emailHelp"
                                  value={formData.assignment_name}
                                  onChange={handleInputChange}
                                  placeholder="Enter Class"
                                />
                              </div>
                              <div class="form-group">
                                {/* <label> Batch </label> */}
                                <input
                                  type="hidden"
                                  name="batch_name"
                                  readOnly
                                  class="form-control"
                                  id="batch_name"
                                  aria-describedby="emailHelp"
                                  value={formData.batch_name}
                                  onChange={handleInputChange}
                                  placeholder="Enter Class"
                                />
                              </div>

                              <div class="form-group">
                                {/* <label> Upload Assignment URL </label> */}
                                <input
                                  type="hidden"
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

                            <div class="col-lg-12">
                              <div class="form-group">
                                {/* <label> Assignment Description </label> */}
                                <input
                                  type="hidden"
                                  name="assignment_description"
                                  required
                                  class="form-control"
                                  id="description"
                                  aria-describedby="emailHelp"
                                  value={formData.assignment_description}
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
                              </div>
                              <div></div>

                              <div class="form-group">
                                {/* <label for="on click url">
                                  Trainer Name
                                  <span class="text-danger">*</span>
                                </label> */}
                                <br />
                                <input
                                  type="hidden"
                                  name="trainer_name"
                                  readOnly
                                  class="form-control"
                                  id="trainer_name"
                                  aria-describedby="emailHelp"
                                  value={formData.trainer_name}
                                  onChange={handleInputChange}
                                  placeholder="Enter Class"
                                />

                                <div></div>
                              </div>
                              <div class="form-group">
                                {/* <label> Student Name </label> */}
                                <input
                                  type="hidden"
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
                            </div>
                          </div>

                          <div
                            class="modal-footer"
                            style={{ marginTop: "-36px" }}
                          >
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="submit" class="btn btn-primary ">
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-6">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={select}
                        >
                          <option value="5">select</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                      <div
                        class="col-6"
                        style={{ justifyContent: "flex-end", display: "flex" }}
                      >
                        {/* <form onSubmit={handleSubmit}>
                      <input
                        id="Search"
                        class=" col-8"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleInputChangesearch}
                      />
                      <button type="submit">Search</button>
                     
                    </form> */}
                        <form
                          onSubmit={handleSubmit}
                          class="form-inline my-2 my-lg-0"
                        >
                          <input
                            id="Search"
                            value={searchTerm}
                            onChange={handleInputChangesearch}
                            class="form-control mr-sm-2"
                            type="search"
                            placeholder="Search...."
                            aria-label="Search"
                          />
                          {/* <button
                            class="btn btn-outline-primary my-2 my-sm-0"
                            type="submit"
                          >
                            Search
                          </button> */}
                        </form>
                      </div>
                    </div>

                    <table
                      id="example1"
                      class="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Sr No</th>
                          <th>Name</th>
                          <th>Assignment Name</th>
                          <th>Description</th>
                          <th>Trainer Name</th>
                          <th>Git/Drive URL</th>
                          <th>Batch Name</th>
                          <th>Created Date</th>

                          <th>Ramark</th>
                          <th>Ramark Description</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data &&
                          data.map((user, index) => {
                            // console.log(data);
                            return (
                              <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.student_name}</td>

                                <td>{user.assignment_name}</td>

                                <td>{user.assignment_description}</td>
                                <td>{user.trainer_name}</td>
                                <td>
                                  <Link to={`${user.upload_url}`}>
                                    {user.upload_url}
                                  </Link>
                                </td>
                                <td>{user.batch_name}</td>
                                <td>{user.create_date}</td>
                                <td>
                                  <button
                                    //  style={{ marginRight: "10px" }}
                                    type="button"
                                    class="btn btn-primary btn-sm"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    onClick={() => completeTask(`${user.id}`)}
                                  >
                                    remark
                                  </button>

                                  {/* <Link
                                    type="button"
                                    class="btn btn-success btn-sm"
                                    onclick={handleAttendanceSubmit}
                                    // to={`/ViewStudentAssign/${user.id}`}
                                    onClick={() => completeTask(`${user.id}`)}
                                  >
                                    Complete
                                  </Link> */}
                                </td>
                                <td>{user.remark_description}</td>
                                <td>
                                  {user.trainer_remark === "complete" && (
                                    <button
                                      type="button"
                                      class="btn btn-success btn-sm"
                                    >
                                      Complete
                                    </button>
                                  )}
                                  {user.trainer_remark === "notcheck" && (
                                    <button
                                      type="button"
                                      class="btn btn-danger btn-sm"
                                    >
                                      notcheck
                                    </button>
                                  )}
                                  {user.trainer_remark === "pending" && (
                                    <button
                                      type="button"
                                      class="btn btn-warning btn-sm"
                                    >
                                      Resubmit
                                    </button>
                                  )}
                                </td>

                                {/* <td>{user.webcam}</td> */}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <ul
                      style={{
                        justifyContent: "flex-end",
                      }}
                      class="pagination"
                    >
                      {currentPage < Math.ceil(totalCount / itemsPerPage) && (
                        <li class="page-item">
                          <button
                            class="page-link"
                            onClick={() => paginate(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                      )}
                      {Array.from({
                        length: Math.ceil(totalCount / itemsPerPage),
                      }).map((_, index) => (
                        <li class="page-item">
                          <button
                            class="page-link"
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      {currentPage < Math.ceil(totalCount / itemsPerPage) && (
                        <li class="page-item">
                          <button
                            class="page-link"
                            onClick={() => paginate(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      )}
                    </ul>
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

export default ViewStudentAssign;
