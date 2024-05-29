import { gql } from "@apollo/client";

export const VERIFY_MAIL = gql`
    mutation VerifyMail($verifyMailInput: VerifyMailInput!) {
        verifyMail(mail: $verifyMailInput)
    }
`;
