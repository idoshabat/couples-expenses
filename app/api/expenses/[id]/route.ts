import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const expense = await prisma.expense.findUnique({
    where: { id: Number(params.id) },
    include: { household: true, payer: true, category: true },
  });
  if (!expense) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(expense);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { note, amount, categoryId } = await req.json();
  const updated = await prisma.expense.update({
    where: { id: Number(params.id) },
    data: { note, amount, categoryId },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.expense.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Deleted" });
}
