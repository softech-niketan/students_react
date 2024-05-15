// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

// import Webcam from "react-webcam";
import moment from "moment";
import { Link } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function ViewMyAssignment() {
  var retrievedArray = JSON.parse(localStorage.getItem("user_data"));

  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  console.log("totalCount", totalCount);

  const [input, setinput] = useState("");
  if (!input) {
    const input = "5";
    setinput(input);
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Make a GET request to the API endpoint
  //       const response = await axios.get(
  //         "http://localhost:8080/api/v1/student/getassignment"
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

  const [currentPage, setCurrentPage] = useState(1);

  console.log("currentPage", currentPage);
  // const itemsPerPage = "5";
  console.log("input", input);
  const itemsPerPage = input;

  // Calculate the indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChangesearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(searchTerm);
  };
  const select = async (event) => {
    setinput(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make a GET request to the API endpoint
        const response = await axios.get(
          `http://localhost:8080/api/v1/student/search_viewassignment`,
          {
            params: {
              id: searchTerm,
              currentPage: currentPage,
              input: input,
              user_role: retrievedArray.user_role,
            },
          }
        );
        console.log("response", response.data.data);
        if (response.data && response.data.data) {
          setData(response.data.data);

          setTotalCount(response.data.user_count);
          // console.log(response.data.data);
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
  }, [currentPage, searchTerm, input, retrievedArray.user_role]);
  return (
    <div>
      <div class="">
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0 text-dark">My Assignment </h1>
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
                          <th>Assignment Name</th>
                          <th>Description</th>
                          <th>Batch Name</th>
                          {/* <th>Batch Status</th> */}
                          {/* <th>Created Date</th> */}
                          <th>Trainer Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
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
                                <td>{user.assignment_name}</td>

                                <td>{user.assignment_description}</td>
                                <td>{user.batch_name}</td>
                                {/* <td>{user.batch_status}</td> */}
                                {/* <td>{user.create_date}</td> */}
                                <td>{user.trainer_name}</td>
                                <td>{user.start_date}</td>
                                <td>{user.end_date}</td>
                                <td>
                                  <Link
                                    type="button"
                                    class="btn btn-primary   btn-sm"
                                    to={`/addStudentsAssignment/${user.id}`}
                                  >
                                    Add assignment
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

export default ViewMyAssignment;
