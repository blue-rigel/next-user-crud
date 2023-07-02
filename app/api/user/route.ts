import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { User } from "@/util/types";
import { userCreateUpdateSchema } from "@/util/schema";

// Get all user
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({
      status: "success",
      data: users as User[],
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "failed",
      message: error?.message,
    });
  }
}

// Create new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedUser = await userCreateUpdateSchema.validate(body);
    await prisma.user.create({ data: parsedUser });
    return NextResponse.json({
      status: "success",
      message: "User added successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "failed",
      message: error?.message,
    });
  }
}
