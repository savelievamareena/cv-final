import { Button, Col, Flex, Row } from "antd";

import { useTranslation } from "react-i18next";

import { BaseDialog } from "@/components/base-dialog";
import { Form } from "@/components/form";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormNumberInput } from "@/components/form-number-input";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { FormTextarea } from "@/components/form-textarea";

import { createDialogHook } from "@/helpers/dialog/create-dialog";
import styles from "../components/project-details-form/project-details-form.module.scss";
import { updateProjectFormSchema, UpdateProjectFormSchemaType } from "../schemas";

interface ProjectDialogProps {
    title: string;
    onConfirm: (formData: UpdateProjectFormSchemaType) => void;
    onClose: () => void;
    initialValues: UpdateProjectFormSchemaType;
}

const ProjectDialog = ({ title, onConfirm, onClose, initialValues }: ProjectDialogProps) => {
    const handleConfirm = (formData: UpdateProjectFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

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
                        <FormTextarea
                            label={t("project.fieldLabels.description")}
                            name="description"
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
