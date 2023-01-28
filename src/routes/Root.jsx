import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";
const Root = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-mh">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Root;
