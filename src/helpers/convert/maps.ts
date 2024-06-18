import { Key } from "react";
import { Cv, Department, Position, User } from "cv-graphql";

interface SelectOption {
    label: string;
    value: string;
}

export interface CvTransformed {
    id: Key;
    name: string;
    description: string;
    employee?: string;
}

export const mapCvDataToTable = (arr: Cv[]): CvTransformed[] => {
    return arr.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        employee: item.user?.email,
    }));
};

export interface UserTransformed {
    id: Key;
    first_name?: string;
    last_name?: string;
    email?: string;
    department?: string;
    position?: string;
    avatar?: string;
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
        avatar: item.profile.avatar ?? "",
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
