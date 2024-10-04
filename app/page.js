'use client'
import BlogItem from "@/Components/BlogItem";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
   <>
   <ToastContainer theme="dark"/>
   <Header />
   <BlogList/>
   <Footer />
   
   </>
  );
}
