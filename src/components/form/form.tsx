/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { forwardRef, useImperativeHandle } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { Form as AntdForm } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormHandle, FormProps } from "./form.types";

const Form = forwardRef(
    <T extends FieldValues>(
        {
            schema,
            onSubmit,
            children,
            defaultValues,
            resetAfterSubmit = true,
            layout = "vertical",
            ...props
        }: FormProps<T>,
        ref: React.Ref<FormHandle<T>>
    ) => {
        const formMethods = useForm<T>({
            resolver: zodResolver(schema),
            defaultValues,
        });

        useImperativeHandle(ref, () => ({
            ...formMethods,
        }));

        return (
            <FormProvider {...formMethods}>
                <AntdForm
                    {...props}
                    layout={layout}
                    onFinish={formMethods.handleSubmit(async (data) => {
                        await onSubmit(data);

                        if (!resetAfterSubmit) return;

                        formMethods.reset(data);
                    })}
                >
                    {children}
                </AntdForm>
            </FormProvider>
        );
    }
);

export default Form;
