import { useMutation } from "@apollo/client";
import { VerifyMailInput } from "cv-graphql";
import { VERIFY_MAIL } from "../queries";

export interface VerifyMailArgs {
    mail: VerifyMailInput;
}

export const useVerifyMail = () => {
    return useMutation<void, VerifyMailArgs>(VERIFY_MAIL);
};
