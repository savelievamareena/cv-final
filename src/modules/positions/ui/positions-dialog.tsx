import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "@/components/base-dialog/";
import { FormSubmitButton } from "@/components/form-submit-button";
import { getPositionFormSchema, PositionFormSchemaType } from "../shemas/position";

interface PositionDialogProps {
    title: string;
    onConfirm: (formData: PositionFormSchemaType) => void;
    onClose: () => void;
    initialValues: PositionFormSchemaType;
}

const PositionDialog = ({ title, onConfirm, onClose, initialValues }: PositionDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = (formData: PositionFormSchemaType) => {
        onConfirm(formData);
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form
                onSubmit={handleConfirm}
                defaultValues={initialValues}
                schema={getPositionFormSchema()}
            >
                <FormTextField type="text" label={t("positions.positions")} name="position" />
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <FormSubmitButton disableIfNotDirty>{t("submit")}</FormSubmitButton>
            </Form>
        </BaseDialog>
    );
};

export const usePositionDialog = createDialogHook<PositionDialogProps>((props) => (
    <PositionDialog {...props} />
));
