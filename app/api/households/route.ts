// app/api/households/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const households = await prisma.household.findMany({
    include: {
      memberships: { include: { user: true } },
      categories: true,
    },
  });
  return NextResponse.json(households);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  const household = await prisma.household.create({ data: { name } });
  return NextResponse.json(household, { status: 201 });
}
