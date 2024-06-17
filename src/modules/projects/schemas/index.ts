import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const updateProjectFormSchema = () =>
    z.object({
        name: z.string(),
        internal_name: z.string(),
        description: z.string(),
        domain: z.string(),
        start_date: z.instanceof(dayjs as unknown as typeof Dayjs),
        end_date: z
            .instanceof(dayjs as unknown as typeof Dayjs)
            .nullable()
            .optional(),
        team_size: z.number().int().min(1),
    });

export type UpdateProjectFormSchemaType = z.infer<ReturnType<typeof updateProjectFormSchema>>;
