import { getDataFromTOken } from "@/lib/helpers/getDataFromToken";

import { NextResponse,NextRequest } from "next/server";
import User from "@/lib/models/userModel";
import { connectToDb } from "@/db/dbConfig";
import { userSchema } from "@/lib/validation/signInFormValidation";

connectToDb();


export async function GET(request:NextRequest) {
    try {
        const userId=await getDataFromTOken(request);
        const user = await User.findOne({_id:userId}).select("-password");
        const validateUser = userSchema.parse(user)
        return NextResponse.json({
            message:"User found",
            data:validateUser
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
        
    }
    
}