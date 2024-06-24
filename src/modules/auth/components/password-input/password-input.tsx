import { ComponentProps, useState } from "react";
import { Button } from "antd";
import { EyeFilled, EyeOutlined } from "@ant-design/icons";
import classNames from "classnames";

import { FormTextField } from "@/components/form-text-field";
import { useIsDarkAppTheme } from "@/services/theme-service/theme-service.hooks";

import styles from "./password-input.module.scss";

type PasswordInputProps = ComponentProps<typeof FormTextField> & {
    VisibleIcon?: JSX.Element;
    HiddenIcon?: JSX.Element;
};

export const PasswordInput = ({ VisibleIcon, HiddenIcon, ...props }: PasswordInputProps) => {
    const [visible, setVisible] = useState(false);

    const isDarkTheme = useIsDarkAppTheme();

    const iconStyles = classNames(styles.toggleButton__icon, {
        [styles.toggleButton__icon_dark]: !isDarkTheme,
    });

    const Icon = visible
        ? VisibleIcon ?? <EyeFilled className={iconStyles} />
        : HiddenIcon ?? <EyeOutlined className={iconStyles} />;

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
