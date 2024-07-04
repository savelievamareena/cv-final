import { useTranslation } from "react-i18next";

import { Form } from "@/components/form";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { useVerifyMail } from "../../api";
import { getVerifyMailFormSchema } from "../../schemas";
import styles from "./form.module.scss";

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
            schema={getVerifyMailFormSchema()}
        >
            <h2 className={styles.title}>{t("auth.verifyMail")}</h2>
            <FormTextField type="text" name="otp" label={t("auth.fieldLabels.otp")} maxLength={6} />
            <FormSubmitButton type="primary">{t("submit")}</FormSubmitButton>
        </Form>
    );
};
