import { DatePicker, Form } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { FormDatePickerProps } from "./form-date-picker.types";

import dayjs, { isDayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const FormDatePicker = ({ name, label, ...props }: FormDatePickerProps) => {
    const {
        control,
        formState: { errors, defaultValues },
    } = useFormContext();

    const errorMessage = errors[name]?.message;
    const potentialDefaultValue = defaultValues?.[name] as unknown;

    const defaultValue = isDayjs(potentialDefaultValue) ? potentialDefaultValue : undefined;
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
                    <DatePicker {...props} {...field} />
                </Form.Item>
            )}
        />
    );
};

export default FormDatePicker;
