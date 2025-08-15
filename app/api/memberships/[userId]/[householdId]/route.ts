import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { userId: string, householdId: string } }) {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_householdId: {
        userId: Number(params.userId),
        householdId: Number(params.householdId),
      }
    },
    include: { user: true, household: true },
  });

  if (!membership) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(membership);
}

export async function PUT(req: Request, { params }: { params: { userId: string, householdId: string } }) {
  const { role } = await req.json();
  const updated = await prisma.membership.update({
    where: {
      userId_householdId: {
        userId: Number(params.userId),
        householdId: Number(params.householdId),
      }
    },
    data: { role },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { userId: string, householdId: string } }) {
  await prisma.membership.delete({
    where: {
      userId_householdId: {
        userId: Number(params.userId),
        householdId: Number(params.householdId),
      }
    }
  });
  return NextResponse.json({ message: "Deleted" });
}
