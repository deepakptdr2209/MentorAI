"use server";

import { getuser } from "@/lib/getUser";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const saveResume = async (content) => {
  try {
    const user = await getuser();
    const resume = db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });
    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.log(error.message, " error saving the resume");
    throw new Error("Failed to save resume");
  }
};

export async function getResume() {
  try {
    const user = await getuser();
    const resume = db.resume.findUnique({
      where: {
        userId: user.id,
      },
    });
    return resume;
  } catch (error) {
    console.log(error.message, " error getting the resume");
    throw new Error("Failed to fetch resume");
  }
}

export async function improveWithAi({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");
  const prompt = `
     As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    7. Use ATS friendly keywords
    
    Format the response as a single paragraph without any additional text or explanations.
    `;
  try {
    const response = (await model.generateContent(prompt)).response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.log(error.message, " error using AI for improvement");
    throw new Error("Failed to load");
  }
}
