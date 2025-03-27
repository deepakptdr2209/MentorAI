import { auth } from "@clerk/nextjs/server";
import db from "./prisma";

export async function getuser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Find the user in the database
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
}
