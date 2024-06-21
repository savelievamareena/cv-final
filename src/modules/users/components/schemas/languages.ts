import { z } from "zod";
import i18n from "@/i18n";

export const languagesFormSchema = () =>
    z.object({
        name: z.string().min(1, { message: i18n.t("languages.fieldErrors.nameRequired") }),
        proficiency: z
            .string()
            .min(1, { message: i18n.t("languages.fieldErrors.proficiencyRequired") }),
    });

export type LanguagesFormSchemaType = z.infer<ReturnType<typeof languagesFormSchema>>;
