const { z } = require("zod");

export const userSchema = z.object({
  industry: z.string({
    required_error: "Industry is required",
  }),
  subIndustry: z.string({
    required_error: "Sub Industry is required",
  }),
  bio: z.string().max(200).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, { message: "Experience must be greater than 0 Years" })
        .max(40, { message: "Experience must be less than 40 Years" })
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});
