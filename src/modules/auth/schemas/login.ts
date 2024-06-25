import { z } from "zod";
import i18n from "@/i18n";

export const getLoginFormSchema = () =>
    z.object({
        email: z
            .string()
            .min(1, { message: i18n.t("auth.fieldErrors.emailRequired") })
            .email(i18n.t("auth.fieldErrors.emailGeneric")),
        password: z.string().min(6, { message: i18n.t("auth.fieldErrors.passwordMinLength") }),
    });

export type LoginFormSchemaType = z.infer<ReturnType<typeof getLoginFormSchema>>;
