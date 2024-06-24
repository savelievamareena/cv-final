import { z } from "zod";
import i18n from "@/i18n.ts";

export const getCvDetailsSchema = () => {
    return z.object({
        name: z.string(),
        education: z.string(),
        description: z.string().min(6, {
            message: i18n.t("notifications.cv.descriptionLength"),
        }),
    });
};

export type CvDetailsSchemaType = z.infer<ReturnType<typeof getCvDetailsSchema>>;
