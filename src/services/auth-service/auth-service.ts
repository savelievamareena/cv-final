import { USER, AUTH_TOKEN } from "@/constants";
import { makeVar } from "@apollo/client";
import { User } from "cv-graphql";
import { IAuthService } from "./auth-service.types";
import { localStorageService } from "../storage-service";

class AuthService implements IAuthService {
    user = makeVar<User | null>(null);
    accessToken = makeVar("");

    constructor() {
        const user = localStorageService.getItem(USER);
        const accessToken = localStorageService.getItem(AUTH_TOKEN);

        if (user && accessToken) {
            this.accessToken(accessToken);
            this.user(JSON.parse(user) as User);
        }
    }

    login(user: User, accessToken: string) {
        this.user(user);
        this.accessToken(accessToken);

        localStorageService.setItem(USER, JSON.stringify(user));
        localStorageService.setItem(AUTH_TOKEN, accessToken);
    }

    verify() {
        if (this.user()) {
            const verifiedUserData = { ...this.user(), is_verified: true } as User;

            localStorageService.setItem(USER, JSON.stringify(verifiedUserData));
            this.user(verifiedUserData);
        }
    }

    logout() {
        this.user(null);
        this.accessToken("");

        localStorageService.removeItem(USER);
        localStorageService.removeItem(AUTH_TOKEN);
    }
}

export const authService = new AuthService();
