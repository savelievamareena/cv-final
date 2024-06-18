import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { getLoginFormSchema } from "../../schemas";
import { useLogin } from "../../api";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";
import { FormSubmitButton } from "@/components/form-submit-button";
import { useAuthUser } from "@/services/auth-service";
import { useNotificationContext } from "@/helpers/notification";
import { routes } from "@/router";

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
                if (isExistingUserNotVerified) showNotification("warning", t("verifyEmailWarning"));
                else void login({ variables: { authData: { email, password } } });
            }}
            schema={getLoginFormSchema()}
        >
            <h2 className={styles.title}>{t("auth.login")}</h2>
            <FormTextField type="text" label={t("auth.fieldLabels.email")} name="email" />
            <PasswordInput label={t("auth.fieldLabels.password")} name="password" />
            <FormSubmitButton>{t("submit")}</FormSubmitButton>
            {isExistingUserNotVerified && (
                <p>
                    {t("verifyEmailHint")} <Link to={routes.auth.verification}>{t("here")}</Link>
                </p>
            )}
        </Form>
    );
};
