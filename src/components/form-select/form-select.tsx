import { Controller, useFormContext } from "react-hook-form";
import { FormSelectProps } from "./form-select.types";
import { Form, Select } from "antd";

export const FormSelect = ({ name, label, ...props }: FormSelectProps) => {
    const {
        control,
        formState: { errors, defaultValues },
    } = useFormContext();

    const errorMessage = errors[name]?.message;
    const defaultValue = defaultValues?.[name] as string;

    const helperText = typeof errorMessage === "string" ? errorMessage : "";

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
                <Form.Item
                    validateStatus={helperText ? "error" : ""}
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
