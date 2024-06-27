import { z } from "zod";

export const addSkillSchema = () => {
    return z.object({
        name: z.string().min(3, { message: "Required field" }),
        category: z.string().optional(),
        mastery: z.string().min(3, { message: "Required field" }),
    });
};

export type AddSkillSchemaType = z.infer<ReturnType<typeof addSkillSchema>>;
