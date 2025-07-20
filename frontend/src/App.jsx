import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx";
import NotFound from "./pages/NotFound.jsx";
import LayoutWithHeader from "./components/LayoutWithHeader.jsx";
import LayoutWithoutHeader from "./components/LayoutWithoutHeader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import Explore from "./pages/Explore.jsx";
import OthersProfile from "./pages/OthersProfile.jsx";
import Chat from "./pages/Chat.jsx";
import Pyqs from "./pages/Pyqs.jsx";
import UploadPyq from "./pages/UploadPyq.jsx";
import Blog from "./pages/PostBlog.jsx";
import BlogIndex from "./pages/BlogIndex.jsx";
import SingleBlog from "./pages/SingleBlog.jsx";
import HistoryOfJMI from "./pages/HistoryOfJMI.jsx";
import JmiNotices from "./pages/JmiNotices.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes WITH header */}
          <Route element={<LayoutWithHeader />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route path="/jmi-notices" element={<JmiNotices/>} />
            <Route
              path="/chat/:username"
              element={
                <ProtectedRoutes>
                  <Chat />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/update-profile"
              element={
                <ProtectedRoutes>
                  <UpdateProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/upload-pyq"
              element={
                <ProtectedRoutes>
                  <UploadPyq />
                </ProtectedRoutes>
              }
            />
            <Route path="/blog/add-blog" element={
              <ProtectedRoutes>
                <Blog/>
              </ProtectedRoutes>
              } />
              <Route path="/history" element={<HistoryOfJMI/>}></Route>
              <Route path="/blog/:id" element={<SingleBlog/>}></Route>
            <Route path="/blogs" element={<BlogIndex/>}  />
            <Route path="/pyq-material" element={<Pyqs/>}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/user/:username" element={<OthersProfile />}></Route>
          </Route>

          {/* Routes WITHOUT header */}
          <Route element={<LayoutWithoutHeader />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
}

export default App;
