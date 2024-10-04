'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem';

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch (error) {
      toast.error('Failed to fetch emails');
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', {
        params: {
          id: mongoId
        }
      });
      if (response.data.success) {
        toast.success(response.data.meg);
        fetchEmails();
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Failed to delete email');
    }
  };

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <ToastContainer theme='dark' />
      <h1>All Subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 '>
                Email Subscription
              </th>
              <th scope='col' className=' hidden sm:block px-6 py-3 '>
                Date
              </th>
              <th scope='col' className='px-6 py-3 '>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => (
              <SubsTableItem deleteEmail={deleteEmail} key={index} mongoId={item._id} email={item.email} date={item.date} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
