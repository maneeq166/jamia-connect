import React from 'react';
import download from "../assets/download-svgrepo-com.svg"

const Card = ({ subject, department, year, content,pdfUrl }) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden text-jmi-100 h-[200px] w-[300px] rounded-2xl duration-700">
      {/* Top section with icons */}
      <div className="w-[300px] h-[200px] bg-jmi-500 text-jmi-100">
        <div className="flex flex-row justify-end p-3">
          <a href={pdfUrl}>

              <svg  width="35px" height="35px"viewBox="-10.08 -10.08 44.16 44.16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#2F441B" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-10.08" y="-10.08" width="44.16" height="44.16" rx="22.08" fill="#5D8736" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12" stroke="#DFF09E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </a>
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
