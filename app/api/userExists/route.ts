import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { login } = await req.json();
    const user = await User.findOne({ login }).select("_id");
    console.log(user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
