// pages/api/register.ts

import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import User from "../../models/User";
import bcrypt from "bcryptjs";

console.log(NextResponse);
export async function POST(req: NextRequest | Request) {
  try {
    const { name, secondName, surname, studyGroup, login, password, role } =
      await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({
      secondName,
      name,
      surname,
      studyGroup,
      login,
      password: hashedPassword,
      role,
    });

    return NextResponse.json(
      { message: "User was registered" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User was not registered" },
      { status: 500 },
    );
  }
}
