import { z } from "zod";
import i18n from "@/i18n";

export const getPositionFormSchema = () =>
    z.object({
        position: z.string().min(1, { message: i18n.t("fieldErrors.nameRequired") }),
    });

export type PositionFormSchemaType = z.infer<ReturnType<typeof getPositionFormSchema>>;
