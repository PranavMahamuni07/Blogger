import React from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets';
import Link from 'next/link';



const Sidebar = () => {

    
  return (
    <>
      <div className='flex flex-col bg-slate-100 h-screen'>
        <div className='px-2 sm:pl-14 py-3 border border-black'>
          <Link href={'/'}>
          <Image src={assets.logo} width={120} alt='' />
          </Link>
        </div>
        <div className='w-28 sm:w-80 flex-grow relative h-[100vh] py-12 border-r border-black'>
            <div className='w-[50%] sm:w-[80%] absolute right-0'>
                
            <Link href='/admin/addProduct' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.add_icon} alt='' width={28} />
            <p>Add Blogs</p>
          </Link>

          <Link href='/admin/blogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.blog_icon} alt='' width={28} />
            <p>Blog List</p>

          </Link>
          
          <Link href='/admin/subscriptions' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
            <Image src={assets.email_icon} alt='' width={28} />
            <p>Subscriptions </p>
          </Link>

            </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
