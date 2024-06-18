import { z } from "zod";
import i18n from "@/i18n";

export const getProjectFormSchema = () =>
    z.object({
        name: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        internalName: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        domain: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        teamSize: z.number(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
    });

export type ProjectFormSchemaType = z.infer<ReturnType<typeof getProjectFormSchema>>;
