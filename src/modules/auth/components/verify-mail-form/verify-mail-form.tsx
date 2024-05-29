import { FormTextField } from "@/components/form-text-field";
import { Button } from "antd";
import { useVerifyMail } from "../../api/hooks";
import { verifyMailFormSchema } from "../../schemas";
import { Form } from "@/components/form";
import { authService } from "@/services";

export const VerifyMailForm = () => {
    const [
        verifyMail,
        //{loading, error, data}
    ] = useVerifyMail();

    return (
        <Form
            onSubmit={async ({ otp }) => {
                await verifyMail({ variables: { mail: { otp } } });

                authService.verify();
            }}
            defaultValues={{}}
            schema={verifyMailFormSchema}
        >
            <FormTextField name='otp' />
            <Button htmlType='submit'>Submit</Button>
        </Form>
    );
};
