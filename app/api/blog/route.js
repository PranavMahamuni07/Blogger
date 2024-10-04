import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
const fs = require('fs')

const LoadDB = async () => {
  await connectDB();
}

LoadDB();

// API Endpoint for GET all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id")
    if (blogId) {

        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
        
    }
    else{
        const blogs = await BlogModel.find({});

        return NextResponse.json({ blogs });

    }


}

//API Endpoint for uploading blogs 

export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      image: imgUrl,
      authorImg: formData.get('authorImg')
    };

    await BlogModel.create(blogData);
    console.log("Blog saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json({ success: false, msg: "Error adding blog" });
  }
}


//Cearte API endpoint to Delete Blog 

export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);

  fs.unlink(`./public${blog.image}`, ()=>{});   //Image will be delete from Public folder

  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"})
  

}