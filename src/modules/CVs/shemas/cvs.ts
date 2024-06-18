import { z } from "zod";
import i18n from "@/i18n";

export const getCvFormSchema = () =>
    z.object({
        cv: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
        description: z.string().min(1, { message: i18n.t("fieldErrors.descriptionRequired") }),
    });

export type CvFormSchemaType = z.infer<ReturnType<typeof getCvFormSchema>>;
