import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET household by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const householdId = Number(params.id);
  const household = await prisma.household.findUnique({
    where: { id: householdId },
    include: {
      memberships: { include: { user: true } },
      categories: true,
    },
  });

  if (!household) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(household);
}

// UPDATE household by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const householdId = Number(params.id);
  const { name } = await req.json();

  const updated = await prisma.household.update({
    where: { id: householdId },
    data: { name },
  });

  return NextResponse.json(updated);
}

// DELETE household by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const householdId = Number(params.id);

  await prisma.household.delete({
    where: { id: householdId },
  });

  return NextResponse.json({ message: "Deleted" });
}
