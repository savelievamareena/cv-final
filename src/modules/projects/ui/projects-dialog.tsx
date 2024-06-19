import { useTranslation } from "react-i18next";
import { Button, DatePicker, Form as AntdForm } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getProjectFormSchema, ProjectFormSchemaType } from "../shemas/project";
import { Controller } from "react-hook-form";

interface ProjectDialogProps {
    title: string;
    onConfirm: (formData: ProjectFormSchemaType) => void;
    onClose: () => void;
    initialValues: ProjectFormSchemaType;
}

const ProjectDialog = ({ title, onConfirm, onClose, initialValues }: ProjectDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = (formData: ProjectFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                schema={getProjectFormSchema()}
            >
                <FormTextField type="text" label={t("projects.name")} name="name" />
                <FormTextField type="text" label={t("projects.internalName")} name="internalName" />
                <FormTextField type="text" label={t("projects.domain")} name="domain" />
                <FormTextField type="text" label={t("projects.description")} name="description" />
                <AntdForm.Item label={t("projects.startDate")}>
                    <Controller
                        name="startDate"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                format="YYYY-MM-DD"
                                placeholder={t("projects.startDate")}
                                onChange={(dateString) => field.onChange(dateString)}
                            />
                        )}
                    />
                </AntdForm.Item>
                <AntdForm.Item label={t("projects.endDate")}>
                    <Controller
                        name="endDate"
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                format="YYYY-MM-DD"
                                placeholder={t("projects.endDate")}
                                onChange={(dateString) => field.onChange(dateString)}
                            />
                        )}
                    />
                </AntdForm.Item>
                <FormTextField type="number" label={t("projects.teamSize")} name="teamSize" />
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
