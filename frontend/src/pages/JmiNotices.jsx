import React, { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// --- Helper Components ---

const LoadingIndicator = () => (
  <div className="flex flex-col items-center justify-center p-10">
    <div className="w-12 h-12 border-4 border-jmi-400 border-t-jmi-700 rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-jmi-700">Loading notices...</p>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="bg-jmi-950/20 border-l-4 border-jmi-1000 text-jmi-900 p-4 rounded-md shadow-md" role="alert">
    <p className="font-bold">Error</p>
    <p>{message}</p>
  </div>
);

// --- Main Component: JmiNotices ---
export default function JmiNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/v1/scrape/scrape-jmi-all');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        console.error("Fetching error:", err);
        setError("Could not connect to the server. Please ensure your backend is running and accessible.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = useMemo(() => {
    if (!searchTerm) {
      return notices;
    }
    return notices.filter(notice =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notices, searchTerm]);

  return (
    <div className="min-h-screen font-sans bg-jmi-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-6 sm:pt-10 px-4">
        <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-[900px] h-[150px] rounded-xl shadow-md bg-gradient-to-r from-jmi-500 via-jmi-400 to-jmi-400 flex items-center justify-center px-10"
                >
                  <div>
                    <h1 className="text-3xl font-bold text-jmi-100">
                      Welcome to Jamia Notices
                    </h1>
                    <p className="text-sm font-bold text-center text-jmi-100">
                      Search, find, and stay informed on all JMI notices
                    </p>
                  </div>
                </motion.div>
      </div>

      {/* Content Area */}
      <main className="container mx-auto p-4 md:p-6 flex-grow">
        {/* Search Input */}
        <div className="my-8">
          <input
            type="text"
            placeholder="Type to search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 border-2 border-jmi-400 rounded-full bg-white text-jmi-800 placeholder-jmi-500 focus:outline-none focus:ring-4 focus:ring-jmi-300 focus:border-jmi-600 transition-all duration-300"
          />
        </div>

        {/* Conditional Content */}
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice, index) => (
                <motion.a
                  key={notice.url + index}
                  href={notice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 bg-white rounded-lg shadow-sm hover:shadow-lg hover:border-l-4 hover:border-jmi-950 transition-all duration-200 border-l-4 border-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <p className="font-semibold text-jmi-800 group-hover:text-jmi-900">{notice.title}</p>
                  {notice.date && (
                    <span className="text-xs font-medium text-jmi-600 mt-2 block">
                      Date: {notice.date}
                    </span>
                  )}
                </motion.a>
              ))
            ) : (
              <p className="text-center text-jmi-700 p-8 text-lg">No notices found matching your search.</p>
            )}
          </motion.div>
        )}
      </main>
      
      {/* Footer
      <footer className="w-full py-4 mt-10 bg-jmi-800">
          <div className="container mx-auto text-center text-jmi-300 text-sm">
              <p>All data is scraped from the official JMI Controller of Examinations website.</p>
              <p>This is an unofficial project.</p>
          </div>
      </footer> */}
    </div>
  );
}
