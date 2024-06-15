import { useNotificationContext } from "@/helpers/notification";
import { authService } from "@/services/auth-service";
import { gql, useMutation } from "@apollo/client";
import { AuthInput, AuthResult } from "cv-graphql";

const SIGN_UP = gql`
    mutation SingUp($authData: AuthInput!) {
        signup(auth: $authData) {
            user {
                id
                email
                is_verified
                role
            }
            access_token
        }
    }
`;

interface SignUpArgs {
    authData: AuthInput;
}

interface SignUpResult {
    signup: AuthResult;
}

export const useSignUp = () => {
    const { showNotification } = useNotificationContext();

    return useMutation<SignUpResult, SignUpArgs>(SIGN_UP, {
        onError: (error) => {
            showNotification("error", error.message);
        },
        onCompleted: (data) => {
            authService.login(data.signup.user, data.signup.access_token);
        },
    });
};
