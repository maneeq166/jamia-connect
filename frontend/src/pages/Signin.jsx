import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usePassportLogin, setUsePassportLogin] = useState(false); // 🔁 toggle
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const url = usePassportLogin
        ? 'http://localhost:3000/api/v1/auth/passport-login'
        : 'http://localhost:3000/api/v1/auth/signin';

      const options = {
        method: 'POST',
        url,
        data: { email, password },
        ...(usePassportLogin && { withCredentials: true }) // only add if using session
      };

      const res = await axios(options);

      if (!usePassportLogin) {
        localStorage.setItem('token', res.data.token);
      }

      toast.success(res.data.message || "Signin successful!");
      navigate('/profile');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Signin failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FFC3] flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-[#5D8736]">
          Sign in to your account
        </h2>
        <div className="flex justify-center mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={usePassportLogin}
              onChange={() => setUsePassportLogin(!usePassportLogin)}
              className="form-checkbox h-4 w-4 text-green-600"
            />
            Use Passport Session Login
          </label>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleSignin}
          className="bg-white py-8 px-6 shadow rounded-lg space-y-6 border border-[#A9C46C]"
        >
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
