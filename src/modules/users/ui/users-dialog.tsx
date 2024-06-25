import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { getUserFormSchema, UserFormSchemaType } from "../shemas/user";
import { useDepartmentsQuery, usePositionsQuery } from "@/api";
import { BaseDialog } from "@/components/base-dialog/";
import { Form } from "@/components/form";
import { FormSelect } from "@/components/form-select";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { mapDepartmentsToSelectOptions, mapPositionsToSelectOptions } from "@/helpers/convert/maps";
import { createDialogHook } from "@/helpers/dialog/create-dialog";

interface UserDialogProps {
    title: string;
    onConfirm: (formData: UserFormSchemaType) => void;
    onClose: () => void;
    initialValues: UserFormSchemaType;
}

const UserDialog = ({ title, onConfirm, onClose, initialValues }: UserDialogProps) => {
    const { t } = useTranslation();
    const departments = useDepartmentsQuery();
    const positions = usePositionsQuery();

    const handleConfirm = (formData: UserFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };
    const departmentOptions = mapDepartmentsToSelectOptions(departments.departments);
    const positionOptions = mapPositionsToSelectOptions(positions.positions);
    const roleOptions = [
        { value: "Admin", label: "Admin" },
        { value: "Employee", label: "Employee" },
    ];

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
                <FormSelect name="department" options={departmentOptions} label={t("department")} />
                <FormSelect name="position" options={positionOptions} label={t("position")} />
                <FormSelect name="role" options={roleOptions} label={t("role")} />
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
