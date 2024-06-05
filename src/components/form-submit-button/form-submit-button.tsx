import { useFormContext } from "react-hook-form";
import { FormSubmitButtonProps } from "./form-submit-button.types";
import { Button } from "antd";

export const FormSubmitButton = ({
    disableIfNotDirty = false,
    disabled,
    children,
    ...props
}: FormSubmitButtonProps) => {
    const { formState } = useFormContext();

    return (
        <Button
            {...props}
            htmlType='submit'
            disabled={(disableIfNotDirty && !formState.isDirty) || formState.disabled || disabled}
        >
            {children}
        </Button>
    );
};
