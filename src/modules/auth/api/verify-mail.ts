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

export const useVerifyMail = () => {
    return useMutation<void, VerifyMailArgs>(VERIFY_MAIL, {
        onError: (error) => {
            console.error(error.message);
        },
        onCompleted: () => {
            authService.verify();
        },
    });
};
