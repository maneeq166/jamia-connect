import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div className="mt-6">
        <Footer />
      </div>
    </>
  );
};

export default LayoutWithHeader;
