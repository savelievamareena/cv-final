import { Button } from "antd";
import { useTranslation } from "react-i18next";

import { loginFormSchema } from "../../schemas";
import { useLogin } from "../../api";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";

import styles from "./login-form.module.scss";

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
            schema={loginFormSchema}
        >
            <h2>{t("auth.login")}</h2>
            <FormTextField type='text' label={t("auth.fieldLabels.email")} name='email' />
            <PasswordInput label={t("auth.fieldLabels.password")} name='password' />
            <Button disabled={loading} htmlType='submit'>
                {t("submit")}
            </Button>
        </Form>
    );
};
