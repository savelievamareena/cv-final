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
    return useMutation<SignUpResult, SignUpArgs>(SIGN_UP, {
        onError(error) {
            console.error(error.message);
        },
        onCompleted(data) {
            authService.login(data.signup.user, data.signup.access_token);
        },
    });
};
