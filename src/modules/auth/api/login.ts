import { useNotificationContext } from "@/helpers/notification";
import { authService } from "@/services/auth-service";
import { gql, useLazyQuery } from "@apollo/client";
import { AuthInput, AuthResult } from "cv-graphql";

const LOGIN = gql`
    query Login($authData: AuthInput!) {
        login(auth: $authData) {
            user {
                id
                email
                is_verified
            }
            access_token
        }
    }
`;

interface LoginArgs {
    authData: AuthInput;
}

interface LoginResult {
    login: AuthResult;
}

export const useLogin = () => {
    const { showNotification } = useNotificationContext();

    return useLazyQuery<LoginResult, LoginArgs>(LOGIN, {
        onError(error) {
            showNotification("error", error.message, error.message);
        },
        onCompleted(data) {
            authService.login(data.login.user, data.login.access_token);
        },
    });
};
