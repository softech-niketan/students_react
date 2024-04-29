// // import React from 'react';
// import Webcam from 'react-webcam';
// import React, { useRef } from 'react';

// const WebcamComponent = () => {

//   const videoRef = useRef(null);

//   const startWebcam = async (e) => {
//     try {
//       e.preventDefault();
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       console.log(stream);

//     }
//      catch (error) {
//       console.error('Error accessing webcam:', error);

//     }
//   };

//   // const webcamRef = React.useRef(null);

//   // const capture = React.useCallback(
//   //   (e) => {
//   //     e.preventDefault();
//   //    const imageSrc = webcamRef.current.getScreenshot();
//   //   //  Do something with the image (e.g., save it, display it)
//   //    console.log(imageSrc);
//   //   },
//   //  // [webcamRef]
//   // );

//   return (
//     <div>

// <button  class="btn btn-outline-primary btn-sm" onClick={startWebcam}>Start Webcam</button>

//       <video ref={videoRef} autoPlay playsInline width={150} height={120} />

//       {/* <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={150}
//         height={120}
//       />
//       <button class="btn btn-outline-primary btn-sm" onClick={capture}>Capture Photo</button> */}
//     </div>
//   );
// };

// export default WebcamComponent;

import React, { useRef } from "react";

const WebcamComponent = () => {
  const videoRef = useRef(null);
  let stream = ""; // Declare a variable to hold the stream

  const startWebcam = async (e) => {
    try {
      e.preventDefault();
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      console.log(stream);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };
  const capture = async (e) => {
    e.preventDefault();
    if (stream) {
      console.log(stream);
      stream.getTracks().forEach((track) => {
        track.stop(); // Stop each track in the stream
      });
      videoRef.current.srcObject = null; // Remove the stream from the video element
    }
  };

  return (
    <div>
      <button className="btn btn-outline-primary btn-sm" onClick={startWebcam}>
        Start Webcam
      </button>
      <video ref={videoRef} autoPlay playsInline width={150} height={120} />
      <button className="btn btn-outline-primary btn-sm" onClick={capture}>
        Capture Photo
      </button>
    </div>
  );
};

export default WebcamComponent;
