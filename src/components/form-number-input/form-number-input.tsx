import { Form, InputNumber } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { FormNumberInputProps } from "./form-number-input.types";

const FormNumberInput = ({ name, label, ...props }: FormNumberInputProps) => {
    const {
        control,
        formState: { errors, defaultValues },
    } = useFormContext();

    const errorMessage = errors[name]?.message;
    const potentialDefaultValue = defaultValues?.[name] as unknown;

    const defaultValue =
        typeof potentialDefaultValue === "number" ? potentialDefaultValue : undefined;
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
                    <InputNumber {...props} {...field} />
                </Form.Item>
            )}
        />
    );
};

export default FormNumberInput;
