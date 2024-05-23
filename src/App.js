import logo from "./logo.svg";
import "./App.css";
import Header from "./header";
import Dashbord from "./Components/dashbord.js";
import Login from "./Login.js";
import Register from "./Register.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
import Addusers from "./Components/Addusers.js";
import Viewusers from "./Components/Viewusers.js";
import Addbatches from "./Components/Addbatches.js";
import Viewbatches from "./Components/View_batches.js";

import AddAssignment from "./Components/AddAssignment.js";
import ViewAssignment from "./Components/ViewAssignment.js";
import AddStudentsAssign from "./Components/AddStudentsAssign.js";
import ViewStudentAssign from "./Components/ViewStudentAssign.js";
import Updateusers from "./Components/Updateusers.js";
import ViewMyAssignment from "./Components/ViewMyAssignment.js";
import ViewUploadedassignment from "./Components/ViewUploadedassignment.js";
import Viewstudents_fees from "./Components/Viewstudents_fees.js";
import Add_student_fees from "./Components/Add_student_fees.js";
import View_student_installment_fees from "./Components/View_student_installment_fees.js";
import View_students_installment_history from "./Components/View_students_installment_history.js";

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
            <Route path="/addAttendance" element={<AddAttendance />}></Route>
            <Route path="/addusers" element={<Addusers />}></Route>
            <Route path="/updateusers/:id" element={<Updateusers />}></Route>
            <Route path="/viewusers" element={<Viewusers />}></Route>
            <Route path="/addbatches" element={<Addbatches />}></Route>
            <Route path="/View_batches" element={<Viewbatches />}></Route>
            <Route path="/addassignment" element={<AddAssignment />}></Route>
            <Route path="/viewassignment" element={<ViewAssignment />}></Route>
            <Route
              path="/Viewstudents_fees"
              element={<Viewstudents_fees />}
            ></Route>
            <Route
              path="/Add_student_fees/:id"
              element={<Add_student_fees />}
            ></Route>
            <Route
              path="/View_student_installment_fees"
              element={<View_student_installment_fees />}
            ></Route>

            <Route
              path="/View_students_installment_history/:id"
              element={<View_students_installment_history />}
            ></Route>

            <Route
              path="/ViewMyAssignment"
              element={<ViewMyAssignment />}
            ></Route>
            <Route
              path="/ViewUploadedassignment"
              element={<ViewUploadedassignment />}
            ></Route>

            <Route
              path="/ViewStudentAssign"
              element={<ViewStudentAssign />}
            ></Route>
            <Route
              path="/ViewStudentAssign/:id"
              element={<ViewStudentAssign />}
            ></Route>

            <Route
              path="/addStudentsAssignment/:id"
              element={<AddStudentsAssign />}
            ></Route>

            <Route
              path="/registerstudent"
              element={<RegisterStudent />}
            ></Route>
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
