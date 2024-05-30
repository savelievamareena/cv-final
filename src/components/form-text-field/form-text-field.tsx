/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./form-text-field.types";
import { Input, Form } from "antd";

const FormTextField = ({
    name,
    label,
    required,
    labelCol,
    wrapperCol,
    ...props
}: FormInputProps) => {
    const {
        control,
        formState: { errors, defaultValues },
    } = useFormContext();

    const errorMessage = errors[name]?.message;
    const defaultValue = defaultValues?.[name];

    const helperText = typeof errorMessage === "string" ? errorMessage : "";

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
                        labelCol={labelCol}
                        wrapperCol={wrapperCol}
                        required={required}
                        initialValue={defaultValue}
                    >
                        <Input {...props} {...field} />
                    </Form.Item>
                );
            }}
        />
    );
};

export default FormTextField;
