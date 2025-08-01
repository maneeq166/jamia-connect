import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const linkClass = "text-white hover:underline transition";

  return (
    <footer className="w-full bg-jmi-700 text-jmi-400 pt-10 pb-5 px-5">
      <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto gap-10">
        {/* Logo Section */}
        <div className="flex flex-col items-start gap-4 ml-4">
          <div
            onClick={() => navigate("/")}
            aria-label="Home"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
            className="bg-white hover:cursor-pointer text-[#5D8736] w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl shadow-md"
          >
            JC
          </div>
          <p className="text-sm text-jmi-200 max-w-xs">
            JC is your academic companion – get past year papers, notices, and
            explore important resources for your college life.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link to="/boards" className={linkClass}>
            Boards
          </Link>
          <Link to="/pyq-material" className={linkClass}>
            PYQs
          </Link>
          <Link to="/jmi-notices" className={linkClass}>
            Notices
          </Link>
          <Link to="/explore" className={linkClass}>
            Explore
          </Link>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col gap-2 mr-4">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 size-50">
            {/* Replace emojis with actual icons (like from react-icons) if needed */}
            <a
              href="https://www.instagram.com/an33q._/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300"
            >
              <img
                src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000"
                alt=""
              />
            </a>
            <a
              href="https://www.instagram.com/an33q._/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300"
            >
              <img
                src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
                alt=""
              />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-aneeq/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300"
            >
              <img
                src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} JC - Jamia Companion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
