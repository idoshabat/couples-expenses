import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
    return NextResponse.json(users, { status: 200 });
}

export async function POST(request: Request) {
    const { name, email } = await request.json();
    
    if (!name || !email) {
        return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
        );
    }
    
    try {
        const newUser = await prisma.user.create({
        data: {
            name,
            email,
        },
        });
    
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
        );
    }
    }
