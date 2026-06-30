import { z } from "zod";
import i18n from "@/i18n";

export const getUserFormSchema = () =>
    z.object({
        first_name: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        last_name: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        email: z.string().min(1, { message: i18n.t("fieldErrors.emailRequired") }),
        password: z.string().min(6, { message: i18n.t("fieldErrors.minPasswordLength") }),
        department: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        position: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
    });

export type UserFormSchemaType = z.infer<ReturnType<typeof getUserFormSchema>>;
