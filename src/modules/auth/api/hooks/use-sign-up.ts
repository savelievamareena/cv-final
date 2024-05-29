import { useMutation } from "@apollo/client";
import type { AuthInput, AuthResult } from "cv-graphql";
import { SIGN_UP } from "../queries";

export interface SignUpArgs {
    auth: AuthInput;
}

export interface SignUpResult {
    signup: AuthResult;
}

export const useSignUp = () => {
    return useMutation<SignUpResult, SignUpArgs>(SIGN_UP);
};
