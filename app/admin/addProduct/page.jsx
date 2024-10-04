'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if an image is selected
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/blog', formData);

      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null); // Reset image state
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennett",
          authorImg: "/author_img.png"
        });
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      console.error(error); // Log detailed error for debugging
    }
  };

  return (
    <div className='pt-5 px-5 sm:pt-12 sm:pl-16 pb-20'>
      <form onSubmit={onSubmitHandler}>
        <p className='text-xl'>Upload Thumbnail</p>
        <label htmlFor='image'>
          <Image
            className='mt-4'
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            width={140}
            height={70}
            alt='Upload area'
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type='file'
          id='image'
          hidden
          accept='image/*' // Ensure only image files can be selected
        />

        <p className='text-xl mt-4'>Blog Title</p>
        <input
          name='title'
          onChange={onChangeHandler}
          value={data.title}
          type='text'
          placeholder='Type Here'
          required
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
        />

        <p className='text-xl mt-4'>Blog Description</p>
        <textarea
          name='description'
          onChange={onChangeHandler}
          value={data.description}
          placeholder='Write content here'
          rows={6}
          required
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
        />

        <p className='text-xl mt-4'>Blog Category</p>
        <select
          name='category'
          onChange={onChangeHandler}
          value={data.category}
          className='w-40 mt-4 px-4 py-3 border text-gray-500'
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Others">Others</option>

        </select>

        <br />
        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>
          ADD
        </button>
        <br />
      </form>
    </div>
  );
};

export default Page;
