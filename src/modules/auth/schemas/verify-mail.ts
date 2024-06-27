import { z } from "zod";
import i18n from "@/i18n";

export const getVerifyMailFormSchema = () =>
    z.object({
        otp: z.string().length(6, i18n.t("auth.fieldErrors.otpLength")),
    });

export type getVerifyMailFormSchema = z.infer<ReturnType<typeof getVerifyMailFormSchema>>;
