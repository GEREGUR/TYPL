import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectMongoDB } from "@/lib/mongodb";
import Test from "@/app/models/Block";
import { CreateTestDto } from "@/dto/create-test.dto";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectMongoDB();
    const { id } = params;
    const test = await Test.findById(id);
    if (!test) {
      return NextResponse.json(
        { message: "Тест не найден" },
        { status: HttpStatusCode.NotFound },
      );
    }
    return NextResponse.json({ test });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectMongoDB();
    const { id } = params;
    const body: Partial<CreateTestDto> = await req.json();
    const updatedTest = await Test.findByIdAndUpdate(id, body, { new: true });
    if (!updatedTest) {
      return NextResponse.json(
        { message: "Test not found" },
        { status: HttpStatusCode.NotFound },
      );
    }
    return NextResponse.json(
      {
        test: updatedTest,
        message: "Test updated successfully!",
      },
      { status: HttpStatusCode.Accepted },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectMongoDB();
    const { id } = params;
    const deletedTest = await Test.findByIdAndDelete(id);
    if (!deletedTest) {
      return NextResponse.json(
        { message: "Test not found" },
        { status: HttpStatusCode.NotFound },
      );
    }
    return NextResponse.json(
      {
        message: "Test deleted successfully!",
      },
      { status: HttpStatusCode.Ok },
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.InternalServerError },
    );
  }
}
