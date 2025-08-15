import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const expenses = await prisma.expense.findMany({
    include: { household: true, payer: true, category: true },
  });
  return NextResponse.json(expenses);
}

export async function POST(req: Request) {
  const { note, amount, householdId, payerId, categoryId } = await req.json();
  const expense = await prisma.expense.create({
    data: { note, amount, householdId, payerId, categoryId },
  });
  return NextResponse.json(expense, { status: 201 });
}
