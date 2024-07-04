import { Button, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { createDialogHook } from "@/helpers/dialog/create-dialog";
import { BaseDialog } from "../base-dialog/";

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
            <Flex gap={10} justify={"flex-end"}>
                <Button htmlType="button" onClick={onClose}>
                    {t("cancel")}
                </Button>
                <Button htmlType="button" onClick={handleConfirm} type="primary">
                    {t("submit")}
                </Button>
            </Flex>
        </BaseDialog>
    );
};

const useConfirm = createDialogHook<ConfirmDialogProps>((props) => <ConfirmDialog {...props} />);

export default useConfirm;
