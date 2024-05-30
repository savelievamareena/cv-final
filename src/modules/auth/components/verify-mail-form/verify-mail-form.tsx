import { Button } from "antd";

import { useVerifyMail } from "../../api";
import { verifyMailFormSchema } from "../../schemas";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";

import styles from "./verify-form.module.scss";

export const VerifyMailForm = () => {
    const [verifyMail, { loading }] = useVerifyMail();

    return (
        <Form
            disabled={loading}
            className={styles.form}
            onSubmit={({ otp }) => {
                void verifyMail({ variables: { verifyMailInput: { otp } } });
            }}
            schema={verifyMailFormSchema}
        >
            <h2>Verify Mail</h2>
            <FormTextField type='text' name='otp' label='OTP' maxLength={6} />
            <Button disabled={loading} htmlType='submit'>
                Submit
            </Button>
        </Form>
    );
};
