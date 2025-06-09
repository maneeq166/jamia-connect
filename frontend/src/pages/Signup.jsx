import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/signup', {
        username,
        email,
        password,
      }, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        navigate("/signin");
      } else {
        console.log(res);        
        toast.error(res.data.message || "Signup failed.");
      }
    } catch (error) {
      console.log(error)      
      toast.error(error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FFC3] flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[#5D8736]">Create a new account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSignup} className="bg-white py-8 px-6 shadow rounded-lg space-y-6 border border-[#A9C46C]">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
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
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="font-medium text-[#5D8736] hover:text-[#809D3C]">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
