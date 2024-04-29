import React from "react";
import Header from "./header";
import { Outlet, Link } from "react-router-dom";
import Dashbord from "./Components/dashbord";

const LayoutComponent = () => {
  return (
    <>
      <Header />
      {/* <Dashbord /> */}
      <Outlet />
    </>
  );
};

export default LayoutComponent;
