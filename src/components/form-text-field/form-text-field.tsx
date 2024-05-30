import { useFormContext } from "react-hook-form";
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
        register,
        formState: { errors },
    } = useFormContext();

    const errorMessage = errors[name]?.message;
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
        >
            <Input {...register(name)} {...props} />
        </Form.Item>
    );
};

export default FormTextField;
