import { Col, Row } from "antd";
import { Project, UserRole } from "cv-graphql";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { updateProjectFormSchema } from "../../schemas";
import { useProjectUpdate } from "../../api";
import { Form } from "@/components/form";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormTextField } from "@/components/form-text-field";
import { FormNumberInput } from "@/components/form-number-input";
import { FormTextarea } from "@/components/form-textarea";
import { DATE_FORMAT } from "@/constants";
import { useAuthUser } from "@/services/auth-service";

import styles from "./project-details-form.module.scss";

interface ProjectDetailsFormProps {
    project: Project;
}

const ProjectDetailsForm = ({ project }: ProjectDetailsFormProps) => {
    const user = useAuthUser();

    const canEdit = user?.role === UserRole.Admin;

    const { t } = useTranslation();

    const [updateProject, { loading }] = useProjectUpdate();

    return (
        <Form
            disabled={!canEdit || loading}
            onSubmit={({ start_date, end_date, ...data }) => {
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
                end_date: project.end_date && dayjs(project.end_date),
                description: project.description,
                domain: project.domain,
                team_size: project.team_size,
            }}
            schema={updateProjectFormSchema()}
            className={styles.form}
        >
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <FormTextField label={t("project.fieldLabels.name")} name="name" />
                </Col>
                <Col span={12}>
                    <FormTextField
                        label={t("project.fieldLabels.internalName")}
                        name="internal_name"
                    />
                </Col>
                <Col span={12}>
                    <FormTextField label={t("project.fieldLabels.domain")} name="domain" />
                </Col>
                <Col span={12}>
                    <FormNumberInput
                        className={styles.fullWidth}
                        label={t("project.fieldLabels.teamSize")}
                        name="team_size"
                    />
                </Col>
                <Col span={12}>
                    <FormDatePicker
                        className={styles.fullWidth}
                        label={t("project.fieldLabels.startDate")}
                        name="start_date"
                    />
                </Col>
                <Col span={12}>
                    <FormDatePicker
                        className={styles.fullWidth}
                        label={t("project.fieldLabels.endDate")}
                        name="end_date"
                    />
                </Col>
                <Col span={24}>
                    <FormTextarea label={t("project.fieldLabels.description")} name="description" />
                </Col>
                {canEdit && (
                    <Col xs={{ span: 24 }} md={{ offset: 12, span: 12 }}>
                        <FormSubmitButton
                            type="primary"
                            className={styles.fullWidth}
                            disableIfNotDirty
                        >
                            {t("update")}
                        </FormSubmitButton>
                    </Col>
                )}
            </Row>
        </Form>
    );
};

export default ProjectDetailsForm;
