import { HttpStatusCode } from "axios";
import { connectMongoDB } from "@/lib/mongodb";
import Test from "@/app/models/Test";
import { CreateTestDto } from "@/dto/create-test.dto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const body: CreateTestDto = await req.json();
    if (body.title) {
      const test = await Test.create(body);
      return NextResponse.json(
        {
          test,
          message: "Тест был создан!",
        },
        {
          status: HttpStatusCode.Created,
        },
      );
    }
    return NextResponse.json(
      { message: "Название теста отстутствует" },
      { status: HttpStatusCode.BadRequest },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest },
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const tests = await Test.find();
    return NextResponse.json({ data: tests });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
