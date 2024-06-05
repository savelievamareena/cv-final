import { Controller, useFormContext } from "react-hook-form";
import { Input, Form } from "antd";
import { FormTextareaProps } from "./form-textarea.types";

const FormTextArea = ({ name, label, required, ...props }: FormTextareaProps) => {
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
            defaultValue={defaultValue}
            name={name}
            render={({ field }) => {
                return (
                    <Form.Item
                        validateStatus={helperText ? "error" : ""}
                        help={helperText}
                        name={name}
                        label={label}
                        required={required}
                        initialValue={defaultValue}
                    >
                        <Input.TextArea {...props} {...field} />
                    </Form.Item>
                );
            }}
        />
    );
};

export default FormTextArea;
