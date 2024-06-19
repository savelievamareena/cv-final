import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";
import i18n from "@/i18n";

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
        team_size: z
            .number({ message: i18n.t("project.fieldErrors.teamSize") })
            .int({ message: i18n.t("project.fieldErrors.teamSize") })
            .min(1, { message: i18n.t("project.fieldErrors.teamSize") }),
    });

export type UpdateProjectFormSchemaType = z.infer<ReturnType<typeof updateProjectFormSchema>>;
