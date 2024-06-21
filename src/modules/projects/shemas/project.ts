import { z } from "zod";
import i18n from "@/i18n";

export const getProjectFormSchema = () =>
    z.object({
        name: z
            .string()
            .min(1, { message: i18n.t("fieldErrors.nameRequired") })
            .optional(),
        internalName: z
            .string()
            .min(1, { message: i18n.t("fieldErrors.nameRequired") })
            .optional(),
        domain: z
            .string()
            .min(1, { message: i18n.t("fieldErrors.nameRequired") })
            .optional(),
        teamSize: z.number({ message: i18n.t("fieldErrors.nameRequired") }).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z
            .string()
            .min(1, { message: i18n.t("fieldErrors.nameRequired") })
            .optional(),
    });

export type ProjectFormSchemaType = z.infer<ReturnType<typeof getProjectFormSchema>>;
