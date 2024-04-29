import logo from "./logo.svg";
import "./App.css";
import Header from "./header";
import Dashbord from "./Components/dashbord.js";
import Login from "./Login.js";
import Register from "./Register.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import React, { Component, useState } from "react";
import LayoutComponent from "./LayoutComponent.js";
// import React from "react";
import Attendance from "./Components/Attendance.js";
import Attend from "./Components/AddAttendance.js";
import AddAttendance from "./Components/AddAttendance.js";
import RegisterStudent from "./Components/RegisterStudent.js";

// import React, { useState } from 'react';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };
  return (
    <>
      <Router>
        <Routes>
          {/* {isLoggedIn ? (
        <Route path="/dashbord" element={<Dashbord />}></Route>
      ) : (
        <Login onLogin={handleLogin} />
      )} */}
          <>
            <Route path="/" element={<Login />}></Route>
          </>
          <>
            {" "}
            <Route path="/register" element={<Register />}></Route>{" "}
          </>
          <Route path="/" element={<LayoutComponent />}>
            <Route path="/dashbord" element={<Dashbord />}></Route>
            <Route path="/attendance" element={<Attendance />}></Route>
            <Route path="/addAttendance" element={<AddAttendance/>}></Route>
            <Route path="/registerstudent" element={<RegisterStudent/>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

//  class App extends Component {

//   render() {
//     return (
//       <>
//          <Router>
//         <Routes>
//               <>
//               <Route path="/" element={<Registration />}></Route>
//               </>
//                 <Route path="/" element={<LayoutComponent />}>

//                   <Route path="/dashbord" element={<Dashbord />}></Route>
//                   <Route path="/attendance" element={<Attendance/>}></Route>
//                 </Route>
//               </Routes>
//             </Router>
//       </>
//     )
//   }
// }

// export default App
