import { StorageKeys } from "@/constants";
import { makeVar } from "@apollo/client";
import { User } from "cv-graphql";
import { IAuthService } from "./auth-service.types";
import { localStorageService } from "../storage-service";

class AuthService implements IAuthService {
    user = makeVar<User | null>(null);
    accessToken = makeVar("");

    constructor() {
        const user = localStorageService.getItem(StorageKeys.User);
        const accessToken = localStorageService.getItem(StorageKeys.AuthToken);

        if (user && accessToken) {
            this.accessToken(accessToken);
            this.user(JSON.parse(user) as User);
        }
    }

    login(user: User, accessToken: string) {
        this.user(user);
        this.accessToken(accessToken);

        localStorageService.setItem(StorageKeys.User, JSON.stringify(user));
        localStorageService.setItem(StorageKeys.AuthToken, accessToken);
    }

    verify() {
        if (this.user()) {
            const verifiedUserData = { ...this.user(), is_verified: true } as User;

            localStorageService.setItem(StorageKeys.User, JSON.stringify(verifiedUserData));
            this.user(verifiedUserData);
        }
    }

    logout() {
        this.user(null);
        this.accessToken("");

        localStorageService.removeItem(StorageKeys.User);
        localStorageService.removeItem(StorageKeys.AuthToken);
    }
}

export const authService = new AuthService();
