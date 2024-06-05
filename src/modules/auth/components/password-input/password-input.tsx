import { ComponentProps, useState } from "react";
import { EyeFilled, EyeOutlined } from "@ant-design/icons";

import { FormTextField } from "@/components/form-text-field";

import styles from "./password-input.module.scss";
import { Button } from "antd";

type PasswordInputProps = ComponentProps<typeof FormTextField> & {
    VisibleIcon?: JSX.Element;
    HiddenIcon?: JSX.Element;
};

export const PasswordInput = ({
    VisibleIcon = <EyeFilled className={styles.toggleButton__icon} />,
    HiddenIcon = <EyeOutlined className={styles.toggleButton__icon} />,
    ...props
}: PasswordInputProps) => {
    const [visible, setVisible] = useState(false);

    const Icon = visible ? VisibleIcon : HiddenIcon;

    return (
        <FormTextField
            {...props}
            type={visible ? "text" : "password"}
            prefix={
                <Button
                    htmlType="button"
                    className={styles.toggleButton}
                    onClick={(ev) => {
                        ev.stopPropagation();
                        setVisible((prev) => !prev);
                    }}
                >
                    {Icon}
                </Button>
            }
        />
    );
};
