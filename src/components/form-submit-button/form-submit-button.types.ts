import { ButtonProps } from "antd";

export type FormSubmitButtonProps = Omit<ButtonProps, "htmlType"> & {
    disableIfNotDirty?: boolean;
};
