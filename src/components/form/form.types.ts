import { ReactNode } from "react";
import { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";
import { FormProps as AntdFormProps } from "antd";
import { ZodSchema } from "zod";

export interface FormProps<T extends FieldValues> extends AntdFormProps {
    schema: ZodSchema<T>;
    onSubmit: SubmitHandler<T>;
    children: ReactNode;
    defaultValues?: DefaultValues<T>;
    resetAfterSubmit?: boolean;
}
