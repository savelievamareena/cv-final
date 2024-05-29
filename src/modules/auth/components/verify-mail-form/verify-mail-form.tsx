import { Button } from "antd";
import { useVerifyMail } from "../../api/hooks";
import { verifyMailFormSchema } from "../../schemas";
import { authService } from "@/services";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";

import styles from "./verify-form.module.scss";

export const VerifyMailForm = () => {
    const [
        verifyMail,
        //{loading, error, data}
    ] = useVerifyMail();

    return (
        <Form
            className={styles.form}
            onSubmit={async ({ otp }) => {
                await verifyMail({ variables: { verifyMailInput: { otp } } });

                authService.verify();
            }}
            schema={verifyMailFormSchema}
        >
            <h2>Verify Mail</h2>
            <FormTextField type='text' name='otp' label='OTP' maxLength={6} />
            <Button htmlType='submit'>Submit</Button>
        </Form>
    );
};
