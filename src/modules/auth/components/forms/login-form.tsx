import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Form } from "@/components/form";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { useNotificationContext } from "@/helpers/notification";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";
import { useLogin } from "../../api";
import { getLoginFormSchema } from "../../schemas";
import { PasswordInput } from "../password-input";
import styles from "./form.module.scss";

export const LoginForm = () => {
    const user = useAuthUser();

    const [login, { loading }] = useLogin();

    const { t } = useTranslation();

    const { showNotification } = useNotificationContext();

    const isExistingUserNotVerified = user && !user.is_verified;

    return (
        <Form
            disabled={loading}
            className={styles.form}
            onSubmit={({ email, password }) => {
                if (isExistingUserNotVerified && email === user.email)
                    showNotification("warning", t("verifyEmailWarning"));
                else void login({ variables: { authData: { email, password } } });
            }}
            schema={getLoginFormSchema()}
        >
            <h2 className={styles.title}>{t("auth.login")}</h2>
            <FormTextField type="text" label={t("auth.fieldLabels.email")} name="email" />
            <PasswordInput label={t("auth.fieldLabels.password")} name="password" />
            <FormSubmitButton type="primary">{t("submit")}</FormSubmitButton>
            <p>
                <Link to={routes.auth.signUp} className={styles.link}>
                    {t("auth.additionalLinks.dontHaveAccount")}
                </Link>
            </p>
            {isExistingUserNotVerified && (
                <p>
                    {t("verifyEmailHint")}{" "}
                    <Link className={styles.link} to={routes.auth.verification}>
                        {t("here")}
                    </Link>
                </p>
            )}
        </Form>
    );
};
