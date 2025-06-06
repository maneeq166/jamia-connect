import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/signin', {
        email,
        password,
      },{withCredentials: true});

      alert(res.data.message || 'Signin successful!');
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Signin error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Signin failed.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-4">Signin</h2>
      <form onSubmit={handleSignin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Signin;
