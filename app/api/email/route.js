import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB(); // Ensure the database connection is established

        const formData = await request.formData();
        const emailData = {
            email: formData.get('email'),
        };

        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed" });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ success: false, msg: "Error subscribing to email" }, { status: 500 });
    }
}


export async function GET(request){
    const emails = await EmailModel.find({});
    return NextResponse.json({emails});
} 


export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({success:true,msg:"Email Deleted"})
}