import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { surname, name, secondName, studyGroup, login, password } =
      await req.json();

    console.log("Received data:", {
      surname,
      name,
      secondName,
      studyGroup,
      login,
      password,
    });

    if (!surname || !name || !studyGroup || !login || !password) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { login },
    });

    if (existingUser) {
      console.log("User already exists:", login);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const user = await prisma.user.create({
      data: {
        surname,
        name,
        secondName,
        studyGroup,
        login,
        password: hashedPassword,
      },
    });

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    console.log("User created successfully:", user);
    console.log("Generated token:", token);

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}
