import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HookFormProps } from "./form.types.ts";
import { Form as AntdForm } from "antd";

const Form = <T extends FieldValues>({
    schema,
    onSubmit,
    children,
    defaultValues,
    ...props
}: HookFormProps<T>) => {
    const formMethods = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    return (
        <FormProvider {...formMethods}>
            <AntdForm
                onFinish={() => {
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
