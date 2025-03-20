"use server";

import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
// This function is used to update the user data
export async function updateUser(data) {
  // Before updating user we need to check if the user is authorized
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  // Find the user in the database
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  // Now we can make connetion with the database and update the user

  try {
    // we wiil be doing three thing here so we use Transaction to make sure all the operation are done or none of them are done
    const result = await db.$transaction(
      async (tx) => {
        // 1. if the industry present in db or not
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });
        // 2. if not then we will create the industry for now but latter we wiil be adding the industry usign AI
        if (!industryInsight) {
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              salaryRanges: [],
              growthRate: 0,
              demandLevel: "Medium",
              topSkills: [],
              marketOutlook: "Positve",
              keyTrends: [],
              recommendedSkills: [],
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }
        // 3. update the user with the industry
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            skills: data.skills,
            bio: data.bio,
          },
        });
        // transaction successfully completed
        // return the updated user and industryInsight
        return { updatedUser, industryInsight };
      },
      { timeout: 1000 }
    );
  } catch (error) {
    console.log("error updating the user", error.message);
    throw new Error("Failed to update user");
  }
}

// This function is used to get the user data
export async function getOnboardedUser() {
  // check if user is authorised to get the data
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  // find the user in the database
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });
    return {
      isOnboraded: !!user?.industry,
    };
  } catch (error) {
    console.log("erroe checking the onboarded user", error.message);
    throw new Error("Failed to get user data");
  }
}
