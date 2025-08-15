// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// async function main() {
//   // Household
//   const home = await prisma.household.create({ data: { name: "Our Home" } });

//   // Two users
//   const a = await prisma.user.create({ data: { name: "Ido", email: "a@example.com" } });
//   const b = await prisma.user.create({ data: { name: "Reut", email: "b@example.com" } });

//   // Memberships
//   await prisma.membership.create({ data: { userId: a.id, householdId: home.id } });
//   await prisma.membership.create({ data: { userId: b.id, householdId: home.id } });

//   // Categories
//   const cats = ["Groceries", "Rent", "Utilities", "Dining", "Transport", "Travel", "Misc"];
//   for (const name of cats) {
//     await prisma.category.create({ data: { name, householdId: home.id } });
//   }

//   console.log("Seeded ✔");
// }

// main().finally(() => prisma.$disconnect())