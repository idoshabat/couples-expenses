import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET household by id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Wait for params to resolve
  const householdId = Number(id);
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
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Wait for params to resolve
  const householdId = Number(id);
  const { name } = await req.json();

  const updated = await prisma.household.update({
    where: { id: householdId },
    data: { name },
  });

  return NextResponse.json(updated);
}

// DELETE household by id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Wait for params to resolve
  const householdId = Number(id);

  await prisma.household.delete({
    where: { id: householdId },
  });

  return NextResponse.json({ message: "Deleted" });
}
