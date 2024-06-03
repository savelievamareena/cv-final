import { Button } from "antd";
import { useTranslation } from "react-i18next";

import { useVerifyMail } from "../../api";
import { getVerifyMailFormSchema } from "../../schemas";
import { Form } from "@/components/form";
import { FormTextField } from "@/components/form-text-field";

import styles from "./form.module.scss";
import { useNotificationContext } from "@/helpers/notification";

export const VerifyMailForm = () => {
    const { showNotification } = useNotificationContext();

    const errorHandler = (message: string, key: string | number) =>
        showNotification("error", message, key);

    const [verifyMail, { loading }] = useVerifyMail(errorHandler);

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
            <FormTextField type='text' name='otp' label={t("auth.fieldLabels.otp")} maxLength={6} />
            <Button className={styles.button} disabled={loading} htmlType='submit'>
                {t("submit")}
            </Button>
        </Form>
    );
};
