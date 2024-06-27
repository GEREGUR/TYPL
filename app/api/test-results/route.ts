// api/test-results.ts

import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import TestResult from "@/app/models/TestResult";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    const body = await req.json();

    const transformedAnswers = body.answers.map((answer: any) => ({
      questionId: answer.questionId,
      answer: answer.answer,
      score: answer.score, // Include score in the answer object
    }));

    const testResult = new TestResult({
      userId: body.userId,
      testId: body.testId,
      answers: transformedAnswers,
    });

    await testResult.save();

    return NextResponse.json(
      { message: "Тест пройден успешно" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error saving test results:", error);
    return NextResponse.json(
      { message: "Ошибка в сохранении", error },
      { status: 500 },
    );
  }
}
