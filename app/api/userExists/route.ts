import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    await connectMongoDB();
    const { login } = await req.json();
    const user = await User.findOne({ login }).select("_id");
    console.log(user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
