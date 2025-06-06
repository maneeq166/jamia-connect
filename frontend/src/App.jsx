import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoutes from "./pages/ProtectedRoutes.jsx"

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}  />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/signin' element={<Signin/>} />
              <Route path='/profile' element={
                <ProtectedRoutes>

                  <Profile/>
                </ProtectedRoutes>
                } />
              
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App