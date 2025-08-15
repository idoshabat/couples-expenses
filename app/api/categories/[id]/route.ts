import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ מחכים ל־params
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { household: true },
  });

  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ מחכים ל־params
  const { name } = await req.json();
  const updated = await prisma.category.update({
    where: { id: Number(id) },
    data: { name },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
)  {
  const { id } = await params; // ✅ מחכים ל־params
  await prisma.category.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Deleted" });
}
