import { createDialogHook } from "@/helpers/dialog/create-dialog";
import BaseDialog from "../dialog/base-dialog";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

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
        <BaseDialog title={title} onClose={handleConfirm}>
            <Button htmlType="button" onClick={handleConfirm}>
                {t("cancel")}
            </Button>
            <Button htmlType="submit">{t("submit")}</Button>
        </BaseDialog>
    );
};

export const useConfirm = createDialogHook<ConfirmDialogProps>((props) => (
    <ConfirmDialog {...props} />
));
