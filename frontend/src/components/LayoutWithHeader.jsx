import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutWithHeader;
