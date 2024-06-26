import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { useSignUp } from "../../api";
import { getSignUpFormSchema } from "../../schemas";
import { PasswordInput } from "../password-input";
import styles from "./form.module.scss";
import { Form } from "@/components/form";
import { FormSubmitButton } from "@/components/form-submit-button";
import { FormTextField } from "@/components/form-text-field";
import { useNotificationContext } from "@/helpers/notification";
import { routes } from "@/router";
import { useAuthUser } from "@/services/auth-service";

export const SignUpForm = () => {
    const user = useAuthUser();

    const [signUp, { loading }] = useSignUp();

    const navigate = useNavigate();

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
                else
                    void signUp({
                        variables: {
                            authData: {
                                email,
                                password,
                            },
                        },
                    }).then(() => {
                        navigate(routes.auth.verification);
                    });
            }}
            schema={getSignUpFormSchema()}
        >
            <h2 className={styles.title}>{t("auth.signup")}</h2>
            <FormTextField type="text" label={t("auth.fieldLabels.email")} name="email" />
            <PasswordInput label={t("auth.fieldLabels.password")} name="password" />
            <FormSubmitButton type="primary">{t("submit")}</FormSubmitButton>
            {isExistingUserNotVerified && (
                <p>
                    {t("verifyEmailHint")} <Link to={routes.auth.verification}>{t("here")}</Link>
                </p>
            )}
        </Form>
    );
};
