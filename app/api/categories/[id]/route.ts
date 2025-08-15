import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.id) },
    include: { household: true },
  });
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name } = await req.json();
  const updated = await prisma.category.update({
    where: { id: Number(params.id) },
    data: { name },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.category.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Deleted" });
}
