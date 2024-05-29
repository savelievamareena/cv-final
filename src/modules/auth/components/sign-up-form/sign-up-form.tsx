import { Form } from "@/components/form";
import { useSignUp } from "../../api/hooks";
import { FormTextField } from "@/components/form-text-field";
import { Button } from "antd";
import { authService } from "@/services";
import { signUpFormSchema } from "../../schemas";

export const SignUpForm = () => {
    const [signUp] = useSignUp();

    return (
        <Form
            onSubmit={async ({ email, password }) => {
                console.log("sign up");
                const { data } = await signUp({
                    variables: {
                        auth: {
                            email,
                            password,
                        },
                    },
                });

                if (data) authService.login(data.signup.user, data.signup.access_token);
            }}
            defaultValues={{ email: "", password: "" }}
            schema={signUpFormSchema}
        >
            <FormTextField label='Email' name='email' />
            <FormTextField label='Password' name='password' />
            <Button htmlType='submit'>Submit</Button>
        </Form>
    );
};
