import { z } from "zod";

export const profileFormSchema = () =>
    z.object({
        firstName: z.string(),
        lastName: z.string(),
        department: z.string(),
        position: z.string(),
    });

export type ProfileFormSchemaType = z.infer<ReturnType<typeof profileFormSchema>>;
