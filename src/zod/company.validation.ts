import z from "zod";

export const companyEditSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  websiteUrl: z.url("Please enter a valid URL").optional().or(z.literal("")),
  facebookUrl: z.url("Please enter a valid URL").optional().or(z.literal("")),
  instagramUrl: z.url("Please enter a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.url("Please enter a valid URL").optional().or(z.literal("")),
  youtubeUrl: z.url("Please enter a valid URL").optional().or(z.literal("")),
  twitterUrl: z.url("Please enter a valid URL").optional().or(z.literal("")),
});