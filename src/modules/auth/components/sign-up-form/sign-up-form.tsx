import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useSignUp } from "../../api";
import { signUpFormSchema } from "../../schemas";
import { FormTextField } from "@/components/form-text-field";
import { Form } from "@/components/form";
import { PasswordInput } from "../password-input";
import { routes } from "@/router";

import styles from "./sign-up-form.module.scss";

export const SignUpForm = () => {
    const [signUp, { loading }] = useSignUp();

    const navigate = useNavigate();

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
            schema={signUpFormSchema}
        >
            <h2>Sign Up</h2>
            <FormTextField type='text' label='Email' name='email' />
            <PasswordInput label='Password' name='password' />
            <Button disabled={loading} htmlType='submit'>
                Submit
            </Button>
        </Form>
    );
};
