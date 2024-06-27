import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/User";

export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectMongoDB();
    const { id } = params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: HttpStatusCode.NotFound },
      );
    }
    return NextResponse.json({ user });
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
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Пользователь не найден" },
        { status: HttpStatusCode.NotFound },
      );
    }

    return NextResponse.json({
      user: updatedUser,
      message: "Роль пользователя успешно обновлена на администратора",
    });
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
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: HttpStatusCode.NotFound },
      );
    }
    return NextResponse.json(
      {
        message: "User deleted successfully!",
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
