import { User } from "cv-graphql";

export interface UsersResult {
    users: User[];
}

export interface CreateUserResult {
    createUser: User;
}

export interface UpdateUserResult {
    updateUser: User;
}

export interface UserResult {
    user: User;
}
