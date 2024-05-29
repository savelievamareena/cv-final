/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFormContext } from "react-hook-form";
import { FormInputProps } from "./form-text-field.types";
import { Input, Form } from "antd";
import { useEffect } from "react";

const FormTextField = ({
    name,
    label,
    required,
    labelCol,
    wrapperCol,
    ...props
}: FormInputProps) => {
    const {
        register,
        formState: { errors, defaultValues },
        setValue,
    } = useFormContext();

    useEffect(() => {
        register(name);
    }, []);

    const errorMessage = errors[name]?.message;
    const defaultValue = defaultValues?.[name];

    const helperText = typeof errorMessage === "string" ? errorMessage : "";

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
            <Input {...props} onChange={(ev) => setValue(name, ev.target.value)} />
        </Form.Item>
    );
};

export default FormTextField;
