import { z } from "zod";

export const verifyMailFormSchema = z.object({
    otp: z.string().length(6, "OTP must be be 6 characters long"),
});

export type VerifyMailFormSchemaType = z.infer<typeof verifyMailFormSchema>;
