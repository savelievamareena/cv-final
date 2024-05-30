import { z } from "zod";

export const getSignUpFormSchema = (t: (arg: string) => string) =>
    z.object({
        email: z
            .string()
            .min(1, { message: t("auth.fieldErrors.emailRequired") })
            .email(t("auth.fieldErrors.emailGeneric")),
        password: z.string().min(6, { message: t("auth.fieldErrors.passwordMinLength") }),
    });

export type SignUpFormSchemaType = z.infer<ReturnType<typeof getSignUpFormSchema>>;
