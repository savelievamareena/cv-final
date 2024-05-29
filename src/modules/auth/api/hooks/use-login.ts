import { useLazyQuery } from "@apollo/client";
import type { AuthInput, AuthResult } from "cv-graphql";
import { LOGIN } from "../queries";

export interface LoginArgs {
    auth: AuthInput;
}

export interface LoginResult {
    login: AuthResult;
}

export const useLogin = () => {
    return useLazyQuery<LoginResult, LoginArgs>(LOGIN);
};
