import { Form } from "@/components/form";
import { Project, UserRole } from "cv-graphql";
import { updateProjectFormSchema } from "../../schemas";
import { useProjectUpdate } from "../../api";
import { FormSubmitButton } from "@/components/form-submit-button";
import { useTranslation } from "react-i18next";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormTextField } from "@/components/form-text-field";

import dayjs from "dayjs";
import { FormNumberInput } from "@/components/form-number-input";
import { DATE_FORMAT } from "@/constants";
import { useAuthUser } from "@/services/auth-service";

interface ProjectDetailsFormProps {
    project: Project;
}

const ProjectDetailsForm = ({ project }: ProjectDetailsFormProps) => {
    const user = useAuthUser();

    const isAdmin = user?.role === UserRole.Admin;

    const { t } = useTranslation();

    const [updateProject, { loading }] = useProjectUpdate();

    return (
        <Form
            disabled={!isAdmin || loading}
            onSubmit={(data) => {
                console.log(data);

                const { end_date, start_date } = data;

                void updateProject({
                    variables: {
                        project: {
                            ...data,
                            projectId: project.id,
                            start_date: start_date.format(DATE_FORMAT),
                            end_date: end_date?.format(DATE_FORMAT),
                        },
                    },
                });
            }}
            defaultValues={{
                name: project.name,
                internal_name: project.internal_name,
                start_date: dayjs(project.start_date),
                end_date: project.end_date ? dayjs(project.end_date) : undefined,
                description: project.description,
                domain: project.domain,
                team_size: project.team_size,
            }}
            schema={updateProjectFormSchema()}
        >
            <FormTextField label="name" name="name" />
            <FormTextField label="internalName" name="internal_name" />
            <FormTextField label="domain" name="domain" />
            <FormDatePicker label="startDate" name="start_date" />
            <FormDatePicker label="endDate" name="end_date" />
            <FormTextField label="description" name="description" />
            <FormNumberInput label="team" name="team_size" />
            {isAdmin && <FormSubmitButton>{t("update")}</FormSubmitButton>}
        </Form>
    );
};

export default ProjectDetailsForm;
