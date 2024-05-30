import { User } from "cv-graphql";

export interface IAuthService {
    login(user: User, accessToken: string): void;
    logout(): void;
    verify(): void;
}
