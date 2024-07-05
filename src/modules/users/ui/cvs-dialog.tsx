import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { BaseDialog } from "@/components/base-dialog/";
import { Form } from "@/components/form";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
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
                <FormTextField type="text" label={t("Name")} name="name" />
                <FormTextField type="text" label={t("Education")} name="education" />
                <FormTextField type="text" label={t("Description")} name="description" />
                <Flex gap={10} justify={"flex-end"}>
                    <Button htmlType="button" onClick={onClose}>
                        {t("cancel")}
                    </Button>
                    <FormSubmitButton disableIfNotDirty type="primary">
                        {t("submit")}
                    </FormSubmitButton>
                </Flex>
            </Form>
        </BaseDialog>
    );
};

export const useCvDialog = createDialogHook<CvDialogProps>((props) => <CvDialog {...props} />);
