import React from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';


export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-[#5D8736] via-[#809D3C] to-[#A9C46C] font-poppins text-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-lg text-center">
        <p className="text-sm font-medium text-white/80">404 error</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">We lost this page</h1>
        <p className="mt-4 text-white/90">
          We searched high and low, but couldn’t find what you’re looking for.
          Let’s find a better place for you to go.
        </p>

        <div className="flex justify-center mt-6 gap-4 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-5 py-2 text-sm font-medium bg-white text-[#5D8736] rounded-full hover:bg-gray-100 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Go Back
          </button>

          <button
            onClick={() => navigate('/')}
            className="px-5 py-2 text-sm font-medium bg-white text-[#5D8736] rounded-full hover:bg-gray-100 transition duration-200"
          >
            Take Me Home
          </button>
        </div>
      </div>
    </section>
  );
}

