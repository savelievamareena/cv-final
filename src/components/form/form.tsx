import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps } from "./form.types.ts";

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
            <form
                onSubmit={() => {
                    formMethods.handleSubmit(onSubmit);
                }}
                {...props}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default Form;
