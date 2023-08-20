import { getDataFromTOken } from "@/lib/helpers/getDataFromToken";

import { NextResponse,NextRequest } from "next/server";
import User from "@/lib/models/userModel";
import { connectToDb } from "@/db/dbConfig";

connectToDb();


export async function GET(request:NextRequest) {
    try {
        const userId=await getDataFromTOken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"User found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
        
    }
    
}