import { useTranslation } from "react-i18next";

import { getLoginFormSchema } from "../../schemas";
import { useLogin } from "../../api";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";
import { FormSubmitButton } from "@/components/form-submit-button/form-submit-button";

import styles from "./form.module.scss";

export const LoginForm = () => {
    const [login, { loading }] = useLogin();

    const { t } = useTranslation();

    return (
        <Form
            disabled={loading}
            className={styles.form}
            onSubmit={({ email, password }) => {
                void login({ variables: { authData: { email, password } } });
            }}
            schema={getLoginFormSchema()}
        >
            <h2 className={styles.title}>{t("auth.login")}</h2>
            <FormTextField type='text' label={t("auth.fieldLabels.email")} name='email' />
            <PasswordInput label={t("auth.fieldLabels.password")} name='password' />
            <FormSubmitButton>{t("submit")}</FormSubmitButton>
        </Form>
    );
};
