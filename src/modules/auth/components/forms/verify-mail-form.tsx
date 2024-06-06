import { useTranslation } from "react-i18next";

import { useVerifyMail } from "../../api";
import { getVerifyMailFormSchema } from "../../schemas";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";
import { FormSubmitButton } from "@/components/form-submit-button/form-submit-button";

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
            <FormSubmitButton>{t("submit")}</FormSubmitButton>
        </Form>
    );
};
