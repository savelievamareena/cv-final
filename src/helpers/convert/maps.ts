import { Department, Position, User } from "cv-graphql";
import { Key } from "react";
interface SelectOption {
    label: string;
    value: string;
}

export interface UserTransformed {
    id: Key;
    first_name?: string;
    last_name?: string;
    email?: string;
    department?: string;
    position?: string;
}
export const mapStringsToSelectOptions = (arr: string[]): SelectOption[] => {
    return arr.map((item) => ({
        label: item,
        value: item,
    }));
};

export const mapUserToTable = (arr: User[]): UserTransformed[] => {
    return arr.map((item) => ({
        id: item.id,
        first_name: item.profile.first_name ?? "",
        last_name: item.profile.last_name ?? "",
        email: item.email,
        department: item.department?.name ?? "",
        position: item.position?.name ?? "",
    }));
};

export const mapPositionsToSelectOptions = (arr: Position[]): SelectOption[] => {
    return arr.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
    }));
};

export const mapDepartmentsToSelectOptions = (arr: Department[]): SelectOption[] => {
    return arr.map((item) => ({
        label: item.name,
        value: item.name,
        id: item.id,
    }));
};
