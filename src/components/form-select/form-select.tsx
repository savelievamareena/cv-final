import { Controller, useFormContext } from "react-hook-form";
import { Form, Select } from "antd";
import { FormSelectProps } from "./form-select.types";

export const FormSelect = ({ name, label, ...props }: FormSelectProps) => {
    const {
        control,
        formState: { errors, defaultValues },
    } = useFormContext();

    const errorMessage = errors[name]?.message;
    const potentialDefaultValue = defaultValues?.[name] as unknown;

    const defaultValue =
        typeof potentialDefaultValue === "string" ? potentialDefaultValue : undefined;
    const helperText = typeof errorMessage === "string" ? errorMessage : undefined;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Form.Item
                    validateStatus={helperText && "error"}
                    help={helperText}
                    name={name}
                    label={label}
                    initialValue={defaultValue}
                >
                    <Select {...props} {...field} />
                </Form.Item>
            )}
        />
    );
};
