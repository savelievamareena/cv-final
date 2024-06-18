import { z } from "zod";
import i18n from "@/i18n";

export const getProjectFormSchema = () =>
    z.object({
        project: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
    });

export type ProjectFormSchemaType = z.infer<ReturnType<typeof getProjectFormSchema>>;
