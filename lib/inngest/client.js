import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "MentorAi",
  name: "Mentor AI",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
