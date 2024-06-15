import { Key } from "react";
import { Cv } from "cv-graphql";

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

export const mapStringsToSelectOptions = (arr: string[]): SelectOption[] => {
    return arr.map((item) => ({
        label: item,
        value: item,
    }));
};
