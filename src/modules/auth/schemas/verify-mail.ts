import { z } from "zod";

export const verifyMailFormSchema = z.object({
    otp: z.string().min(1, { message: "OTP is required" }),
});

export type VerifyMailFormSchemaType = z.infer<typeof verifyMailFormSchema>;
