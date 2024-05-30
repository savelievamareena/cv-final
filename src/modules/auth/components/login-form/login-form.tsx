import { Button } from "antd";

import { loginFormSchema } from "../../schemas";
import { useLogin } from "../../api";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";

import styles from "./login-form.module.scss";

export const LoginForm = () => {
    const [login, { loading }] = useLogin();

    return (
        <Form
            disabled={loading}
            className={styles.form}
            onSubmit={({ email, password }) => {
                void login({ variables: { authData: { email, password } } });
            }}
            schema={loginFormSchema}
        >
            <h2>Login</h2>
            <FormTextField type='text' label='Email' name='email' />
            <PasswordInput label='Password' name='password' />
            <Button disabled={loading} htmlType='submit'>
                Submit
            </Button>
        </Form>
    );
};
