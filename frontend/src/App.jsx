import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header.jsx"
import NotFound from "./pages/NotFound.jsx"


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
          <Routes>
              <Route path='/' element={<Home/>}  />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/signin' element={<Signin/>} />
              <Route path='/profile' element={
                <ProtectedRoutes>
                  <Profile/>
                </ProtectedRoutes>
                } />

              
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  )
}

export default App