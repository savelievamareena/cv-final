import { z } from "zod";
import i18n from "@/i18n";

export const getSkillFormSchema = () =>
    z.object({
        skill: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        category: z.string().min(1, { message: i18n.t("fieldErrors.categoryRequired") }),
    });

export type SkillFormSchemaType = z.infer<ReturnType<typeof getSkillFormSchema>>;
