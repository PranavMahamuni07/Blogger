import { assets } from '@/Assets/assets';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
      <Image src={assets.logo_light} alt="" width={120} />
      <p className='text-sm text-white'>All rights Reserved. Copyright @blogger</p>
      <div className='flex items-center space-x-4'>
        <Image src={assets.facebook_icon} alt='' width={40} />
        <Image src={assets.twitter_icon} alt='' width={40} />
        <Image src={assets.googleplus_icon} alt='' width={40} />
        
        {/* Updated Link component with rounded corners and spacing */}
        <Link href='/admin/addProduct' className='inline-block px-3 py-1 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700'>
          Admin Panel
        </Link>
      </div>
    </div>
  );
};

export default Footer;
