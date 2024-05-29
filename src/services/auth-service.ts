/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AUTH_TOKEN, USER } from "@/constants";
import { makeVar } from "@apollo/client";
import { User } from "cv-graphql";

class AuthService {
    user = makeVar<User | null>(null);
    accessToken = makeVar("");

    constructor() {
        const user = localStorage.getItem(USER);
        const accessToken = localStorage.getItem(AUTH_TOKEN);

        if (user && accessToken) {
            this.accessToken(accessToken);
            this.user(JSON.parse(user));
        }
    }

    login(user: User, accessToken: string) {
        this.user(user);
        this.accessToken(accessToken);

        localStorage.setItem(USER, JSON.stringify(user));
        localStorage.setItem(AUTH_TOKEN, accessToken);
    }

    verify() {
        if (this.user()) {
            const verifiedUserData = { ...this.user(), is_verified: true } as User;

            localStorage.setItem(USER, JSON.stringify(verifiedUserData));
            this.user(verifiedUserData);
        }
    }

    logout() {
        this.user(null);
        this.accessToken("");

        localStorage.removeItem(USER);
        localStorage.removeItem(AUTH_TOKEN);
    }
}

export const authService = new AuthService();
