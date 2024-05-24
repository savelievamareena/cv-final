import { ReactNode } from "react";
import { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";
import { FormProps } from "antd";
import { ZodSchema } from "zod";

export interface HookFormProps<T extends FieldValues> extends FormProps {
    schema: ZodSchema<T>;
    onSubmit: SubmitHandler<T>;
    children: ReactNode;
    defaultValues: DefaultValues<T>;
}
