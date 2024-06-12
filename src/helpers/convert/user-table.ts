import { User } from "cv-graphql";
import { Key } from "react";

export interface UserTransformed {
    id: Key;
    first_name?: string;
    last_name?: string;
    email?: string;
}

export const convertCvToTable = (arr: User[]): UserTransformed[] => {
    return arr.map((item) => ({
        id: item.id,
        first_name: item.profile.first_name ?? "",
        last_name: item.profile.last_name ?? "",
        email: item.email,
    }));
};
