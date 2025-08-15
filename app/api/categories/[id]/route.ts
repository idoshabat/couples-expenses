import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET category by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.id) },
    include: { household: true },
  });

  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

// UPDATE category by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { name } = await req.json();

  const updated = await prisma.category.update({
    where: { id: Number(params.id) },
    data: { name },
  });

  return NextResponse.json(updated);
}

// DELETE category by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.category.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
