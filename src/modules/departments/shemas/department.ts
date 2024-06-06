import { z } from "zod";
import i18n from "@/i18n";

export const getDepartmentFormSchema = () =>
    z.object({
        department: z.string().min(1, { message: i18n.t("auth.fieldErrors.emailRequired") }),
    });

export type DepartmentFormSchemaType = z.infer<ReturnType<typeof getDepartmentFormSchema>>;