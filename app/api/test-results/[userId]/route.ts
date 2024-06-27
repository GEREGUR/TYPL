import { connectMongoDB } from "@/lib/mongodb";
import TestResult from "@/app/models/TestResult";
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    await connectMongoDB();
    const { userId } = params;
    const results = await TestResult.find({ userId }).exec();
    if (!results) {
      return NextResponse.json(
        { message: "Результаты тестов не найдены" },
        { status: HttpStatusCode.NotFound },
      );
    }
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}
