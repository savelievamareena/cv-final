import { useSignUp } from "../../api/hooks";
import { Button } from "antd";
import { authService } from "@/services";
import { signUpFormSchema } from "../../schemas";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";

import styles from "./sign-up-form.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router";

export const SignUpForm = () => {
    const [signUp] = useSignUp();

    const navigate = useNavigate();

    const handleSignUp = async (email: string, password: string) => {
        const { data } = await signUp({
            variables: {
                authData: {
                    email,
                    password,
                },
            },
        });

        if (data) authService.login(data.signup.user, data.signup.access_token);
        navigate(routes.auth.verification);
    };

    return (
        <Form
            className={styles.form}
            onSubmit={({ email, password }) => {
                handleSignUp(email, password).catch((err) => console.error(err));
            }}
            schema={signUpFormSchema}
        >
            <h2>Sign Up</h2>
            <FormTextField type='text' label='Email' name='email' />
            <PasswordInput />
            <Button htmlType='submit'>Submit</Button>
        </Form>
    );
};
