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

type ErrorHandler = (message: string, key: string | number) => void;

export const useSignUp = (errorHandler: ErrorHandler) => {
    return useMutation<SignUpResult, SignUpArgs>(SIGN_UP, {
        onError(error) {
            errorHandler(error.message, error.name);
        },
        onCompleted(data) {
            authService.login(data.signup.user, data.signup.access_token);
        },
    });
};
