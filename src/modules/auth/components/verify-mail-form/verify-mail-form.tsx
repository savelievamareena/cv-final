import { Button } from "antd";
import { useTranslation } from "react-i18next";

import { useVerifyMail } from "../../api";
import { getVerifyMailFormSchema } from "../../schemas";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";

import styles from "./verify-form.module.scss";

export const VerifyMailForm = () => {
    const [verifyMail, { loading }] = useVerifyMail();

    const { t } = useTranslation();

    return (
        <Form
            disabled={loading}
            className={styles.form}
            onSubmit={({ otp }) => {
                void verifyMail({ variables: { verifyMailInput: { otp } } });
            }}
            schema={getVerifyMailFormSchema(t)}
        >
            <h2>{t("auth.verifyMail")}</h2>
            <FormTextField type='text' name='otp' label={t("auth.fieldLabels.otp")} maxLength={6} />
            <Button disabled={loading} htmlType='submit'>
                {t("submit")}
            </Button>
        </Form>
    );
};
