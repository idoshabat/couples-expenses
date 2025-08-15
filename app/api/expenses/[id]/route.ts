import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET expense by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const expense = await prisma.expense.findUnique({
    where: { id: Number(params.id) },
    include: { household: true, payer: true, category: true },
  });

  if (!expense) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(expense);
}

// UPDATE expense by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { note, amount, categoryId } = await req.json();

  const updated = await prisma.expense.update({
    where: { id: Number(params.id) },
    data: { note, amount, categoryId },
  });

  return NextResponse.json(updated);
}

// DELETE expense by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.expense.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
