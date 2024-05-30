import { USER, AUTH_TOKEN } from "@/constants";
import { makeVar } from "@apollo/client";
import { User } from "cv-graphql";
import { IAuthService } from "./auth-service.types";
import { IStorageService, localStorageService } from "../storage-service";

class AuthService implements IAuthService {
    user = makeVar<User | null>(null);
    accessToken = makeVar("");

    constructor(private readonly storageService: IStorageService<string>) {
        const user = this.storageService.getItem(USER);
        const accessToken = this.storageService.getItem(AUTH_TOKEN);

        if (user && accessToken) {
            this.accessToken(accessToken);
            this.user(JSON.parse(user) as User);
        }
    }

    login(user: User, accessToken: string) {
        this.user(user);
        this.accessToken(accessToken);

        this.storageService.setItem(USER, JSON.stringify(user));
        this.storageService.setItem(AUTH_TOKEN, accessToken);
    }

    verify() {
        if (this.user()) {
            const verifiedUserData = { ...this.user(), is_verified: true } as User;

            this.storageService.setItem(USER, JSON.stringify(verifiedUserData));
            this.user(verifiedUserData);
        }
    }

    logout() {
        this.user(null);
        this.accessToken("");

        this.storageService.removeItem(USER);
        this.storageService.removeItem(AUTH_TOKEN);
    }
}

export const authService = new AuthService(localStorageService);
