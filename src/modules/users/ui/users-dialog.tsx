import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getUserFormSchema } from "../shemas/user";
// import { useDepartmentsQuery, usePositionsQuery } from "@/api";
// import { FormSelect } from "@/components/form-select";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
}
interface UserDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    initialValues: FormData;
}
const UserDialog = ({ title, onConfirm, onClose, initialValues }: UserDialogProps) => {
    const { t } = useTranslation();
    // const departments = useDepartmentsQuery;()
    // const positions = usePositionsQuery;()

    const handleConfirm = (formData: FormData) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                schema={getUserFormSchema()}
            >
                <FormTextField type="text" label={t("email")} name="email" />
                <FormTextField type="text" label={t("password")} name="password" />
                <FormTextField type="text" label={t("first name")} name="first_name" />
                <FormTextField type="text" label={t("last name")} name="last_name" />
                {/* <FormSelect name="department" options={departments}/>
                <FormSelect name="position" options={positions}/> */}
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <FormSubmitButton disableIfNotDirty>{t("submit")}</FormSubmitButton>
            </Form>
        </BaseDialog>
    );
};

export const useUserDialog = createDialogHook<UserDialogProps>((props) => (
    <UserDialog {...props} />
));
