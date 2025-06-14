import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Card = () => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = () => {
    setIsLoading(true);
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        setDetails(data.results[0]);
        setIsLoading(false);
      });
  };

  return (
    <div className="w-[90%] max-w-[25em] border border-black absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="w-[100%] py-[4em] px-0 bg-white text-center rounded-sm">
        <div className="card h-[11.25em] w-[11.25em] block -mt-[8.75em] mx-auto mb-4 bg-white rounded-full">
          {details && (
            <img src={details.picture.medium} alt="User" className="w-[100%] h-[100%] rounded-full mx-auto object-cover" />
          )}
        </div>
        <div className="details">
          {details && (
            <div>
              <h2 className='mt-[1.8em] font-bold text-black'>Name: {details.name.first} {details.name.last}</h2>
              <h3 className='text-[1em] tracking-[0.02em] text-[#90919e] mt-[0.5em] font-semibold'><FaEnvelope className='inline-block text-[#5074f3] mr-[0.3em]'/> {details.email}</h3>
              <h4 className='text-[1em] tracking-[0.02em] text-[#90919e] mt-[0.5em] font-semibold'><FaMapMarkerAlt className='inline-block text-[#5074f3] mr-[0.3em]'/>{details.location.city}, {details.location.country}</h4>
            </div>
          )}
        </div>
      </div>
      <button className={`block text-[1.2em] w-full border-none outline-none font-[600] mt-2 mb-0 my-auto py-[1.1em] px-4 bg-slate-300 rounded-lg hover:bg-slate-400 focus:bg-slate-400 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={fetchRandomUser}>Get Random Number</button>
    </div>
  );
};

export default Card;
