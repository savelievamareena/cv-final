import { Button, Col, Row } from "antd";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { useProjectsQuery } from "../api/get-projects-query";
import styles from "../components/project-details-form/project-details-form.module.scss";
import { updateProjectFormSchema, UpdateProjectFormSchemaType } from "../shemas";
import { BaseDialog } from "@/components/base-dialog";
import { Form } from "@/components/form";
import { FormHandle } from "@/components/form/form.types";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormNumberInput } from "@/components/form-number-input";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { FormTextarea } from "@/components/form-textarea";

import { mapProjectsToSelectOptions } from "@/helpers/convert/maps";
import { createDialogHook } from "@/helpers/dialog/create-dialog";

interface ProjectDialogProps {
    title: string;
    onConfirm: (formData: UpdateProjectFormSchemaType) => void;
    onClose: () => void;
    initialValues: UpdateProjectFormSchemaType;
}

const ProjectDialog = ({ title, onConfirm, onClose, initialValues }: ProjectDialogProps) => {
    const formRef = useRef<FormHandle<UpdateProjectFormSchemaType>>(null);

    const handleConfirm = (formData: UpdateProjectFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };
    const { projects } = useProjectsQuery();
    const projectsOptions = mapProjectsToSelectOptions(projects);

    const handleProjectChange = (value: string) => {
        const projectsSelected = projects?.filter((projects) => projects.name === value);

        if (projectsSelected) {
            const selectedIternalName = projectsSelected[0].internal_name;
            formRef.current?.setValue("internal_name", selectedIternalName ?? "");
        }
    };
    const { t } = useTranslation();

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                ref={formRef}
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
                            onChange={handleProjectChange}
                            size="large"
                        />
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
                        <FormTextarea
                            label={t("project.fieldLabels.description")}
                            name="description"
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
