import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getLanguageFormSchema } from "../shemas/language";

interface FormData {
    language: string;
    native_name: string;
    iso2: string;
}
interface LanguageDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    initialValues: FormData;
}
const LanguageDialog = ({ title, onConfirm, onClose, initialValues }: LanguageDialogProps) => {
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
