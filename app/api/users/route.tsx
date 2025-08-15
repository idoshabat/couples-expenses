// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
// import { auth } from "@clerk/nextjs";

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users, { status: 200 });
}

// export async function POST(req: NextRequest) {
//   try {
//     const { userId } = auth(); // get logged-in Clerk user
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Get user info from Clerk (you could also fetch more details via Clerk API if needed)
//     const body = await req.json();
//     const name = body.name ?? "No Name"; // fallback
//     const email = body.email; // optional if you want to sync with Clerk email

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     // Create or update user in your database
//     const user = await prisma.user.upsert({
//       where: { clerkId: userId }, // use Clerk ID to avoid duplicates
//       update: { name, email },
//       create: { clerkId: userId, name, email },
//     });

//     return NextResponse.json(user, { status: 201 });
//   } catch (error) {
//     console.error("Error creating/updating user:", error);
//     return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
//   }
// }
