// pages/api/register.ts

import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import User from "../../models/user";
import bcrypt from "bcryptjs";

// interface RegisterRequestBody {
//   name: string;
//   secondName: string;
//   surname?: string;
//   studyGroup: number;
//   login: string;
//   password: string;
// }

console.log(NextResponse);
export async function POST(req: NextRequest | Request) {
  try {
    const { name, secondName, surname, studyGroup, login, password } =
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
    });

    return NextResponse.json(
      { message: "User was registered" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User was not registered" },
      { status: 500 }
    );
  }
}
