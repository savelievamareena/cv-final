import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const updateProjectFormSchema = () =>
    z.object({
        name: z.string(),
        roles: z.string().optional(),
        start_date: z.instanceof(dayjs as unknown as typeof Dayjs),
        end_date: z
            .instanceof(dayjs as unknown as typeof Dayjs)
            .nullable()
            .optional(),
        responsibilities: z.string().optional(),
    });

export type UpdateProjectFormSchemaType = z.infer<ReturnType<typeof updateProjectFormSchema>>;
