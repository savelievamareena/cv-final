import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSignUp } from "../../api";
import { getSignUpFormSchema } from "../../schemas";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";
import { routes } from "@/router";

import styles from "./form.module.scss";

export const SignUpForm = () => {
    const [signUp, { loading }] = useSignUp();

    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
        <Form
            disabled={loading}
            className={styles.form}
            onSubmit={({ email, password }) => {
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
            <FormTextField type='text' label={t("auth.fieldLabels.email")} name='email' />
            <PasswordInput label={t("auth.fieldLabels.password")} name='password' />
            <Button className={styles.button} disabled={loading} htmlType='submit'>
                {t("submit")}
            </Button>
        </Form>
    );
};