import { createDialogHook } from "@/helpers/dialog/create-dialog";
import BaseDialog from "../dialog/base-dialog";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/form";

interface ConfirmDialogProps {
    title: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmDialog = ({ title, onConfirm, onClose }: ConfirmDialogProps) => {
    const { t } = useTranslation();

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <BaseDialog title={title} onClose={onClose}>
            <Form onSubmit={handleConfirm}>
                <Button htmlType='button' onClick={onClose}>
                    {t("cancel")}
                </Button>
                <Button htmlType='submit'>{t("submit")}</Button>
            </Form>
        </BaseDialog>
    );
};

export const useConfirm = createDialogHook<ConfirmDialogProps>((props) => (
    <ConfirmDialog {...props} />
));
