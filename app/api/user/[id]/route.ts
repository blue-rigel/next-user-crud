import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { userCreateUpdateSchema } from "@/util/schema";
import { User } from "@/util/types";

// Get Single user
export async function GET(request: Request, { params }: { params: { id: string } }, response: Response) {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) }});
    return NextResponse.json({
      status: "success",
      data: user as User,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "failed",
      message: error?.message,
    });
  }
}

// Update Single user 
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
  response: Response
) {
  try {
    const body = await request.json();
    const parsedUser = await userCreateUpdateSchema.validate(body);
    const {username, ...userPayload} = parsedUser; // Removed username from payload to prevent edit
    await prisma.user.update({
      data: userPayload,
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json({
      status: "success",
      message: `User ${parsedUser.username} updated successfully`,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "failed",
      message: error?.message,
    });
  }
}

// Delete Single user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
  response: Response
) {
  try {
    await prisma.user.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "failed",
      message: error?.message,
    });
  }
}
