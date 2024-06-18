import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { CvFormSchemaType, getCvFormSchema } from "../shemas/cvs";

interface CvDialogProps {
    title: string;
    onConfirm: (formData: CvFormSchemaType) => void;
    onClose: () => void;
    initialValues: CvFormSchemaType;
}

const CvDialog = ({ title, onConfirm, onClose, initialValues }: CvDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = (formData: CvFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form onSubmit={handleConfirm} defaultValues={initialValues} schema={getCvFormSchema()}>
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
