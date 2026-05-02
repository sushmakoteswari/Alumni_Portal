import { z } from "zod";

export const alumniRegistrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  batch: z.string().regex(/^(19|20)\d{2}$/, "Enter a valid year"),
  email: z.string().trim().email("Invalid email").max(255),
  city: z.string().trim().min(2, "Enter your current city").max(80),
  phone: z.string().trim().max(40, "Too long"),
  linkedin: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

export type AlumniRegistration = z.infer<typeof alumniRegistrationSchema>;
