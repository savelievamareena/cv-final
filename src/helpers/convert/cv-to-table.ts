import { Cv } from "cv-graphql";
import { Key } from "react";

export interface CvTransformed {
    id: Key;
    name: string;
    description: string;
    employee?: string;
}

export const convertCvToTable = (arr: Cv[]): CvTransformed[] => {
    return arr.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        employee: item.user?.email,
    }));
};
