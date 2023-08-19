import { connectToDb } from "@/db/dbConfig";
import User from "@/lib/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { signInFormSchema } from "@/lib/validation/signInFormValidation";
import z from "zod";
import jwt from "jsonwebtoken";

connectToDb();
type ReqBodyType = z.infer<typeof signInFormSchema>;
export async function POST(request: NextRequest) {
  try {
    const reqBody: ReqBodyType = await request.json();
    //! validate using zod validation
    try {
      signInFormSchema.parse(reqBody);
    } catch (validationError: any) {
      console.log("Validation Errors:", validationError.errors);

      return NextResponse.json(
        { error: validationError.errors },
        { status: 400 }
      );
    }
    const { email, password } = reqBody;
    console.log(reqBody);
    //check if user exists:
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    //Todo check if the password is correct
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 501 }
      );
    }
    //ToDo create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //!Create the token using tokenData
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "2d",
    });
    //todo set token to users cookies
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
