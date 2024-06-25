import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { getLanguageFormSchema, LanguageFormSchemaType } from "../shemas/language";
import { BaseDialog } from "@/components/base-dialog/";
import { Form } from "@/components/form";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";

interface LanguageDialogProps {
    title: string;
    onConfirm: (formData: LanguageFormSchemaType) => void;
    onClose: () => void;
    initialValues: LanguageFormSchemaType;
}
const LanguageDialog = ({ title, onConfirm, onClose, initialValues }: LanguageDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = (formData: LanguageFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                schema={getLanguageFormSchema()}
            >
                <FormTextField type="text" label={t("language")} name="language" />
                <FormTextField type="text" label={t("Native name")} name="native_name" />
                <FormTextField type="text" label={t("iso2")} name="iso2" />
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <FormSubmitButton disableIfNotDirty>{t("submit")}</FormSubmitButton>
            </Form>
        </BaseDialog>
    );
};

export const useLanguageDialog = createDialogHook<LanguageDialogProps>((props) => (
    <LanguageDialog {...props} />
));
