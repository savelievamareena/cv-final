import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getDepartmentFormSchema } from "../shemas/department";

interface FormData {
    department: string;
}
interface DepartmentDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    initialValues: { department: string };
}
const DepartmentDialog = ({ title, onConfirm, onClose, initialValues }: DepartmentDialogProps) => {
    const { t } = useTranslation();
    const { department } = initialValues;

    const handleConfirm = (formData: FormData) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={{ department }}
                schema={getDepartmentFormSchema()}
            >
                <FormTextField type="text" label={t("department")} name="department" />
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <FormSubmitButton disableIfNotDirty>{t("submit")}</FormSubmitButton>
            </Form>
        </BaseDialog>
    );
};

export const useAddDepartment = createDialogHook<DepartmentDialogProps>((props) => (
    <DepartmentDialog {...props} />
));
