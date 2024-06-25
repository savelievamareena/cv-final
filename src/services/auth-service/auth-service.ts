import { makeVar } from "@apollo/client";
import { User } from "cv-graphql";
import { localStorageService } from "../storage-service";
import { IAuthService } from "./auth-service.types";
import { StorageKeys } from "@/constants";

class AuthService implements IAuthService {
    user = makeVar<User | null>(null);
    accessToken = makeVar("");

    constructor() {
        const user = localStorageService.getItem<User>(StorageKeys.User);
        const accessToken = localStorageService.getItem<string>(StorageKeys.AuthToken);

        if (user && accessToken) {
            this.accessToken(accessToken);
            this.user(user);
        }
    }

    login(user: User, accessToken: string) {
        this.user(user);

        this.accessToken(accessToken);

        localStorageService.setItem(StorageKeys.User, user);
        localStorageService.setItem(StorageKeys.AuthToken, accessToken);
    }

    verify() {
        if (this.user()) {
            const verifiedUserData = { ...this.user(), is_verified: true } as User;

            localStorageService.setItem(StorageKeys.User, verifiedUserData);
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
