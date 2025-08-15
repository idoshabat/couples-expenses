import { clerkClient } from "@clerk/nextjs/server";
import {prisma} from "./prisma";

export async function createUserFromClerk(clerkUserId: string) {
  const client = await clerkClient(); // <-- call it as a function
  const clerkUser = await client.users.getUser(clerkUserId);

  return prisma.user.upsert({
    where: { id: parseInt(clerkUser.id) },
    update: {},
    create: {
      id: parseInt(clerkUser.id),
      email: clerkUser.emailAddresses[0]?.emailAddress,
      name: clerkUser.firstName || clerkUser.fullName || "No Name",
    },
  });
}
