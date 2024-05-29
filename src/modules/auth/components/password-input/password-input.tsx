import { useState } from "react";
import { EyeFilled, EyeOutlined } from "@ant-design/icons";

import styles from "./password-input.module.scss";
import { FormTextField } from "@/components/form-text-field";

export const PasswordInput = () => {
    const [visible, setVisible] = useState(false);

    const EyeIcon = visible ? EyeFilled : EyeOutlined;

    return (
        <FormTextField
            type={visible ? "text" : "password"}
            label='Password'
            name='password'
            prefix={
                <button
                    type='button'
                    className={styles.toggleButton}
                    onClick={(ev) => {
                        ev.stopPropagation();
                        setVisible((prev) => !prev);
                    }}
                >
                    <EyeIcon className={styles.toggleButton__icon} />
                </button>
            }
        />
    );
};
