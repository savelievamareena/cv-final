import { Button, Col, Row } from "antd";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { BaseDialog } from "@/components/base-dialog";
import { Form } from "@/components/form";
import { FormHandle } from "@/components/form/form.types";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormNumberInput } from "@/components/form-number-input";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";

import { mapProjectsToSelectOptions } from "@/helpers/convert/maps";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { useProjectsQuery } from "../api/get-projects-query";
import { updateProjectFormSchema, UpdateProjectFormSchemaType } from "../shemas";
import styles from "./project-details-form.module.scss";

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
                            size="large"
                        />
                    </Col>
                    <Col span={12}>
                        <FormTextField label={t("project.fieldLabels.roles")} name="roles" />
                    </Col>
                    <Col span={12}>
                        <FormTextField
                            label={t("project.fieldLabels.responsibilities")}
                            name="responsibilities"
                        />
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
