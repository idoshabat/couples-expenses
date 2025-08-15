import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET membership by userId and householdId
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; householdId: string } }
) {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_householdId: {
        userId: params.userId,
        householdId: Number(params.householdId),
      },
    },
    include: { user: true, household: true },
  });

  if (!membership)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(membership);
}

// UPDATE membership role
export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string; householdId: string } }
) {
  const { role } = await req.json();

  const updated = await prisma.membership.update({
    where: {
      userId_householdId: {
        userId: params.userId,
        householdId: Number(params.householdId),
      },
    },
    data: { role },
  });

  return NextResponse.json(updated);
}

// DELETE membership
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string; householdId: string } }
) {
  await prisma.membership.delete({
    where: {
      userId_householdId: {
        userId: params.userId,
        householdId: Number(params.householdId),
      },
    },
  });

  return NextResponse.json({ message: "Deleted" });
}
