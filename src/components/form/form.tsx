import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps } from "./form.types";
import { Form as AntdForm } from "antd";

const Form = <T extends FieldValues>({
    schema,
    onSubmit,
    children,
    defaultValues,
    ...props
}: FormProps<T>) => {
    const formMethods = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    return (
        <FormProvider {...formMethods}>
            <AntdForm
                onFinish={(ev) => {
                    console.log(ev);
                    formMethods.handleSubmit(onSubmit);
                }}
                {...props}
            >
                {children}
            </AntdForm>
        </FormProvider>
    );
};

export default Form;
