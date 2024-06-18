import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getProjectFormSchema } from "../shemas/project";

interface FormData {
    project: string;
}

interface ProjectDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    initialValues: FormData;
}

const ProjectDialog = ({ title, onConfirm, onClose, initialValues }: ProjectDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = (formData: FormData) => {
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
                <FormTextField type="text" label={t("projects.projects")} name="project" />
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
