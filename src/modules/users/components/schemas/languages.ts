import { z } from "zod";

export const languagesFormSchema = () =>
    z.object({
        name: z.string(),
        proficiency: z.string(),
    });

export type LanguagesFormSchemaType = z.infer<ReturnType<typeof languagesFormSchema>>;
