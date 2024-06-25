import { gql, useMutation } from "@apollo/client";
import { VerifyMailInput } from "cv-graphql";
import { useNotificationContext } from "@/helpers/notification";
import { authService } from "@/services/auth-service";

const VERIFY_MAIL = gql`
    mutation VerifyMail($verifyMailInput: VerifyMailInput!) {
        verifyMail(mail: $verifyMailInput)
    }
`;

interface VerifyMailArgs {
    verifyMailInput: VerifyMailInput;
}

export const useVerifyMail = () => {
    const { showNotification } = useNotificationContext();

    return useMutation<void, VerifyMailArgs>(VERIFY_MAIL, {
        onError: (error) => {
            showNotification("error", error.message);
        },
        onCompleted: () => {
            authService.verify();
        },
    });
};
