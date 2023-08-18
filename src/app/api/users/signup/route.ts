import { connectToDb } from "@/db/dbConfig";
import User from "@/lib/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {signUpFormSchema} from "@/lib/validation/signInFormValidation";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    //! validate using zod validation
    try {
        signUpFormSchema.parse(reqBody);
      } catch (validationError:any) {
        return NextResponse.json(
          { error: validationError.errors },
          { status: 400 }
        );
      }


      //! Remove the confirm password here
      const { confirmPassword, ...userData } = reqBody;
      const { username, email, password } = userData;
      console.log(userData);

    //* Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //! hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
        {
            message : 'User created successfully',
            success:true,
            savedUser
        }
    )

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}