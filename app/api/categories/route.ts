import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { household: true },
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const { name, householdId } = await req.json();
  const category = await prisma.category.create({
    data: { name, householdId },
  });
  return NextResponse.json(category, { status: 201 });
}
