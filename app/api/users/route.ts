import { HttpStatusCode } from "axios";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ data: users });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
