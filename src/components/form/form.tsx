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
    updateDefaultsAfterSubmit = true,
    ...props
}: FormProps<T>) => {
    const formMethods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <FormProvider {...formMethods}>
            <AntdForm
                onFinish={formMethods.handleSubmit((data) => {
                    const onSubmitReturn = onSubmit(data);

                    if (!resetAfterSubmit) return;

                    if (onSubmitReturn instanceof Promise) {
                        onSubmitReturn
                            .then(() => {
                                formMethods.reset(updateDefaultsAfterSubmit ? data : undefined);
                            })
                            .catch((err) => console.error(err));
                    } else {
                        formMethods.reset(updateDefaultsAfterSubmit ? data : undefined);
                    }
                })}
                {...props}
            >
                {children}
            </AntdForm>
        </FormProvider>
    );
};

export default Form;
