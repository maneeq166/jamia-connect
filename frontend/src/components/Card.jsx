import React from 'react';

const Card = ({ subject, department, year, content }) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden text-jmi-100 h-[200px] w-[300px] rounded-2xl duration-700">
      {/* Top section with icons */}
      <div className="w-[300px] h-[200px] bg-jmi-500 text-jmi-100">
        <div className="flex flex-row justify-between">
          <svg
            className="fill-current stroke-current w-8 h-8 p-2 hover:bg-jmi-300 rounded-full m-1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8,32.9V15.8m0,0H32.9m-17.1,0L37.2,37.2m47-4.3V15.8m0,0H67.1m17.1,0L62.8,37.2m-47,29.9V84.2m0,0H32.9m-17.1,0L37.2,62.8m47,21.4L62.8,62.8M84.2,84.2V67.1m0,17.1H67.1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
            />
          </svg>
          <svg
            className="fill-current stroke-current w-8 h-8 p-2 m-1 hover:bg-jmi-300 rounded-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50,17.4h0M50,50h0m0,32.6h0M50,22a4.7,4.7,0,1,1,4.7-4.6A4.7,4.7,0,0,1,50,22Zm0,32.7A4.7,4.7,0,1,1,54.7,50,4.7,4.7,0,0,1,50,54.7Zm0,32.6a4.7,4.7,0,1,1,4.7-4.7A4.7,4.7,0,0,1,50,87.3Z"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
            />
          </svg>
        </div>
      </div>

      {/* Slide-out content section */}
      <div className="absolute bg-jmi-100 bottom-[-20px] w-[300px] p-3 flex flex-col gap-1 group-hover:bottom-0 transition-all duration-700 ease-in-out shadow-md">
        <span className="text-jmi-700 font-bold text-xs">{department}</span>
        <div className="flex justify-between items-center">
          <span className="text-jmi-900 font-bold text-2xl">{subject}</span>
          <p className="text-jmi-600 font-bold text-sm">{year}</p>
        </div>
        <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-700 ease-in-out">
          <p className="text-jmi-800">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
