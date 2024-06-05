import BaseDialog from "@/components/dialog/base-dialog";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { useTranslation } from "react-i18next";
import { getDepartmentFormSchema } from "../shemas/department";
import { Button } from "antd";

interface FormData {
    department: string;
}
interface DepartmentDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    defaultValue: { name: string };
}

const DepartmentDialog = ({ title, onConfirm, onClose, defaultValue }: DepartmentDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = (formData: FormData) => {
        onConfirm(formData);
        onClose();
    };
    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form onSubmit={handleConfirm} schema={getDepartmentFormSchema()}>
                <FormTextField
                    type='text'
                    label={t("department")}
                    name='department'
                    defaultValue={defaultValue.name}
                />
                <Button htmlType='button' onClick={onClose}>
                    {t("cancel")}
                </Button>
                <Button htmlType='submit'>{t("submit")}</Button>
            </Form>
        </BaseDialog>
    );
};

export const useAddDepartment = createDialogHook<DepartmentDialogProps>((props) => (
    <DepartmentDialog {...props} />
));
