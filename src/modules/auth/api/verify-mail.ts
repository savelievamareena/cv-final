import { authService } from "@/services/auth-service";
import { gql, useMutation } from "@apollo/client";
import { VerifyMailInput } from "cv-graphql";

const VERIFY_MAIL = gql`
    mutation VerifyMail($verifyMailInput: VerifyMailInput!) {
        verifyMail(mail: $verifyMailInput)
    }
`;

interface VerifyMailArgs {
    verifyMailInput: VerifyMailInput;
}

type ErrorHandler = (message: string, key: string | number) => void;

export const useVerifyMail = (errorHandler: ErrorHandler) => {
    return useMutation<void, VerifyMailArgs>(VERIFY_MAIL, {
        onError(error) {
            errorHandler(error.message, error.name);
        },
        onCompleted() {
            authService.verify();
        },
    });
};
