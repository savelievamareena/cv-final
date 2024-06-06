import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import BaseDialog from "@/components/dialog/base-dialog";
import { getDepartmentFormSchema } from "../shemas/department";

interface FormData {
    department: string;
}
interface DepartmentDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    defaultValues: { name: string };
}
const DepartmentDialog = ({ title, onConfirm, onClose, defaultValues }: DepartmentDialogProps) => {
    const { t } = useTranslation();

    const [initialValues, setInitialValues] = useState<FormData>({
        department: defaultValues.name,
    });

    useEffect(() => {
        setInitialValues({ department: defaultValues.name });
    }, [defaultValues]);

    const handleConfirm = (formData: FormData) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                initialValues={initialValues}
                schema={getDepartmentFormSchema()}
            >
                <FormTextField type="text" label={t("department")} name="department" />
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <Button htmlType="submit">{t("submit")}</Button>
            </Form>
        </BaseDialog>
    );
};

export const useAddDepartment = createDialogHook<DepartmentDialogProps>((props) => (
    <DepartmentDialog {...props} />
));
