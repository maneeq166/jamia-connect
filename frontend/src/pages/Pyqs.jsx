import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Loader from '../components/BookLoader';
import BACKEND_URL from '../../config/backend_url';

const Pyqs = () => {
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState();
  const nav = useNavigate();

  const getPyqOnFe = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/pyqs/get-study-material`);
      setPyqs(res.data.pyq);
      setSuccess(res.data.success);
    } catch (err) {
      console.error("Failed to fetch PYQs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPyqOnFe();
  }, []);

  return (
    <div >
      <div className="flex justify-end  px-5 mt-5">
        <Button onClick={() => nav("/upload-pyq")} className="py-1 px-2 w-[200px]">
          Want to upload pyqs?
        </Button>
      </div>

      <div className="flex flex-wrap min-h-screen ml-5 mr-5 mt-2 space-y-4 gap-x-5">
        {loading ? (
          <div className='flex justify-center items-center  h-screen w-full'>
            <p className='text-xs'><Loader /></p>

          </div>
        ) : pyqs.length > 0 ? (
          pyqs.map((pyq, index) => (
            <Card
              key={index}
              index={index}
              subject={pyq.subject}
              content={pyq.content}
              department={pyq.department}
              year={pyq.year}
              pdfUrl={pyq.url.url} 
            />
          ))
        ) : (
          <p className="text-lg">No PYQs found.</p>
        )}
      </div>
    </div>
  );
};

export default Pyqs;
