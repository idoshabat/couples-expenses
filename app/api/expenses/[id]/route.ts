import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET expense by id
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
)  {
  const { id } = await params; // Wait for params to resolve
  const expense = await prisma.expense.findUnique({
    where: { id: Number(id) },
    include: { household: true, payer: true, category: true },
  });

  if (!expense) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(expense);
}

// UPDATE expense by id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
)  {
  const { id } = await params; // Wait for params to resolve
  const { note, amount, categoryId } = await req.json();

  const updated = await prisma.expense.update({
    where: { id: Number(id) },
    data: { note, amount, categoryId },
  });

  return NextResponse.json(updated);
}

// DELETE expense by id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
)  {
  const { id } = await params; // Wait for params to resolve
  await prisma.expense.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
