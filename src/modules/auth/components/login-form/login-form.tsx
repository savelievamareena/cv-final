import { loginFormSchema } from "../../schemas";
import { useLogin } from "../../api/hooks";
import { Button } from "antd";
import { authService } from "@/services";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";

import styles from "./login-form.module.scss";

export const LoginForm = () => {
    const [login] = useLogin();

    const handleLogin = async (email: string, password: string) => {
        const { data } = await login({ variables: { authData: { email, password } } });

        if (data) authService.login(data.login.user, data.login.access_token);
    };

    return (
        <Form
            className={styles.form}
            onSubmit={({ email, password }) => {
                handleLogin(email, password).catch((err) => console.error(err));
            }}
            schema={loginFormSchema}
        >
            <h2>Login</h2>
            <FormTextField type='text' label='Email' name='email' />
            <PasswordInput />
            <Button htmlType='submit'>Submit</Button>
        </Form>
    );
};
