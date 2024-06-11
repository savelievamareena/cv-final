import { z } from "zod";
import i18n from "@/i18n";

export const getLanguageFormSchema = () => {
    const iso2Message = { message: i18n.t("fieldErrors.nameRequired") };
    return z.object({
        language: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        native_name: z.string().min(1, { message: i18n.t("fieldErrors.native_nameRequired") }),
        iso2: z.string().min(1, iso2Message).max(2, iso2Message),
    });
};

export type LanguageFormSchemaType = z.infer<ReturnType<typeof getLanguageFormSchema>>;
