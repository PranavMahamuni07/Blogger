import { assets } from '@/Assets/assets';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dotenv from "dotenv";
dotenv.config();

const PASSWORD = process.env.PASSWORD;

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleAdminPanelClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    setShowPopup(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Replace 'your_password' with the actual password you want to use
    if (password === 'Alex@123') {
      window.location.href = '/admin/addProduct'; // Redirect to the admin panel
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <Image src={assets.logo_light} alt="" width={120} />
      <p className='text-sm text-white'>All rights Reserved. Copyright @blogger</p>
      <div className='flex items-center space-x-4'>
        <Image src={assets.facebook_icon} alt='' width={40} />
        <Image src={assets.twitter_icon} alt='' width={40} />
        <Image src={assets.googleplus_icon} alt='' width={40} />
        
        {/* Updated Link component with rounded corners and spacing */}
        <Link 
          href='/admin/addProduct' 
          className='inline-block px-3 py-1 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700'
          onClick={handleAdminPanelClick}
        >
          Admin Panel
        </Link>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Enter Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="relative mb-4">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle input type
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;