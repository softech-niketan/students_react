// import React, { useState } from "react";
import React, { useState, useEffect } from "react";

// import Webcam from "react-webcam";
import moment from "moment";
import { Link } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

function View_student_installment_fees() {
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
  //         "http://localhost:8080/api/v1/student/getusers"
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
    className: "",
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
    setSearchTerm(event.target.value);
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
          `http://localhost:8080/api/v1/student/search_view_installment_fees`,
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

          setTotalCount(response.data.user_count);
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
  return (
    <div>
      <div className="">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Installment fees </h1>
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
                                <label> className </label>
                                <input
                                  type="text"
                                  name="className"
                                  required
                                  className="form-control"
                                  id="className"
                                  aria-describedby="emailHelp"
                                  value={formData.className}
                                  onChange={handleInputChange}
                                  placeholder="Enter className"
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
                    <div className="row">
                      <div className="col-6">
                        <select
                          className="form-select"
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
                        className="col-6"
                        style={{ justifyContent: "flex-end", display: "flex" }}
                      >
                        <form
                          onSubmit={handleSubmit}
                          className="form-inline my-2 my-lg-0"
                        >
                          <input
                            id="Search"
                            value={searchTerm}
                            onChange={handleInputChangesearch}
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                          />
                          <button
                            className="btn btn-outline-primary my-2 my-sm-0"
                            type="submit"
                          >
                            Search
                          </button>
                        </form>
                      </div>
                    </div>
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>Sr No</th>
                          <th>Name</th>

                          <th>Total Fees</th>
                          <th>Remaining</th>
                          <th>Installment Fees</th>
                          <th>Date</th>
                          <th> Payment Type </th>
                          <th>Description</th>
                          <th>Actions</th>
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

                                <td>{user.total_fees}</td>

                                <td style={{ color: "red" }}>
                                  {user.total_fees - user.installment_fees}{" "}
                                </td>
                                <td>{user.installment_fees}</td>
                                <td>{user.create_date}</td>
                                <td>{user.fees_type}</td>
                                <td>{user.description}</td>
                                <td>
                                  {/* <Link
                                    className="btn btn-primary"
                                    to={`/View_students_installment_history/${user.user_id}`}
                                  >
                                    {" "}
                                    History
                                  </Link> */}
                                  <Link
                                    to={`/View_students_installment_history/${user.user_id}`}
                                    className="btn btn-primary"
                                  >
                                    <i className="fa fa-history"></i>
                                  </Link>
                                </td>

                                {/* <td><button type="button" className="btn btn-primary" >
                                         Edit
                                            </button></td> */}
                                {/* <td>
                                  <Link
                                    className="btn btn-primary"
                                    to={`/Add_student_fees/${user.id}`}
                                  >
                                    Add
                                  </Link>
                                </td> */}

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
                            <td>{user.className_name}</td>
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
                              <td>{user.className_name}</td>
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
                      className="pagination"
                    >
                      {currentPage < Math.ceil(totalCount / itemsPerPage) && (
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                      )}
                      {Array.from({
                        length: Math.ceil(totalCount / itemsPerPage),
                      }).map((_, index) => (
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      {currentPage < Math.ceil(totalCount / itemsPerPage) && (
                        <li className="page-item">
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      )}
                    </ul>
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
  );
}

export default View_student_installment_fees;
