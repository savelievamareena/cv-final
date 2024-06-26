import { FormProps as AntdFormProps } from "antd";
import { ReactNode } from "react";
import { DefaultValues, FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";

export interface FormProps<T extends FieldValues> extends AntdFormProps {
    schema: ZodSchema<T>;
    onSubmit: SubmitHandler<T>;
    children: ReactNode;
    defaultValues?: DefaultValues<T>;
    resetAfterSubmit?: boolean;
}

export type FormHandle<T extends FieldValues> = UseFormReturn<T>;
