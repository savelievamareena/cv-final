import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getProjectFormSchema, ProjectFormSchemaType } from "../shemas/project";

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
                <FormTextField type="text" label={t("projects.projects")} name="name" />
                <FormTextField type="text" label={t("projects.projects")} name="internalName" />
                <FormTextField type="text" label={t("projects.projects")} name="domain" />
                <FormTextField type="text" label={t("projects.projects")} name="description" />
                <FormTextField type="text" label={t("projects.projects")} name="startDate" />
                <FormTextField type="text" label={t("projects.projects")} name="endDate" />
                <FormTextField type="number" label={t("projects.projects")} name="teamSize" />
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
