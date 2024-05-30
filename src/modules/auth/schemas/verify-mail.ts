import { z } from "zod";

export const getVerifyMailFormSchema = (t: (arg: string) => string) =>
    z.object({
        otp: z.string().length(6, t("auth.fieldErrors.otpLength")),
    });

export type getVerifyMailFormSchema = z.infer<ReturnType<typeof getVerifyMailFormSchema>>;
