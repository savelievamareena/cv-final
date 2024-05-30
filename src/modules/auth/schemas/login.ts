import i18n from "@/i18n";
import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: i18n.t("auth.fieldErrors.emailRequired") })
        .email(i18n.t("auth.fieldErrors.emailGeneric")),
    password: z.string().min(6, { message: i18n.t("auth.fieldErrors.passwordMinLength") }),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
