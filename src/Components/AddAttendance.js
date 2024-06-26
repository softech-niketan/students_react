// import React from 'react'
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import WebcamComponent from "./WebcamComponent";
import axios from "axios";

// import Camera from 'react-html5-camera-photo';
// import 'react-html5-camera-photo/build/css/index.css';

function AddAttendance({ streamId }) {
  var retrievedArray = JSON.parse(localStorage.getItem("user_data"));

  // const [image, setImage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8080/images/user_file-1714163216471") // Change the URL to match your API endpoint
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const imgUrl = URL.createObjectURL(blob);
  //       setImage(imgUrl);
  //     })
  //     .catch((error) => console.error("Error fetching image:", error));
  // }, []);

  const navigate = useNavigate();

  const currentTime = moment().format("HH:mm:ss");
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("DD/MM/YYYY");

  // const cameraRef = useRef(null);
  // const [photoData, setPhotoData] = useState(null);

  // const handleTakePhoto = (dataUri) => {
  //   // dataUri is the image data in base64 format
  //   setPhotoData(dataUri);
  //   console.log(dataUri);
  // };

  //   const [capturedImage, setCapturedImage] = useState(null);

  //   const handleCapture = (imageData) => {
  //     setCapturedImage(imageData); // Update state with the captured image
  // };

  const videoRef = useRef(null);
  let stream = ""; // Declare a variable to hold the stream

  const startWebcam = async (e) => {
    try {
      e.preventDefault();
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      // console.log(stream);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };
  // const capture = async (e) => {
  //   e.preventDefault();
  //   if (stream) {
  //     console.log(stream);

  //     setFormData({ ...formData, webcam: stream.id });
  //     stream.getTracks().forEach((track) => {
  //       track.stop(); // Stop each track in the stream
  //     });
  //     videoRef.current.srcObject = null; // Remove the stream from the video element
  //   }
  // };

  const [data2, setData2] = useState("");
  const capture = async (e) => {
    e.preventDefault();
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]; // Get the video track from the stream
      const imageCapture = new ImageCapture(videoTrack); // Create an ImageCapture object
      try {
        const photoBlob = await imageCapture.takePhoto(); // Capture a photo from the stream

        // Convert the photo Blob to a File with the correct MIME type
        // const photoFile = new File([photoBlob], "captured-image.png", {
        const photoFile = new File([photoBlob], "captured-image.png", {
          type: "image/png",
        });
        console.log("newwww", "user_file" + photoFile.lastModified + ".jpg");
        const photoFile1 = new File([photoBlob], photoFile.lastModified, {
          type: "image/png",
        });
        // const photoFile = photoFile1.lastModified;
        // Create a FormData object and append the photoFile to it
        const formData = new FormData();

        // setData2(photoFile.lastModified);

        formData.append("user_file", photoFile1); // Append file with name

        console.log("formdata", photoFile1);
        // formData.append("user_file", photoFile);

        // setData2(photoFile.name);
        setFormData((prevState) => ({
          ...prevState,
          webcam: "user_file" + "-" + photoFile.lastModified + ".jpg",
        }));
        // setFormData({ webcam: stream.id });
        //setFormData(photoFile.name );
        // Send the image data to the server
        try {
          const response = await axios.post(
            "http://localhost:8080/uploads/",
            formData,

            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if ((response.status = 200)) {
            console.log("Image saved successfully");
          } else {
            console.error("Failed to save image:", response.statusText);
          }
        } catch (error) {
          console.error("Error saving image:", error);
        }
      } catch (error) {
        console.error("Error capturing photo:", error);
      }
    }
    stream.getTracks().forEach((track) => {
      track.stop(); // Stop each track in the stream
    });
    videoRef.current.srcObject = null;
  };

  const [formData, setFormData] = useState({
    id: "",
    name: retrievedArray.user_name,
    class_name: retrievedArray.class_name,
    date: formattedDate,
    in_time: currentTime,
    webcam: data2,
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
      // Send POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/v1/student/create",
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
    navigate("/attendance");
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
                  <h1 className="m-0 text-dark">Add Attendance </h1>
                </div>

                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/attendance">View Attendance</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/dashbord">Home</Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="card-header1 " style={{ marginLeft: "15px" }}>
            {/* <Link to="/attendance" type="button" className="btn btn-primary">
              {" "}
              View Attendance{" "}
            </Link> */}
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
                                  <label> Name </label>
                                  <input
                                    type="name"
                                    name="name"
                                    required
                                    readOnly
                                    className="form-control"
                                    id="name"
                                    aria-describedby="emailHelp"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Name"
                                  />
                                </div>
                                <div className="form-group">
                                  <label> Class </label>
                                  <input
                                    type="text"
                                    name="class_name"
                                    readOnly
                                    required
                                    className="form-control"
                                    id="class"
                                    aria-describedby="emailHelp"
                                    value={formData.class_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Class"
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
                                    // value={formattedDate}
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />
                                </div>
                              </div>

                              <div className="col-lg-5">
                                <div className="form-group">
                                  <label> In Time </label>
                                  <input
                                    type="text"
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
                                    name="user_id"
                                    required
                                    className="form-control"
                                    id="user_id"
                                    aria-describedby="emailHelp"
                                    // value={currentTime}
                                    value={formData.user_id}
                                    onChange={handleInputChange}
                                    placeholder=""
                                  />
                                </div>
                                <div></div>
                                {/* <div >
      <Camera
        onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
        ref={cameraRef}
      />
      {photoData && (
        <div>
          <h2>Preview</h2>
          <img src={photoData} alt="Captured" />
        </div>
      )}
    </div> */}
                                <div name="webcam" className="form-group">
                                  <label> Web cam </label>

                                  <div>
                                    <button
                                      className="btn btn-outline-primary btn-sm"
                                      onClick={startWebcam}
                                    >
                                      Start Webcam
                                    </button>
                                    <video
                                      ref={videoRef}
                                      autoPlay
                                      playsInline
                                      width={150}
                                      height={120}
                                    />
                                    <button
                                      className="btn btn-outline-primary btn-sm"
                                      onClick={capture}
                                    >
                                      Capture Photo
                                    </button>
                                  </div>

                                  {/* <WebcamComponent
                                    value={MediaStream.id}
                                    onChange={handleInputChange}
                                  /> */}
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              {/* <button type="button" className="btn btn-secondary"
                                                            data-dismiss="modal">Close</button> */}
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

export default AddAttendance;
