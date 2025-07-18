import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    //chcek if user already exists

    const user = await User.findOne({ email });

    if (!user) {
      console.log("user not exists");
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }
    console.log("user exist");

    //checking the password is correct
    const trimmedPassword = password.trim();
    console.log("Input password:", trimmedPassword);
    console.log("Stored hashed password:", user.password);

    const validPassword = await bcryptjs.compare(
      trimmedPassword,
      user.password
    );

    console.log("Password comparison result:", validPassword);

    // if (!validPassword) {
    //   console.log("Invalid password");
    //   return NextResponse.json(
    //     {
    //       error: "Invalid password",
    //       attempted: trimmedPassword.length,
    //       success: false,
    //     },
    //     { status: 401 }
    //   );
    // }

    //Creat token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
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
