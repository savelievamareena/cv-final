import { useFormContext } from "react-hook-form";
import { FormInputProps } from "./form-text-field.types.ts";
import { Input } from "antd";

const FormTextField = ({ name, ...props }: FormInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const errorMessage = errors[name]?.message;
    const helperText = typeof errorMessage === "string" ? errorMessage : "";

    return (
        <div>
            <Input {...register(name)} {...props} status={helperText ? "error" : ""} />
            {helperText && <div style={{ color: "red", marginTop: "5px" }}>{helperText}</div>}
        </div>
    );
};

export default FormTextField;
