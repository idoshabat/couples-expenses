import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const memberships = await prisma.membership.findMany({
    include: { user: true, household: true },
  });
  return NextResponse.json(memberships);
}

export async function POST(req: Request) {
  const { userId, householdId } = await req.json();
  const membership = await prisma.membership.create({
    data: { userId, householdId },
  });
  return NextResponse.json(membership, { status: 201 });
}
