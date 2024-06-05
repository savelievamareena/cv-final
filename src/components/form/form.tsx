/* eslint-disable @typescript-eslint/no-misused-promises */
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps } from "./form.types";
import { Form as AntdForm } from "antd";

const Form = <T extends FieldValues>({
    schema,
    onSubmit,
    children,
    defaultValues,
    resetAfterSubmit = true,
    layout = "vertical",
    ...props
}: FormProps<T>) => {
    const formMethods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <FormProvider {...formMethods}>
            <AntdForm
                layout={layout}
                onFinish={formMethods.handleSubmit(async (data) => {
                    await onSubmit(data);

                    if (!resetAfterSubmit) return;

                    formMethods.reset(data);
                })}
                {...props}
            >
                {children}
            </AntdForm>
        </FormProvider>
    );
};

export default Form;
