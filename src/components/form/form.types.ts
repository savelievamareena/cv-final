import React, { ComponentProps } from "react";
import { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";
import { ZodSchema } from "zod";

export interface FormProps<T extends FieldValues> extends Omit<ComponentProps<"form">, "onSubmit"> {
    schema: ZodSchema<T>;
    onSubmit: SubmitHandler<T>;
    children: React.ReactNode;
    defaultValues: DefaultValues<T>;
}
