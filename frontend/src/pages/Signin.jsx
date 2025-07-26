import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleButton from "../components/GoogleButton";



function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    // const login = useAuthStore((state) => state.login);
    // const isSignedIn = useAuthStore((state) => state.isSignedIn);

  const handleSignin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/v1/auth/signin', {
      email,
      password,
    });  // removed withCredentials

    // Save token in localStorage
    localStorage.setItem('token', res.data.token);

    toast.success(res.data.message || "Signin successful!")
//      {
//   style: {
//     background: "#F4FFC3",
//     color: "#1E2C12",
//     fontWeight: "bold",
//     borderLeft: "5px solid #809D3C",
//     fontSize: "16px",
//   },
//   icon: "✅",
//   progressStyle: {
//     background:"#809D3C",
//   }
// });
    


    navigate('/profile');
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || 'Signin failed.');
  }
};


  return (
    <div className="min-h-screen bg-[#F4FFC3] flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[#5D8736]">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSignin} className="bg-white py-8 px-6 shadow rounded-lg space-y-6 border border-[#A9C46C]">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#5D8736] text-white py-2 rounded-md hover:bg-[#809D3C] font-semibold"
          >
            Sign In
          </button>
        </form>
        <div className="mt-2">
          <GoogleButton text="Continue with Google" />
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="font-medium text-[#5D8736] hover:text-[#809D3C]">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;