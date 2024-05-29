import { Form } from "@/components/form";
import { loginFormSchema } from "../../schemas";
import { useLogin } from "../../api/hooks";
import { FormTextField } from "@/components/form-text-field";
import { Button } from "antd";
import { authService } from "@/services";

export const LoginForm = () => {
    const [
        login,
        //{loading, error, data}
    ] = useLogin();

    return (
        <Form
            className=''
            onSubmit={async ({ email, password }) => {
                const { data } = await login({ variables: { auth: { email, password } } });

                if (data) authService.login(data.login.user, data.login.access_token);
            }}
            defaultValues={{}}
            schema={loginFormSchema}
        >
            <FormTextField label='Email' name='email' />
            <FormTextField label='Password' name='password' />
            <Button htmlType='submit'>Submit</Button>
        </Form>
    );
};
