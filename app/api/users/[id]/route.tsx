import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// export async function PATCH(
//     req: Request,
//     { params }: { params: Promise<{ id: string }> }
//   ) {
//     const { id } = await params; // ✅ מחכים ל־params
  
//     const user = await prisma.user.update({
//       where: { id: Number(id) },
//       data: { completed }
//     });
  
//     return NextResponse.json(task);
//   }
  

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params; // ✅ מחכים ל־params
  
    await prisma.user.delete({ where: { id: id } });
  
    return NextResponse.json({ message: "User deleted successfully" });
  }
