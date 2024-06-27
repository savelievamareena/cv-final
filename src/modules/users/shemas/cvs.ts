import { z } from "zod";
import i18n from "@/i18n";

export const getCvFormSchema = () =>
    z.object({
        name: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        description: z.string().min(1, { message: i18n.t("fieldErrors.descriptionRequired") }),
        education: z.string().min(1, { message: i18n.t("fieldErrors.educationRequired") }),
    });

export type CvFormSchemaType = z.infer<ReturnType<typeof getCvFormSchema>>;
