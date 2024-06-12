import { User } from "cv-graphql";
import { Key } from "react";

export interface UserTransformed {
    id: Key;
    first_name?: string;
    last_name?: string;
    email?: string;
    department?: string;
    position?: string;
}

export const convertUserToTable = (arr: User[]): UserTransformed[] => {
    return arr.map((item) => ({
        id: item.id,
        first_name: item.profile.first_name ?? "",
        last_name: item.profile.last_name ?? "",
        email: item.email,
        department: item.department?.name ?? "",
        position: item.position?.name ?? "",
    }));
};
