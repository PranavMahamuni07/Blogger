import { assets } from '@/Assets/assets'; // Adjust the path if needed
import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {
   const [email, setEmail] = useState("");

   const onSubmitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      try {
         const response = await axios.post('/api/email', formData);
         if (response.data.success) {
            toast.success(response.data.msg); // Ensure you use `msg` key correctly
            setEmail("");
         } else {
            toast.error("Error subscribing to email");
         }
      } catch (error) {
         toast.error("An error occurred");
      }
   }

   return (
      <div className='py-5 px-5 md:px-12 lg:px-28'>
         <div className='flex justify-between items-center'>
            <Image src={assets.logo} width={180} alt="" className='w-[130px] sm:w-auto' />
            <button className='flex items-center gap-2 text-lg font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] active:bg-gray-600 active:text-white'>
               Get started <Image src={assets.arrow} alt="arrow" />
            </button>
         </div>
         <div className='text-center my-8'>
            <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
            <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>
            <b> Welcome to  Blogger </b>, where we delve into the dynamic worlds of Technology, Startups, and Lifestyle. Led by <b>Alex Bannet</b>, our blog brings you insightful articles that keep you informed and inspired. Stay ahead of trends and developments by <b>subscribing</b> to receive our latest blogs directly. Join our vibrant community today and never miss an update!            </p>
            <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
               <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Enter your Email' className='pl-4 outline-none' required />
               <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
            </form>
         </div>
      </div>
   )
}

export default Header;
