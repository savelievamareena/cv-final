import { Button, Col, Row } from "antd";

import { Project } from "cv-graphql";
import { useTranslation } from "react-i18next";

import { BaseDialog } from "@/components/base-dialog";
import { Form } from "@/components/form";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";

import { mapProjectsToSelectOptions } from "@/helpers/convert/maps";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { updateProjectFormSchema, UpdateProjectFormSchemaType } from "../shemas";
import styles from "./project-details-form.module.scss";

interface ProjectDialogProps {
    title: string;
    onConfirm: (formData: UpdateProjectFormSchemaType) => void;
    onClose: () => void;
    initialValues: UpdateProjectFormSchemaType;
    projects: Project[];
}

const ProjectDialog = ({
    title,
    onConfirm,
    onClose,
    initialValues,
    projects,
}: ProjectDialogProps) => {
    const handleConfirm = (formData: UpdateProjectFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    const projectsOptions = mapProjectsToSelectOptions(projects);

    const { t } = useTranslation();

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                schema={updateProjectFormSchema()}
                className={styles.form}
            >
                <Row gutter={[16, 8]}>
                    <Col span={12}>
                        <FormSelect
                            label={t("project.fieldLabels.name")}
                            name="name"
                            options={projectsOptions}
                            size="large"
                        />
                    </Col>
                    <Col span={12}>
                        <FormTextField
                            label={t("project.fieldLabels.roles")}
                            name="roles"
                            placeholder="DO NOW WORK"
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
                    <Col span={12}>
                        <FormTextField
                            label={t("project.fieldLabels.responsibilities")}
                            name="responsibilities"
                            placeholder="DO NOW WORK"
                        />
                    </Col>
                </Row>
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <FormSubmitButton disableIfNotDirty>{t("submit")}</FormSubmitButton>
            </Form>
        </BaseDialog>
    );
};

export const useProjectDialog = createDialogHook<ProjectDialogProps>((props) => (
    <ProjectDialog {...props} />
));
