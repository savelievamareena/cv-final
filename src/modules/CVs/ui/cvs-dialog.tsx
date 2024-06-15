import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getCvFormSchema } from "../shemas/cvs";

interface FormData {
    cv: string;
    description: string;
}
interface CvDialogProps {
    title: string;
    onConfirm: (formData: FormData) => void;
    onClose: () => void;
    initialValues: FormData;
}
const CvDialog = ({ title, onConfirm, onClose, initialValues }: CvDialogProps) => {
    const { t } = useTranslation();
    const { cv } = initialValues;

    const handleConfirm = (formData: FormData) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form onSubmit={handleConfirm} defaultValues={{ cv }} schema={getCvFormSchema()}>
                <FormTextField type="text" label={t("cv")} name="cv" />
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <FormSubmitButton disableIfNotDirty>{t("submit")}</FormSubmitButton>
            </Form>
        </BaseDialog>
    );
};

export const useCvDialog = createDialogHook<CvDialogProps>((props) => <CvDialog {...props} />);
