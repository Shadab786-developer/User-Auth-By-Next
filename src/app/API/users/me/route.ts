import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConfig";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const userName = await getTokenData(request);
    const user = await User.findOne({ username: userName }).select("-password");
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
