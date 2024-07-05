import { Button, Col, Flex, Row } from "antd";

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
                        <FormTextField label={t("project.fieldLabels.roles")} name="roles" />
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
                        />
                    </Col>
                </Row>
                <Flex gap={10} justify={"flex-end"}>
                    <Button htmlType="button" onClick={onClose}>
                        {t("cancel")}
                    </Button>
                    <FormSubmitButton disableIfNotDirty type="primary">
                        {t("submit")}
                    </FormSubmitButton>
                </Flex>
            </Form>
        </BaseDialog>
    );
};

export const useProjectDialog = createDialogHook<ProjectDialogProps>((props) => (
    <ProjectDialog {...props} />
));
