// app/api/households/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
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
  if (!household) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(household);
}

export async function PUT(
  req: Request,
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const householdId = Number(params.id);
  await prisma.household.delete({ where: { id: householdId } });
  return NextResponse.json({ message: "Deleted" });
}
