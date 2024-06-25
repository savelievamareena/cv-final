import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { DepartmentFormSchemaType, getDepartmentFormSchema } from "../shemas/department";
import { BaseDialog } from "@/components/base-dialog/";
import { Form } from "@/components/form";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";

interface DepartmentDialogProps {
    title: string;
    onConfirm: (formData: DepartmentFormSchemaType) => void;
    onClose: () => void;
    initialValues: DepartmentFormSchemaType;
}
const DepartmentDialog = ({ title, onConfirm, onClose, initialValues }: DepartmentDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = (formData: DepartmentFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={initialValues}
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
